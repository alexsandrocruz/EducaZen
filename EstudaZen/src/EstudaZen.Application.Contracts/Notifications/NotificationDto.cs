using System;

namespace EstudaZen.Notifications;

/// <summary>
/// DTO para exibição de notificação
/// </summary>
public class NotificationDto
{
    public Guid Id { get; set; }
    public NotificationType Type { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public string Icon { get; set; } = "bell";
    public string? ActionUrl { get; set; }
    public bool IsRead { get; set; }
    public DateTime CreationTime { get; set; }
    
    /// <summary>
    /// Tempo relativo (ex: "há 5 minutos")
    /// </summary>
    public string RelativeTime { get; set; } = string.Empty;
}

/// <summary>
/// DTO para lista de notificações
/// </summary>
public class NotificationListResultDto
{
    public int UnreadCount { get; set; }
    public int TotalCount { get; set; }
    public NotificationDto[] Items { get; set; } = [];
}
