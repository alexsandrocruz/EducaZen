using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace EstudaZen.Achievements;

/// <summary>
/// Repositório para Achievement
/// </summary>
public interface IAchievementRepository : IRepository<Achievement, Guid>
{
    /// <summary>
    /// Buscar conquistas por trigger
    /// </summary>
    Task<List<Achievement>> GetByTriggerAsync(AchievementTrigger trigger);

    /// <summary>
    /// Buscar conquista por código
    /// </summary>
    Task<Achievement?> GetByCodeAsync(string code);

    /// <summary>
    /// Buscar todas as conquistas ativas
    /// </summary>
    Task<List<Achievement>> GetActiveAsync();

    /// <summary>
    /// Buscar conquistas de um aluno (desbloqueadas)
    /// </summary>
    Task<List<StudentAchievement>> GetStudentAchievementsAsync(Guid studentId);

    /// <summary>
    /// Verificar se aluno já possui conquista
    /// </summary>
    Task<bool> HasAchievementAsync(Guid studentId, Guid achievementId);

    /// <summary>
    /// Registrar conquista desbloqueada
    /// </summary>
    Task<StudentAchievement> UnlockAsync(StudentAchievement studentAchievement);
}
