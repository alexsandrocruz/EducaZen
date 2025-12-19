# Deploy EducaZen - Guia Passo a Passo

Este guia documenta o processo completo de deploy do EducaZen na VPS Hetzner.

**Servidor:** 37.27.221.76  
**Domínio:** educa.zensuite.com.br  
**DNS:** Cloudflare

---

## Parte 1: Configuração do Servidor (VPS)

### 1.1 Conectar ao Servidor

```bash
ssh root@37.27.221.76
```

---

### 1.2 Atualizar Sistema

```bash
apt update && apt upgrade -y
apt install -y curl wget git unzip
```

---

### 1.3 Instalar Docker

```bash
curl -fsSL https://get.docker.com | sh
systemctl enable docker
systemctl start docker

# Verificar instalação
docker --version
docker compose version
```

---

### 1.4 Instalar .NET SDK 10

```bash
wget https://dot.net/v1/dotnet-install.sh
chmod +x dotnet-install.sh
./dotnet-install.sh --channel 10.0

# Adicionar ao PATH
echo 'export DOTNET_ROOT=$HOME/.dotnet' >> ~/.bashrc
echo 'export PATH=$PATH:$DOTNET_ROOT:$DOTNET_ROOT/tools' >> ~/.bashrc
source ~/.bashrc

# Criar symlink para systemd
ln -s /root/.dotnet/dotnet /usr/local/bin/dotnet

# Verificar
dotnet --version
```

---

### 1.5 Instalar Certbot (para SSL)

```bash
apt install -y certbot
```

---

### 1.6 Criar Estrutura de Diretórios

```bash
mkdir -p /opt/educazen/{api,angular,ssl}
cd /opt/educazen
```

---

### 1.7 Criar docker-compose.prod.yml

```bash
cat > /opt/educazen/docker-compose.prod.yml << 'EOF'
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: educazen-postgres
    restart: always
    environment:
      POSTGRES_DB: EstudaZen
      POSTGRES_USER: educazen
      POSTGRES_PASSWORD: EducaZen@2024!Prod
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "127.0.0.1:5432:5432"

  redis:
    image: redis:7-alpine
    container_name: educazen-redis
    restart: always
    ports:
      - "127.0.0.1:6379:6379"
    volumes:
      - redis_data:/data

  nginx:
    image: nginx:alpine
    container_name: educazen-nginx
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - /etc/letsencrypt:/etc/letsencrypt:ro
      - /opt/educazen/angular:/opt/educazen/angular:ro
    extra_hosts:
      - "host.docker.internal:host-gateway"
    depends_on:
      - postgres
      - redis

volumes:
  postgres_data:
  redis_data:
EOF
```

---

### 1.8 Criar nginx.conf

```bash
cat > /opt/educazen/nginx.conf << 'EOF'
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    # Redirecionar HTTP para HTTPS
    server {
        listen 80;
        server_name educa.zensuite.com.br;
        
        # Para renovação do certbot
        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }

        location / {
            return 301 https://$server_name$request_uri;
        }
    }

    # Servidor HTTPS
    server {
        listen 443 ssl;
        http2 on;
        server_name educa.zensuite.com.br;

        # Certificados SSL
        ssl_certificate /etc/letsencrypt/live/educa.zensuite.com.br/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/educa.zensuite.com.br/privkey.pem;

        # Configurações SSL modernas
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers on;

        # Headers de segurança
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
        
        client_max_body_size 100M;

        # Root para Angular
        root /opt/educazen/angular;
        index index.html;

        # API
        location /api/ {
            proxy_pass http://host.docker.internal:5000;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # OpenIddict OAuth/OIDC
        location /connect/ {
            proxy_pass http://host.docker.internal:5000;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # ABP Account UI (Login)
        location /Account/ {
            proxy_pass http://host.docker.internal:5000;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # ABP Bundles (CSS/JS)
        location /__bundles/ {
            proxy_pass http://host.docker.internal:5000;
        }

        # ABP Client Libs
        location /libs/ {
            proxy_pass http://host.docker.internal:5000;
        }

        # ABP Scripts
        location /Abp/ {
            proxy_pass http://host.docker.internal:5000;
        }

        # OpenID Discovery
        location /.well-known/ {
            proxy_pass http://host.docker.internal:5000;
        }

        # Health Check
        location /health-status {
            proxy_pass http://host.docker.internal:5000;
        }

        # Angular SPA Fallback (deve ser o último!)
        location / {
            try_files $uri $uri/ /index.html;
        }
    }
}
EOF
```

---

### 1.9 Gerar Certificado SSL

```bash
# Primeiro, inicie apenas postgres e redis (nginx vai falhar sem SSL)
cd /opt/educazen
docker compose -f docker-compose.prod.yml up -d postgres redis

# Gerar certificado (porta 80 precisa estar livre)
certbot certonly --standalone -d educa.zensuite.com.br

# Agora inicie o nginx
docker compose -f docker-compose.prod.yml up -d nginx
```

---

### 1.10 Criar Systemd Service para API

```bash
cat > /etc/systemd/system/educazen-api.service << 'EOF'
[Unit]
Description=EducaZen API
After=network.target docker.service

[Service]
WorkingDirectory=/opt/educazen/api
ExecStart=/usr/local/bin/dotnet /opt/educazen/api/EstudaZen.HttpApi.Host.dll
Restart=always
RestartSec=10
KillSignal=SIGINT
SyslogIdentifier=educazen-api
User=root
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment=ASPNETCORE_URLS=http://0.0.0.0:5000

[Install]
WantedBy=multi-user.target
EOF

# Recarregar e habilitar
systemctl daemon-reload
systemctl enable educazen-api
```

---

### 1.11 Configurar Renovação Automática SSL

```bash
# Adicionar ao crontab
(crontab -l 2>/dev/null; echo "0 0 1 * * certbot renew --quiet && docker restart educazen-nginx") | crontab -
```

---

## Parte 2: Configuração da Chave SSH

### 2.1 No seu Mac (Local)

```bash
# Gerar nova chave SSH
ssh-keygen -t ed25519 -C "github-actions-educazen" -f ~/.ssh/educazen_deploy -N ""

# Ver a chave pública (copiar o output)
cat ~/.ssh/educazen_deploy.pub
```

### 2.2 No Servidor (VPS)

```bash
# Colar a chave pública (substituir pelo conteúdo real):
echo "cole-aqui-a-chave-publica" >> ~/.ssh/authorized_keys

# Garantir permissões
chmod 600 ~/.ssh/authorized_keys
```

### 2.3 Testar Conexão (do Mac)

```bash
ssh -i ~/.ssh/educazen_deploy root@37.27.221.76 "echo 'SSH funcionando!'"
```

---

## Parte 3: Configurar GitHub Secrets

Acesse: **GitHub Repo → Settings → Secrets and variables → Actions**

Adicione os seguintes secrets:

| Secret | Valor |
|--------|-------|
| `SSH_HOST` | `37.27.221.76` |
| `SSH_USER` | `root` |
| `SSH_PRIVATE_KEY` | Conteúdo de `~/.ssh/educazen_deploy` (chave privada) |
| `OPENIDDICT_CERTIFICATE` | Certificado base64 (ver próximo passo) |

### 3.1 Gerar Certificado OpenIddict (no Mac)

```bash
cd /tmp
dotnet dev-certs https -ep ./openiddict.pfx -p EducaZenOpenIddict2024!

# Converter para base64 e copiar
base64 -i openiddict.pfx | tr -d '\n' | pbcopy

# Agora cole no GitHub Secret OPENIDDICT_CERTIFICATE
```

---

## Parte 4: Primeiro Deploy

Após configurar tudo:

1. Faça um push para a branch `main`
2. Os workflows vão executar automaticamente
3. Verifique no GitHub Actions se passou

### Verificar logs da API:
```bash
journalctl -u educazen-api -f
```

### Verificar containers:
```bash
docker ps
```

### Testar endpoints:
```bash
curl https://educa.zensuite.com.br/health-status
curl https://educa.zensuite.com.br/api/abp/application-configuration
```

---

## Comandos Úteis

```bash
# Ver logs da API
journalctl -u educazen-api -n 100 --no-pager

# Reiniciar API
systemctl restart educazen-api

# Reiniciar Nginx
docker restart educazen-nginx

# Ver todos os containers
docker ps

# Acessar PostgreSQL
docker exec -it educazen-postgres psql -U educazen -d EstudaZen

# Ver logs do nginx
docker logs educazen-nginx -f
```

---

## Troubleshooting

### API não inicia
```bash
# Ver erro específico
journalctl -u educazen-api -n 50 --no-pager
```

### Nginx não encontra certificado
```bash
# Verificar se o certificado existe
ls -la /etc/letsencrypt/live/educa.zensuite.com.br/
```

### Conexão recusada na API
```bash
# Verificar se API está ouvindo
ss -tlnp | grep 5000
```

---

*Documento gerado em dezembro/2025 para o projeto EducaZen.*
