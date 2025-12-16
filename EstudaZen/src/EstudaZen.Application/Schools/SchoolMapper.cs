using Riok.Mapperly.Abstractions;
using Volo.Abp.Mapperly;

namespace EstudaZen.Schools;

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.Target)]
public partial class SchoolMapper : MapperBase<School, SchoolDto>
{
    public override partial SchoolDto Map(School source);
    public override partial void Map(School source, SchoolDto destination);
    public partial void Map(CreateUpdateSchoolDto source, School target);
}
