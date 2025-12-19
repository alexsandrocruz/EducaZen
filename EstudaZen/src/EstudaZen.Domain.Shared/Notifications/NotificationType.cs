namespace EstudaZen.Notifications;

/// <summary>
/// Tipo de notificação
/// </summary>
public enum NotificationType
{
    /// <summary>
    /// Conquista desbloqueada
    /// </summary>
    Achievement = 0,
    
    /// <summary>
    /// Resultado de quiz/prova
    /// </summary>
    Quiz = 1,
    
    /// <summary>
    /// Mensagem do sistema
    /// </summary>
    System = 2,
    
    /// <summary>
    /// Alerta de sequência (streak)
    /// </summary>
    Streak = 3,
    
    /// <summary>
    /// Mudança no ranking
    /// </summary>
    Ranking = 4,
    
    /// <summary>
    /// Dica de estudo
    /// </summary>
    Tip = 5
}
