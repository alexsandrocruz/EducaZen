using System;
using Volo.Abp.Application.Dtos;

namespace EstudaZen.Students;

/// <summary>
/// DTO for Student profile
/// </summary>
public class StudentDto : EntityDto<Guid>
{
    public Guid UserId { get; set; }
    public string UserName { get; set; } = null!;
    public string? Email { get; set; }
    public Guid? SchoolId { get; set; }
    public string? SchoolName { get; set; }
    public Guid? ClassId { get; set; }
    
    // Personal Information
    public string? FullName { get; set; }
    public string? CPF { get; set; }
    public DateTime? BirthDate { get; set; }
    public string? Gender { get; set; }
    public string? PhotoUrl { get; set; }
    public string? Phone { get; set; }
    public string? EnrollmentNumber { get; set; }
    public DateTime? EnrollmentDate { get; set; }
    public StudentStatus Status { get; set; }
    
    // Gamification stats
    public int TotalXp { get; set; }
    public int CurrentLevel { get; set; }
    public int CurrentStreak { get; set; }
    public int HighestStreak { get; set; }
    public int TotalQuizzes { get; set; }
    public int TotalCorrectAnswers { get; set; }
    public DateTime? LastActivityAt { get; set; }
    
    // Level progress
    public int XpToNextLevel { get; set; }
    public int XpInCurrentLevel { get; set; }
    public double LevelProgressPercentage { get; set; }
}

/// <summary>
/// DTO for ranking entry
/// </summary>
public class RankingEntryDto
{
    public int Rank { get; set; }
    public Guid StudentId { get; set; }
    public string StudentName { get; set; } = null!;
    public string? AvatarUrl { get; set; }
    public string? SchoolName { get; set; }
    public int TotalXp { get; set; }
    public int Level { get; set; }
    public int CurrentStreak { get; set; }
    public bool IsCurrentUser { get; set; }
}

/// <summary>
/// Input for ranking list
/// </summary>
public class GetRankingDto : PagedResultRequestDto
{
    public RankingScope Scope { get; set; } = RankingScope.School;
    public Guid? SchoolId { get; set; }
}

/// <summary>
/// Ranking scope filter
/// </summary>
public enum RankingScope
{
    School,
    Tenant,
    Global
}
