using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using EstudaZen.EntityFrameworkCore;

namespace EstudaZen.Exams;

public class EfCoreExamRepository : EfCoreRepository<EstudaZenDbContext, Exam, Guid>, IExamRepository
{
    public EfCoreExamRepository(IDbContextProvider<EstudaZenDbContext> dbContextProvider)
        : base(dbContextProvider)
    {
    }

    public async Task<List<Exam>> GetAvailableExamsAsync(
        Guid? tenantId = null,
        Guid? schoolId = null,
        ExamType? type = null,
        CancellationToken cancellationToken = default)
    {
        var dbSet = await GetDbSetAsync();
        return await dbSet
            .WhereIf(tenantId.HasValue, x => x.TenantId == tenantId)
            .WhereIf(schoolId.HasValue, x => x.SchoolId == schoolId)
            .WhereIf(type.HasValue, x => x.Type == type)
            .Where(x => x.IsPublished)
            .Where(x => !x.AvailableFrom.HasValue || x.AvailableFrom <= DateTime.UtcNow)
            .Where(x => !x.AvailableUntil.HasValue || x.AvailableUntil >= DateTime.UtcNow)
            .ToListAsync(cancellationToken);
    }

    public async Task<Exam?> GetWithQuestionsAsync(Guid id, CancellationToken cancellationToken = default)
    {
         var dbSet = await GetDbSetAsync();
         return await dbSet
             .Include(x => x.Questions)
             .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public override async Task<IQueryable<Exam>> WithDetailsAsync()
    {
        return (await GetQueryableAsync()).Include(x => x.Questions);
    }
}
