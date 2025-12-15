using System;
using Volo.Abp.Domain.Entities;

namespace EstudaZen.Exams;

/// <summary>
/// Question assigned to an exam (N:M relationship)
/// </summary>
public class ExamQuestion : Entity<Guid>
{
    /// <summary>
    /// Parent exam
    /// </summary>
    public Guid ExamId { get; protected set; }

    /// <summary>
    /// Question reference
    /// </summary>
    public Guid QuestionId { get; protected set; }

    /// <summary>
    /// Points for this question in this exam
    /// </summary>
    public decimal Points { get; protected set; }

    /// <summary>
    /// Display order (0-based)
    /// </summary>
    public int Order { get; protected set; }

    protected ExamQuestion() { }

    public ExamQuestion(Guid id, Guid examId, Guid questionId, decimal points, int order) : base(id)
    {
        ExamId = examId;
        QuestionId = questionId;
        Points = points;
        Order = order;
    }

    internal void SetOrder(int order)
    {
        Order = order;
    }
}
