using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace EstudaZen.Students;

/// <summary>
/// Application service for Student operations
/// </summary>
public interface IStudentAppService : IApplicationService
{
    /// <summary>
    /// Get current student profile
    /// </summary>
    Task<StudentDto> GetMyProfileAsync();

    /// <summary>
    /// Get ranking leaderboard
    /// </summary>
    Task<PagedResultDto<RankingEntryDto>> GetRankingAsync(GetRankingDto input);

    /// <summary>
    /// Get my position in ranking
    /// </summary>
    Task<RankingEntryDto> GetMyRankingAsync(RankingScope scope);
}
