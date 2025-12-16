---
description: Como criar um novo módulo CRUD no ABP.io com permissões e seed
---

# Criando Novo Módulo CRUD no ABP.io

> **⚠️ IMPORTANTE: Todas as telas novas DEVEM seguir o padrão do Design System do EducaZen!**
> Veja exemplos em `src/app/admin/students/` ou `src/app/zen-design-system/`

## 1. Backend - Entidade e Repositório
- Criar/verificar entidade em `EstudaZen.Domain/Entities/`
- Criar `IXxxRepository` se necessário

## 2. Backend - Application Contracts
- Criar DTOs em `EstudaZen.Application.Contracts/Xxx/`:
  - `XxxDto.cs`
  - `CreateUpdateXxxDto.cs` 
  - `GetXxxListDto.cs`
- Criar `IXxxAppService.cs`

## 3. Backend - Permissões (OBRIGATÓRIO)
- Adicionar constantes em `EstudaZenPermissions.cs`:
```csharp
public static class Xxx
{
    public const string Default = GroupName + ".Xxx";
    public const string Create = Default + ".Create";
    public const string Edit = Default + ".Edit";
    public const string Delete = Default + ".Delete";
}
```
- Registrar em `EstudaZenPermissionDefinitionProvider.cs`:
```csharp
var xxx = myGroup.AddPermission(EstudaZenPermissions.Xxx.Default, L("Permission:Xxx"));
xxx.AddChild(EstudaZenPermissions.Xxx.Create, L("Permission:Create"));
xxx.AddChild(EstudaZenPermissions.Xxx.Edit, L("Permission:Edit"));
xxx.AddChild(EstudaZenPermissions.Xxx.Delete, L("Permission:Delete"));
```

## 4. Backend - Seed de Permissões para Admin (OBRIGATÓRIO)
- Atualizar `EstudaZenDataSeedContributor.cs` para conceder permissões ao admin:
```csharp
await _permissionDataSeeder.SeedAsync(
    RolePermissionValueProvider.ProviderName,
    "admin",
    new[] {
        EstudaZenPermissions.Xxx.Default,
        EstudaZenPermissions.Xxx.Create,
        EstudaZenPermissions.Xxx.Edit,
        EstudaZenPermissions.Xxx.Delete
    }
);
```

## 5. Backend - Localização
- Adicionar em `pt-BR.json` e `en.json`:
```json
"Permission:Xxx": "Gerenciar Xxx",
"Menu:Xxx": "Xxx"
```

## 6. Backend - Application Service
- Criar `XxxMapper.cs` usando Riok.Mapperly
- Criar `XxxAppService.cs` com CRUD

## 7. Frontend - Proxies e Componentes
// turbo
- Executar `abp generate-proxy -t ng` na pasta `/angular`
- Criar componentes Standalone em `src/app/admin/xxx/`:
  - `xxx-list/xxx-list.component.ts` (standalone: true)
  - `xxx-form/xxx-form.component.ts` (standalone: true)
- Adicionar rota em `admin-routing-module.ts`
- Adicionar menu em `route.provider.ts` com `requiredPolicy`

## 8. Verificação
// turbo
- `dotnet build` no backend
- `npm run build` no frontend
