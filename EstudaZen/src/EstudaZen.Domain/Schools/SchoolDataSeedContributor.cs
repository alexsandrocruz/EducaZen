using System;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Guids;
using Volo.Abp.MultiTenancy;

namespace EstudaZen.Schools;

/// <summary>
/// Seeds a default school that can be used by StudentDataSeedContributor
/// </summary>
public class SchoolDataSeedContributor : IDataSeedContributor, ITransientDependency
{
    private readonly IRepository<School, Guid> _schoolRepository;
    private readonly IGuidGenerator _guidGenerator;
    private readonly ICurrentTenant _currentTenant;

    /// <summary>
    /// Default school ID used for seeding students
    /// </summary>
    public static readonly Guid DefaultSchoolId = Guid.Parse("3a1734b8-e3c9-60b6-5a9b-df9cf64d1f7c");

    public SchoolDataSeedContributor(
        IRepository<School, Guid> schoolRepository,
        IGuidGenerator guidGenerator,
        ICurrentTenant currentTenant)
    {
        _schoolRepository = schoolRepository;
        _guidGenerator = guidGenerator;
        _currentTenant = currentTenant;
    }

    public async Task SeedAsync(DataSeedContext context)
    {
        // Check if default school already exists
        var existingSchool = await _schoolRepository.FindAsync(DefaultSchoolId);
        if (existingSchool != null)
        {
            return;
        }

        // Create default school
        var school = new School(DefaultSchoolId, "Escola Modelo EstudaZen", context.TenantId)
        {
            Code = "SEED001",
            Address = "Rua de exemplo, 123",
            City = "São Paulo",
            State = "SP",
            ZipCode = "01234-567",
            Phone = "(11) 99999-0000",
            Email = "contato@escolamodelo.com",
            IsActive = true
        };

        await _schoolRepository.InsertAsync(school, autoSave: true);
    }
}
