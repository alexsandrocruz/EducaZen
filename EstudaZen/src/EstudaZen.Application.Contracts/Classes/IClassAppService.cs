using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace EstudaZen.Classes;

public interface IClassAppService : IApplicationService
{
    Task<PagedResultDto<ClassDto>> GetListAsync(GetClassListDto input);
    Task<ClassDto> GetAsync(Guid id);
    Task<ClassDto> CreateAsync(CreateClassDto input);
    Task<ClassDto> UpdateAsync(Guid id, UpdateClassDto input);
    Task DeleteAsync(Guid id);
}
