# 📚 Base de Conhecimento ABP.io - Guia Definitivo

> **Criado a partir da experiência com o projeto ZenDoctor**  
> **Data:** Dezembro 2024  
> **Versão:** 1.0

Este documento consolida todo o conhecimento adquirido ao criar o projeto **ZenDoctor** usando **ABP.io Framework 8.0** com **.NET 8**, servindo como guia de referência para futuros projetos.

---

## 📑 Índice

1. [Visão Geral do ABP.io](#1-visão-geral-do-abpio)
2. [Setup Inicial do Projeto](#2-setup-inicial-do-projeto)
3. [Estrutura do Projeto](#3-estrutura-do-projeto)
4. [Configuração de Infraestrutura](#4-configuração-de-infraestrutura)
5. [Domain-Driven Design (DDD)](#5-domain-driven-design-ddd)
6. [Entity Framework Core](#6-entity-framework-core)
7. [Application Layer](#7-application-layer)
8. [API e Controllers](#8-api-e-controllers)
9. [Frontend Integration](#9-frontend-integration)
10. [Boas Práticas](#10-boas-práticas)
11. [Troubleshooting](#11-troubleshooting)
12. [Checklist de Projeto](#12-checklist-de-projeto)

---

## 1. Visão Geral do ABP.io

### O que é ABP.io?

**ABP Framework** é um framework open-source para criar aplicações .NET modernas, modulares e escaláveis, baseado em **Domain-Driven Design (DDD)**.

### Principais Vantagens

✅ **Arquitetura DDD** - Camadas bem definidas (Domain, Application, Infrastructure)  
✅ **Multi-tenancy** - Suporte nativo para SaaS  
✅ **Modular** - Reutilização de módulos entre projetos  
✅ **Authentication/Authorization** - IdentityServer/OpenIddict integrado  
✅ **CRUD Automático** - Geração de CRUD básico via CLI  
✅ **Audit Logging** - Rastreamento automático de mudanças  
✅ **Localization** - Suporte multi-idioma built-in  
✅ **Unit of Work** - Gerenciamento de transações  
✅ **Event Bus** - Comunicação entre módulos  

### Quando Usar ABP.io

✅ Aplicações empresariais complexas  
✅ Projetos SaaS multi-tenant  
✅ APIs escaláveis e modulares  
✅ Aplicações que seguem DDD  
✅ Quando você precisa de auth/authz robusto  

❌ Evite para: MVPs muito simples, aplicações CRUD triviais

---

## 2. Setup Inicial do Projeto

### 2.1 Pré-requisitos

Antes de começar, instale:

```bash
# 1. .NET 8.0 SDK
# Download: https://dotnet.microsoft.com/download/dotnet/8.0
dotnet --version  # Deve mostrar 8.0.x

# 2. Node.js 20+ (para frontend)
node --version  # Deve mostrar v20.x ou superior

# 3. Docker Desktop (para infraestrutura)
docker --version

# 4. ABP CLI
dotnet tool install -g Volo.Abp.Cli

# Verificar instalação
abp --version  # Deve mostrar 8.0.x
```

### 2.2 Criar Novo Projeto ABP.io

#### Comando Base (Template Completo)

```bash
abp new <NomeDoProjeto> \
  -t app \
  -u mvc \
  --mobile none \
  --database-provider ef \
  -csf \
  --version 8.0.0
```

#### Explicação dos Parâmetros

| Parâmetro | Valor | Descrição |
|-----------|-------|-----------|
| `-t` | `app` | Template de aplicação completa (com todas as camadas DDD) |
| `-u` | `mvc` | UI type (mvc, angular, react, blazor) |
| `--mobile` | `none` | Sem projeto mobile (pode usar `react-native` ou `maui`) |
| `--database-provider` | `ef` | Entity Framework Core (ou `mongodb`) |
| `-csf` | - | Create Solution Folders (organização em pastas) |
| `--version` | `8.0.0` | Versão do ABP Framework |

#### Exemplo Real (ZenDoctor)

```bash
cd /Users/alexsandrocruz/Documents/dev/ERPZen/abp/

abp new ZenDoctor \
  -t app \
  -u mvc \
  --mobile none \
  --database-provider ef \
  -csf \
  --version 8.0.0

cd ZenDoctor
```

### 2.3 Primeiro Build

```bash
# Restaurar pacotes NuGet
dotnet restore

# Build completo
dotnet build

# Se houver erros, tente:
dotnet clean
dotnet restore
dotnet build
```

### 2.4 Estrutura Gerada

Após executar `abp new`, você terá:

```
ZenDoctor/
├── src/
│   ├── ZenDoctor.Domain/              # Entidades, Aggregates, Domain Services
│   ├── ZenDoctor.Domain.Shared/       # Enums, Constants (compartilhados)
│   ├── ZenDoctor.Application/         # Application Services
│   ├── ZenDoctor.Application.Contracts/ # Interfaces, DTOs
│   ├── ZenDoctor.EntityFrameworkCore/ # DbContext, Repositories, Migrations
│   ├── ZenDoctor.HttpApi/             # Controllers
│   ├── ZenDoctor.HttpApi.Host/        # API Startup (Backend principal)
│   ├── ZenDoctor.HttpApi.Client/      # Cliente HTTP (opcional)
│   ├── ZenDoctor.Web/                 # MVC UI (se -u mvc)
│   └── ZenDoctor.DbMigrator/          # Console app para executar migrations
├── test/
│   ├── ZenDoctor.Domain.Tests/
│   ├── ZenDoctor.Application.Tests/
│   ├── ZenDoctor.EntityFrameworkCore.Tests/
│   └── ZenDoctor.HttpApi.Tests/
├── ZenDoctor.sln
└── README.md
```

---

## 3. Estrutura do Projeto

### 3.1 Camadas do ABP (DDD)

```
┌──────────────────────────────────────┐
│   Presentation Layer                 │
│   (HttpApi.Host, Web, Mobile)        │
└──────────────────────────────────────┘
              ↓
┌──────────────────────────────────────┐
│   Application Layer                  │
│   (Application Services, DTOs)       │
└──────────────────────────────────────┘
              ↓
┌──────────────────────────────────────┐
│   Domain Layer                       │
│   (Entities, Domain Services)        │
└──────────────────────────────────────┘
              ↓
┌──────────────────────────────────────┐
│   Infrastructure Layer               │
│   (EF Core, Repositories)            │
└──────────────────────────────────────┘
```

### 3.2 Responsabilidades de Cada Camada

#### **Domain Layer** (`ZenDoctor.Domain`)

**O que vai aqui:**
- ✅ Entidades (`Entity<TKey>`)
- ✅ Aggregates Roots (`AggregateRoot<TKey>`)
- ✅ Value Objects
- ✅ Domain Services (lógica de negócio complexa)
- ✅ Repository Interfaces (contratos)
- ✅ Domain Events

**O que NÃO vai aqui:**
- ❌ DTOs
- ❌ Implementação de Repositories
- ❌ Referências a EF Core ou banco de dados
- ❌ HTTP Controllers

**Exemplo:**
```csharp
// ZenDoctor.Domain/Medicos/Medico.cs
public class Medico : FullAuditedAggregateRoot<Guid>
{
    public string Nome { get; set; }
    public string CRM { get; set; }
    public string? RQE { get; set; }
    public bool Ativo { get; set; }
    
    public ICollection<LocalAtendimento> LocaisAtendimento { get; set; }
    public ICollection<Especializacao> Especializacoes { get; set; }
}
```

#### **Domain.Shared** (`ZenDoctor.Domain.Shared`)

**O que vai aqui:**
- ✅ Enums compartilhados
- ✅ Constants
- ✅ Consts de Permissions
- ✅ Consts de Localization keys

**Exemplo:**
```csharp
// ZenDoctor.Domain.Shared/Contatos/TipoContato.cs
public enum TipoContato
{
    Telefone = 1,
    WhatsApp = 2,
    Email = 3,
    Instagram = 4,
    Site = 5
}
```

#### **Application Layer** (`ZenDoctor.Application`)

**O que vai aqui:**
- ✅ Application Services (orquestram Domain Services)
- ✅ AutoMapper Profiles (Entity → DTO)
- ✅ Business logic que não pertence ao Domain

**Exemplo:**
```csharp
// ZenDoctor.Application/Medicos/MedicoAppService.cs
public class MedicoAppService : ApplicationService, IMedicoAppService
{
    private readonly IMedicoRepository _medicoRepository;
    
    public async Task<MedicoDto> GetAsync(Guid id)
    {
        var medico = await _medicoRepository.GetAsync(id);
        return ObjectMapper.Map<Medico, MedicoDto>(medico);
    }
}
```

#### **Application.Contracts** (`ZenDoctor.Application.Contracts`)

**O que vai aqui:**
- ✅ DTOs (Data Transfer Objects)
- ✅ Interfaces de Application Services
- ✅ Input/Output models

**Exemplo:**
```csharp
// ZenDoctor.Application.Contracts/Medicos/MedicoDto.cs
public class MedicoDto : EntityDto<Guid>
{
    public string Nome { get; set; }
    public string CRM { get; set; }
    public string? RQE { get; set; }
}

// ZenDoctor.Application.Contracts/Medicos/IMedicoAppService.cs
public interface IMedicoAppService : IApplicationService
{
    Task<MedicoDto> GetAsync(Guid id);
    Task<PagedResultDto<MedicoDto>> GetListAsync(PagedAndSortedResultRequestDto input);
}
```

#### **EntityFrameworkCore** (`ZenDoctor.EntityFrameworkCore`)

**O que vai aqui:**
- ✅ DbContext
- ✅ Entity Configurations (Fluent API)
- ✅ Repository Implementations
- ✅ Migrations

**Exemplo:**
```csharp
// ZenDoctor.EntityFrameworkCore/ZenDoctorDbContext.cs
public class ZenDoctorDbContext : AbpDbContext<ZenDoctorDbContext>
{
    public DbSet<Medico> Medicos { get; set; }
    public DbSet<LocalAtendimento> LocaisAtendimento { get; set; }
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ConfigureZenDoctor();
    }
}
```

#### **HttpApi** (`ZenDoctor.HttpApi`)

**O que vai aqui:**
- ✅ Controllers (apenas roteamento)
- ✅ Configuração de Swagger

**Exemplo:**
```csharp
// ZenDoctor.HttpApi/Controllers/MedicoController.cs
[Route("api/medicos")]
public class MedicoController : ZenDoctorController
{
    private readonly IMedicoAppService _medicoAppService;
    
    [HttpGet("{id}")]
    public Task<MedicoDto> GetAsync(Guid id)
    {
        return _medicoAppService.GetAsync(id);
    }
}
```

#### **HttpApi.Host** (`ZenDoctor.HttpApi.Host`)

**O que vai aqui:**
- ✅ Startup.cs / Program.cs
- ✅ appsettings.json (configurações)
- ✅ Configuração de CORS
- ✅ Middleware setup

---

## 4. Configuração de Infraestrutura

### 4.1 Docker Compose (PostgreSQL, Redis, MinIO)

Crie um arquivo `docker-compose.yml` na raiz do projeto:

```yaml
services:
  # PostgreSQL Database
  postgres:
    image: postgres:16-alpine
    container_name: zendoctor-postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: MySecure123
      POSTGRES_DB: ZenDoctor
    ports:
      - "5433:5432"  # Evite conflito com PostgreSQL local
    volumes:
      - postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - zendoctor-network

  # Redis Cache
  redis:
    image: redis:7-alpine
    container_name: zendoctor-redis
    ports:
      - "6380:6379"  # Evite conflito com Redis local
    volumes:
      - redis-data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - zendoctor-network

  # MinIO (S3-compatible storage)
  minio:
    image: minio/minio:latest
    container_name: zendoctor-minio
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin123
    ports:
      - "9010:9000"  # API
      - "9011:9001"  # Console UI
    volumes:
      - minio-data:/data
    command: server /data --console-address ":9001"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
      interval: 30s
      timeout: 20s
      retries: 3
    networks:
      - zendoctor-network

  # MinIO Client - Create bucket on startup
  minio-createbucket:
    image: minio/mc:latest
    container_name: zendoctor-minio-setup
    depends_on:
      minio:
        condition: service_healthy
    entrypoint: >
      /bin/sh -c "
      /usr/bin/mc alias set myminio http://minio:9000 minioadmin minioadmin123;
      /usr/bin/mc mb myminio/zendoctor-medicos-fotos --ignore-existing;
      /usr/bin/mc anonymous set download myminio/zendoctor-medicos-fotos;
      exit 0;
      "
    networks:
      - zendoctor-network

  # pgAdmin (opcional - interface para PostgreSQL)
  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: zendoctor-pgadmin
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@zendoctor.com
      PGADMIN_DEFAULT_PASSWORD: admin123
      PGADMIN_CONFIG_SERVER_MODE: 'False'
    ports:
      - "5050:80"
    depends_on:
      - postgres
    networks:
      - zendoctor-network
    profiles:
      - tools

volumes:
  postgres-data:
    driver: local
  redis-data:
    driver: local
  minio-data:
    driver: local

networks:
  zendoctor-network:
    driver: bridge
```

### 4.2 Iniciar Infraestrutura

```bash
# Subir todos os serviços
docker-compose up -d

# Verificar status
docker-compose ps

# Ver logs
docker-compose logs -f postgres

# Parar tudo
docker-compose down

# Parar e remover volumes (reset completo)
docker-compose down -v

# Subir com pgAdmin (profile tools)
docker-compose --profile tools up -d
```

### 4.3 Configurar Connection String

#### Em `src/ZenDoctor.DbMigrator/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "Default": "Host=localhost;Port=5433;Database=ZenDoctor;User Id=postgres;Password=MySecure123;"
  }
}
```

#### Em `src/ZenDoctor.HttpApi.Host/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "Default": "Host=localhost;Port=5433;Database=ZenDoctor;User Id=postgres;Password=MySecure123;"
  },
  "Redis": {
    "Configuration": "localhost:6380"
  }
}
```

### 4.4 Executar Migrations

```bash
# Navegar para o DbMigrator
cd src/ZenDoctor.DbMigrator

# Executar migrations (cria as tabelas)
dotnet run

# Você verá:
# - Criação das tabelas do ABP (Users, Roles, Permissions, Tenants, etc.)
# - Seeds iniciais (usuário admin)
```

**Credenciais padrão:**
- **Username:** `admin`
- **Password:** `1q2w3E*`

### 4.5 Iniciar Backend API

```bash
cd ../ZenDoctor.HttpApi.Host
dotnet run
```

Acesse:
- **API:** https://localhost:44300
- **Swagger UI:** https://localhost:44300/swagger

---

## 5. Domain-Driven Design (DDD)

### 5.1 Conceitos Fundamentais

#### **Entity** (Entidade)

Objeto com **identidade única** (ID).

```csharp
public class LocalAtendimento : Entity<Guid>
{
    public Guid MedicoId { get; set; }
    public string Endereco { get; set; }
    public string Bairro { get; set; }
    
    // Navigation property
    public Medico Medico { get; set; }
}
```

Base classes do ABP:
- `Entity<TKey>` - Entidade simples
- `AuditedEntity<TKey>` - Adiciona CreationTime, CreatorId
- `FullAuditedEntity<TKey>` - Adiciona LastModificationTime, DeletionTime (soft delete)

#### **Aggregate Root** (Raiz de Agregado)

Entidade que **controla acesso** a um cluster de entidades relacionadas.

```csharp
public class Medico : FullAuditedAggregateRoot<Guid>
{
    public string Nome { get; set; }
    public string CRM { get; set; }
    
    // Relacionamentos (propriedades de navegação)
    public ICollection<LocalAtendimento> LocaisAtendimento { get; set; }
    public ICollection<Contato> Contatos { get; set; }
}
```

**Regras:**
- ✅ Sempre acesse entidades filhas através do Aggregate Root
- ✅ Mudanças em entidades filhas devem passar pelo Aggregate Root
- ✅ Use repositories apenas para Aggregate Roots

#### **Value Object** (Objeto de Valor)

Objeto sem identidade, definido apenas por suas propriedades.

```csharp
public class Endereco : ValueObject
{
    public string Rua { get; set; }
    public string Numero { get; set; }
    public string Cidade { get; set; }
    
    protected override IEnumerable<object> GetAtomicValues()
    {
        yield return Rua;
        yield return Numero;
        yield return Cidade;
    }
}
```

#### **Repository** (Repositório)

Abstração para acesso a dados.

```csharp
// Interface (em Domain)
public interface IMedicoRepository : IRepository<Medico, Guid>
{
    Task<List<Medico>> GetMedicosByBairroAsync(string bairro);
}

// Implementação (em EntityFrameworkCore)
public class MedicoRepository : EfCoreRepository<ZenDoctorDbContext, Medico, Guid>, IMedicoRepository
{
    public MedicoRepository(IDbContextProvider<ZenDoctorDbContext> dbContextProvider) 
        : base(dbContextProvider)
    {
    }
    
    public async Task<List<Medico>> GetMedicosByBairroAsync(string bairro)
    {
        var dbSet = await GetDbSetAsync();
        return await dbSet
            .Include(m => m.LocaisAtendimento)
            .Where(m => m.LocaisAtendimento.Any(l => l.Bairro == bairro))
            .ToListAsync();
    }
}
```

### 5.2 Exemplo Completo: Entidade Medico

```csharp
// ZenDoctor.Domain/Medicos/Medico.cs
public class Medico : FullAuditedAggregateRoot<Guid>
{
    // Propriedades básicas
    public string Nome { get; set; }
    public string CRM { get; set; }
    public string? RQE { get; set; }
    public string MiniCurriculo { get; set; }
    public string? UrlFoto { get; set; }
    public bool Ativo { get; set; }
    
    // Relacionamentos (1-para-N)
    public ICollection<LocalAtendimento> LocaisAtendimento { get; set; }
    public ICollection<Contato> Contatos { get; set; }
    public ICollection<Especializacao> Especializacoes { get; set; }
    
    // Construtor privado (EF Core precisa)
    private Medico()
    {
        LocaisAtendimento = new List<LocalAtendimento>();
        Contatos = new List<Contato>();
        Especializacoes = new List<Especializacao>();
    }
    
    // Factory method (DDD pattern)
    public static Medico Create(string nome, string crm, string miniCurriculo)
    {
        var medico = new Medico
        {
            Id = Guid.NewGuid(),
            Nome = nome,
            CRM = crm,
            MiniCurriculo = miniCurriculo,
            Ativo = true
        };
        
        return medico;
    }
    
    // Business logic
    public void AdicionarLocal(string endereco, string bairro, string cidade)
    {
        var local = new LocalAtendimento
        {
            Id = Guid.NewGuid(),
            MedicoId = Id,
            Endereco = endereco,
            Bairro = bairro,
            Cidade = cidade,
            Estado = "SE"
        };
        
        LocaisAtendimento.Add(local);
    }
}
```

---

## 6. Entity Framework Core

### 6.1 DbContext Configuration

```csharp
// ZenDoctor.EntityFrameworkCore/ZenDoctorDbContext.cs
public class ZenDoctorDbContext : AbpDbContext<ZenDoctorDbContext>
{
    public DbSet<Medico> Medicos { get; set; }
    public DbSet<LocalAtendimento> LocaisAtendimento { get; set; }
    public DbSet<Contato> Contatos { get; set; }
    public DbSet<Especializacao> Especializacoes { get; set; }
    
    public ZenDoctorDbContext(DbContextOptions<ZenDoctorDbContext> options)
        : base(options)
    {
    }
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        
        // Aplicar configurações
        builder.ConfigureZenDoctor();
    }
}
```

### 6.2 Entity Configurations (Fluent API)

```csharp
// ZenDoctor.EntityFrameworkCore/EntityConfigurations/MedicoConfiguration.cs
public static class ZenDoctorDbContextModelCreatingExtensions
{
    public static void ConfigureZenDoctor(this ModelBuilder builder)
    {
        Check.NotNull(builder, nameof(builder));
        
        // Medico
        builder.Entity<Medico>(b =>
        {
            b.ToTable("Medicos");
            b.ConfigureByConvention(); // ABP base config
            
            b.Property(m => m.Nome)
                .IsRequired()
                .HasMaxLength(200);
            
            b.Property(m => m.CRM)
                .IsRequired()
                .HasMaxLength(20);
            
            b.Property(m => m.RQE)
                .HasMaxLength(20);
            
            b.Property(m => m.MiniCurriculo)
                .IsRequired()
                .HasMaxLength(2000);
            
            b.HasIndex(m => m.CRM).IsUnique();
            
            // Relacionamentos
            b.HasMany(m => m.LocaisAtendimento)
                .WithOne(l => l.Medico)
                .HasForeignKey(l => l.MedicoId)
                .OnDelete(DeleteBehavior.Cascade);
        });
        
        // LocalAtendimento
        builder.Entity<LocalAtendimento>(b =>
        {
            b.ToTable("LocaisAtendimento");
            b.ConfigureByConvention();
            
            b.Property(l => l.Endereco).IsRequired().HasMaxLength(300);
            b.Property(l => l.Bairro).IsRequired().HasMaxLength(100);
            b.Property(l => l.Cidade).IsRequired().HasMaxLength(100);
            b.Property(l => l.Estado).IsRequired().HasMaxLength(2);
        });
    }
}
```

### 6.3 Criar Migrations

```bash
# Navegar para o projeto EF Core
cd src/ZenDoctor.EntityFrameworkCore

# Criar migration
dotnet ef migrations add AddMedicoEntities

# Verificar SQL gerado (sem aplicar)
dotnet ef migrations script

# Aplicar migrations (via DbMigrator é melhor)
cd ../ZenDoctor.DbMigrator
dotnet run
```

### 6.4 Seed Data

```csharp
// ZenDoctor.Domain/Medicos/MedicoDataSeedContributor.cs
public class MedicoDataSeedContributor : IDataSeedContributor, ITransientDependency
{
    private readonly IMedicoRepository _medicoRepository;
    
    public MedicoDataSeedContributor(IMedicoRepository medicoRepository)
    {
        _medicoRepository = medicoRepository;
    }
    
    public async Task SeedAsync(DataSeedContext context)
    {
        if (await _medicoRepository.GetCountAsync() > 0)
        {
            return; // Já tem dados
        }
        
        var medico = Medico.Create(
            "Dra. Maria Silva",
            "SE1234",
            "Especialista em dermatologia clínica e estética"
        );
        
        medico.AdicionarLocal("Rua A, 123", "Jardins", "Aracaju");
        
        await _medicoRepository.InsertAsync(medico);
    }
}
```

---

## 7. Application Layer

### 7.1 DTOs (Data Transfer Objects)

```csharp
// ZenDoctor.Application.Contracts/Medicos/MedicoDto.cs
public class MedicoDto : FullAuditedEntityDto<Guid>
{
    public string Nome { get; set; }
    public string CRM { get; set; }
    public string? RQE { get; set; }
    public string MiniCurriculo { get; set; }
    public string? UrlFoto { get; set; }
    public bool Ativo { get; set; }
    
    public List<LocalAtendimentoDto> LocaisAtendimento { get; set; }
    public List<ContatoDto> Contatos { get; set; }
    public List<EspecializacaoDto> Especializacoes { get; set; }
}

// Input DTO para criação
public class CreateMedicoDto
{
    [Required]
    [StringLength(200)]
    public string Nome { get; set; }
    
    [Required]
    [StringLength(20)]
    public string CRM { get; set; }
    
    [StringLength(20)]
    public string? RQE { get; set; }
    
    [Required]
    [StringLength(2000)]
    public string MiniCurriculo { get; set; }
}
```

### 7.2 AutoMapper Configuration

```csharp
// ZenDoctor.Application/ZenDoctorApplicationAutoMapperProfile.cs
public class ZenDoctorApplicationAutoMapperProfile : Profile
{
    public ZenDoctorApplicationAutoMapperProfile()
    {
        CreateMap<Medico, MedicoDto>();
        CreateMap<CreateMedicoDto, Medico>();
        CreateMap<UpdateMedicoDto, Medico>();
        
        CreateMap<LocalAtendimento, LocalAtendimentoDto>();
    }
}
```

### 7.3 Application Service

```csharp
// ZenDoctor.Application.Contracts/Medicos/IMedicoAppService.cs
public interface IMedicoAppService : IApplicationService
{
    Task<MedicoDto> GetAsync(Guid id);
    Task<PagedResultDto<MedicoDto>> GetListAsync(GetMedicoListDto input);
    Task<MedicoDto> CreateAsync(CreateMedicoDto input);
    Task<MedicoDto> UpdateAsync(Guid id, UpdateMedicoDto input);
    Task DeleteAsync(Guid id);
}

// ZenDoctor.Application/Medicos/MedicoAppService.cs
public class MedicoAppService : ApplicationService, IMedicoAppService
{
    private readonly IMedicoRepository _medicoRepository;
    
    public MedicoAppService(IMedicoRepository medicoRepository)
    {
        _medicoRepository = medicoRepository;
    }
    
    public async Task<MedicoDto> GetAsync(Guid id)
    {
        var medico = await _medicoRepository.GetAsync(id, includeDetails: true);
        return ObjectMapper.Map<Medico, MedicoDto>(medico);
    }
    
    public async Task<PagedResultDto<MedicoDto>> GetListAsync(GetMedicoListDto input)
    {
        var queryable = await _medicoRepository.GetQueryableAsync();
        
        // Filtros
        if (!input.Nome.IsNullOrWhiteSpace())
        {
            queryable = queryable.Where(m => m.Nome.Contains(input.Nome));
        }
        
        // Paginação
        var totalCount = await AsyncExecuter.CountAsync(queryable);
        var medicos = await AsyncExecuter.ToListAsync(
            queryable
                .OrderBy(m => m.Nome)
                .Skip(input.SkipCount)
                .Take(input.MaxResultCount)
        );
        
        return new PagedResultDto<MedicoDto>(
            totalCount,
            ObjectMapper.Map<List<Medico>, List<MedicoDto>>(medicos)
        );
    }
    
    public async Task<MedicoDto> CreateAsync(CreateMedicoDto input)
    {
        var medico = Medico.Create(input.Nome, input.CRM, input.MiniCurriculo);
        medico.RQE = input.RQE;
        
        await _medicoRepository.InsertAsync(medico);
        
        return ObjectMapper.Map<Medico, MedicoDto>(medico);
    }
    
    public async Task<MedicoDto> UpdateAsync(Guid id, UpdateMedicoDto input)
    {
        var medico = await _medicoRepository.GetAsync(id);
        
        ObjectMapper.Map(input, medico);
        
        await _medicoRepository.UpdateAsync(medico);
        
        return ObjectMapper.Map<Medico, MedicoDto>(medico);
    }
    
    public async Task DeleteAsync(Guid id)
    {
        await _medicoRepository.DeleteAsync(id);
    }
}
```

---

## 8. API e Controllers

### 8.1 Controller REST

```csharp
// ZenDoctor.HttpApi/Controllers/MedicoController.cs
[Route("api/medicos")]
public class MedicoController : ZenDoctorController
{
    private readonly IMedicoAppService _medicoAppService;
    
    public MedicoController(IMedicoAppService medicoAppService)
    {
        _medicoAppService = medicoAppService;
    }
    
    [HttpGet]
    public Task<PagedResultDto<MedicoDto>> GetListAsync([FromQuery] GetMedicoListDto input)
    {
        return _medicoAppService.GetListAsync(input);
    }
    
    [HttpGet("{id}")]
    public Task<MedicoDto> GetAsync(Guid id)
    {
        return _medicoAppService.GetAsync(id);
    }
    
    [HttpPost]
    public Task<MedicoDto> CreateAsync([FromBody] CreateMedicoDto input)
    {
        return _medicoAppService.CreateAsync(input);
    }
    
    [HttpPut("{id}")]
    public Task<MedicoDto> UpdateAsync(Guid id, [FromBody] UpdateMedicoDto input)
    {
        return _medicoAppService.UpdateAsync(id, input);
    }
    
    [HttpDelete("{id}")]
    public Task DeleteAsync(Guid id)
    {
        return _medicoAppService.DeleteAsync(id);
    }
}
```

### 8.2 Configurar CORS

```csharp
// ZenDoctor.HttpApi.Host/ZenDoctorHttpApiHostModule.cs
public override void ConfigureServices(ServiceConfigurationContext context)
{
    var configuration = context.Services.GetConfiguration();
    
    context.Services.AddCors(options =>
    {
        options.AddDefaultPolicy(builder =>
        {
            builder
                .WithOrigins(
                    configuration["App:CorsOrigins"]
                        .Split(",", StringSplitOptions.RemoveEmptyEntries)
                        .Select(o => o.RemovePostFix("/"))
                        .ToArray()
                )
                .WithAbpExposedHeaders()
                .SetIsOriginAllowedToAllowWildcardSubdomains()
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
    });
}
```

```json
// appsettings.json
{
  "App": {
    "CorsOrigins": "http://localhost:3000,http://localhost:5173"
  }
}
```

### 8.3 Swagger Configuration

Já vem configurado! Acesse: https://localhost:44300/swagger

---

## 9. Frontend Integration

### 9.1 React + TypeScript Setup

```bash
# Na raiz do projeto
npx create-react-app zendoctor-web --template typescript
cd zendoctor-web

# Instalar dependências
npm install axios @tanstack/react-query zustand
npm install -D @types/node
```

### 9.2 API Client

```typescript
// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:44300',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
```

### 9.3 React Query Hook

```typescript
// src/hooks/useMedicos.ts
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

interface Medico {
  id: string;
  nome: string;
  crm: string;
  miniCurriculo: string;
}

export const useMedicos = () => {
  return useQuery({
    queryKey: ['medicos'],
    queryFn: async () => {
      const { data } = await api.get<{ items: Medico[] }>('/api/medicos');
      return data.items;
    },
  });
};
```

### 9.4 Frontend no Projeto ABP

Você pode criar um projeto React dentro da solução ABP:

```bash
# Na pasta ZenDoctor/aspnet-core/
mkdir -p src/ZenDoctor.Web.React
cd src/ZenDoctor.Web.React

npx create-react-app . --template typescript
```

---

## 10. Boas Práticas

### 10.1 Organização de Código

✅ **Siga as camadas DDD** - Não coloque lógica de domínio na Application Layer  
✅ **Use Aggregate Roots** - Sempre acesse entidades relacionadas via Aggregate Root  
✅ **DTOs para tudo** - Nunca exponha entidades diretamente na API  
✅ **AutoMapper** - Mapeie entre Entities e DTOs  
✅ **Async/Await** - Use sempre métodos assíncronos  
✅ **Dependency Injection** - Injete via construtor  

### 10.2 Nomenclatura

```csharp
// ✅ BOM
public class MedicoAppService : ApplicationService, IMedicoAppService
{
    private readonly IMedicoRepository _medicoRepository;
}

public class MedicoDto : EntityDto<Guid>
{
}

// ❌ RUIM
public class MedicoService  // Muito genérico
{
    public MedicoRepository repo;  // Não use public fields
}
```

### 10.3 Exceptions

```csharp
// Use BusinessException do ABP
throw new BusinessException("ZenDoctor:MedicoAlreadyExists")
    .WithData("CRM", input.CRM);

// Configure a mensagem em Localization
// ZenDoctor.Domain.Shared/Localization/ZenDoctor/pt-BR.json
{
  "ZenDoctor:MedicoAlreadyExists": "Já existe um médico com o CRM {0}"
}
```

### 10.4 Permissions

```csharp
// ZenDoctor.Application.Contracts/Permissions/ZenDoctorPermissions.cs
public static class ZenDoctorPermissions
{
    public const string GroupName = "ZenDoctor";
    
    public static class Medicos
    {
        public const string Default = GroupName + ".Medicos";
        public const string Create = Default + ".Create";
        public const string Edit = Default + ".Edit";
        public const string Delete = Default + ".Delete";
    }
}

// Usar no Application Service
[Authorize(ZenDoctorPermissions.Medicos.Create)]
public async Task<MedicoDto> CreateAsync(CreateMedicoDto input)
{
    // ...
}
```

### 10.5 Unit of Work

ABP gerencia automaticamente! Mas você pode controlar:

```csharp
[UnitOfWork]
public async Task MeuMetodoAsync()
{
    // Tudo aqui será em uma transação
}

// Desabilitar Unit of Work
[UnitOfWork(IsDisabled = true)]
public async Task SemTransacaoAsync()
{
}
```

---

## 11. Troubleshooting

### 11.1 Problemas Comuns

#### **Erro: "Connection refused" ao conectar no PostgreSQL**

```bash
# Verifique se o container está rodando
docker ps | grep postgres

# Verifique a porta
docker port zendoctor-postgres

# Reinicie o container
docker-compose restart postgres
```

#### **Erro: "ABP CLI não encontrado"**

```bash
# Verifique se está instalado
dotnet tool list -g

# Reinstale
dotnet tool uninstall -g Volo.Abp.Cli
dotnet tool install -g Volo.Abp.Cli
```

#### **Erro: "Migration já aplicada"**

```bash
# Liste migrations
dotnet ef migrations list

# Remova a última migration
dotnet ef migrations remove

# Ou recriar do zero
docker-compose down -v
docker-compose up -d postgres
cd src/ZenDoctor.DbMigrator
dotnet run
```

#### **Erro: "Porta 44300 já em uso"**

Edite `src/ZenDoctor.HttpApi.Host/Properties/launchSettings.json`:

```json
{
  "profiles": {
    "ZenDoctor.HttpApi.Host": {
      "applicationUrl": "https://localhost:44301"
    }
  }
}
```

### 11.2 Comandos Úteis

```bash
# Limpar e rebuild
dotnet clean
dotnet restore
dotnet build

# Ver logs do Docker
docker-compose logs -f postgres

# Executar comando SQL no PostgreSQL
docker exec -it zendoctor-postgres psql -U postgres -d ZenDoctor -c "SELECT * FROM \"Medicos\";"

# Resetar database
docker-compose down -v
docker-compose up -d
cd src/ZenDoctor.DbMigrator
dotnet run
```

---

## 12. Checklist de Projeto

Use esta checklist ao criar um novo projeto ABP.io:

### 📋 Setup Inicial

- [ ] Instalar .NET 8 SDK
- [ ] Instalar ABP CLI (`dotnet tool install -g Volo.Abp.Cli`)
- [ ] Instalar Docker Desktop
- [ ] Criar projeto com `abp new`
- [ ] Configurar `docker-compose.yml`
- [ ] Executar `docker-compose up -d`

### 📋 Configuração

- [ ] Configurar connection string (DbMigrator e HttpApi.Host)
- [ ] Configurar Redis (se usar cache)
- [ ] Configurar CORS no `appsettings.json`
- [ ] Executar `dotnet restore`
- [ ] Executar `dotnet build`

### 📋 Database

- [ ] Criar migrations (`dotnet ef migrations add Initial`)
- [ ] Executar DbMigrator (`cd src/X.DbMigrator && dotnet run`)
- [ ] Verificar tabelas no PostgreSQL/pgAdmin
- [ ] Criar seeds de dados iniciais

### 📋 Domain Layer

- [ ] Criar entidades no projeto `.Domain`
- [ ] Criar aggregate roots
- [ ] Criar repository interfaces
- [ ] Criar domain services (se necessário)

### 📋 Infrastructure

- [ ] Configurar DbContext
- [ ] Configurar Entity Configurations (Fluent API)
- [ ] Implementar repositories customizados
- [ ] Criar nova migration para suas entidades

### 📋 Application Layer

- [ ] Criar DTOs no projeto `.Application.Contracts`
- [ ] Criar interfaces de Application Services
- [ ] Configurar AutoMapper profiles
- [ ] Implementar Application Services

### 📋 API

- [ ] Criar controllers no projeto `.HttpApi`
- [ ] Configurar rotas
- [ ] Testar endpoints no Swagger
- [ ] Configurar autenticação/autorização

### 📋 Frontend (Opcional)

- [ ] Criar projeto React/Angular/Blazor
- [ ] Configurar API client
- [ ] Implementar componentes
- [ ] Configurar state management

### 📋 Deploy

- [ ] Configurar GitHub Actions / Azure DevOps
- [ ] Publicar em Azure App Service / AWS / Docker
- [ ] Configurar variáveis de ambiente de produção
- [ ] Configurar Application Insights / monitoramento

---

## 📚 Recursos Adicionais

### Documentação Oficial

- **ABP Framework:** https://docs.abp.io/
- **ABP Samples:** https://github.com/abpframework/abp-samples
- **ABP Community:** https://community.abp.io/

### Tutoriais

- **ABP Book Store Tutorial:** https://docs.abp.io/en/abp/latest/Tutorials/Part-1
- **DDD com ABP:** https://docs.abp.io/en/abp/latest/Domain-Driven-Design

### Ferramentas

- **ABP Studio:** https://abp.io/studio (IDE dedicada)
- **ABP Suite:** https://docs.abp.io/en/commercial/latest/abp-suite/index (CRUD generator - pago)

---

## 🎓 Próximos Passos

Com este guia, você está pronto para:

1. ✅ Criar novos projetos ABP.io do zero
2. ✅ Configurar infraestrutura com Docker
3. ✅ Implementar Domain-Driven Design
4. ✅ Criar APIs RESTful escaláveis
5. ✅ Integrar com frontends modernos

**Dica:** Sempre consulte a [documentação oficial do ABP](https://docs.abp.io/) para features avançadas como:
- Multi-tenancy
- Distributed events
- Background jobs
- Microservices
- Module development

---

**Boa sorte com seu próximo projeto!** 🚀

---

**Documento criado a partir da experiência real com o projeto ZenDoctor**  
**Autor:** Alexsandro Cruz  
**Data:** Dezembro 2024  
**Licença:** MIT
