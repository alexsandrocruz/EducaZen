using System;
using System.Collections.Generic;
using System.Linq;
using EstudaZen.Questions;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;

namespace EstudaZen.Quizzes;

/// <summary>
/// Represents an active quiz session for a student
/// </summary>
public class Quiz : FullAuditedAggregateRoot<Guid>, IMultiTenant
{
    public Guid? TenantId { get; protected set; }

    /// <summary>
    /// Student taking the quiz
    /// </summary>
    public Guid StudentId { get; private set; }

    /// <summary>
    /// Optional subject filter (null = mixed subjects)
    /// </summary>
    public Guid? SubjectId { get; set; }

    /// <summary>
    /// Optional difficulty filter
    /// </summary>
    public QuestionDifficulty? Difficulty { get; set; }

    /// <summary>
    /// Total questions in this quiz
    /// </summary>
    public int TotalQuestions { get; private set; }

    /// <summary>
    /// Number of correct answers
    /// </summary>
    public int CorrectAnswers { get; private set; }

    /// <summary>
    /// Total XP earned in this quiz
    /// </summary>
    public int TotalXpEarned { get; private set; }

    /// <summary>
    /// Current streak within this quiz
    /// </summary>
    public int CurrentStreak { get; private set; }

    /// <summary>
    /// Highest streak achieved in this quiz
    /// </summary>
    public int HighestStreak { get; private set; }

    /// <summary>
    /// When the quiz was started
    /// </summary>
    public DateTime StartedAt { get; private set; }

    /// <summary>
    /// When the quiz was completed
    /// </summary>
    public DateTime? CompletedAt { get; private set; }

    /// <summary>
    /// Current status
    /// </summary>
    public QuizStatus Status { get; private set; } = QuizStatus.InProgress;

    /// <summary>
    /// Current question index (0-based)
    /// </summary>
    public int CurrentQuestionIndex { get; private set; }

    /// <summary>
    /// Questions in this quiz session
    /// </summary>
    public ICollection<QuizQuestion> Questions { get; private set; } = new List<QuizQuestion>();

    protected Quiz() { }

    public Quiz(
        Guid id,
        Guid studentId,
        int totalQuestions,
        Guid? subjectId = null,
        QuestionDifficulty? difficulty = null,
        Guid? tenantId = null) : base(id)
    {
        StudentId = studentId;
        TotalQuestions = totalQuestions;
        SubjectId = subjectId;
        Difficulty = difficulty;
        TenantId = tenantId;
        StartedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Add a question to the quiz
    /// </summary>
    public QuizQuestion AddQuestion(Guid quizQuestionId, Guid questionId)
    {
        var order = Questions.Count;
        var quizQuestion = new QuizQuestion(quizQuestionId, Id, questionId, order);
        Questions.Add(quizQuestion);
        return quizQuestion;
    }

    /// <summary>
    /// Answer the current question
    /// </summary>
    public (bool isCorrect, int xpEarned) AnswerCurrentQuestion(Guid selectedAnswerId, bool isCorrect, int basePoints)
    {
        var currentQuestion = Questions.FirstOrDefault(q => q.Order == CurrentQuestionIndex);
        if (currentQuestion == null)
            throw new InvalidOperationException("No current question to answer");

        if (currentQuestion.AnsweredAt.HasValue)
            throw new InvalidOperationException("Question already answered");

        // Calculate XP with streak bonus
        var xpEarned = 0;
        if (isCorrect)
        {
            CorrectAnswers++;
            CurrentStreak++;
            if (CurrentStreak > HighestStreak)
                HighestStreak = CurrentStreak;

            // Streak bonus: +10% per streak (up to 50%)
            var streakBonus = Math.Min(CurrentStreak * 0.1, 0.5);
            xpEarned = (int)(basePoints * (1 + streakBonus));
            TotalXpEarned += xpEarned;
        }
        else
        {
            CurrentStreak = 0;
        }

        currentQuestion.Answer(selectedAnswerId, isCorrect, xpEarned);
        CurrentQuestionIndex++;

        // Check if quiz is complete
        if (CurrentQuestionIndex >= TotalQuestions)
        {
            Complete();
        }

        return (isCorrect, xpEarned);
    }

    /// <summary>
    /// Mark the quiz as completed
    /// </summary>
    public void Complete()
    {
        Status = QuizStatus.Completed;
        CompletedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Abandon the quiz
    /// </summary>
    public void Abandon()
    {
        Status = QuizStatus.Abandoned;
        CompletedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Get accuracy percentage
    /// </summary>
    public double GetAccuracy()
    {
        var answered = Questions.Count(q => q.AnsweredAt.HasValue);
        return answered > 0 ? (double)CorrectAnswers / answered * 100 : 0;
    }

    /// <summary>
    /// Get elapsed time
    /// </summary>
    public TimeSpan GetElapsedTime()
    {
        var endTime = CompletedAt ?? DateTime.UtcNow;
        return endTime - StartedAt;
    }
}
