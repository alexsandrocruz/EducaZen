using Riok.Mapperly.Abstractions;

namespace EstudaZen.Tips;

[Mapper]
public partial class TipMapper
{
    public partial TipDto Map(Tip source);
}
