using System;
using System.Linq;
using System.Threading.Tasks;
using EstudaZen.Rankings;
using EstudaZen.Schools;
using EstudaZen.Students;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.MultiTenancy;

namespace EstudaZen.Dashboards;

[Authorize]
public class DashboardAppService : ApplicationService, IDashboardAppService
{
    private readonly IRepository<Student, Guid> _studentRepository;
    private readonly IRepository<School, Guid> _schoolRepository;
    private readonly IRankingAppService _rankingAppService;
    private readonly ICurrentTenant _currentTenant;

    public DashboardAppService(
        IRepository<Student, Guid> studentRepository,
        IRepository<School, Guid> schoolRepository,
        IRankingAppService rankingAppService,
        ICurrentTenant currentTenant)
    {
        _studentRepository = studentRepository;
        _schoolRepository = schoolRepository;
        _rankingAppService = rankingAppService;
        _currentTenant = currentTenant;
    }

    public async Task<HostDashboardDto> GetHostDashboardAsync()
    {
        // For Host, we disable tenant filter to see global stats
        using (_currentTenant.Change(null))
        {
            var totalStudents = await _studentRepository.CountAsync();
            var totalCities = (await _schoolRepository.GetQueryableAsync())
                .Select(s => s.TenantId)
                .Distinct()
                .Count();

            // Mocking financial data for now
            return new HostDashboardDto
            {
                TotalMrr = 125000,
                ActiveCities = totalCities,
                TotalStudents = totalStudents,
                SubscriptionHealth = new SubscriptionHealthDto
                {
                    Total = 50,
                    Active = 40,
                    Trial = 7,
                    Expired = 3
                },
                RecentUpdates = new System.Collections.Generic.List<ActivityFeedItemDto>
                {
                    new() { Title = "Pref. de Curitiba", Description = "Plan renewed", Status = "Active" },
                    new() { Title = "Pref. de Osasco", Description = "Trial ending soon", Status = "Trial" }
                }
            };
        }
    }

    public async Task<TenantDashboardDto> GetTenantDashboardAsync()
    {
        if (!_currentTenant.Id.HasValue)
        {
            // If called by Host without tenant, return empty or throw
            return new TenantDashboardDto(); 
        }

        var totalSchools = await _schoolRepository.CountAsync();
        var totalStudents = await _studentRepository.CountAsync();

        // Get Top Schools
        var schoolRanking = await _rankingAppService.GetSchoolRankingAsync(new RankingFilterDto
        {
            MaxResultCount = 100 // Get enough to find top and bottom
        });

        var avgScore = schoolRanking.Any() ? schoolRanking.Average(s => s.AverageScore) : 0;

        return new TenantDashboardDto
        {
            TotalSchools = totalSchools,
            TotalStudents = totalStudents,
            AverageScore = avgScore,
            TopSchools = schoolRanking.Take(5).ToList(),
            SchoolsNeedingSupport = schoolRanking.OrderBy(s => s.AverageScore).Take(5).ToList()
        };
    }

    public async Task<SchoolDashboardDto> GetSchoolDashboardAsync()
    {
        // Determine SchoolId for current user
        // This assumes the user is either a School Admin or a Student/Teacher linked to a school
        // For MVP, if the user is a School Admin, we need a way to know their SchoolId.
        // Usually stored in claims or looked up via IdentityUser -> School link.
        
        // Strategy: Look up Student profile first. If not found, look up (future) Teacher profile.
        // If neither, assuming it's an admin with context.
        // For now, let's try to get SchoolId from Student profile if exists.
        
        Guid? schoolId = null;
        var student = await _studentRepository.FirstOrDefaultAsync(s => s.UserId == CurrentUser.Id);
        if (student != null)
        {
            schoolId = student.SchoolId;
        }
        else
        {
            // Maybe it's a school admin user? 
            // We'll define a workaround or return empty if no school context found.
            // In a real scenario, we'd have an Admin -> School mapping entity.
        }

        if (schoolId == null)
        {
            // If user has no school context, return empty.
            return new SchoolDashboardDto();
        }

        var studentsRanking = await _rankingAppService.GetStudentRankingAsync(new RankingFilterDto
        {
            SchoolId = schoolId.Value,
            MaxResultCount = 100
        });

        var avgScore = studentsRanking.Any() ? studentsRanking.Average(s => s.Score) : 0;

        return new SchoolDashboardDto
        {
            ActiveStudents = studentsRanking.Count, // Approximation
            TotalExamsTaken = studentsRanking.Sum(s => s.ExamsCompleted),
            AverageScore = avgScore,
            TopStudents = studentsRanking.Take(5).ToList(),
            StudentsNeedingSupport = studentsRanking.OrderBy(s => s.Score).Take(5).ToList(),
            TeachersNeedingSupport = new System.Collections.Generic.List<TeacherRankingDto>() // Not implemented
        };
    }
}
