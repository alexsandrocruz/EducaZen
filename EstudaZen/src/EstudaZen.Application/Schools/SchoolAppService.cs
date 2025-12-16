using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using EstudaZen.Permissions;
using System.Linq.Dynamic.Core;

namespace EstudaZen.Schools;

[Authorize(EstudaZenPermissions.Schools.Default)]
public class SchoolAppService : ApplicationService, ISchoolAppService
{
    private readonly IRepository<School, Guid> _schoolRepository;
    private readonly SchoolMapper _schoolMapper;

    public SchoolAppService(IRepository<School, Guid> schoolRepository, SchoolMapper schoolMapper)
    {
        _schoolRepository = schoolRepository;
        _schoolMapper = schoolMapper;
    }

    public async Task<PagedResultDto<SchoolDto>> GetListAsync(GetSchoolListDto input)
    {
        var queryable = await _schoolRepository.GetQueryableAsync();
        
        if (!string.IsNullOrWhiteSpace(input.Filter))
        {
            var filter = input.Filter.ToLower();
            queryable = queryable.Where(x => x.Name.ToLower().Contains(filter) || (x.Code != null && x.Code.ToLower().Contains(filter)));
        }

        if (!string.IsNullOrWhiteSpace(input.City))
        {
            queryable = queryable.Where(x => x.City == input.City);
        }

        if (!string.IsNullOrWhiteSpace(input.State))
        {
            queryable = queryable.Where(x => x.State == input.State);
        }

        if (input.IsActive.HasValue)
        {
            queryable = queryable.Where(x => x.IsActive == input.IsActive.Value);
        }

        var totalCount = await AsyncExecuter.CountAsync(queryable);
        
        queryable = queryable
            .OrderBy(input.Sorting ?? nameof(School.Name))
            .Skip(input.SkipCount)
            .Take(input.MaxResultCount);

        var items = await AsyncExecuter.ToListAsync(queryable);

        return new PagedResultDto<SchoolDto>(
            totalCount,
            items.Select(x => _schoolMapper.Map(x)).ToList()
        );
    }

    public async Task<SchoolDto> GetAsync(Guid id)
    {
        var school = await _schoolRepository.GetAsync(id);
        return _schoolMapper.Map(school);
    }

    [Authorize(EstudaZenPermissions.Schools.Create)]
    public async Task<SchoolDto> CreateAsync(CreateUpdateSchoolDto input)
    {
        var school = new School(GuidGenerator.Create(), input.Name, CurrentTenant.Id);
        _schoolMapper.Map(input, school);

        await _schoolRepository.InsertAsync(school);

        return _schoolMapper.Map(school);
    }

    [Authorize(EstudaZenPermissions.Schools.Edit)]
    public async Task<SchoolDto> UpdateAsync(Guid id, CreateUpdateSchoolDto input)
    {
        var school = await _schoolRepository.GetAsync(id);
        _schoolMapper.Map(input, school);
        
        // Ensure name is set via method if protected set, or rely on Mapper if public. 
        // School.Name has PRIVATE SET. Mapperly can't set it unless it uses constructor or there is a public setter.
        // School.cs has public SetName().
        // Does Mapperly support private setters? Only if supported.
        // Let's check School.cs again. Name is `public string Name { get; private set; }`.
        // Mapperly might fail to map Name.
        // I should set Name manually using SetName.
        
        school.SetName(input.Name);

        await _schoolRepository.UpdateAsync(school);

        return _schoolMapper.Map(school);
    }


    [Authorize(EstudaZenPermissions.Schools.Delete)]
    public async Task DeleteAsync(Guid id)
    {
        await _schoolRepository.DeleteAsync(id);
    }
}
