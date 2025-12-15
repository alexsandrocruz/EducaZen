using Volo.Abp.Modularity;

namespace EstudaZen;

/* Inherit from this class for your domain layer tests. */
public abstract class EstudaZenDomainTestBase<TStartupModule> : EstudaZenTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
