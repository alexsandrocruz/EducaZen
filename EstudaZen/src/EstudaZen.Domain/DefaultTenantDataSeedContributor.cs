using System;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.TenantManagement;
using Volo.Abp.Guids;

namespace EstudaZen;

/// <summary>
/// Seed contributor that creates a default tenant if none exists.
/// This is important for SaaS applications where at least one tenant should be available.
/// </summary>
public class DefaultTenantDataSeedContributor : IDataSeedContributor, ITransientDependency
{
    private readonly ITenantRepository _tenantRepository;
    private readonly ITenantManager _tenantManager;
    private readonly IGuidGenerator _guidGenerator;

    public DefaultTenantDataSeedContributor(
        ITenantRepository tenantRepository,
        ITenantManager tenantManager,
        IGuidGenerator guidGenerator)
    {
        _tenantRepository = tenantRepository;
        _tenantManager = tenantManager;
        _guidGenerator = guidGenerator;
    }

    public async Task SeedAsync(DataSeedContext context)
    {
        // Only seed if running in host context (not within a tenant)
        if (context.TenantId.HasValue)
        {
            return;
        }

        // Check if any tenants exist
        var existingTenants = await _tenantRepository.GetCountAsync();
        if (existingTenants > 0)
        {
            return; // Tenants already exist, skip seeding
        }

        // Create the default tenant
        var defaultTenant = await _tenantManager.CreateAsync("Default");
        defaultTenant.SetProperty("IsDefaultTenant", true);
        
        await _tenantRepository.InsertAsync(defaultTenant, autoSave: true);
    }
}
