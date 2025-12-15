using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using EstudaZen.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace EstudaZen.Quizzes;

public class EfCoreQuizRepository : EfCoreRepository<EstudaZenDbContext, Quiz, Guid>, IQuizRepository
{
    public EfCoreQuizRepository(IDbContextProvider<EstudaZenDbContext> dbContextProvider)
        : base(dbContextProvider)
    {
    }

    public async Task<Quiz?> GetActiveQuizForStudentAsync(Guid studentId, CancellationToken cancellationToken = default)
    {
        var dbSet = await GetDbSetAsync();
        return await dbSet
            .Include(x => x.Questions)
            .Where(x => x.StudentId == studentId && x.Status == QuizStatus.InProgress)
            .OrderByDescending(x => x.StartedAt)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<Quiz?> GetWithQuestionsAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var dbSet = await GetDbSetAsync();
        return await dbSet
            .Include(x => x.Questions.OrderBy(q => q.Order))
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<int> GetCompletedCountAsync(Guid studentId, CancellationToken cancellationToken = default)
    {
        var dbSet = await GetDbSetAsync();
        return await dbSet
            .CountAsync(x => x.StudentId == studentId && x.Status == QuizStatus.Completed, cancellationToken);
    }
}
