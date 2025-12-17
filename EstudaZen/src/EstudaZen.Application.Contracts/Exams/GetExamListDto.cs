using System;
using Volo.Abp.Application.Dtos;
using EstudaZen.Exams;

namespace EstudaZen.Exams;

/// <summary>
/// Query parameters for exam list
/// </summary>
public class GetExamListDto : PagedAndSortedResultRequestDto
{
    public string? Filter { get; set; }
    public Guid? SchoolId { get; set; }
    public ExamType? Type { get; set; }
    public bool? IsPublished { get; set; }
}
