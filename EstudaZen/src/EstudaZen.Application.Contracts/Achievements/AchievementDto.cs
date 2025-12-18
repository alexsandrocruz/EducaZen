using System;

namespace EstudaZen.Achievements;

/// <summary>
/// DTO para exibição de conquista com status de desbloqueio
/// </summary>
public class AchievementDto
{
    public Guid Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string Icon { get; set; } = "trophy";
    public string[] GradientColors { get; set; } = ["#7f13ec", "#9d4dff"];
    public AchievementType Type { get; set; }
    public bool IsUnlocked { get; set; }
    public DateTime? UnlockedAt { get; set; }
    public int Order { get; set; }
}
