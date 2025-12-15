using System;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace EstudaZen.Quizzes;

/// <summary>
/// Repository for Quiz aggregate
/// </summary>
public interface IQuizRepository : IRepository<Quiz, Guid>
{
    Task<Quiz?> GetActiveQuizForStudentAsync(Guid studentId, CancellationToken cancellationToken = default);

    Task<Quiz?> GetWithQuestionsAsync(Guid id, CancellationToken cancellationToken = default);

    Task<int> GetCompletedCountAsync(Guid studentId, CancellationToken cancellationToken = default);
}
