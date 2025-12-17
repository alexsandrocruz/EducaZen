using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;

namespace EstudaZen.Questions;

/// <summary>
/// DTO for Question entity
/// </summary>
public class QuestionDto : FullAuditedEntityDto<Guid>
{
    public Guid? TenantId { get; set; }
    public Guid SubjectId { get; set; }
    public string SubjectName { get; set; } = null!;
    public string Content { get; set; } = null!;
    public string? Explanation { get; set; }
    public string? MediaUrl { get; set; }
    public QuestionDifficulty Difficulty { get; set; }
    public int Points { get; set; }
    public int TimeLimitSeconds { get; set; }
    [StringLength(500)]
    public string? Tags { get; set; }

    public int? Year { get; set; }

    [StringLength(200)]
    public string? Source { get; set; }

    public DateTime? LastUsedAt { get; set; }
    public int UsageCount { get; set; }

    public bool IsPublished { get; set; }
    public List<QuestionAnswerDto> Answers { get; set; } = new();
}

/// <summary>
/// DTO for QuestionAnswer
/// </summary>
public class QuestionAnswerDto
{
    public Guid Id { get; set; }
    public string Content { get; set; } = null!;
    public bool IsCorrect { get; set; }
    public int Order { get; set; }
    public char Letter => (char)('A' + Order);
}
