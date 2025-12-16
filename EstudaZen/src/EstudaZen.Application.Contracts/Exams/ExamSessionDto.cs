using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using EstudaZen.Exams;

namespace EstudaZen.Exams;

/// <summary>
/// DTO for ExamSession entity
/// </summary>
public class ExamSessionDto : EntityDto<Guid>
{
    public Guid ExamId { get; set; }
    public Guid StudentId { get; set; }
    public DateTime StartedAt { get; set; }
    public DateTime? FinishedAt { get; set; }
    public ExamSessionStatus Status { get; set; }
    public decimal? Score { get; set; }
    public decimal MaxScore { get; set; }
    public decimal? PercentageScore { get; set; }
    public int CorrectAnswers { get; set; }
    public int WrongAnswers { get; set; }
    public int SkippedAnswers { get; set; }
    public int? TimeSpentMinutes { get; set; }
    
    // Computed
    public string? ExamTitle { get; set; }
}
