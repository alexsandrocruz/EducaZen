using System;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;
using EstudaZen.Students;

namespace EstudaZen.Achievements;

/// <summary>
/// Registro de conquista desbloqueada por um aluno
/// </summary>
public class StudentAchievement : CreationAuditedEntity<Guid>, IMultiTenant
{
    public Guid? TenantId { get; protected set; }

    /// <summary>
    /// ID do aluno que conquistou
    /// </summary>
    public Guid StudentId { get; set; }
    
    /// <summary>
    /// Navegação para Student
    /// </summary>
    public Student? Student { get; set; }

    /// <summary>
    /// ID da conquista desbloqueada
    /// </summary>
    public Guid AchievementId { get; set; }
    
    /// <summary>
    /// Navegação para Achievement
    /// </summary>
    public Achievement? Achievement { get; set; }

    /// <summary>
    /// Data/hora do desbloqueio (CreationTime serve como UnlockedAt)
    /// </summary>
    public DateTime UnlockedAt => CreationTime;

    protected StudentAchievement() { }

    public StudentAchievement(
        Guid id,
        Guid studentId,
        Guid achievementId,
        Guid? tenantId = null) : base(id)
    {
        StudentId = studentId;
        AchievementId = achievementId;
        TenantId = tenantId;
    }
}
