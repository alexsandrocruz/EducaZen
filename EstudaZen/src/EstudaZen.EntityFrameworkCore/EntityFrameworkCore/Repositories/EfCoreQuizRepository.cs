using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using EstudaZen.EntityFrameworkCore;

namespace EstudaZen.Quizzes;

public class EfCoreQuizRepository : EfCoreRepository<EstudaZenDbContext, Quiz, Guid>, IQuizRepository
{
    public EfCoreQuizRepository(IDbContextProvider<EstudaZenDbContext> dbContextProvider)
        : base(dbContextProvider)
    {
    }

    public async Task<Quiz?> GetWithQuestionsAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var dbSet = await GetDbSetAsync();
        return await dbSet
            .Include(x => x.Questions)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<Quiz?> GetActiveQuizForStudentAsync(Guid studentId, CancellationToken cancellationToken = default)
    {
        var dbSet = await GetDbSetAsync();
        return await dbSet
            .Include(x => x.Questions)
            .Where(x => x.StudentId == studentId && x.Status == QuizStatus.InProgress)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public override async Task<IQueryable<Quiz>> WithDetailsAsync()
    {
        return (await GetQueryableAsync()).Include(x => x.Questions);
    }
}
