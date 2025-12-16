using Riok.Mapperly.Abstractions;
using EstudaZen.Classes;

namespace EstudaZen.Classes;

[Mapper]
public partial class ClassMapper
{
    public partial ClassDto Map(Class source);
    public partial void Map(CreateClassDto source, Class target);
    public partial void Map(UpdateClassDto source, Class target);
}
