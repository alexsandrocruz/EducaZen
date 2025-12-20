using System;
using Volo.Abp.Domain.Entities;

namespace EstudaZen.Simulados;

/// <summary>
/// A question within a simulado
/// </summary>
public class SimuladoQuestion : Entity<Guid>
{
    /// <summary>
    /// Parent simulado
    /// </summary>
    public Guid SimuladoId { get; private set; }

    /// <summary>
    /// Reference to the original question
    /// </summary>
    public Guid QuestionId { get; private set; }

    /// <summary>
    /// Points for this question in the simulado
    /// </summary>
    public int Points { get; set; }

    /// <summary>
    /// Display order (0-based)
    /// </summary>
    public int Order { get; private set; }

    protected SimuladoQuestion() { }

    public SimuladoQuestion(Guid id, Guid simuladoId, Guid questionId, int points, int order) : base(id)
    {
        SimuladoId = simuladoId;
        QuestionId = questionId;
        Points = points;
        Order = order;
    }

    public void SetOrder(int order)
    {
        Order = order;
    }
}
