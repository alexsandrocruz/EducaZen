using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace EstudaZen.Questions;

/// <summary>
/// Application service interface for Question operations
/// </summary>
public interface IQuestionAppService : IApplicationService
{
    Task<PagedResultDto<QuestionDto>> GetListAsync(GetQuestionListDto input);

    Task<QuestionDto> GetAsync(Guid id);

    Task<QuestionDto> CreateAsync(CreateQuestionDto input);

    Task<QuestionDto> UpdateAsync(Guid id, UpdateQuestionDto input);

    Task DeleteAsync(Guid id);
}
