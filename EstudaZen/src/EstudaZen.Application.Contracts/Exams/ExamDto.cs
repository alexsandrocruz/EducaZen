using System;
using Volo.Abp.Application.Dtos;
using EstudaZen.Exams;
using EstudaZen.Questions;

namespace EstudaZen.Exams;

/// <summary>
/// DTO for Exam entity
/// </summary>
public class ExamDto : FullAuditedEntityDto<Guid>
{
    public Guid? TenantId { get; set; }
    public Guid? SchoolId { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public ExamType Type { get; set; }
    public QuestionDifficulty? Difficulty { get; set; }
    public int TotalQuestions { get; set; }
    public int DurationMinutes { get; set; }
    public decimal TotalPoints { get; set; }
    public DateTime? AvailableFrom { get; set; }
    public DateTime? AvailableUntil { get; set; }
    public bool IsPublished { get; set; }
    public DateTime? PublishedAt { get; set; }
    public bool ShowCorrectAnswers { get; set; }
    public bool RandomizeQuestions { get; set; }
    public bool RandomizeOptions { get; set; }
}
