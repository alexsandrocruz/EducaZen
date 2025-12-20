using Riok.Mapperly.Abstractions;
using Volo.Abp.Mapperly;

namespace EstudaZen.Subjects;

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.Target)]
public partial class SubjectMapper : MapperBase<Subject, SubjectDto>
{
    public override partial SubjectDto Map(Subject source);
    public override partial void Map(Subject source, SubjectDto destination);
}

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.Target)]
public partial class CreateUpdateSubjectDtoSubjectMapper : MapperBase<CreateUpdateSubjectDto, Subject>
{
    public override partial Subject Map(CreateUpdateSubjectDto source);
    public override partial void Map(CreateUpdateSubjectDto source, Subject destination);
}
