# 📚 EducaZen - Documentação do Projeto

**Plataforma Educacional Completa com Backend ABP.io e Apps Mobile**

---

## 📖 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Tecnologias](#tecnologias)
4. [Estrutura do Projeto](#estrutura-do-projeto)
5. [Como Começar](#como-começar)
6. [Documentação](#documentação)

---

## 🎯 Visão Geral

O **EducaZen** é uma plataforma educacional moderna, separada do ERPZen, focada em:

- **Gestão Escolar Administrativa** (Web Admin)
- **Aplicativo Mobile para Alunos e Pais** (React Native Expo)
- **Backend API Robusto** (.NET 10 + ABP.io Framework)

### Principais Funcionalidades

#### 👨‍💼 Painel Administrativo (Web Angular)
- ✅ Gestão de Alunos, Professores e Funcionários
- ✅ Gerenciamento de Turmas e Matérias
- ✅ Controle de Frequência e Lançamento de Notas
- ✅ Relatórios e Dashboards Gerenciais
- ✅ Comunicação Interna

#### 📱 Aplicativo Mobile (React Native Expo)
- 📊 Dashboard do Aluno
- 📝 Visualização de Notas e Boletins
- 📅 Calendário de Eventos e Provas
- 📚 Material Didático
- 💬 Comunicação com Professores
- 📋 Controle de Presença

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER                        │
├──────────────────────────┬──────────────────────────────┤
│   Angular Admin (Web)    │  React Native Expo (Mobile)  │
│   - Dashboard Admin      │  - Dashboard Aluno           │
│   - Gestão Escolar       │  - Notas/Frequência          │
│   - Relatórios           │  - Comunicação               │
└──────────────────────────┴──────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                   BACKEND API LAYER                      │
│          .NET 10 + ABP.io Framework 10.x                │
├─────────────────────────────────────────────────────────┤
│  ├─ HttpApi.Host (REST API)                             │
│  ├─ Application Layer (Services + DTOs)                 │
│  ├─ Domain Layer (Entities + Business Logic)            │
│  └─ Infrastructure (EF Core + PostgreSQL)               │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                  INFRASTRUCTURE LAYER                    │
├─────────────────────────────────────────────────────────┤
│  PostgreSQL 16  │  MinIO (S3)  │  Redis (Cache)         │
│  (Database)     │  (Storage)   │  (Performance)         │
└─────────────────────────────────────────────────────────┘
                  Docker Compose
```

---

## 🛠️ Tecnologias

### Backend
- **.NET 10** - Framework principal
- **ABP.io Framework 10.x** - Application Framework (DDD)
- **Entity Framework Core** - ORM
- **PostgreSQL 16** - Banco de Dados Principal
- **MinIO** - Object Storage (S3-compatible)
- **Redis** - Cache distribuído
- **OpenIddict** - Autenticação e Autorização

### Frontend Web (Administrativo)
- **Angular 18+** - Framework Web
- **TypeScript** - Linguagem
- **PrimeNG / CoreUI** - Componentes UI
- **RxJS** - Programação Reativa

### Mobile
- **React Native** - Framework Mobile
- **Expo** - Toolchain e SDK
- **TypeScript** - Linguagem
- **React Navigation** - Navegação
- **Async Storage** - Armazenamento Local

### DevOps
- **Docker Compose** - Orquestração de containers
- **GitHub Actions** - CI/CD (futuro)

---

## 📂 Estrutura do Projeto

```
EducaZen/
├── docs/                           # 📚 Documentação centralizada
│   ├── README.md                   # Este arquivo
│   ├── BACKLOG.md                  # Backlog de features
│   ├── STATUS.md                   # Status atual do desenvolvimento
│   ├── architecture/               # Diagramas e docs de arquitetura
│   └── api/                        # Documentação da API
│
├── EstudaZen/                      # 🔧 Backend ABP.io (.NET 10)
│   ├── src/
│   │   ├── EstudaZen.Domain/              # Entidades e Lógica de Negócio
│   │   ├── EstudaZen.Application/         # Services e DTOs
│   │   ├── EstudaZen.EntityFrameworkCore/ # EF Core, Repositories, Migrations
│   │   ├── EstudaZen.HttpApi/             # Controllers
│   │   ├── EstudaZen.HttpApi.Host/        # API Startup (Backend Principal)
│   │   └── EstudaZen.DbMigrator/          # Migrations Runner
│   ├── angular/                           # Frontend Angular Admin
│   ├── test/                              # Testes unitários e integração
│   └── docker-compose.yml                 # PostgreSQL + MinIO
│
├── mobile/                         # 📱 App Mobile (React Native Expo)
│   ├── src/
│   │   ├── screens/               # Telas do app
│   │   ├── components/            # Componentes reutilizáveis
│   │   ├── services/              # API clients
│   │   ├── navigation/            # Configuração de navegação
│   │   └── utils/                 # Utilidades
│   ├── app.json                   # Configuração Expo
│   ├── package.json
│   └── tsconfig.json
│
└── ABP_PROJECT_KNOWLEDGE_BASE.md  # Base de conhecimento ABP.io
```

---

## 🚀 Como Começar

### Pré-requisitos

- [.NET 10 SDK](https://dotnet.microsoft.com/)
- [Node.js 20+](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/)
- [ABP CLI](https://abp.io/docs/latest/cli)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### 1️⃣ Configurar Backend

```bash
# 1. Subir infraestrutura (PostgreSQL + MinIO)
cd EstudaZen
docker-compose up -d

# 2. Executar migrations
cd src/EstudaZen.DbMigrator
dotnet run

# 3. Iniciar API
cd ../EstudaZen.HttpApi.Host
dotnet run

# API estará disponível em: https://localhost:44300
# Swagger: https://localhost:44300/swagger
```

**Credenciais padrão:**
- Username: `admin`
- Password: `1q2w3E*`

### 2️⃣ Configurar Frontend Web (Angular)

```bash
cd EstudaZen/angular
npm install
npm run dev

# Frontend estará disponível em: http://localhost:4200
```

### 3️⃣ Configurar Mobile (React Native Expo)

```bash
cd mobile
npm install
npx expo start

# Escaneie o QR Code com Expo Go no seu dispositivo
```

---

## 📚 Documentação

### Arquitetura e Design
- [Status do Projeto](./STATUS.md) - Estado atual do desenvolvimento
- [Backlog de Features](./BACKLOG.md) - Funcionalidades planejadas
- [Base de Conhecimento ABP.io](../ABP_PROJECT_KNOWLEDGE_BASE.md) - Guia completo ABP.io

### API
- **Swagger UI:** https://localhost:44300/swagger (quando rodando localmente)
- Documentação de endpoints será expandida em `docs/api/`

### Mobile
- Guias de desenvolvimento mobile em desenvolvimento

---

## 🤝 Contribuindo

Este é um projeto privado. Para contribuir:
1. Verifique o [BACKLOG.md](./BACKLOG.md) para tarefas disponíveis
2. Crie uma branch para sua feature
3. Siga os padrões de código do projeto
4. Faça commits semânticos

---

## 📝 Notas

- Este projeto foi **separado do ERPZen** para manter modularidade
- Ambiente de desenvolvimento: **Docker Compose**
- Ambiente de produção: a definir (provavelmente Kubernetes ou cloud native)

---

**Última Atualização:** Dezembro 2024
