using Riok.Mapperly.Abstractions;
using Volo.Abp.Mapperly;

namespace EstudaZen.Students;

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.Target)]
public partial class StudentMapper : MapperBase<Student, StudentDto>
{
    public override partial StudentDto Map(Student source);
    public override partial void Map(Student source, StudentDto destination);
    

}
