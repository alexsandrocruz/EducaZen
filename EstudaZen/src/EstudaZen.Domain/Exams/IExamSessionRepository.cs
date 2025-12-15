using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace EstudaZen.Exams;

public interface IExamSessionRepository : IRepository<ExamSession, Guid>
{
    /// <summary>
    /// Get active (in-progress) session for a student and exam
    /// </summary>
    Task<ExamSession?> GetActiveSessionAsync(
        Guid studentId,
        Guid examId,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Get all sessions for a student
    /// </summary>
    Task<List<ExamSession>> GetStudentSessionsAsync(
        Guid studentId,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Get session with all answers loaded
    /// </summary>
    Task<ExamSession?> GetSessionWithAnswersAsync(
        Guid sessionId,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Get all sessions for an exam
    /// </summary>
    Task<List<ExamSession>> GetExamSessionsAsync(
        Guid examId,
        CancellationToken cancellationToken = default);
}
