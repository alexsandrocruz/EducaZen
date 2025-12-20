using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Users;

namespace EstudaZen.Students;

public class StudentAppService : ApplicationService, IStudentAppService
{
    private readonly IStudentRepository _studentRepository;
    private readonly StudentMapper _studentMapper;
    private readonly ICurrentUser _currentUser;

    public StudentAppService(
        IStudentRepository studentRepository,
        StudentMapper studentMapper,
        ICurrentUser currentUser)
    {
        _studentRepository = studentRepository;
        _studentMapper = studentMapper;
        _currentUser = currentUser;
    }

    public async Task<StudentDto> GetMyProfileAsync()
    {
        if (!_currentUser.Id.HasValue)
            throw new Volo.Abp.Authorization.AbpAuthorizationException("User not authenticated");

        var student = await _studentRepository.FindByUserIdAsync(_currentUser.Id.Value);
        if (student == null)
        {
            // Auto-create student profile if it doesn't exist
            student = new Student(GuidGenerator.Create(), _currentUser.Id.Value, CurrentTenant.Id);
            await _studentRepository.InsertAsync(student);
        }

        return _studentMapper.Map(student);
    }

    public async Task<PagedResultDto<RankingEntryDto>> GetRankingAsync(GetRankingDto input)
    {
        // For MVP, we'll focus on simple query ranking
        // In production with millions of users, this should read from Redis
        
        var count = 50; // Fixed top 50 for now
        var students = await _studentRepository.GetTopByXpAsync(count, input.SchoolId);
        
        var dtos = students.Select((s, index) => new RankingEntryDto
        {
            Rank = index + 1,
            StudentId = s.Id,
            StudentName = "Student " + s.Id.ToString().Substring(0, 4), // Placeholder for real name
            TotalXp = s.TotalXp,
            Level = s.CurrentLevel,
            CurrentStreak = s.CurrentStreak,
            IsCurrentUser = _currentUser.Id.HasValue && s.UserId == _currentUser.Id.Value,
            SchoolName = s.School?.Name
        }).ToList();

        return new PagedResultDto<RankingEntryDto>(dtos.Count, dtos);
    }

    public async Task<RankingEntryDto> GetMyRankingAsync(RankingScope scope)
    {
        var profile = await GetMyProfileAsync();
        var rank = await _studentRepository.GetRankByXpAsync(profile.Id, profile.SchoolId);
        
        return new RankingEntryDto
        {
            Rank = rank,
            StudentId = profile.Id,
            StudentName = profile.UserName,
            TotalXp = profile.TotalXp,
            Level = profile.CurrentLevel,
            CurrentStreak = profile.CurrentStreak,
            IsCurrentUser = true,
            SchoolName = profile.SchoolName
        };
    }
}
