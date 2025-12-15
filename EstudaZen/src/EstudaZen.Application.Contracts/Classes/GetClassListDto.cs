using System;
using Volo.Abp.Application.Dtos;

namespace EstudaZen.Classes;

/// <summary>
/// Query parameters for class list
/// </summary>
public class GetClassListDto : PagedAndSortedResultRequestDto
{
    public Guid? SchoolId { get; set; }
    public int? SchoolYear { get; set; }
    public bool? IsActive { get; set; }
    public string? SearchTerm { get; set; }
}
