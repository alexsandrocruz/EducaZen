using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace EstudaZen.Exams;

/// <summary>
/// Repository interface for Exam entity
/// </summary>
public interface IExamRepository : IRepository<Exam, Guid>
{
    /// <summary>
    /// Get published exams available for students
    /// </summary>
    Task<List<Exam>> GetAvailableExamsAsync(
        Guid? tenantId = null,
        Guid? schoolId = null,
        ExamType? type = null,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Get exam with questions (eager loading)
    /// </summary>
    Task<Exam?> GetWithQuestionsAsync(
        Guid id,
        CancellationToken cancellationToken = default);
}
