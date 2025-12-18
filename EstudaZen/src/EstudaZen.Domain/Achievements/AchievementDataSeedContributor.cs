using System;
using System.Text.Json;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Guids;

namespace EstudaZen.Achievements;

/// <summary>
/// Seeds initial achievements
/// </summary>
public class AchievementDataSeedContributor : IDataSeedContributor, ITransientDependency
{
    private readonly IRepository<Achievement, Guid> _achievementRepository;
    private readonly IGuidGenerator _guidGenerator;

    public AchievementDataSeedContributor(
        IRepository<Achievement, Guid> achievementRepository,
        IGuidGenerator guidGenerator)
    {
        _achievementRepository = achievementRepository;
        _guidGenerator = guidGenerator;
    }

    public async Task SeedAsync(DataSeedContext context)
    {
        if (await _achievementRepository.GetCountAsync() >= 10)
        {
            return;
        }

        // Streak Achievements
        await CreateAchievementAsync("STREAK_7", "7 Dias Seguidos", "Mantenha uma sequência de 7 dias de estudo",
            "fire", ["#f97316", "#ea580c"], AchievementType.Streak, AchievementTrigger.OnStreak, 7, 1);

        await CreateAchievementAsync("STREAK_30", "Mês de Fogo", "Mantenha uma sequência de 30 dias de estudo",
            "fire", ["#f97316", "#dc2626"], AchievementType.Streak, AchievementTrigger.OnStreak, 30, 2);

        // Quiz Achievements
        await CreateAchievementAsync("QUIZ_10", "Iniciante", "Complete 10 quizzes",
            "help-circle", ["#3b82f6", "#6366f1"], AchievementType.Quiz, AchievementTrigger.OnQuizComplete, 10, 3);

        await CreateAchievementAsync("QUIZ_50", "Estudioso", "Complete 50 quizzes",
            "help-circle", ["#6366f1", "#8b5cf6"], AchievementType.Quiz, AchievementTrigger.OnQuizComplete, 50, 4);

        await CreateAchievementAsync("QUIZ_100", "Mestre dos Quizzes", "Complete 100 quizzes",
            "trophy", ["#facc15", "#f97316"], AchievementType.Quiz, AchievementTrigger.OnQuizComplete, 100, 5);

        // Milestone Achievements
        await CreateAchievementAsync("XP_1000", "Explorador", "Alcance 1000 XP",
            "medal", ["#7f13ec", "#9d4dff"], AchievementType.Milestone, AchievementTrigger.OnXpGain, 1000, 6);

        await CreateAchievementAsync("XP_5000", "Aventureiro", "Alcance 5000 XP",
            "medal", ["#9d4dff", "#c084fc"], AchievementType.Milestone, AchievementTrigger.OnXpGain, 5000, 7);

        await CreateAchievementAsync("LEVEL_10", "Veterano", "Alcance o nível 10",
            "star", ["#eab308", "#f59e0b"], AchievementType.Milestone, AchievementTrigger.OnXpGain, 10, 8);

        // Accuracy Achievements
        await CreateAchievementAsync("ACCURACY_80", "Atirador", "Mantenha 80% de acerto em 50+ questões",
            "target", ["#22c55e", "#16a34a"], AchievementType.Accuracy, AchievementTrigger.OnQuizComplete, 80, 9);

        await CreateAchievementAsync("ACCURACY_90", "Sniper", "Mantenha 90% de acerto em 100+ questões",
            "target", ["#16a34a", "#15803d"], AchievementType.Accuracy, AchievementTrigger.OnQuizComplete, 90, 10);

        // Subject Achievements (placeholders)
        await CreateAchievementAsync("MATH_MASTER", "Rei da Matemática", "Domine 100 questões de matemática com 85%+ de acerto",
            "calculator", ["#4ade80", "#14b8a6"], AchievementType.Subject, AchievementTrigger.OnQuizComplete, 85, 11);

        await CreateAchievementAsync("HISTORY_MASTER", "Maratona Histórica", "Domine 100 questões de história com 85%+ de acerto",
            "book-open-page-variant", ["#60a5fa", "#6366f1"], AchievementType.Subject, AchievementTrigger.OnQuizComplete, 85, 12);
    }

    private async Task CreateAchievementAsync(
        string code, string title, string description,
        string icon, string[] gradientColors,
        AchievementType type, AchievementTrigger trigger,
        int requiredValue, int order)
    {
        var achievement = new Achievement(
            _guidGenerator.Create(),
            code, title, type, trigger, requiredValue)
        {
            Description = description,
            Icon = icon,
            GradientColors = JsonSerializer.Serialize(gradientColors),
            Order = order,
            IsActive = true
        };

        await _achievementRepository.InsertAsync(achievement);
    }
}
