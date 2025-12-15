using System;
using System.Collections.Generic;
using System.Linq;
using Volo.Abp.Domain.Entities.Auditing;

namespace EstudaZen.Exams;

/// <summary>
/// Represents a student's attempt at taking an exam
/// </summary>
public class ExamSession : CreationAuditedAggregateRoot<Guid>
{
    /// <summary>
    /// The exam being taken
    /// </summary>
    public Guid ExamId { get; private set; }

    /// <summary>
    /// The student taking the exam
    /// </summary>
    public Guid StudentId { get; private set; }

    /// <summary>
    /// When the session started
    /// </summary>
    public DateTime StartedAt { get; private set; }

    /// <summary>
    /// When the session finished (null = in progress)
    /// </summary>
    public DateTime? FinishedAt { get; private set; }

    /// <summary>
    /// Current status of the session
    /// </summary>
    public ExamSessionStatus Status { get; private set; }

    /// <summary>
    /// Final score achieved (null until completed)
    /// </summary>
    public decimal? Score { get; private set; }

    /// <summary>
    /// Max possible score for this exam
    /// </summary>
    public decimal MaxScore { get; private set; }

    /// <summary>
    /// Percentage score (computed: Score / MaxScore * 100)
    /// </summary>
    public decimal? PercentageScore { get; private set; }

    /// <summary>
    /// Number of correct answers
    /// </summary>
    public int CorrectAnswers { get; private set; }

    /// <summary>
    /// Number of wrong answers
    /// </summary>
    public int WrongAnswers { get; private set; }

    /// <summary>
    /// Number of skipped/unanswered questions
    /// </summary>
    public int SkippedAnswers { get; private set; }

    /// <summary>
    /// Total time spent in minutes (null until finished)
    /// </summary>
    public int? TimeSpentMinutes { get; private set; }

    /// <summary>
    /// Individual answers to exam questions
    /// </summary>
    public ICollection<ExamAnswer> Answers { get; private set; } = new List<ExamAnswer>();

    protected ExamSession() { }

    public ExamSession(
        Guid id,
        Guid examId,
        Guid studentId,
        decimal maxScore) : base(id)
    {
        ExamId = examId;
        StudentId = studentId;
        MaxScore = maxScore;
        StartedAt = DateTime.UtcNow;
        Status = ExamSessionStatus.InProgress;
    }

    /// <summary>
    /// Submit an answer to a question
    /// </summary>
    public void SubmitAnswer(Guid answerId, Guid questionId, Guid? selectedAnswerId, bool isCorrect)
    {
        if (Status != ExamSessionStatus.InProgress)
            throw new InvalidOperationException("Cannot submit answer: session is not in progress");

        var existingAnswer = Answers.FirstOrDefault(a => a.QuestionId == questionId);
        if (existingAnswer != null)
        {
            // Update existing answer
            existingAnswer.Update(selectedAnswerId, isCorrect);
        }
        else
        {
            // Create new answer
            var answer = new ExamAnswer(answerId, Id, questionId, selectedAnswerId, isCorrect);
            Answers.Add(answer);
        }
    }

    /// <summary>
    /// Complete the exam session
    /// </summary>
    public void Complete()
    {
        if (Status != ExamSessionStatus.InProgress)
            throw new InvalidOperationException("Session is not in progress");

        FinishedAt = DateTime.UtcNow;
        Status = ExamSessionStatus.Completed;
        CalculateScore();
        CalculateTimeSpent();
    }

    /// <summary>
    /// Mark session as abandoned
    /// </summary>
    public void Abandon()
    {
        if (Status != ExamSessionStatus.InProgress)
            throw new InvalidOperationException("Session is not in progress");

        FinishedAt = DateTime.UtcNow;
        Status = ExamSessionStatus.Abandoned;
        CalculateScore();
        CalculateTimeSpent();
    }

    /// <summary>
    /// Mark session as timed out
    /// </summary>
    public void Timeout()
    {
        if (Status != ExamSessionStatus.InProgress)
            throw new InvalidOperationException("Session is not in progress");

        FinishedAt = DateTime.UtcNow;
        Status = ExamSessionStatus.TimedOut;
        CalculateScore();
        CalculateTimeSpent();
    }

    private void CalculateScore()
    {
        CorrectAnswers = Answers.Count(a => a.IsCorrect);
        WrongAnswers = Answers.Count(a => a.SelectedAnswerId.HasValue && !a.IsCorrect);
        SkippedAnswers = Answers.Count(a => !a.SelectedAnswerId.HasValue);

        Score = Answers.Where(a => a.IsCorrect).Sum(a => 1.0m); // Simplified: 1 point per correct answer
        PercentageScore = MaxScore > 0 ? (Score / MaxScore * 100) : 0;
    }

    private void CalculateTimeSpent()
    {
        if (FinishedAt.HasValue)
        {
            TimeSpentMinutes = (int)Math.Ceiling((FinishedAt.Value - StartedAt).TotalMinutes);
        }
    }
}
