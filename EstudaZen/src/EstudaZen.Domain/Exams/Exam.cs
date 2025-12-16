using System;
using System.Collections.Generic;
using System.Linq;
using EstudaZen.Questions;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;

namespace EstudaZen.Exams;

/// <summary>
/// Represents an exam/assessment template
/// </summary>
public class Exam : FullAuditedAggregateRoot<Guid>, IMultiTenant
{
    public Guid? TenantId { get; protected set; }

    /// <summary>
    /// Optional school-specific exam (null = tenant-wide or global)
    /// </summary>
    public Guid? SchoolId { get; set; }

    /// <summary>
    /// Exam title (e.g., "Simulado ENEM 2024 - 1ª Aplicação")
    /// </summary>
    public string Title { get; private set; } = null!;

    /// <summary>
    /// Optional description
    /// </summary>
    public string? Description { get; set; }

    /// <summary>
    /// Type of exam
    /// </summary>
    public ExamType Type { get; set; } = ExamType.Mock;

    /// <summary>
    /// Difficulty level (null = mixed)
    /// </summary>
    public QuestionDifficulty? Difficulty { get; set; }

    /// <summary>
    /// Total questions in the exam
    /// </summary>
    public int TotalQuestions { get; private set; }

    /// <summary>
    /// Duration in minutes (0 = no time limit)
    /// </summary>
    public int DurationMinutes { get; set; } = 180;

    /// <summary>
    /// Total points possible
    /// </summary>
    public decimal TotalPoints { get; private set; }

    /// <summary>
    /// Available from date/time (null = always available)
    /// </summary>
    public DateTime? AvailableFrom { get; set; }

    /// <summary>
    /// Available until date/time (null = no expiration)
    /// </summary>
    public DateTime? AvailableUntil { get; set; }

    /// <summary>
    /// Whether the exam is published and available to students
    /// </summary>
    public bool IsPublished { get; private set; }

    /// <summary>
    /// When it was published
    /// </summary>
    public DateTime? PublishedAt { get; private set; }

    /// <summary>
    /// Show correct answers after completion
    /// </summary>
    public bool ShowCorrectAnswers { get; set; } = true;

    /// <summary>
    /// Randomize question order
    /// </summary>
    public bool RandomizeQuestions { get; set; }

    /// <summary>
    /// Randomize answer options order
    /// </summary>
    public bool RandomizeOptions { get; set; }

    /// <summary>
    /// Questions in this exam
    /// </summary>
    public ICollection<ExamQuestion> Questions { get; private set; } = new List<ExamQuestion>();

    protected Exam() { }

    public Exam(
        Guid id,
        string title,
        ExamType type = ExamType.Mock,
        Guid? tenantId = null,
        Guid? schoolId = null) : base(id)
    {
        SetTitle(title);
        Type = type;
        TenantId = tenantId;
        SchoolId = schoolId;
    }

    public void SetTitle(string title)
    {
        if (string.IsNullOrWhiteSpace(title))
            throw new ArgumentException("Exam title cannot be empty", nameof(title));

        Title = title.Trim();
    }

    /// <summary>
    /// Add a question to the exam
    /// </summary>
    public ExamQuestion AddQuestion(Guid examQuestionId, Guid questionId, decimal points)
    {
        var order = Questions.Count;
        var eq = new ExamQuestion(examQuestionId, Id, questionId, points, order);
        Questions.Add(eq);
        RecalculateTotals();
        return eq;
    }

    /// <summary>
    /// Remove a question from the exam
    /// </summary>
    public void RemoveQuestion(Guid questionId)
    {
        var eq = Questions.FirstOrDefault(q => q.QuestionId == questionId);
        if (eq != null)
        {
            Questions.Remove(eq);
            ReorderQuestions();
            RecalculateTotals();
        }
    }

    /// <summary>
    /// Publish the exam
    /// </summary>
    public void Publish()
    {
        if (TotalQuestions == 0)
            throw new InvalidOperationException("Cannot publish exam with no questions");

        IsPublished = true;
        PublishedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Unpublish the exam
    /// </summary>
    public void Unpublish()
    {
        IsPublished = false;
    }

    /// <summary>
    /// Check if exam is currently available
    /// </summary>
    public bool IsAvailable()
    {
        if (!IsPublished)
            return false;

        var now = DateTime.UtcNow;

        if (AvailableFrom.HasValue && now < AvailableFrom.Value)
            return false;

        if (AvailableUntil.HasValue && now > AvailableUntil.Value)
            return false;

        return true;
    }

    private void RecalculateTotals()
    {
        TotalQuestions = Questions.Count;
        TotalPoints = Questions.Sum(q => q.Points);
    }

    private void ReorderQuestions()
    {
        var ordered = Questions.OrderBy(q => q.Order).ToList();
        for (int i = 0; i < ordered.Count; i++)
        {
            ordered[i].SetOrder(i);
        }
    }
}
