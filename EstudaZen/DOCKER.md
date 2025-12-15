# Docker Compose - EstudaZen

Este arquivo configura os serviços necessários para desenvolvimento local:

## Serviços

### PostgreSQL
- **Porta**: 5432
- **Database**: EstudaZen
- **Usuário**: root
- **Senha**: myPassword

### MinIO (S3-Compatible Storage)
- **API Port**: 9000
- **Console UI**: http://localhost:9001
- **Usuário**: minioadmin
- **Senha**: minioadmin123
- **Bucket**: estudazen-media

## Como Usar

### Iniciar todos os serviços:
```bash
docker-compose up -d
```

### Parar todos os serviços:
```bash
docker-compose down
```

### Ver logs:
```bash
docker-compose logs -f
```

### Acessar MinIO Console:
1. Abrir http://localhost:9001
2. Login: minioadmin / minioadmin123
3. Bucket `estudazen-media` criado automaticamente

## Configuração da Aplicação

### appsettings.json
```json
{
  "ConnectionStrings": {
    "Default": "Host=localhost;Port=5432;Database=EstudaZen;User ID=root;Password=myPassword;"
  },
  "MinIO": {
    "Endpoint": "localhost:9000",
    "AccessKey": "minioadmin",
    "SecretKey": "minioadmin123",
    "BucketName": "estudazen-media",
    "UseSSL": false
  }
}
```

## Volumes

Os dados são persistidos em volumes Docker:
- `postgres_data`: Dados do PostgreSQL
- `minio_data`: Arquivos do MinIO
