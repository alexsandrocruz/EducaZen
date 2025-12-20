using System;
using Volo.Abp.Application.Dtos;

namespace EstudaZen.Questions;

/// <summary>
/// Input for filtering questions
/// </summary>
public class GetQuestionListDto : PagedAndSortedResultRequestDto
{
    public Guid? SubjectId { get; set; }
    public QuestionDifficulty? Difficulty { get; set; }
    public bool? IsPublished { get; set; }
    public string? SearchTerm { get; set; }
}
