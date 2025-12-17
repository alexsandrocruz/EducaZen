using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EstudaZen.Dashboards;
using EstudaZen.Exams;
using EstudaZen.Schools;
using EstudaZen.Students;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace EstudaZen.Rankings;

public class RankingAppService : ApplicationService, IRankingAppService
{
    private readonly IRepository<ExamSession, Guid> _sessionRepository;
    private readonly IRepository<Student, Guid> _studentRepository;
    private readonly IRepository<School, Guid> _schoolRepository;
    private readonly IRepository<Exam, Guid> _examRepository;

    public RankingAppService(
        IRepository<ExamSession, Guid> sessionRepository,
        IRepository<Student, Guid> studentRepository,
        IRepository<School, Guid> schoolRepository,
        IRepository<Exam, Guid> examRepository)
    {
        _sessionRepository = sessionRepository;
        _studentRepository = studentRepository;
        _schoolRepository = schoolRepository;
        _examRepository = examRepository;
    }

    public async Task<List<StudentRankingDto>> GetStudentRankingAsync(RankingFilterDto input)
    {
        // 1. Get Sessions Query
        var query = await _sessionRepository.GetQueryableAsync();
        var studentsQuery = await _studentRepository.GetQueryableAsync();

        // 2. Filter by Date
        if (input.StartDate.HasValue)
            query = query.Where(s => s.StartedAt >= input.StartDate.Value);
        if (input.EndDate.HasValue)
            query = query.Where(s => s.StartedAt <= input.EndDate.Value);

        // 3. Join with Students to filter by School
        var joinQuery = from session in query
                        join student in studentsQuery on session.StudentId equals student.Id
                        join school in await _schoolRepository.GetQueryableAsync() on student.SchoolId equals school.Id
                        where session.Status == ExamSessionStatus.Completed
                        select new { session, student, school };

        if (input.SchoolId.HasValue)
        {
            joinQuery = joinQuery.Where(x => x.student.SchoolId == input.SchoolId.Value);
        }

        // 4. Group by Student and Calculate Scores
        var rankingQuery = joinQuery
            .GroupBy(x => new { x.student.Id, x.student.FullName, x.student.PhotoUrl, SchoolName = x.school.Name })
            .Select(g => new
            {
                StudentId = g.Key.Id,
                Name = g.Key.FullName,
                PhotoUrl = g.Key.PhotoUrl,
                SchoolName = g.Key.SchoolName,
                TotalScore = g.Sum(x => x.session.Score ?? 0),
                ExamsCount = g.Count()
            })
            .OrderByDescending(x => x.TotalScore)
            .Take(input.MaxResultCount);

        var ranking = await AsyncExecuter.ToListAsync(rankingQuery);

        // 5. Map to DTO
        return ranking.Select((r, index) => new StudentRankingDto
        {
            Id = r.StudentId,
            Name = r.Name ?? "Aluno",
            SchoolName = r.SchoolName,
            PhotoUrl = r.PhotoUrl,
            Rank = index + 1,
            Score = r.TotalScore,
            ExamsCompleted = r.ExamsCount
        }).ToList();
    }

    public async Task<List<SchoolRankingDto>> GetSchoolRankingAsync(RankingFilterDto input)
    {
        var sessionQuery = await _sessionRepository.GetQueryableAsync();
        var studentQuery = await _studentRepository.GetQueryableAsync();
        var schoolQuery = await _schoolRepository.GetQueryableAsync();

        // Filter valid sessions
        sessionQuery = sessionQuery.Where(s => s.Status == ExamSessionStatus.Completed);

        if (input.StartDate.HasValue)
            sessionQuery = sessionQuery.Where(s => s.StartedAt >= input.StartDate.Value);
        if (input.EndDate.HasValue)
            sessionQuery = sessionQuery.Where(s => s.StartedAt <= input.EndDate.Value);

        // Join to link Session -> Student -> School
        var query = from session in sessionQuery
                    join student in studentQuery on session.StudentId equals student.Id
                    join school in schoolQuery on student.SchoolId equals school.Id
                    where school.TenantId == CurrentTenant.Id // Rank within current tenant context usually
                    select new { school, session };

        // Group by School
        var rankingQuery = query
            .GroupBy(x => new { x.school.Id, x.school.Name, x.school.City })
            .Select(g => new
            {
                SchoolId = g.Key.Id,
                Name = g.Key.Name,
                City = g.Key.City,
                AvgScore = g.Average(x => x.session.Score ?? 0),
                ActiveStudents = g.Select(x => x.session.StudentId).Distinct().Count()
            })
            .OrderByDescending(x => x.AvgScore)
            .Take(input.MaxResultCount);
        
        var ranking = await AsyncExecuter.ToListAsync(rankingQuery);

        return ranking.Select((r, index) => new SchoolRankingDto
        {
            Id = r.SchoolId,
            Name = r.Name,
            City = r.City ?? "",
            Rank = index + 1,
            AverageScore = Math.Round(r.AvgScore, 2),
            ActiveStudents = r.ActiveStudents
        }).ToList();
    }

    public async Task<List<TeacherRankingDto>> GetTeacherRankingAsync(RankingFilterDto input)
    {
        // Teacher entity not yet implemented in Domain.
        // Returning empty list for MVP.
        return await Task.FromResult(new List<TeacherRankingDto>());
    }
}
