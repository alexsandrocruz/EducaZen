namespace EstudaZen.Achievements;

/// <summary>
/// Tipo/categoria da conquista
/// </summary>
public enum AchievementType
{
    /// <summary>
    /// Conquistas de sequência de dias
    /// </summary>
    Streak = 0,
    
    /// <summary>
    /// Conquistas de quantidade de quizzes
    /// </summary>
    Quiz = 1,
    
    /// <summary>
    /// Conquistas de precisão/acerto
    /// </summary>
    Accuracy = 2,
    
    /// <summary>
    /// Conquistas por matéria específica
    /// </summary>
    Subject = 3,
    
    /// <summary>
    /// Conquistas de marcos (XP, nível)
    /// </summary>
    Milestone = 4,
    
    /// <summary>
    /// Conquistas especiais/eventos
    /// </summary>
    Special = 5
}
