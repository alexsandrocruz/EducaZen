using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace EstudaZen.Exams;

public interface IExamSessionAppService : IApplicationService
{
    /// <summary>
    /// Start a new exam session for the current student
    /// </summary>
    Task<ExamSessionDto> StartExamAsync(Guid examId);

    /// <summary>
    /// Get current student's active session for an exam
    /// </summary>
    Task<ExamSessionDto?> GetMyActiveSessionAsync(Guid examId);

    /// <summary>
    /// Get all sessions for current student
    /// </summary>
    Task<List<ExamSessionDto>> GetMySessionsAsync();

    /// <summary>
    /// Submit answer to a question in a session
    /// </summary>
    Task<ExamAnswerDto> SubmitAnswerAsync(Guid sessionId, SubmitAnswerDto answer);

    /// <summary>
    /// Complete/finish the exam session
    /// </summary>
    Task<ExamSessionDto> FinishExamAsync(Guid sessionId);

    /// <summary>
    /// Abandon the exam session
    /// </summary>
    Task<ExamSessionDto> AbandonExamAsync(Guid sessionId);

    /// <summary>
    /// Get detailed session with all answers
    /// </summary>
    Task<ExamSessionDetailDto> GetSessionDetailAsync(Guid sessionId);
}
