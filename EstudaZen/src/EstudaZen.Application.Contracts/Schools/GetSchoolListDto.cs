using Volo.Abp.Application.Dtos;

namespace EstudaZen.Schools;

public class GetSchoolListDto : PagedAndSortedResultRequestDto
{
    public string? Filter { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public bool? IsActive { get; set; }
}
