using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using EstudaZen.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace EstudaZen.Subscriptions;

public class EfCoreSubscriptionRepository : EfCoreRepository<EstudaZenDbContext, Subscription, Guid>, ISubscriptionRepository
{
    public EfCoreSubscriptionRepository(IDbContextProvider<EstudaZenDbContext> dbContextProvider)
        : base(dbContextProvider)
    {
    }

    public async Task<Subscription?> GetActiveForTenantAsync(Guid tenantId, CancellationToken cancellationToken = default)
    {
        var dbSet = await GetDbSetAsync();
        return await dbSet
            .Include(x => x.Plan)
            .Where(x => x.TenantId == tenantId &&
                        (x.Status == SubscriptionStatus.Active || x.Status == SubscriptionStatus.Trial))
            .OrderByDescending(x => x.StartDate)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<int> GetExpiringCountAsync(int withinDays, CancellationToken cancellationToken = default)
    {
        var dbSet = await GetDbSetAsync();
        var cutoffDate = DateTime.UtcNow.AddDays(withinDays);

        return await dbSet
            .CountAsync(x =>
                (x.Status == SubscriptionStatus.Trial && x.TrialEndsAt <= cutoffDate) ||
                (x.Status == SubscriptionStatus.Active && x.EndDate <= cutoffDate),
                cancellationToken);
    }
}
