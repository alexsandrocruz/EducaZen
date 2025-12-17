using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace EstudaZen.Rankings;

public interface IRankingAppService : IApplicationService
{
    Task<List<StudentRankingDto>> GetStudentRankingAsync(RankingFilterDto input);
    Task<List<SchoolRankingDto>> GetSchoolRankingAsync(RankingFilterDto input);
    Task<List<TeacherRankingDto>> GetTeacherRankingAsync(RankingFilterDto input);
}
