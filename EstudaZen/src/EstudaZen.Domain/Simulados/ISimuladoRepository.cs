using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace EstudaZen.Simulados;

/// <summary>
/// Repository for Simulado aggregate
/// </summary>
public interface ISimuladoRepository : IRepository<Simulado, Guid>
{
    Task<List<Simulado>> GetPublishedListAsync(
        string? searchTerm = null,
        int skipCount = 0,
        int maxResultCount = 10,
        CancellationToken cancellationToken = default);

    Task<Simulado?> GetWithQuestionsAsync(Guid id, CancellationToken cancellationToken = default);
}
