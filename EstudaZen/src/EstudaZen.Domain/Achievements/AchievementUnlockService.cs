using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EstudaZen.Students;
using Volo.Abp.Domain.Services;
using Volo.Abp.Guids;

namespace EstudaZen.Achievements;

/// <summary>
/// Domain Service para verificar e desbloquear conquistas
/// </summary>
public class AchievementUnlockService : DomainService
{
    private readonly IAchievementRepository _achievementRepository;
    private readonly IGuidGenerator _guidGenerator;

    public AchievementUnlockService(
        IAchievementRepository achievementRepository,
        IGuidGenerator guidGenerator)
    {
        _achievementRepository = achievementRepository;
        _guidGenerator = guidGenerator;
    }

    /// <summary>
    /// Verifica e desbloqueia conquistas baseado no trigger
    /// </summary>
    /// <returns>Lista de conquistas recém-desbloqueadas</returns>
    public async Task<List<Achievement>> CheckAndUnlockAsync(
        Student student,
        AchievementTrigger trigger,
        int? totalQuestions = null,
        int? correctAnswers = null)
    {
        var unlockedAchievements = new List<Achievement>();

        // Buscar conquistas por trigger
        var achievements = await _achievementRepository.GetByTriggerAsync(trigger);

        foreach (var achievement in achievements)
        {
            // Verificar se já possui
            if (await _achievementRepository.HasAchievementAsync(student.Id, achievement.Id))
                continue;

            // Avaliar regra
            if (EvaluateRule(student, achievement, totalQuestions, correctAnswers))
            {
                // Desbloquear
                var studentAchievement = new StudentAchievement(
                    _guidGenerator.Create(),
                    student.Id,
                    achievement.Id,
                    student.TenantId);

                await _achievementRepository.UnlockAsync(studentAchievement);
                unlockedAchievements.Add(achievement);
            }
        }

        return unlockedAchievements;
    }

    /// <summary>
    /// Avalia se a regra da conquista foi atingida
    /// </summary>
    private bool EvaluateRule(
        Student student,
        Achievement achievement,
        int? totalQuestions,
        int? correctAnswers)
    {
        return achievement.Type switch
        {
            AchievementType.Streak => student.CurrentStreak >= achievement.RequiredValue,

            AchievementType.Quiz => student.TotalQuizzes >= achievement.RequiredValue,

            AchievementType.Milestone => achievement.Code switch
            {
                var c when c.StartsWith("XP_") => student.TotalXp >= achievement.RequiredValue,
                var c when c.StartsWith("LEVEL_") => student.CurrentLevel >= achievement.RequiredValue,
                _ => false
            },

            AchievementType.Accuracy => EvaluateAccuracy(student, achievement, totalQuestions, correctAnswers),

            // Subject e Special podem ter lógicas personalizadas
            _ => false
        };
    }

    private bool EvaluateAccuracy(
        Student student,
        Achievement achievement,
        int? totalQuestions,
        int? correctAnswers)
    {
        // Usar dados passados ou do student
        var total = totalQuestions ?? (student.TotalQuizzes * 10); // estimativa
        var correct = correctAnswers ?? student.TotalCorrectAnswers;

        if (total < 50) // Mínimo de questões
            return false;

        var accuracy = (double)correct / total * 100;
        return accuracy >= achievement.RequiredValue;
    }
}
