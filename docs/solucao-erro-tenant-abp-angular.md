# Solução: Erro "An error has occurred!" no ABP Angular com Multi-tenancy

## Problema

Ao acessar a aplicação Angular em produção (`educa.zensuite.com.br`), aparecia um modal de erro genérico:
- **Mensagem**: "An error has occurred! Error detail not sent by server."
- **Redirect**: A aplicação redirecionava para `/?httpStatusCode=400`

## Causa Raiz

O problema tinha **duas causas principais**:

### 1. Falta do Tenant "Default" no Banco

O ABP Framework com multi-tenancy habilitado (`MultiTenancyConsts.IsEnabled = true`) precisa de pelo menos um tenant cadastrado. O Angular tentava resolver um tenant chamado "default" via:
```
GET /api/abp/multi-tenancy/tenants/by-id/default
```

Este endpoint espera um **GUID**, não um nome. Por isso retornava **400 Bad Request**.

**Verificação:**
```bash
docker exec -it educazen-postgres psql -U educazen -d EstudaZen -c "SELECT \"Id\", \"Name\" FROM \"AbpTenants\";"
```

Se retornar `(0 rows)`, não há tenants cadastrados.

### 2. Nginx servindo HTML no `/getEnvConfig`

O Angular ABP usa o endpoint `/getEnvConfig` para carregar configurações dinâmicas de ambiente. O Nginx não tinha uma rota específica e servia o fallback `index.html` (HTML) em vez do `dynamic-env.json` (JSON).

**Verificação:**
```bash
curl -s "https://educa.zensuite.com.br/getEnvConfig"
```

Se retornar HTML ao invés de JSON, o Nginx precisa de configuração.

---

## Solução

### Passo 1: Criar Tenant Default (DataSeed)

Criamos `DefaultTenantDataSeedContributor.cs` em `EstudaZen.Domain`:

```csharp
public class DefaultTenantDataSeedContributor : IDataSeedContributor, ITransientDependency
{
    private readonly ITenantRepository _tenantRepository;
    private readonly ITenantManager _tenantManager;

    public async Task SeedAsync(DataSeedContext context)
    {
        if (context.TenantId.HasValue) return; // Só roda no host

        var existingTenants = await _tenantRepository.GetCountAsync();
        if (existingTenants > 0) return; // Já existe tenant

        var defaultTenant = await _tenantManager.CreateAsync("Default");
        await _tenantRepository.InsertAsync(defaultTenant, autoSave: true);
    }
}
```

### Passo 2: Configurar Nginx para `/getEnvConfig`

Adicionamos no `nginx.conf` a rota para servir o arquivo JSON:

```nginx
# Rota para getEnvConfig - serve o dynamic-env.json
location = /getEnvConfig {
    alias /usr/share/nginx/html/dynamic-env.json;
    default_type application/json;
}
```

**Importante:** Esta rota deve vir **antes** do fallback `location /`.

### Passo 3: DbMigrator na Pipeline CI/CD

O `deploy-api.yml` foi atualizado para:
1. Buildar e publicar o DbMigrator
2. Copiar para o servidor
3. Executar **antes** de iniciar a API

```yaml
# Usar caminho completo do dotnet (não está no PATH via SSH)
$HOME/.dotnet/dotnet EstudaZen.DbMigrator.dll
```

### Passo 4: Reset do Banco (se necessário)

Se houver conflito de dados, resetar o banco:

```bash
systemctl stop educazen-api
docker exec -it educazen-postgres psql -U educazen -d postgres -c "DROP DATABASE \"EstudaZen\";"
docker exec -it educazen-postgres psql -U educazen -d postgres -c "CREATE DATABASE \"EstudaZen\" OWNER educazen;"

# Rodar migrator manualmente
cd /opt/educazen/migrator
$HOME/.dotnet/dotnet EstudaZen.DbMigrator.dll

systemctl start educazen-api
```

---

## Verificações Finais

### Verificar Tenant Existe
```bash
docker exec -it educazen-postgres psql -U educazen -d EstudaZen -c "SELECT \"Id\", \"Name\" FROM \"AbpTenants\";"
```
Deve mostrar o tenant "Default".

### Verificar `/getEnvConfig` retorna JSON
```bash
curl -s "https://educa.zensuite.com.br/getEnvConfig"
```
Deve retornar `{}` ou um JSON válido.

### Verificar API está respondendo
```bash
curl -s "https://educa.zensuite.com.br/api/abp/application-configuration" | head -50
```
Deve retornar JSON de configuração.

### Verificar Tenant por Nome
```bash
curl -s "https://educa.zensuite.com.br/api/abp/multi-tenancy/tenants/by-name/Default"
```
Deve retornar `{"success":true, "tenantId":"...", "name":"Default"}`.

---

## Arquivos Modificados

1. `EstudaZen/src/EstudaZen.Domain/DefaultTenantDataSeedContributor.cs` - Seed do tenant
2. `EstudaZen/nginx.conf` - Rota `/getEnvConfig`
3. `.github/workflows/deploy-api.yml` - DbMigrator na pipeline

---

## Data da Resolução

**22 de Dezembro de 2024**
