using System;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using EstudaZen.Classes;

namespace EstudaZen.Classes;

public class ClassAppService : ApplicationService, IClassAppService
{
    private readonly IClassRepository _classRepository;
    private readonly ClassMapper _classMapper = new();

    public ClassAppService(IClassRepository classRepository)
    {
        _classRepository = classRepository;
    }

    public async Task<PagedResultDto<ClassDto>> GetListAsync(GetClassListDto input)
    {
        var query = await _classRepository.GetQueryableAsync();

        if (input.SchoolId.HasValue)
        {
            query = query.Where(x => x.SchoolId == input.SchoolId.Value);
        }

        if (input.SchoolYear.HasValue)
        {
            query = query.Where(x => x.SchoolYear == input.SchoolYear.Value);
        }

        if (input.IsActive.HasValue)
        {
            query = query.Where(x => x.IsActive == input.IsActive.Value);
        }

        if (!string.IsNullOrWhiteSpace(input.SearchTerm))
        {
            var search = input.SearchTerm.ToLower();
            query = query.Where(x => x.Name.ToLower().Contains(search) || x.Code.ToLower().Contains(search));
        }

        var totalCount = query.Count();
        
        query = query
            .OrderBy(x => x.Name)
            .Skip(input.SkipCount)
            .Take(input.MaxResultCount);

        var items = query.ToList();
        var dtos = items.Select(_classMapper.Map).ToList();

        return new PagedResultDto<ClassDto>(totalCount, dtos);
    }

    public async Task<ClassDto> GetAsync(Guid id)
    {
        var entity = await _classRepository.GetAsync(id);
        return _classMapper.Map(entity);
    }

    public async Task<ClassDto> CreateAsync(CreateClassDto input)
    {
        var existing = await _classRepository.FindByCodeAsync(input.SchoolId, input.Code);
        if (existing != null)
        {
            throw new BusinessException("EstudaZen:ClassCodeAlreadyExists")
                .WithData("code", input.Code);
        }

        var entity = new Class(
            GuidGenerator.Create(),
            input.SchoolId,
            input.Name,
            input.Code,
            input.SchoolYear,
            input.GradeLevel,
            input.Shift,
            CurrentTenant.Id
        );

        entity.MaxStudents = input.MaxStudents;
        entity.IsActive = input.IsActive;

        await _classRepository.InsertAsync(entity, autoSave: true);
        
        return _classMapper.Map(entity);
    }

    public async Task<ClassDto> UpdateAsync(Guid id, UpdateClassDto input)
    {
        var entity = await _classRepository.GetAsync(id);

        entity.SetName(input.Name);
        entity.SetCode(input.Code);
        entity.SetSchoolYear(input.SchoolYear);
        entity.GradeLevel = input.GradeLevel;
        entity.Shift = input.Shift;
        entity.MaxStudents = input.MaxStudents;
        entity.IsActive = input.IsActive;

        await _classRepository.UpdateAsync(entity, autoSave: true);
        
        return _classMapper.Map(entity);
    }

    public async Task DeleteAsync(Guid id)
    {
        await _classRepository.DeleteAsync(id);
    }
}
