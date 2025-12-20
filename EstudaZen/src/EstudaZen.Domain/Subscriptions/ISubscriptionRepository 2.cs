using System;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace EstudaZen.Subscriptions;

/// <summary>
/// Repository for Subscription aggregate
/// </summary>
public interface ISubscriptionRepository : IRepository<Subscription, Guid>
{
    Task<Subscription?> GetActiveForTenantAsync(Guid tenantId, CancellationToken cancellationToken = default);

    Task<int> GetExpiringCountAsync(int withinDays, CancellationToken cancellationToken = default);
}
