using System;
using System.Collections.Generic;
using EstudaZen.Rankings;

namespace EstudaZen.Dashboards;

public class HostDashboardDto
{
    public decimal TotalMrr { get; set; }
    public int ActiveCities { get; set; }
    public int TotalStudents { get; set; }
    public SubscriptionHealthDto SubscriptionHealth { get; set; } = new();
    public List<ActivityFeedItemDto> RecentUpdates { get; set; } = new();
}

public class SubscriptionHealthDto
{
    public int Total { get; set; }
    public int Active { get; set; }
    public int Trial { get; set; }
    public int Expired { get; set; }
}

public class ActivityFeedItemDto
{
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string Status { get; set; } = null!; // Active, Trial, Expired
    public string? ImageUrl { get; set; }
}

public class TenantDashboardDto
{
    public int TotalSchools { get; set; }
    public int TotalStudents { get; set; }
    public decimal AverageScore { get; set; }
    public List<SchoolRankingDto> TopSchools { get; set; } = new();
    public List<SchoolRankingDto> SchoolsNeedingSupport { get; set; } = new();
}

public class SchoolDashboardDto
{
    public int ActiveStudents { get; set; }
    public int TotalExamsTaken { get; set; }
    public decimal AverageScore { get; set; }
    public List<StudentRankingDto> TopStudents { get; set; } = new();
    public List<StudentRankingDto> StudentsNeedingSupport { get; set; } = new();
    public List<TeacherRankingDto> TeachersNeedingSupport { get; set; } = new();
}
