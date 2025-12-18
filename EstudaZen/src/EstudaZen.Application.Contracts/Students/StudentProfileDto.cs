using System;
using System.Collections.Generic;
using EstudaZen.Achievements;

namespace EstudaZen.Students;

/// <summary>
/// DTO completo do perfil do aluno para tela de perfil
/// </summary>
public class StudentProfileDto
{
    #region User Info

    public Guid Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? PhotoUrl { get; set; }
    public StudentStatus Status { get; set; }

    #endregion

    #region Level & XP

    public int CurrentLevel { get; set; }
    public string LevelTitle { get; set; } = "Explorador";
    public int CurrentXp { get; set; }
    public int RequiredXpForNextLevel { get; set; }
    public int XpToNextLevel { get; set; }

    #endregion

    #region Stats

    public int StreakDays { get; set; }
    public int Ranking { get; set; }
    public int AccuracyPercent { get; set; }
    public int TotalQuestions { get; set; }
    public int TotalCorrectAnswers { get; set; }
    public int TotalQuizzes { get; set; }

    #endregion

    #region Achievements

    public List<AchievementDto> Achievements { get; set; } = new();
    public int TotalAchievements { get; set; }
    public int UnlockedAchievements { get; set; }

    #endregion
}
