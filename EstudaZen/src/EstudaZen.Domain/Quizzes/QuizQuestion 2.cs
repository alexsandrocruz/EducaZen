using System;
using Volo.Abp.Domain.Entities;

namespace EstudaZen.Quizzes;

/// <summary>
/// A question within a quiz session
/// </summary>
public class QuizQuestion : Entity<Guid>
{
    /// <summary>
    /// Parent quiz
    /// </summary>
    public Guid QuizId { get; private set; }

    /// <summary>
    /// Reference to the original question
    /// </summary>
    public Guid QuestionId { get; private set; }

    /// <summary>
    /// Display order in the quiz (0-based)
    /// </summary>
    public int Order { get; set; }

    /// <summary>
    /// Selected answer ID (null if not answered)
    /// </summary>
    public Guid? SelectedAnswerId { get; private set; }

    /// <summary>
    /// Whether the answer was correct
    /// </summary>
    public bool? IsCorrect { get; private set; }

    /// <summary>
    /// XP earned for this question
    /// </summary>
    public int XpEarned { get; private set; }

    /// <summary>
    /// When the question was answered
    /// </summary>
    public DateTime? AnsweredAt { get; private set; }

    /// <summary>
    /// Time spent on this question in seconds
    /// </summary>
    public int? TimeSpentSeconds { get; set; }

    protected QuizQuestion() { }

    public QuizQuestion(Guid id, Guid quizId, Guid questionId, int order) : base(id)
    {
        QuizId = quizId;
        QuestionId = questionId;
        Order = order;
    }

    /// <summary>
    /// Record the answer for this question
    /// </summary>
    public void Answer(Guid selectedAnswerId, bool isCorrect, int xpEarned)
    {
        if (AnsweredAt.HasValue)
            throw new InvalidOperationException("Question already answered");

        SelectedAnswerId = selectedAnswerId;
        IsCorrect = isCorrect;
        XpEarned = xpEarned;
        AnsweredAt = DateTime.UtcNow;
    }
}
