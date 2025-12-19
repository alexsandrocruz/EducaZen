using System;
using System.ComponentModel.DataAnnotations;
using EstudaZen.Students;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;

namespace EstudaZen.Notifications;

/// <summary>
/// Notificação para o aluno
/// </summary>
public class Notification : CreationAuditedEntity<Guid>, IMultiTenant
{
    public Guid? TenantId { get; protected set; }

    /// <summary>
    /// Aluno que recebe a notificação
    /// </summary>
    public Guid StudentId { get; set; }
    public Student? Student { get; set; }

    /// <summary>
    /// Tipo da notificação
    /// </summary>
    public NotificationType Type { get; set; }

    /// <summary>
    /// Título curto
    /// </summary>
    [Required]
    [StringLength(100)]
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// Mensagem/descrição
    /// </summary>
    [Required]
    [StringLength(500)]
    public string Message { get; set; } = string.Empty;

    /// <summary>
    /// Ícone MaterialCommunityIcons
    /// </summary>
    [StringLength(50)]
    public string Icon { get; set; } = "bell";

    /// <summary>
    /// Deep link para ação (ex: /achievements, /quiz/123)
    /// </summary>
    [StringLength(200)]
    public string? ActionUrl { get; set; }

    /// <summary>
    /// Dados adicionais em JSON (ex: achievementId, quizId)
    /// </summary>
    [StringLength(500)]
    public string? Data { get; set; }

    /// <summary>
    /// Se a notificação foi lida
    /// </summary>
    public bool IsRead { get; set; }

    /// <summary>
    /// Quando foi marcada como lida
    /// </summary>
    public DateTime? ReadAt { get; set; }

    protected Notification() { }

    public Notification(
        Guid id,
        Guid studentId,
        NotificationType type,
        string title,
        string message,
        Guid? tenantId = null) : base(id)
    {
        StudentId = studentId;
        Type = type;
        Title = title;
        Message = message;
        TenantId = tenantId;
    }

    /// <summary>
    /// Marca a notificação como lida
    /// </summary>
    public void MarkAsRead()
    {
        if (!IsRead)
        {
            IsRead = true;
            ReadAt = DateTime.UtcNow;
        }
    }
}
