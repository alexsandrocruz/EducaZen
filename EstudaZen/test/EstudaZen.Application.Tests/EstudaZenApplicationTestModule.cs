using Volo.Abp.Modularity;

namespace EstudaZen;

[DependsOn(
    typeof(EstudaZenApplicationModule),
    typeof(EstudaZenDomainTestModule)
)]
public class EstudaZenApplicationTestModule : AbpModule
{

}
