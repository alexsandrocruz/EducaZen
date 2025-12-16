using System;
using Volo.Abp.Application.Dtos;

namespace EstudaZen.Students;

public class GetStudentListDto : PagedAndSortedResultRequestDto
{
    public string? Filter { get; set; }
    public Guid? ClassId { get; set; }
    public StudentStatus? Status { get; set; }
}
