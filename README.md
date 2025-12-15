# 🎓 EducaZen - Projeto de Gestão Escolar

**Sistema de Gestão Educacional Completo**

---

## 📖 Sobre o Projeto

O **EducaZen** é uma plataforma educacional moderna separada do ERPZen, desenvolvida com:

- **Backend:** .NET 10 + ABP.io Framework (DDD Architecture)
- **Frontend Web:** Angular 18+ (Painel Administrativo)
- **Mobile:** React Native Expo (App para Alunos)
- **Infraestrutura:** Docker Compose (PostgreSQL, MinIO, Redis)

---

## 📂 Estrutura do Repositório

```
EducaZen/
├── docs/                           # 📚 Documentação completa
│   ├── README.md                   # Visão geral e arquitetura
│   ├── STATUS.md                   # Status do desenvolvimento
│   └── BACKLOG.md                  # Backlog de features
│
├── EstudaZen/                      # 🔧 Backend ABP.io + Frontend Angular
│   ├── src/                        # Código-fonte .NET
│   ├── angular/                    # Frontend Angular Admin
│   ├── test/                       # Testes
│   └── docker-compose.yml          # Infraestrutura
│
├── mobile/                         # 📱 App Mobile (será criado)
│   └── (React Native Expo)
│
└── ABP_PROJECT_KNOWLEDGE_BASE.md   # Guia ABP.io
```

---

## 🚀 Como Começar

### 1️⃣ Backend + Infraestrutura

```bash
# Subir PostgreSQL e MinIO
cd EstudaZen
docker-compose up -d

# Executar migrations
cd src/EstudaZen.DbMigrator
dotnet run

# Iniciar API
cd ../EstudaZen.HttpApi.Host
dotnet run

# API: https://localhost:44300
# Swagger: https://localhost:44300/swagger
```

**Credenciais padrão:**
- Username: `admin`
- Password: `1q2w3E*`

### 2️⃣ Frontend Web (Angular)

```bash
cd EstudaZen/angular
npm install
npm run dev

# Frontend: http://localhost:4200
```

### 3️⃣ Mobile (React Native Expo)

```bash
cd mobile
npm install
npx expo start

# Leia o QR Code com Expo Go
```

---

## 📚 Documentação

Para documentação completa, visite a pasta [`docs/`](./docs/):

- **[Arquitetura e Visão Geral](./docs/README.md)**
- **[Status do Desenvolvimento](./docs/STATUS.md)**
- **[Backlog de Features](./docs/BACKLOG.md)**
- **[Base de Conhecimento ABP.io](./ABP_PROJECT_KNOWLEDGE_BASE.md)**

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────┐
│   Angular Web    │  React Native Expo   │
│   (Admin)        │  (Mobile Aluno)      │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│    .NET 10 API (ABP.io Framework)       │
│    Domain-Driven Design Architecture    │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  PostgreSQL  │  MinIO  │  Redis         │
└─────────────────────────────────────────┘
```

---

## 🎯 Funcionalidades Principais

### 👨‍💼 Painel Administrativo (Web)
- ✅ Gestão de Alunos, Professores e Turmas
- ✅ Lançamento de Notas e Frequência
- ✅ Relatórios e Dashboards
- ✅ Calendário Escolar

### 📱 App Mobile (Aluno)
- 📊 Dashboard com Resumo
- 📝 Consulta de Notas
- 📅 Calendário de Provas
- 📚 Frequência
- 💬 Comunicação com Professores

---

## 🛠️ Tecnologias

- **.NET 10** - Backend Framework
- **ABP.io 10.x** - Application Framework
- **Angular 18+** - Frontend Web
- **React Native Expo** - Mobile
- **PostgreSQL 16** - Banco de Dados
- **MinIO** - Object Storage
- **OpenIddict** - Autenticação

---

## 📦 Módulos Planejados

1. **Alunos** - Cadastro e gestão de alunos
2. **Professores** - Cadastro e gestão de professores
3. **Turmas** - Organização de turmas e grades
4. **Matérias** - Disciplinas e currículos
5. **Avaliações** - Notas e boletins
6. **Frequência** - Controle de presença
7. **Calendário** - Eventos e avisos

---

## 🤝 Contribuindo

Este é um projeto privado em desenvolvimento ativo.

---

## 📝 Status Atual

- **Backend:** 🟡 30% - Estrutura criada, domínios em desenvolvimento
- **Frontend Web:** 🟡 40% - Estrutura base configurada
- **Mobile:** 🔴 0% - Planejamento concluído, implementação pendente
- **Infraestrutura:** 🟢 80% - Docker Compose configurado

Veja [STATUS.md](./docs/STATUS.md) para detalhes completos.

---

**Última Atualização:** 15 de Dezembro de 2024
