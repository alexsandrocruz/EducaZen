using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace EstudaZen.Exams;

/// <summary>
/// Application service interface for Exam CRUD operations
/// </summary>
public interface IExamAppService : IApplicationService
{
    Task<PagedResultDto<ExamDto>> GetListAsync(GetExamListDto input);
    Task<ExamDto> GetAsync(Guid id);
    Task<ExamDto> CreateAsync(CreateUpdateExamDto input);
    Task<ExamDto> UpdateAsync(Guid id, CreateUpdateExamDto input);
    Task DeleteAsync(Guid id);
    Task<ExamDto> PublishAsync(Guid id);
    Task<ExamDto> UnpublishAsync(Guid id);
    Task<List<ExamQuestionDto>> GetQuestionsAsync(Guid id);
    Task AddQuestionAsync(Guid id, Guid questionId);
    Task RemoveQuestionAsync(Guid id, Guid questionId);
}
