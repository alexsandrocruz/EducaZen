using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EstudaZen.Questions;

/// <summary>
/// DTO for updating a question
/// </summary>
public class UpdateQuestionDto
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

    public QuestionDifficulty Difficulty { get; set; }

    public int TimeLimitSeconds { get; set; }

    [StringLength(500)]
    public string? Tags { get; set; }

    public int? Year { get; set; }

    [StringLength(200)]
    public string? Source { get; set; }

    public bool IsPublished { get; set; }

    [Required]
    [MinLength(2)]
    public List<UpdateQuestionAnswerDto> Answers { get; set; } = new();
}

/// <summary>
/// DTO for updating an answer option
/// </summary>
public class UpdateQuestionAnswerDto
{
    public Guid? Id { get; set; }

    [Required]
    [StringLength(1000)]
    public string Content { get; set; } = null!;

    public bool IsCorrect { get; set; }
}
