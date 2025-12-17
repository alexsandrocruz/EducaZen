using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Users;
using Volo.Abp.Identity;
using EstudaZen.Permissions;
using Microsoft.AspNetCore.Authorization;

namespace EstudaZen.Students;

public class StudentAppService : ApplicationService, IStudentAppService
{
    private readonly IStudentRepository _studentRepository;
    private readonly StudentMapper _studentMapper;
    private readonly ICurrentUser _currentUser;
    private readonly IdentityUserManager _userManager;

    public StudentAppService(
        IStudentRepository studentRepository,
        StudentMapper studentMapper,
        ICurrentUser currentUser,
        IdentityUserManager userManager)
    {
        _studentRepository = studentRepository;
        _studentMapper = studentMapper;
        _currentUser = currentUser;
        _userManager = userManager;
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


    [Authorize(EstudaZenPermissions.Students.Default)]
    public async Task<PagedResultDto<StudentDto>> GetListAsync(GetStudentListDto input)
    {
        var query = await _studentRepository.GetQueryableAsync();

        if (!string.IsNullOrWhiteSpace(input.Filter))
        {
            var filter = input.Filter.ToLower();
            query = query.Where(x => x.FullName.ToLower().Contains(filter) || x.Email.ToLower().Contains(filter));
        }

        if (input.ClassId.HasValue)
        {
            query = query.Where(x => x.ClassId == input.ClassId.Value);
        }

        if (input.Status.HasValue)
        {
            query = query.Where(x => x.Status == input.Status.Value);
        }

        var totalCount = query.Count();

        query = query.OrderBy(x => x.FullName)
                     .Skip(input.SkipCount)
                     .Take(input.MaxResultCount);

        var students = query.ToList();
        var dtos = students.Select(x => _studentMapper.Map(x)).ToList();

        return new PagedResultDto<StudentDto>(totalCount, dtos);
    }

    [Authorize(EstudaZenPermissions.Students.Default)]
    public async Task<StudentDto> GetAsync(Guid id)
    {
        var student = await _studentRepository.GetAsync(id);
        return _studentMapper.Map(student);
    }

    [Authorize(EstudaZenPermissions.Students.Create)]
    public async Task<StudentDto> CreateAsync(CreateUpdateStudentDto input)
    {
        // 1. Check if user already exists
        var existingUser = await _userManager.FindByEmailAsync(input.Email);
        if (existingUser != null)
        {
             // Check if already linked
             var existingStudent = await _studentRepository.FindByUserIdAsync(existingUser.Id);
             if (existingStudent != null)
             {
                 throw new Volo.Abp.BusinessException("EstudaZen:StudentAlreadyExists").WithData("email", input.Email);
             }
             
             // If user exists but no student profile, we can link it.
             // But for manual creation, we usually expect to create a NEW user.
        }

        // 2. Create IdentityUser
        // Default password for manually created students (should be changed later or emailed)
        var defaultPassword = "Password123!"; 
        var user = new IdentityUser(GuidGenerator.Create(), input.Email, input.Email, CurrentTenant.Id);
        user.Name = input.FullName;
        
        var result = await _userManager.CreateAsync(user, defaultPassword);
        if (!result.Succeeded)
        {
            throw new Volo.Abp.BusinessException("EstudaZen:UserCreationFailure")
                .WithData("errors", string.Join(", ", result.Errors.Select(e => e.Description)));
        }

        // 3. Create Student
        var student = new Student(GuidGenerator.Create(), user.Id, CurrentTenant.Id);
        student.FullName = input.FullName;
        student.Email = input.Email;
        student.BirthDate = input.BirthDate;
        student.Phone = input.Phone;
        student.Gender = input.Gender;
        student.CPF = input.CPF;
        student.ClassId = input.ClassId;
        student.Status = input.Status;
        
        await _studentRepository.InsertAsync(student);
        
        return _studentMapper.Map(student);
    }
    
    [Authorize(EstudaZenPermissions.Students.Edit)]
    public async Task<StudentDto> UpdateAsync(Guid id, CreateUpdateStudentDto input)
    {
        var student = await _studentRepository.GetAsync(id);
        
        // Update fields
        student.FullName = input.FullName;
        student.Email = input.Email;
        student.BirthDate = input.BirthDate;
        student.Phone = input.Phone;
        student.Gender = input.Gender;
        student.CPF = input.CPF;
        student.ClassId = input.ClassId;
        student.Status = input.Status;

        await _studentRepository.UpdateAsync(student);
        return _studentMapper.Map(student);
    }

    [Authorize(EstudaZenPermissions.Students.Delete)]
    public async Task DeleteAsync(Guid id)
    {
        await _studentRepository.DeleteAsync(id);
    }

    // Métodos para aprovação de alunos

    [Authorize(EstudaZenPermissions.Students.Default)]
    public async Task<List<PendingStudentDto>> GetPendingStudentsAsync()
    {
        // Buscar alunos PENDING do tenant atual
        var pendingStudents = await _studentRepository.GetListAsync(
            s => s.Status == StudentStatus.PENDING
        );

        return ObjectMapper.Map<List<Student>, List<PendingStudentDto>>(pendingStudents);
    }

    [Authorize(EstudaZenPermissions.Students.Edit)]
    public async Task ApproveStudentAsync(ApproveStudentDto input)
    {
        var student = await _studentRepository.GetAsync(input.StudentId);

        // Verificar se student pertence ao tenant atual (segurança)
        if (student.TenantId != CurrentTenant.Id)
        {
            throw new Volo.Abp.BusinessException("EstudaZen:AccessDenied")
                .WithData("message", "Acesso negado!");
        }

        student.Status = input.Approved ? StudentStatus.APPROVED : StudentStatus.REJECTED;

        await _studentRepository.UpdateAsync(student);
    }
}
