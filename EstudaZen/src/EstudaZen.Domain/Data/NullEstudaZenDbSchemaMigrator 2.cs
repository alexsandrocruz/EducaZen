using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace EstudaZen.Data;

/* This is used if database provider does't define
 * IEstudaZenDbSchemaMigrator implementation.
 */
public class NullEstudaZenDbSchemaMigrator : IEstudaZenDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
