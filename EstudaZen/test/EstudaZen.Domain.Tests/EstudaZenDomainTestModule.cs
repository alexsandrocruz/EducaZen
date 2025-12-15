using Volo.Abp.Modularity;

namespace EstudaZen;

[DependsOn(
    typeof(EstudaZenDomainModule),
    typeof(EstudaZenTestBaseModule)
)]
public class EstudaZenDomainTestModule : AbpModule
{

}
