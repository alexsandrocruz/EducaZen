using System;
using EstudaZen.Schools;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;

namespace EstudaZen.Students;

/// <summary>
/// Extended student profile linked to IdentityUser
/// </summary>
public class Student : FullAuditedAggregateRoot<Guid>, IMultiTenant
{
    public Guid? TenantId { get; protected set; }

    /// <summary>
    /// Link to ABP IdentityUser
    /// </summary>
    public Guid UserId { get; private set; }

    /// <summary>
    /// Optional school association
    /// </summary>
    public Guid? SchoolId { get; set; }
    public School? School { get; set; }

    #region Gamification Stats

    /// <summary>
    /// Total experience points earned
    /// </summary>
    public int TotalXp { get; private set; }

    /// <summary>
    /// Current level (calculated from XP)
    /// </summary>
    public int CurrentLevel { get; private set; } = 1;

    /// <summary>
    /// Current daily streak count
    /// </summary>
    public int CurrentStreak { get; private set; }

    /// <summary>
    /// Highest streak ever achieved
    /// </summary>
    public int HighestStreak { get; private set; }

    /// <summary>
    /// Total quizzes completed
    /// </summary>
    public int TotalQuizzes { get; private set; }

    /// <summary>
    /// Total questions answered correctly
    /// </summary>
    public int TotalCorrectAnswers { get; private set; }

    /// <summary>
    /// Last activity timestamp for streak calculation
    /// </summary>
    public DateTime? LastActivityAt { get; private set; }

    #endregion

    #region ENEM Scores

    /// <summary>
    /// ENEM score - Linguagens
    /// </summary>
    public int? EnemScoreLinguagens { get; set; }

    /// <summary>
    /// ENEM score - Matemática
    /// </summary>
    public int? EnemScoreMatematica { get; set; }

    /// <summary>
    /// ENEM score - Ciências Humanas
    /// </summary>
    public int? EnemScoreCienciasHumanas { get; set; }

    /// <summary>
    /// ENEM score - Ciências da Natureza
    /// </summary>
    public int? EnemScoreCienciasNatureza { get; set; }

    /// <summary>
    /// ENEM score - Redação
    /// </summary>
    public int? EnemScoreRedacao { get; set; }

    #endregion

    protected Student() { }

    public Student(Guid id, Guid userId, Guid? tenantId = null) : base(id)
    {
        UserId = userId;
        TenantId = tenantId;
    }

    /// <summary>
    /// Add XP and recalculate level
    /// </summary>
    public void AddXp(int xp)
    {
        if (xp <= 0) return;

        TotalXp += xp;
        CurrentLevel = CalculateLevel(TotalXp);
        LastActivityAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Update streak based on activity
    /// </summary>
    public void UpdateStreak()
    {
        var now = DateTime.UtcNow.Date;
        var lastActivity = LastActivityAt?.Date;

        if (lastActivity == null || (now - lastActivity.Value).Days > 1)
        {
            // Streak broken or first activity
            CurrentStreak = 1;
        }
        else if ((now - lastActivity.Value).Days == 1)
        {
            // Consecutive day
            CurrentStreak++;
            if (CurrentStreak > HighestStreak)
                HighestStreak = CurrentStreak;
        }
        // Same day = no change

        LastActivityAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Record quiz completion
    /// </summary>
    public void RecordQuizCompletion(int correctAnswers)
    {
        TotalQuizzes++;
        TotalCorrectAnswers += correctAnswers;
    }

    private static int CalculateLevel(int xp)
    {
        // Level formula: level = sqrt(xp / 100) + 1
        // Level 1: 0-99 XP, Level 2: 100-399 XP, Level 3: 400-899 XP, etc.
        return (int)Math.Floor(Math.Sqrt(xp / 100.0)) + 1;
    }
}
