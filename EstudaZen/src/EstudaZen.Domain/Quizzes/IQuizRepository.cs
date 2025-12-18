using System;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace EstudaZen.Quizzes;

public interface IQuizRepository : IRepository<Quiz, Guid>
{
    Task<Quiz?> GetWithQuestionsAsync(Guid id, CancellationToken cancellationToken = default);
    Task<Quiz?> GetActiveQuizForStudentAsync(Guid studentId, CancellationToken cancellationToken = default);
}
