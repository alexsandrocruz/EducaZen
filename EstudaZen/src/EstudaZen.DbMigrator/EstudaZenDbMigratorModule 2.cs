using EstudaZen.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace EstudaZen.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(EstudaZenEntityFrameworkCoreModule),
    typeof(EstudaZenApplicationContractsModule)
)]
public class EstudaZenDbMigratorModule : AbpModule
{
}
