namespace EstudaZen.Achievements;

/// <summary>
/// Gatilho que dispara a verificação de conquistas
/// </summary>
public enum AchievementTrigger
{
    /// <summary>
    /// Verificar ao completar um quiz
    /// </summary>
    OnQuizComplete = 0,
    
    /// <summary>
    /// Verificar ao fazer login/carregar dashboard
    /// </summary>
    OnLogin = 1,
    
    /// <summary>
    /// Verificar quando streak é atualizado
    /// </summary>
    OnStreak = 2,
    
    /// <summary>
    /// Verificar quando XP é adicionado
    /// </summary>
    OnXpGain = 3,
    
    /// <summary>
    /// Verificar manualmente (admin)
    /// </summary>
    Manual = 4
}
