using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace EstudaZen.Students.Quizzes;

public interface IStudentQuizAppService : IApplicationService
{
    /// <summary>
    /// Get current student's quiz history
    /// </summary>
    Task<PagedResultDto<QuizDto>> GetMyQuizzesAsync(GetMyQuizzesInput input);
    
    /// <summary>
    /// Start a new quiz session with random questions
    /// </summary>
    Task<QuizDto> StartQuizAsync(StartQuizDto input);
    
    /// <summary>
    /// Get current question for an active quiz
    /// </summary>
    Task<QuizQuestionDto> GetCurrentQuestionAsync(Guid quizId);
    
    /// <summary>
    /// Submit answer for the current question
    /// </summary>
    Task<SubmitAnswerResultDto> SubmitAnswerAsync(SubmitAnswerDto input);
    
    /// <summary>
    /// Get complete quiz result with all questions and answers
    /// </summary>
    Task<QuizResultDto> GetQuizResultAsync(Guid quizId);
    
    /// <summary>
    /// Abandon the current quiz
    /// </summary>
    Task AbandonQuizAsync(Guid quizId);
}
