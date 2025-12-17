using System;
using EstudaZen.Exams;
using Volo.Abp.Application.Dtos;

namespace EstudaZen.Rankings;

public class RankingFilterDto
{
    public Guid? SubjectId { get; set; }
    public Guid? SchoolId { get; set; }
    public ExamType? ExamType { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public int MaxResultCount { get; set; } = 10;
}

public class StudentRankingDto : EntityDto<Guid>
{
    public string Name { get; set; } = null!;
    public string SchoolName { get; set; } = null!;
    public string? PhotoUrl { get; set; }
    public int Rank { get; set; }
    public decimal Score { get; set; }
    public int ExamsCompleted { get; set; }
}

public class SchoolRankingDto : EntityDto<Guid>
{
    public string Name { get; set; } = null!;
    public string City { get; set; } = null!;
    public int Rank { get; set; }
    public decimal AverageScore { get; set; }
    public int ActiveStudents { get; set; }
}

public class TeacherRankingDto : EntityDto<Guid>
{
    public string Name { get; set; } = null!;
    public string SubjectName { get; set; } = null!;
    public int Rank { get; set; }
    public decimal AverageClassScore { get; set; }
}
