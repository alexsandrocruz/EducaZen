using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace EstudaZen.Tips;

/// <summary>
/// Repository interface for Tip entity
/// </summary>
public interface ITipRepository : IRepository<Tip, Guid>
{
    /// <summary>
    /// Get active tips that should be displayed now
    /// </summary>
    Task<List<Tip>> GetActiveTipsAsync(
        int maxCount = 10,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Get tips by category
    /// </summary>
    Task<List<Tip>> GetByCategoryAsync(
        TipCategory category,
        CancellationToken cancellationToken = default);
}
