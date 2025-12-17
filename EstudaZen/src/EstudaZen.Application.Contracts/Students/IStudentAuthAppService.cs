using System.Collections.Generic;
using System.Threading.Tasks;
using EstudaZen.Schools;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace EstudaZen.Students;

public interface IStudentAuthAppService : IApplicationService
{
    Task RegisterAsync(RegisterStudentDto input);

    Task<ListResultDto<SchoolDto>> GetSchoolsLookupAsync(string? filter = null);
}
