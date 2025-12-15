using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using EstudaZen.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace EstudaZen.Questions;

public class EfCoreQuestionRepository : EfCoreRepository<EstudaZenDbContext, Question, Guid>, IQuestionRepository
{
    public EfCoreQuestionRepository(IDbContextProvider<EstudaZenDbContext> dbContextProvider)
        : base(dbContextProvider)
    {
    }

    public async Task<List<Question>> GetListWithAnswersAsync(
        Guid? subjectId = null,
        QuestionDifficulty? difficulty = null,
        bool? isPublished = null,
        string? searchTerm = null,
        int skipCount = 0,
        int maxResultCount = 10,
        CancellationToken cancellationToken = default)
    {
        var dbSet = await GetDbSetAsync();
        return await dbSet
            .Include(x => x.Answers)
            .Include(x => x.Subject)
            .WhereIf(subjectId.HasValue, x => x.SubjectId == subjectId.Value)
            .WhereIf(difficulty.HasValue, x => x.Difficulty == difficulty.Value)
            .WhereIf(isPublished.HasValue, x => x.IsPublished == isPublished.Value)
            .WhereIf(!string.IsNullOrWhiteSpace(searchTerm), x => x.Content.Contains(searchTerm!))
            .OrderByDescending(x => x.CreationTime)
            .Skip(skipCount)
            .Take(maxResultCount)
            .ToListAsync(cancellationToken);
    }

    public async Task<long> GetCountAsync(
        Guid? subjectId = null,
        QuestionDifficulty? difficulty = null,
        bool? isPublished = null,
        string? searchTerm = null,
        CancellationToken cancellationToken = default)
    {
        var dbSet = await GetDbSetAsync();
        return await dbSet
            .WhereIf(subjectId.HasValue, x => x.SubjectId == subjectId.Value)
            .WhereIf(difficulty.HasValue, x => x.Difficulty == difficulty.Value)
            .WhereIf(isPublished.HasValue, x => x.IsPublished == isPublished.Value)
            .WhereIf(!string.IsNullOrWhiteSpace(searchTerm), x => x.Content.Contains(searchTerm!))
            .LongCountAsync(cancellationToken);
    }

    public async Task<List<Question>> GetRandomQuestionsAsync(
        int count,
        Guid? subjectId = null,
        QuestionDifficulty? difficulty = null,
        List<Guid>? excludeIds = null,
        CancellationToken cancellationToken = default)
    {
        var dbSet = await GetDbSetAsync();
        var query = dbSet
            .Include(x => x.Answers)
            .Where(x => x.IsPublished)
            .WhereIf(subjectId.HasValue, x => x.SubjectId == subjectId.Value)
            .WhereIf(difficulty.HasValue, x => x.Difficulty == difficulty.Value)
            .WhereIf(excludeIds != null && excludeIds.Any(), x => !excludeIds!.Contains(x.Id));

        // Use random ordering - for PostgreSQL you might use EF.Functions.Random()
        return await query
            .OrderBy(x => Guid.NewGuid())
            .Take(count)
            .ToListAsync(cancellationToken);
    }

    public async Task<Question?> GetWithAnswersAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var dbSet = await GetDbSetAsync();
        return await dbSet
            .Include(x => x.Answers)
            .Include(x => x.Subject)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }
}
