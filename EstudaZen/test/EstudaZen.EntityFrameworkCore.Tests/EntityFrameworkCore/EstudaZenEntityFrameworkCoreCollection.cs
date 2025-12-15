using Xunit;

namespace EstudaZen.EntityFrameworkCore;

[CollectionDefinition(EstudaZenTestConsts.CollectionDefinitionName)]
public class EstudaZenEntityFrameworkCoreCollection : ICollectionFixture<EstudaZenEntityFrameworkCoreFixture>
{

}
