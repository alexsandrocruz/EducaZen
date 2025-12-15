using System;
using System.Collections.Generic;
using EstudaZen.Subjects;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;

namespace EstudaZen.Questions;

/// <summary>
/// Represents a question in the question bank
/// </summary>
public class Question : FullAuditedAggregateRoot<Guid>, IMultiTenant
{
    /// <summary>
    /// TenantId null = global question (created by host)
    /// </summary>
    public Guid? TenantId { get; set; }

    /// <summary>
    /// Subject/discipline this question belongs to
    /// </summary>
    public Guid SubjectId { get; set; }
    public Subject? Subject { get; set; }

    /// <summary>
    /// The question text/content
    /// </summary>
    public string Content { get; set; } = null!;

    /// <summary>
    /// Optional explanation shown after answering
    /// </summary>
    public string? Explanation { get; set; }

    /// <summary>
    /// Optional media URL (image/video)
    /// </summary>
    public string? MediaUrl { get; set; }

    /// <summary>
    /// Difficulty level
    /// </summary>
    public QuestionDifficulty Difficulty { get; set; } = QuestionDifficulty.Medium;

    /// <summary>
    /// Points awarded for correct answer
    /// </summary>
    public int Points { get; set; } = 10;

    /// <summary>
    /// Time limit in seconds (0 = no limit)
    /// </summary>
    public int TimeLimitSeconds { get; set; }

    /// <summary>
    /// Tags for categorization (JSON array)
    /// </summary>
    public string? Tags { get; set; }

    /// <summary>
    /// Whether the question is published
    /// </summary>
    public bool IsPublished { get; set; } = true;

    /// <summary>
    /// Answer options
    /// </summary>
    public ICollection<QuestionAnswer> Answers { get; set; } = new List<QuestionAnswer>();

    public Question() { }

    public Question(
        Guid id,
        Guid subjectId,
        string content,
        QuestionDifficulty difficulty = QuestionDifficulty.Medium,
        Guid? tenantId = null) : base(id)
    {
        SubjectId = subjectId;
        SetContent(content);
        Difficulty = difficulty;
        TenantId = tenantId;
        SetDefaultPoints();
    }

    public void SetContent(string content)
    {
        if (string.IsNullOrWhiteSpace(content))
            throw new ArgumentException("Question content cannot be empty", nameof(content));

        Content = content.Trim();
    }

    public void SetSubject(Guid subjectId)
    {
        SubjectId = subjectId;
    }

    /// <summary>
    /// Add an answer option to the question
    /// </summary>
    public QuestionAnswer AddAnswer(Guid answerId, string content, bool isCorrect = false)
    {
        var order = Answers.Count;
        var answer = new QuestionAnswer(answerId, Id, content, isCorrect, order);
        Answers.Add(answer);
        return answer;
    }

    /// <summary>
    /// Set default points based on difficulty
    /// </summary>
    private void SetDefaultPoints()
    {
        Points = Difficulty switch
        {
            QuestionDifficulty.Easy => 50,
            QuestionDifficulty.Medium => 75,
            QuestionDifficulty.Hard => 100,
            QuestionDifficulty.Challenge => 150,
            _ => 50
        };
    }
}
