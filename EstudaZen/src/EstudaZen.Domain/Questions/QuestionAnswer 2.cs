using System;
using Volo.Abp.Domain.Entities;

namespace EstudaZen.Questions;

/// <summary>
/// Answer option for a question
/// </summary>
public class QuestionAnswer : Entity<Guid>
{
    /// <summary>
    /// Parent question
    /// </summary>
    public Guid QuestionId { get; private set; }

    /// <summary>
    /// Answer text content
    /// </summary>
    public string Content { get; private set; } = null!;

    /// <summary>
    /// Whether this is the correct answer
    /// </summary>
    public bool IsCorrect { get; set; }

    /// <summary>
    /// Display order (0-based, typically A=0, B=1, etc.)
    /// </summary>
    public int Order { get; set; }

    protected QuestionAnswer() { }

    public QuestionAnswer(Guid id, Guid questionId, string content, bool isCorrect = false, int order = 0) : base(id)
    {
        QuestionId = questionId;
        SetContent(content);
        IsCorrect = isCorrect;
        Order = order;
    }

    public void SetContent(string content)
    {
        if (string.IsNullOrWhiteSpace(content))
            throw new ArgumentException("Answer content cannot be empty", nameof(content));

        Content = content.Trim();
    }

    /// <summary>
    /// Get letter representation (A, B, C, D, E)
    /// </summary>
    public char GetLetter() => (char)('A' + Order);
}
