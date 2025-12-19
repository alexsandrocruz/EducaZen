using System;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;

namespace EstudaZen.Achievements;

/// <summary>
/// Definição de uma conquista disponível no sistema
/// </summary>
public class Achievement : FullAuditedAggregateRoot<Guid>, IMultiTenant
{
    public Guid? TenantId { get; protected set; }

    /// <summary>
    /// Código único da conquista (ex: STREAK_7, QUIZ_100)
    /// </summary>
    [Required]
    [StringLength(50)]
    public string Code { get; set; } = string.Empty;

    /// <summary>
    /// Título exibido ao usuário
    /// </summary>
    [Required]
    [StringLength(100)]
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// Descrição da conquista
    /// </summary>
    [StringLength(500)]
    public string? Description { get; set; }

    /// <summary>
    /// Nome do ícone MaterialCommunityIcons
    /// </summary>
    [StringLength(50)]
    public string Icon { get; set; } = "trophy";

    /// <summary>
    /// Cores do gradiente em JSON: ["#facc15", "#f97316"]
    /// </summary>
    [StringLength(100)]
    public string GradientColors { get; set; } = "[\"#7f13ec\", \"#9d4dff\"]";

    /// <summary>
    /// Tipo/categoria da conquista
    /// </summary>
    public AchievementType Type { get; set; } = AchievementType.Milestone;

    /// <summary>
    /// Gatilho que dispara a verificação
    /// </summary>
    public AchievementTrigger Trigger { get; set; } = AchievementTrigger.OnLogin;

    /// <summary>
    /// Valor necessário para desbloquear (ex: 7 dias, 80%)
    /// </summary>
    public int RequiredValue { get; set; }

    /// <summary>
    /// Campo secundário para regras complexas (ex: SubjectId para mat específica)
    /// </summary>
    public string? RequiredField { get; set; }

    /// <summary>
    /// Ordem de exibição
    /// </summary>
    public int Order { get; set; }

    /// <summary>
    /// Se a conquista está ativa
    /// </summary>
    public bool IsActive { get; set; } = true;

    protected Achievement() { }

    public Achievement(
        Guid id,
        string code,
        string title,
        AchievementType type,
        AchievementTrigger trigger,
        int requiredValue,
        Guid? tenantId = null) : base(id)
    {
        Code = code;
        Title = title;
        Type = type;
        Trigger = trigger;
        RequiredValue = requiredValue;
        TenantId = tenantId;
    }
}
