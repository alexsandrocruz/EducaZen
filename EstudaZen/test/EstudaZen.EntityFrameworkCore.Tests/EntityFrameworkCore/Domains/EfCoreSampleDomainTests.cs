using EstudaZen.Samples;
using Xunit;

namespace EstudaZen.EntityFrameworkCore.Domains;

[Collection(EstudaZenTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<EstudaZenEntityFrameworkCoreTestModule>
{

}
