using System;
using System.ComponentModel.DataAnnotations;
using EstudaZen.Exams;
using EstudaZen.Questions;

namespace EstudaZen.Exams;

/// <summary>
/// DTO for creating or updating an Exam
/// </summary>
public class CreateUpdateExamDto
{
    [Required]
    [StringLength(200)]
    public string Title { get; set; } = null!;

    [StringLength(2000)]
    public string? Description { get; set; }

    public ExamType Type { get; set; } = ExamType.Mock;

    public QuestionDifficulty? Difficulty { get; set; }

    public int DurationMinutes { get; set; } = 180;

    public DateTime? AvailableFrom { get; set; }

    public DateTime? AvailableUntil { get; set; }

    public bool ShowCorrectAnswers { get; set; } = true;

    public bool RandomizeQuestions { get; set; }

    public bool RandomizeOptions { get; set; }

    public Guid? SchoolId { get; set; }
}
