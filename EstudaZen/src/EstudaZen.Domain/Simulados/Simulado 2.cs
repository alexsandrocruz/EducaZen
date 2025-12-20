using System;
using System.Collections.Generic;
using System.Linq;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;

namespace EstudaZen.Simulados;

/// <summary>
/// Represents a complete ENEM simulation/exam
/// </summary>
public class Simulado : FullAuditedAggregateRoot<Guid>, IMultiTenant
{
    public Guid? TenantId { get; protected set; }

    /// <summary>
    /// Simulado title (e.g., "Simulado ENEM 2024")
    /// </summary>
    public string Title { get; private set; } = null!;

    /// <summary>
    /// Optional description
    /// </summary>
    public string? Description { get; set; }

    /// <summary>
    /// Total questions in the simulado
    /// </summary>
    public int TotalQuestions { get; private set; }

    /// <summary>
    /// Duration in minutes
    /// </summary>
    public int DurationMinutes { get; set; } = 180;

    /// <summary>
    /// Total points possible
    /// </summary>
    public int TotalPoints { get; private set; }

    /// <summary>
    /// Whether the simulado is published and available
    /// </summary>
    public bool IsPublished { get; private set; }

    /// <summary>
    /// When it was published
    /// </summary>
    public DateTime? PublishedAt { get; private set; }

    /// <summary>
    /// Questions in this simulado
    /// </summary>
    public ICollection<SimuladoQuestion> Questions { get; private set; } = new List<SimuladoQuestion>();

    protected Simulado() { }

    public Simulado(Guid id, string title, Guid? tenantId = null) : base(id)
    {
        SetTitle(title);
        TenantId = tenantId;
    }

    public void SetTitle(string title)
    {
        if (string.IsNullOrWhiteSpace(title))
            throw new ArgumentException("Simulado title cannot be empty", nameof(title));

        Title = title.Trim();
    }

    /// <summary>
    /// Add a question to the simulado
    /// </summary>
    public SimuladoQuestion AddQuestion(Guid simuladoQuestionId, Guid questionId, int points)
    {
        var order = Questions.Count;
        var sq = new SimuladoQuestion(simuladoQuestionId, Id, questionId, points, order);
        Questions.Add(sq);
        RecalculateTotals();
        return sq;
    }

    /// <summary>
    /// Remove a question from the simulado
    /// </summary>
    public void RemoveQuestion(Guid questionId)
    {
        var sq = Questions.FirstOrDefault(q => q.QuestionId == questionId);
        if (sq != null)
        {
            Questions.Remove(sq);
            ReorderQuestions();
            RecalculateTotals();
        }
    }

    /// <summary>
    /// Publish the simulado
    /// </summary>
    public void Publish()
    {
        if (TotalQuestions == 0)
            throw new InvalidOperationException("Cannot publish simulado with no questions");

        IsPublished = true;
        PublishedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Unpublish the simulado
    /// </summary>
    public void Unpublish()
    {
        IsPublished = false;
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
