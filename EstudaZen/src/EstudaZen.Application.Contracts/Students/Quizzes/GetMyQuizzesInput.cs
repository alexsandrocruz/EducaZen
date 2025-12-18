using Volo.Abp.Application.Dtos;

namespace EstudaZen.Students.Quizzes;

public class GetMyQuizzesInput : PagedAndSortedResultRequestDto
{
    public string? Status { get; set; } // "InProgress", "Completed", "Abandoned"
}
