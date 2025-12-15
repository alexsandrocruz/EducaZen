using EstudaZen.Samples;
using Xunit;

namespace EstudaZen.EntityFrameworkCore.Applications;

[Collection(EstudaZenTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<EstudaZenEntityFrameworkCoreTestModule>
{

}
