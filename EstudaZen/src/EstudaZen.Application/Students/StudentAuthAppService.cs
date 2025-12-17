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
        // 1. Validar se email já existe
        var existingUser = await _userManager.FindByEmailAsync(input.Email);
        if (existingUser != null)
        {
            throw new UserFriendlyException("Email já cadastrado!");
        }

        Guid? schoolId = null;
        Guid? tenantId = null;
        StudentStatus status = StudentStatus.APPROVED; // Default: aprovado (Host)

        // 2. Se informou código de escola, valida e busca escola
        if (!string.IsNullOrWhiteSpace(input.SchoolCode))
        {
            var school = await _schoolRepository.FirstOrDefaultAsync(s => s.Code == input.SchoolCode.Trim());
            
            if (school == null)
            {
                throw new UserFriendlyException($"Código de escola '{input.SchoolCode}' inválido!");
            }

            schoolId = school.Id;
            tenantId = school.TenantId;
            status = StudentStatus.PENDING; // Requer aprovação do gestor
        }

        // 3. Criar IdentityUser no tenant correto
        IdentityUser user;
        using (CurrentTenant.Change(tenantId))
        {
            user = new IdentityUser(
                GuidGenerator.Create(),
                input.Email.Replace("@", "").Replace(".", ""), // Username simplificado
                input.Email,
                tenantId
            );
            user.Name = input.Name;
            user.SetEmailConfirmed(true); // Auto-confirmar por enquanto (MVP)

            var result = await _userManager.CreateAsync(user, input.Password);
            if (!result.Succeeded)
            {
                throw new UserFriendlyException(
                    string.Join(", ", result.Errors.Select(e => e.Description))
                );
            }

            // Atribuir role "Student" (se existir)
            // await _userManager.AddToRoleAsync(user, "Student");
        }

        // 4. Criar Student entity no tenant correto
        using (CurrentTenant.Change(tenantId))
        {
            var student = new Student(
                GuidGenerator.Create(),
                user.Id,
                tenantId
            )
            {
                FullName = input.Name,
                Email = input.Email,
                CPF = input.Cpf,
                SchoolId = schoolId,
                Status = status
            };

            await _studentRepository.InsertAsync(student);
        }
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
