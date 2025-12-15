using System;
using Volo.Abp.Domain.Entities;

namespace EstudaZen.Exams;

/// <summary>
/// Represents a student's answer to a specific exam question
/// </summary>
public class ExamAnswer : Entity<Guid>
{
    /// <summary>
    /// The exam session this answer belongs to
    /// </summary>
    public Guid ExamSessionId { get; private set; }

    /// <summary>
    /// The question being answered
    /// </summary>
    public Guid QuestionId { get; private set; }

    /// <summary>
    /// The selected answer (null = skipped/not answered)
    /// </summary>
    public Guid? SelectedAnswerId { get; private set; }

    /// <summary>
    /// Whether the answer is correct
    /// </summary>
    public bool IsCorrect { get; private set; }

    /// <summary>
    /// When the answer was submitted
    /// </summary>
    public DateTime? AnsweredAt { get; private set; }

    /// <summary>
    /// Time spent on this question in seconds
    /// </summary>
    public int TimeSpentSeconds { get; private set; }

    protected ExamAnswer() { }

    public ExamAnswer(
        Guid id,
        Guid examSessionId,
        Guid questionId,
        Guid? selectedAnswerId,
        bool isCorrect) : base(id)
    {
        ExamSessionId = examSessionId;
        QuestionId = questionId;
        SelectedAnswerId = selectedAnswerId;
        IsCorrect = isCorrect;
        AnsweredAt = selectedAnswerId.HasValue ? DateTime.UtcNow : null;
        TimeSpentSeconds = 0; // Will be calculated by frontend tracking
    }

    /// <summary>
    /// Update the answer
    /// </summary>
    public void Update(Guid? selectedAnswerId, bool isCorrect)
    {
        SelectedAnswerId = selectedAnswerId;
        IsCorrect = isCorrect;
        AnsweredAt = selectedAnswerId.HasValue ? DateTime.UtcNow : null;
    }

    /// <summary>
    /// Set time spent on this question
    /// </summary>
    public void SetTimeSpent(int seconds)
    {
        if (seconds < 0)
            throw new ArgumentException("Time spent cannot be negative", nameof(seconds));

        TimeSpentSeconds = seconds;
    }
}
