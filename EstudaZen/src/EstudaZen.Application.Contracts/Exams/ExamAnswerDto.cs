using System;
using Volo.Abp.Application.Dtos;

namespace EstudaZen.Exams;

/// <summary>
/// DTO for ExamAnswer entity
/// </summary>
public class ExamAnswerDto : EntityDto<Guid>
{
    public Guid ExamSessionId { get; set; }
    public Guid QuestionId { get; set; }
    public Guid? SelectedAnswerId { get; set; }
    public bool IsCorrect { get; set; }
    public DateTime? AnsweredAt { get; set; }
    public int TimeSpentSeconds { get; set; }
}
