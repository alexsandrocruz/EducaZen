using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EstudaZen.Schools;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Identity;

namespace EstudaZen.Students;

[RemoteService(IsEnabled = true)]
[AllowAnonymous]
public class StudentAuthAppService : ApplicationService, IStudentAuthAppService
{
    private readonly IdentityUserManager _userManager;
    private readonly IRepository<Student, Guid> _studentRepository;
    private readonly IRepository<School, Guid> _schoolRepository;

    public StudentAuthAppService(
        IdentityUserManager userManager,
        IRepository<Student, Guid> studentRepository,
        IRepository<School, Guid> schoolRepository)
    {
        _userManager = userManager;
        _studentRepository = studentRepository;
        _schoolRepository = schoolRepository;
    }

    public async Task RegisterAsync(RegisterStudentDto input)
    {
        // TODO: Reimplementar com lógica de código de escola
        // Ver student-registration-plan.md para implementação completa
        throw new NotImplementedException("RegisterAsync será reimplementado com lógica de código de escola");
        
        /*
        // 1. Validate School
        var school = await _schoolRepository.GetAsync(input.SchoolId);
        if (school == null)
        {
            throw new UserFriendlyException("Escola invelida ou nao encontrada.");
        }

        // 2. Create Identity User
        // We use the tenant of the school for the user
        using (CurrentTenant.Change(school.TenantId))
        {
            var user = new IdentityUser(
                GuidGenerator.Create(),
                input.Name.Replace(" ", ""), // Minimal username, usually not used for login if email is unique
                input.Email,
                school.TenantId
            );
            user.Name = input.Name;
            user.SetEmailConfirmed(true); // Auto confirm for now for MVP

            var result = await _userManager.CreateAsync(user, input.Password);
            if (!result.Succeeded)
            {
                throw new UserFriendlyException(string.Join(", ", result.Errors.Select(e => e.Description)));
            }
            
            // Assign Role "student" (Optional: check if role exists first)
            // await _userManager.AddToRoleAsync(user, "student"); 

            // 3. Create Student Entity
            var student = new Student(
                GuidGenerator.Create(),
                user.Id,
                school.TenantId
            )
            {
                SchoolId = school.Id,
                FullName = input.Name,
                Email = input.Email,
                Status = StudentStatus.Active
            };

            await _studentRepository.InsertAsync(student);
        }
        */
    }

    public async Task<ListResultDto<SchoolDto>> GetSchoolsLookupAsync(string? filter = null)
    {
        var query = await _schoolRepository.GetQueryableAsync();
        
        // Basic filter
        query = query.WhereIf(!string.IsNullOrWhiteSpace(filter), x => x.Name.Contains(filter!));

        // Assuming modest number of schools for MVP lookup specific to registration
        var schools = await AsyncExecuter.ToListAsync(query.Take(50));

        return new ListResultDto<SchoolDto>(
            ObjectMapper.Map<List<School>, List<SchoolDto>>(schools)
        );
    }
}
