using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace EstudaZen.Schools;

public interface ISchoolAppService : IApplicationService
{
    Task<PagedResultDto<SchoolDto>> GetListAsync(GetSchoolListDto input);
    Task<SchoolDto> GetAsync(Guid id);
    Task<SchoolDto> CreateAsync(CreateUpdateSchoolDto input);
    Task<SchoolDto> UpdateAsync(Guid id, CreateUpdateSchoolDto input);
    Task DeleteAsync(Guid id);
}
