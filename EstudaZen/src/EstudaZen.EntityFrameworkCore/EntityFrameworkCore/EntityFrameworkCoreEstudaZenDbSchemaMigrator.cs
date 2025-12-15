using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using EstudaZen.Data;
using Volo.Abp.DependencyInjection;

namespace EstudaZen.EntityFrameworkCore;

public class EntityFrameworkCoreEstudaZenDbSchemaMigrator
    : IEstudaZenDbSchemaMigrator, ITransientDependency
{
    private readonly IServiceProvider _serviceProvider;

    public EntityFrameworkCoreEstudaZenDbSchemaMigrator(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task MigrateAsync()
    {
        /* We intentionally resolving the EstudaZenDbContext
         * from IServiceProvider (instead of directly injecting it)
         * to properly get the connection string of the current tenant in the
         * current scope.
         */

        await _serviceProvider
            .GetRequiredService<EstudaZenDbContext>()
            .Database
            .MigrateAsync();
    }
}
