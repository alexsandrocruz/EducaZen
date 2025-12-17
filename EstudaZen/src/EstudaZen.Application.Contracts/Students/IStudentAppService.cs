using System;
using System.Collections.Generic;
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

    Task<PagedResultDto<StudentDto>> GetListAsync(GetStudentListDto input);
    Task<StudentDto> GetAsync(Guid id);
    Task<StudentDto> CreateAsync(CreateUpdateStudentDto input);
    Task<StudentDto> UpdateAsync(Guid id, CreateUpdateStudentDto input);
    Task DeleteAsync(Guid id);

    /// <summary>
    /// Listar alunos pendentes de aprovação (para gestor da escola)
    /// </summary>
    Task<List<PendingStudentDto>> GetPendingStudentsAsync();
    
    /// <summary>
    /// Aprovar ou rejeitar aluno
    /// </summary>
    Task ApproveStudentAsync(ApproveStudentDto input);
}
