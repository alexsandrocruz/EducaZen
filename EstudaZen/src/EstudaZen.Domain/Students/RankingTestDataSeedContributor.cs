using System;
using System.Threading.Tasks;
using EstudaZen.Schools;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Guids;
using Volo.Abp.Identity;
using Volo.Abp.MultiTenancy;

namespace EstudaZen.Students;

/// <summary>
/// Seeds test students with varying XP levels for ranking demonstration
/// Only runs if there are fewer than 10 students
/// </summary>
public class RankingTestDataSeedContributor : IDataSeedContributor, ITransientDependency
{
    private readonly IStudentRepository _studentRepository;
    private readonly IdentityUserManager _userManager;
    private readonly IGuidGenerator _guidGenerator;
    private readonly ICurrentTenant _currentTenant;
    private readonly SchoolDataSeedContributor _schoolDataSeedContributor;

    // Test student data: Name, XP, Streak, Quizzes, CorrectAnswers
    private readonly (string Name, int Xp, int Streak, int Quizzes, int Correct)[] _testStudents =
    [
        ("João Silva", 15000, 14, 120, 1080),
        ("Maria Oliveira", 14200, 7, 110, 990),
        ("Pedro Santos", 13800, 5, 105, 920),
        ("Ana Costa", 12500, 3, 95, 855),
        ("Lucas Pereira", 11950, 2, 90, 810),
        ("Carla Mendes", 10200, 10, 78, 702),
        ("Rafael Souza", 9800, 0, 75, 638),
        ("Beatriz Lima", 9450, 4, 72, 648),
        ("Fernando Alves", 9100, 6, 70, 630),
        ("Juliana Ferreira", 8700, 8, 67, 603),
        ("Gustavo Ribeiro", 8300, 3, 64, 576),
        ("Larissa Martins", 7900, 1, 61, 549),
        ("Bruno Nascimento", 7500, 5, 58, 522),
        ("Camila Rocha", 7100, 2, 55, 495),
        ("Diego Cardoso", 6700, 4, 52, 468),
    ];

    public RankingTestDataSeedContributor(
        IStudentRepository studentRepository,
        IdentityUserManager userManager,
        IGuidGenerator guidGenerator,
        ICurrentTenant currentTenant,
        SchoolDataSeedContributor schoolDataSeedContributor)
    {
        _studentRepository = studentRepository;
        _userManager = userManager;
        _guidGenerator = guidGenerator;
        _currentTenant = currentTenant;
        _schoolDataSeedContributor = schoolDataSeedContributor;
    }

    public async Task SeedAsync(DataSeedContext context)
    {
        // Ensure school exists first
        await _schoolDataSeedContributor.SeedAsync(context);

        // Only seed if we have fewer than 10 students
        if (await _studentRepository.GetCountAsync() >= 10)
        {
            return;
        }

        foreach (var testStudent in _testStudents)
        {
            var email = $"{testStudent.Name.ToLower().Replace(" ", ".")}@estudazen.com";
            var existingUser = await _userManager.FindByEmailAsync(email);

            Guid userId;

            if (existingUser == null)
            {
                var user = new IdentityUser(_guidGenerator.Create(), email, email, context.TenantId);
                var result = await _userManager.CreateAsync(user, "Test@123456");

                if (!result.Succeeded)
                {
                    continue;
                }
                userId = user.Id;
            }
            else
            {
                userId = existingUser.Id;
                // Check if student profile exists for this user
                if (await _studentRepository.FindByUserIdAsync(userId) != null)
                {
                    continue;
                }
            }

            var student = new Student(_guidGenerator.Create(), userId, context.TenantId)
            {
                FullName = testStudent.Name,
                Email = email,
                Status = StudentStatus.APPROVED,
                BirthDate = DateTime.Now.AddYears(-17),
                Gender = GetRandomGender(testStudent.Name),
                // Escola principal para ranking por escola (usa a escola criada pelo SchoolDataSeedContributor)
                SchoolId = SchoolDataSeedContributor.DefaultSchoolId
            };

            // Add XP (this will calculate level automatically)
            student.AddXp(testStudent.Xp);

            // Update streak
            for (int i = 0; i < testStudent.Streak; i++)
            {
                student.UpdateStreak();
            }

            // Record quiz completions
            var quizzesPerChunk = testStudent.Quizzes / 10;
            var correctPerChunk = testStudent.Correct / 10;
            for (int i = 0; i < 10; i++)
            {
                student.RecordQuizCompletion(correctPerChunk);
            }

            await _studentRepository.InsertAsync(student, autoSave: true);
        }
    }

    private static string GetRandomGender(string name)
    {
        // Simple heuristic based on common name endings
        return name.EndsWith("a") ? "Female" : "Male";
    }
}
