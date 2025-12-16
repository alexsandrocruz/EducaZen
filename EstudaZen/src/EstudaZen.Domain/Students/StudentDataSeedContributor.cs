using System;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Guids;
using Volo.Abp.Identity;
using Volo.Abp.MultiTenancy;

namespace EstudaZen.Students;

public class StudentDataSeedContributor : IDataSeedContributor, ITransientDependency
{
    private readonly IStudentRepository _studentRepository;
    private readonly IdentityUserManager _userManager;
    private readonly IGuidGenerator _guidGenerator;
    private readonly ICurrentTenant _currentTenant;

    public StudentDataSeedContributor(
        IStudentRepository studentRepository,
        IdentityUserManager userManager,
        IGuidGenerator guidGenerator,
        ICurrentTenant currentTenant)
    {
        _studentRepository = studentRepository;
        _userManager = userManager;
        _guidGenerator = guidGenerator;
        _currentTenant = currentTenant;
    }

    public async Task SeedAsync(DataSeedContext context)
    {
        if (await _studentRepository.GetCountAsync() > 0)
        {
            return;
        }

        /* Create 5 seed students */
        for (int i = 1; i <= 5; i++)
        {
            var email = $"student{i}@estudazen.com";
            var existingUser = await _userManager.FindByEmailAsync(email);
            
            Guid userId;
            
            if (existingUser == null)
            {
                var user = new IdentityUser(_guidGenerator.Create(), email, email, context.TenantId);
                var result = await _userManager.CreateAsync(user, "123456Aa*");
                
                if (!result.Succeeded)
                {
                    // Log or ignore?
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

            var student = new Student(_guidGenerator.Create(), userId, context.TenantId);
            student.FullName = $"Student {i} Seed";
            student.Email = email;
            student.Status = StudentStatus.Active;
            student.BirthDate = DateTime.Now.AddYears(-15 - i); // Approx age 16-20
            student.Gender = i % 2 == 0 ? "Female" : "Male";
            student.Phone = "1199999999" + i;
            
            // Randomly assign XP/Level
            student.AddXp(i * 500); 

            await _studentRepository.InsertAsync(student, autoSave: true);
        }
    }
}
