using Volo.Abp.Modularity;

namespace EstudaZen;

public abstract class EstudaZenApplicationTestBase<TStartupModule> : EstudaZenTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
