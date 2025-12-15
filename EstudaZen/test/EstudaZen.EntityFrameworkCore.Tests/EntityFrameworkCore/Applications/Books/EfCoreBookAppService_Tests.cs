using EstudaZen.Books;
using Xunit;

namespace EstudaZen.EntityFrameworkCore.Applications.Books;

[Collection(EstudaZenTestConsts.CollectionDefinitionName)]
public class EfCoreBookAppService_Tests : BookAppService_Tests<EstudaZenEntityFrameworkCoreTestModule>
{

}