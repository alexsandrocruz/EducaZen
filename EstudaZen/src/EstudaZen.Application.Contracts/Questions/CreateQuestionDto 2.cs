using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EstudaZen.Questions;

/// <summary>
/// DTO for creating a question with answers
/// </summary>
public class CreateQuestionDto
{
    [Required]
    public Guid SubjectId { get; set; }

    [Required]
    [StringLength(2000)]
    public string Content { get; set; } = null!;

    [StringLength(2000)]
    public string? Explanation { get; set; }

    [StringLength(500)]
    public string? MediaUrl { get; set; }

    public QuestionDifficulty Difficulty { get; set; } = QuestionDifficulty.Medium;

    public int TimeLimitSeconds { get; set; }

    [StringLength(500)]
    public string? Tags { get; set; }

    public bool IsPublished { get; set; } = true;

    [Required]
    [MinLength(2)]
    public List<CreateQuestionAnswerDto> Answers { get; set; } = new();
}

/// <summary>
/// DTO for creating an answer option
/// </summary>
public class CreateQuestionAnswerDto
{
    [Required]
    [StringLength(1000)]
    public string Content { get; set; } = null!;

    public bool IsCorrect { get; set; }
}
