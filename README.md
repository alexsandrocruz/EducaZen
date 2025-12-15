# 📚 EducaZen

> **Plataforma Educacional Moderna** construída com ABP Framework, .NET 10 e Angular 20

## 📖 Sobre o Projeto

**EducaZen** (anteriormente EstudaZen) é uma plataforma educacional desenvolvida com as melhores práticas de **Domain-Driven Design (DDD)**, utilizando o poderoso **ABP Framework 10.0** e tecnologias modernas para criar uma solução escalável, modular e de alta performance.

### 🎯 Propósito

O EducaZen tem como objetivo fornecer uma plataforma robusta para gestão educacional, incluindo:
- Gerenciamento de alunos e professores
- Controle de cursos e matrículas
- Sistema de avaliações e notas
- Portal de conteúdo educacional
- Suporte multi-tenant (SaaS)

## 🚀 Tecnologias

### Backend
- **[.NET 10.0](https://dotnet.microsoft.com/download/dotnet/10.0)** - Framework moderno e de alta performance
- **[ABP Framework 10.0.1](https://abp.io/)** - Framework completo para aplicações empresariais
- **[Entity Framework Core](https://docs.microsoft.com/ef/core/)** - ORM para acesso a dados
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[OpenIddict](https://documentation.openiddict.com/)** - Autenticação e autorização OAuth 2.0/OpenID Connect

### Frontend
- **[Angular 20](https://angular.io/)** - Framework para aplicações web
- **[TypeScript 5.8](https://www.typescriptlang.org/)** - JavaScript tipado
- **[RxJS 7.8](https://rxjs.dev/)** - Programação reativa
- **[ABP Angular UI](https://docs.abp.io/en/abp/latest/UI/Angular/Quick-Start)** - Componentes UI do ABP

### Infraestrutura
- **[Docker](https://www.docker.com/)** - Containerização
- **[MinIO](https://min.io/)** - Armazenamento de objetos S3-compatible
- **[Redis](https://redis.io/)** (opcional) - Cache distribuído

### Arquitetura
- **Domain-Driven Design (DDD)** - Padrões de design orientados ao domínio
- **Microservices Ready** - Arquitetura preparada para microserviços
- **Multi-Tenancy** - Suporte nativo para SaaS
- **Clean Architecture** - Separação de responsabilidades em camadas

## 🏗️ Estrutura do Projeto

O projeto segue a arquitetura em camadas do ABP Framework:

```
EstudaZen/
├── src/
│   ├── EstudaZen.Domain/              # Entidades, Aggregates, Domain Services
│   ├── EstudaZen.Domain.Shared/       # Enums, Constants (compartilhados)
│   ├── EstudaZen.Application/         # Application Services (lógica de aplicação)
│   ├── EstudaZen.Application.Contracts/ # Interfaces, DTOs
│   ├── EstudaZen.EntityFrameworkCore/ # DbContext, Repositories, Migrations
│   ├── EstudaZen.HttpApi/             # Controllers REST
│   ├── EstudaZen.HttpApi.Host/        # API Startup (Backend principal)
│   ├── EstudaZen.HttpApi.Client/      # Cliente HTTP (opcional)
│   └── EstudaZen.DbMigrator/          # Console app para executar migrations
├── test/
│   ├── EstudaZen.Domain.Tests/
│   ├── EstudaZen.Application.Tests/
│   ├── EstudaZen.EntityFrameworkCore.Tests/
│   └── EstudaZen.TestBase/
├── angular/                            # Aplicação Angular
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   └── environments/
│   ├── package.json
│   └── angular.json
├── docker-compose.yml                  # Infraestrutura (PostgreSQL, MinIO)
├── DOCKER.md                          # Documentação do Docker
└── README.md                          # Este arquivo
```

### 📦 Camadas da Aplicação

#### **Domain Layer** (`EstudaZen.Domain`)
- Entidades de negócio e Aggregate Roots
- Interfaces de repositórios
- Domain Services
- Domain Events
- ⚠️ **SEM** dependências de infraestrutura

#### **Application Layer** (`EstudaZen.Application`)
- Application Services (orquestração)
- DTOs (Data Transfer Objects)
- AutoMapper Profiles
- Validações de negócio

#### **Infrastructure Layer** (`EstudaZen.EntityFrameworkCore`)
- DbContext e Configurações EF Core
- Implementações de Repositórios
- Migrations
- Acesso a dados

#### **Presentation Layer** (`EstudaZen.HttpApi.Host` + `angular`)
- Controllers REST API
- Swagger/OpenAPI
- Angular SPA
- Authentication/Authorization

## 🔧 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **[.NET 10.0 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)** ou superior
- **[Node.js 18 ou 20](https://nodejs.org/)** (para o frontend Angular)
- **[Docker Desktop](https://www.docker.com/products/docker-desktop)** (para infraestrutura)
- **[ABP CLI](https://docs.abp.io/en/abp/latest/CLI)** (opcional, para comandos do ABP)

### Instalação do ABP CLI (Opcional)

```bash
dotnet tool install -g Volo.Abp.Cli
abp --version
```

## 🐳 Infraestrutura com Docker

### Serviços Disponíveis

O projeto utiliza Docker Compose para gerenciar os serviços necessários:

| Serviço | Porta | Descrição |
|---------|-------|-----------|
| PostgreSQL | 5432 | Banco de dados principal |
| MinIO API | 9000 | API de armazenamento de objetos |
| MinIO Console | 9001 | Interface web do MinIO |

### Credenciais Padrão

#### PostgreSQL
- **Host**: localhost
- **Port**: 5432
- **Database**: EstudaZen
- **User**: root
- **Password**: myPassword

#### MinIO
- **Console**: http://localhost:9001
- **Username**: minioadmin
- **Password**: minioadmin123
- **Bucket**: estudazen-media

### Iniciar Infraestrutura

```bash
# Na pasta raiz do projeto EstudaZen/
cd EstudaZen

# Iniciar todos os serviços
docker-compose up -d

# Verificar status dos containers
docker-compose ps

# Ver logs
docker-compose logs -f

# Parar todos os serviços
docker-compose down

# Parar e remover volumes (reset completo do banco)
docker-compose down -v
```

> 📖 Para mais detalhes sobre Docker, consulte [DOCKER.md](EstudaZen/DOCKER.md)

## ⚙️ Configuração Inicial

### 1. Restaurar Pacotes

```bash
# Navegar para a pasta do projeto
cd EstudaZen

# Restaurar pacotes .NET
dotnet restore

# Instalar dependências do Angular
cd angular
npm install
# ou
yarn install
```

### 2. Configurar Connection String

Verifique se a connection string está correta nos arquivos de configuração:

#### `src/EstudaZen.DbMigrator/appsettings.json`
```json
{
  "ConnectionStrings": {
    "Default": "Host=localhost;Port=5432;Database=EstudaZen;User ID=root;Password=myPassword;"
  }
}
```

#### `src/EstudaZen.HttpApi.Host/appsettings.json`
```json
{
  "ConnectionStrings": {
    "Default": "Host=localhost;Port=5432;Database=EstudaZen;User ID=root;Password=myPassword;"
  },
  "App": {
    "CorsOrigins": "http://localhost:4200"
  }
}
```

### 3. Executar Migrations (Criar Banco de Dados)

```bash
# Navegar para o DbMigrator
cd src/EstudaZen.DbMigrator

# Executar migrations e seeds
dotnet run
```

Este comando irá:
- ✅ Criar o banco de dados `EstudaZen`
- ✅ Aplicar todas as migrations (criar tabelas)
- ✅ Executar seeds de dados iniciais
- ✅ Criar usuário admin padrão

#### Credenciais do Admin Padrão
- **Username**: `admin`
- **Password**: `1q2w3E*`

### 4. Gerar Certificado de Assinatura (Produção)

Para ambiente de produção, gere um certificado OpenIddict:

```bash
dotnet dev-certs https -v -ep openiddict.pfx -p 7a4979bb-93a4-4558-a79c-37a770212923
```

> Você pode alterar a senha `7a4979bb-93a4-4558-a79c-37a770212923` conforme necessário.

## 🚀 Como Rodar o Projeto

### Opção 1: Executar Backend e Frontend Separadamente

#### Backend (.NET API)

```bash
# Navegar para o projeto HttpApi.Host
cd src/EstudaZen.HttpApi.Host

# Executar a API
dotnet run
```

A API estará disponível em:
- **HTTPS**: https://localhost:44333
- **HTTP**: http://localhost:5010
- **Swagger**: https://localhost:44333/swagger

#### Frontend (Angular)

```bash
# Em outro terminal, navegar para a pasta angular
cd angular

# Executar o servidor de desenvolvimento
npm start
# ou
ng serve
```

A aplicação Angular estará disponível em:
- **URL**: http://localhost:4200

### Opção 2: Executar Tudo com um Comando

```bash
# Na raiz do projeto EstudaZen/
# Iniciar infraestrutura
docker-compose up -d

# Executar backend (em um terminal)
cd src/EstudaZen.HttpApi.Host && dotnet run

# Executar frontend (em outro terminal)
cd angular && npm start
```

## 🔐 Autenticação e Autorização

O projeto utiliza **OpenIddict** (OAuth 2.0 / OpenID Connect) para autenticação.

### Fluxo de Login
1. Usuário acessa a aplicação Angular
2. Angular redireciona para o endpoint de autenticação da API
3. Após login bem-sucedido, recebe um token JWT
4. Token é usado em todas as requisições subsequentes

### Permissões e Roles
O ABP Framework fornece um sistema robusto de permissões:
- **Admin**: Acesso completo ao sistema
- **User**: Usuário padrão com permissões limitadas
- Permissões customizadas podem ser definidas no código

## 🧪 Testes

```bash
# Executar todos os testes
dotnet test

# Executar testes de um projeto específico
dotnet test test/EstudaZen.Domain.Tests

# Executar testes do frontend
cd angular
npm test
```

## 📝 Build de Produção

### Backend

```bash
# Build em modo Release
dotnet build --configuration Release

# Publicar
dotnet publish --configuration Release -o ./publish
```

### Frontend

```bash
cd angular

# Build de produção
npm run build:prod

# Arquivos estarão em: angular/dist/
```

## 🌐 Deploy

Para informações sobre deploy em produção:
- **Azure**: [ABP Azure Deployment Guide](https://abp.io/docs/latest/Deployment/Index)
- **Docker**: Dockerfile já incluído no projeto
- **Kubernetes**: Configuração disponível com ABP Studio

## 📚 Recursos Adicionais

### Documentação Oficial
- **[ABP Framework](https://abp.io/docs/latest)** - Documentação completa do ABP
- **[ABP Angular UI](https://abp.io/docs/latest/UI/Angular/Quick-Start)** - Guia Angular
- **[ABP Samples](https://github.com/abpframework/abp-samples)** - Exemplos de código
- **[ABP Community](https://abp.io/community)** - Comunidade e suporte

### Tutoriais
- **[Book Store Tutorial](https://abp.io/docs/latest/tutorials/book-store/part-1)** - Tutorial completo do ABP
- **[Domain-Driven Design](https://abp.io/docs/latest/Domain-Driven-Design)** - Guia de DDD com ABP

### Ferramentas Úteis
- **[ABP Studio](https://abp.io/studio)** - IDE dedicada para ABP
- **[ABP Suite](https://abp.io/docs/latest/abp-suite/index)** - Gerador de CRUD (versão comercial)

## 🔒 Segurança

- ✅ Autenticação OAuth 2.0 / OpenID Connect
- ✅ Tokens JWT para APIs
- ✅ CORS configurado
- ✅ HTTPS habilitado por padrão
- ✅ Password hashing com Identity
- ✅ Protection contra CSRF
- ✅ Audit logging automático

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado e proprietário.

## 👥 Time de Desenvolvimento

- **Desenvolvedor**: Alexsandro Cruz
- **Framework**: ABP Framework 10.0.1
- **Data de Criação**: Dezembro 2024

## 📞 Suporte

Para dúvidas ou suporte:
- Consulte a [documentação do ABP](https://abp.io/docs/latest)
- Acesse a [Base de Conhecimento](ABP_PROJECT_KNOWLEDGE_BASE.md) do projeto
- Entre em contato com o time de desenvolvimento

---

**EducaZen** - Educação com Zen e Tecnologia 🧘‍♂️📚

