using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Users;
using Volo.Abp.Identity;
using EstudaZen.Permissions;
using EstudaZen.Exams;
using EstudaZen.Tips;
using Microsoft.AspNetCore.Authorization;

namespace EstudaZen.Students;

public class StudentAppService : ApplicationService, IStudentAppService
{
    private readonly IStudentRepository _studentRepository;
    private readonly StudentMapper _studentMapper;
    private readonly ICurrentUser _currentUser;
    private readonly IdentityUserManager _userManager;
    private readonly IExamSessionRepository _examSessionRepository;
    private readonly ITipRepository _tipRepository;

    public StudentAppService(
        IStudentRepository studentRepository,
        StudentMapper studentMapper,
        ICurrentUser currentUser,
        IdentityUserManager userManager,
        IExamSessionRepository examSessionRepository,
        ITipRepository tipRepository)
    {
        _studentRepository = studentRepository;
        _studentMapper = studentMapper;
        _currentUser = currentUser;
        _userManager = userManager;
        _examSessionRepository = examSessionRepository;
        _tipRepository = tipRepository;
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

    public async Task<StudentHomeDashboardDto> GetHomeDashboardAsync()
    {
        var profile = await GetMyProfileAsync();
        
        // Calculate league name based on level
        var leagueName = GetLeagueName(profile.CurrentLevel);
        var xpToNextLeague = GetXpToNextLeague(profile.CurrentLevel);
        
        // Calculate rank percentile
        var rankPercentile = await CalculateRankPercentileAsync(profile.Id, profile.TotalXp);
        
        // Get today's stats from ExamSession
        var todayStats = await GetTodayStatsAsync(profile.Id);
        
        // Calculate accuracy rate
        var totalAnswered = profile.TotalCorrectAnswers + (profile.TotalQuizzes * 10 - profile.TotalCorrectAnswers);
        var accuracyRate = totalAnswered > 0 
            ? (decimal)profile.TotalCorrectAnswers / totalAnswered * 100  
            : 0;
        
        return new StudentHomeDashboardDto
        {
            FullName = profile.FullName ?? "Estudante",
            PhotoUrl = profile.PhotoUrl,
            Status = profile.Status,
            CurrentLevel = profile.CurrentLevel,
            LeagueName = leagueName,
            CurrentXp = profile.TotalXp,
            XpToNextLeague = xpToNextLeague,
            StreakDays = profile.CurrentStreak,
            RankPercentile = rankPercentile,
            QuestionsToday = todayStats.QuestionsAnswered,
            DailyGoal = 50,  // Configurável futuramente
            AccuracyRate = Math.Round(accuracyRate, 0),
            TotalQuestionsAnswered = totalAnswered,
            TotalCorrectAnswers = profile.TotalCorrectAnswers,
            Tips = await GetTipsAsync()
        };
    }

    private static string GetLeagueName(int level)
    {
        return level switch
        {
            <= 3 => "Bronze III",
            <= 6 => "Bronze II",
            <= 9 => "Bronze I",
            <= 12 => "Prata III",
            <= 15 => "Prata II",
            <= 18 => "Prata I",
            <= 21 => "Ouro III",
            <= 24 => "Ouro II",
            <= 27 => "Ouro I",
            <= 30 => "Platina",
            <= 35 => "Diamante",
            _ => "Mestre"
        };
    }

    private static int GetXpToNextLeague(int level)
    {
        // XP thresholds for each league tier
        // Level formula: level = sqrt(xp / 100) + 1
        // So: xp = (level - 1)^2 * 100
        var nextLeagueLevelThreshold = level switch
        {
            <= 3 => 4,   // To Bronze II
            <= 6 => 7,   // To Bronze I
            <= 9 => 10,  // To Prata III
            <= 12 => 13, // To Prata II
            <= 15 => 16, // To Prata I
            <= 18 => 19, // To Ouro III
            <= 21 => 22, // To Ouro II
            <= 24 => 25, // To Ouro I
            <= 27 => 28, // To Platina
            <= 30 => 31, // To Diamante
            <= 35 => 36, // To Mestre
            _ => level + 1
        };
        
        return (int)Math.Pow(nextLeagueLevelThreshold - 1, 2) * 100;
    }

    private async Task<int> CalculateRankPercentileAsync(Guid studentId, int studentXp)
    {
        var totalStudents = await _studentRepository.GetTotalCountAsync();
        if (totalStudents <= 1) return 1;

        var rank = await _studentRepository.GetRankByXpAsync(studentId);
        var percentile = (int)Math.Ceiling((decimal)rank / totalStudents * 100);
        
        return Math.Max(1, Math.Min(100, percentile));
    }

    private async Task<TodayStatsDto> GetTodayStatsAsync(Guid studentId)
    {
        var (totalQuestions, correctAnswers) = await _examSessionRepository.GetTodayStatsAsync(studentId);
        
        return new TodayStatsDto
        {
            QuestionsAnswered = totalQuestions,
            CorrectAnswers = correctAnswers
        };
    }

    private async Task<List<TipDto>> GetTipsAsync()
    {
        var tips = await _tipRepository.GetActiveTipsAsync(10);
        
        if (tips.Count == 0)
        {
            // Return default tips if none in database
            return GetDefaultTips();
        }
        
        return tips.Select(t => new TipDto
        {
            Id = t.Id.ToString(),
            Type = t.Type == TipType.Highlight ? "highlight" : "normal",
            Category = GetCategoryName(t.Category),
            Title = t.Title,
            Description = t.Description,
            Icon = t.Icon,
            IconColor = t.IconColor,
            IconBgColor = t.IconBgColor
        }).ToList();
    }

    private static string GetCategoryName(TipCategory category)
    {
        return category switch
        {
            TipCategory.DicaDoDia => "Dica do Dia",
            TipCategory.Novidade => "Novidade",
            TipCategory.Estudos => "Estudos",
            TipCategory.Evento => "Evento",
            _ => "Dica"
        };
    }

    private static List<TipDto> GetDefaultTips()
    {
        return new List<TipDto>
        {
            new()
            {
                Id = "1",
                Type = "highlight",
                Category = "Dica do Dia",
                Title = "Fórmula de Bhaskara",
                Description = "Revise equações de 2º grau para garantir pontos em Matemática básica.",
                Icon = "lightbulb-on",
                IconColor = "#ffffff"
            },
            new()
            {
                Id = "2",
                Type = "normal",
                Category = "Novidade",
                Title = "Edital FUVEST 2024",
                Description = "Confira as principais mudanças no formato da prova e datas de inscrição.",
                Icon = "newspaper-variant-outline",
                IconColor = "#3b82f6",
                IconBgColor = "rgba(59, 130, 246, 0.1)"
            },
            new()
            {
                Id = "3",
                Type = "normal",
                Category = "Estudos",
                Title = "Aulão de Revisão",
                Description = "Participe da live de História Geral hoje às 19h no app.",
                Icon = "school",
                IconColor = "#7f13ec",
                IconBgColor = "rgba(127, 19, 236, 0.1)"
            }
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
