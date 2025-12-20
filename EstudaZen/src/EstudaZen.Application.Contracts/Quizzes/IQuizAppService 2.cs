using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace EstudaZen.Quizzes;

/// <summary>
/// Application service for Quiz operations
/// </summary>
public interface IQuizAppService : IApplicationService
{
    /// <summary>
    /// Start a new quiz session
    /// </summary>
    Task<QuizDto> StartQuizAsync(StartQuizDto input);

    /// <summary>
    /// Get current active quiz for the logged-in student
    /// </summary>
    Task<QuizDto?> GetActiveQuizAsync();

    /// <summary>
    /// Get current question to answer
    /// </summary>
    Task<CurrentQuizQuestionDto?> GetCurrentQuestionAsync(Guid quizId);

    /// <summary>
    /// Submit answer for current question
    /// </summary>
    Task<AnswerResultDto> AnswerAsync(AnswerQuestionDto input);

    /// <summary>
    /// Abandon/quit the quiz
    /// </summary>
    Task AbandonQuizAsync(Guid quizId);

    /// <summary>
    /// Get completed quiz results
    /// </summary>
    Task<QuizDto> GetResultsAsync(Guid quizId);
}
