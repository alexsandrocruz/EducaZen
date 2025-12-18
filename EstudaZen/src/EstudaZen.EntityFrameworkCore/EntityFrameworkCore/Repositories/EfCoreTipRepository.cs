using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using EstudaZen.EntityFrameworkCore;
using EstudaZen.Tips;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace EstudaZen.Tips;

public class EfCoreTipRepository : EfCoreRepository<EstudaZenDbContext, Tip, Guid>, ITipRepository
{
    public EfCoreTipRepository(IDbContextProvider<EstudaZenDbContext> dbContextProvider)
        : base(dbContextProvider)
    {
    }

    public async Task<List<Tip>> GetActiveTipsAsync(
        int maxCount = 10,
        CancellationToken cancellationToken = default)
    {
        var dbSet = await GetDbSetAsync();
        var now = DateTime.UtcNow;

        return await dbSet
            .Where(t => t.IsActive)
            .Where(t => !t.StartDate.HasValue || t.StartDate.Value <= now)
            .Where(t => !t.EndDate.HasValue || t.EndDate.Value >= now)
            .OrderBy(t => t.Order)
            .ThenByDescending(t => t.CreationTime)
            .Take(maxCount)
            .ToListAsync(cancellationToken);
    }

    public async Task<List<Tip>> GetByCategoryAsync(
        TipCategory category,
        CancellationToken cancellationToken = default)
    {
        var dbSet = await GetDbSetAsync();
        var now = DateTime.UtcNow;

        return await dbSet
            .Where(t => t.Category == category)
            .Where(t => t.IsActive)
            .Where(t => !t.StartDate.HasValue || t.StartDate.Value <= now)
            .Where(t => !t.EndDate.HasValue || t.EndDate.Value >= now)
            .OrderBy(t => t.Order)
            .ToListAsync(cancellationToken);
    }
}
