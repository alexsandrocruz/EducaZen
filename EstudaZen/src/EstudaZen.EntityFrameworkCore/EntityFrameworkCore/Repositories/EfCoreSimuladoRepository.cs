using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using EstudaZen.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace EstudaZen.Simulados;

public class EfCoreSimuladoRepository : EfCoreRepository<EstudaZenDbContext, Simulado, Guid>, ISimuladoRepository
{
    public EfCoreSimuladoRepository(IDbContextProvider<EstudaZenDbContext> dbContextProvider)
        : base(dbContextProvider)
    {
    }

    public async Task<List<Simulado>> GetPublishedListAsync(
        string? searchTerm = null,
        int skipCount = 0,
        int maxResultCount = 10,
        CancellationToken cancellationToken = default)
    {
        var dbSet = await GetDbSetAsync();
        return await dbSet
            .Where(x => x.IsPublished)
            .WhereIf(!string.IsNullOrWhiteSpace(searchTerm), x => x.Title.Contains(searchTerm!))
            .OrderByDescending(x => x.PublishedAt)
            .Skip(skipCount)
            .Take(maxResultCount)
            .ToListAsync(cancellationToken);
    }

    public async Task<Simulado?> GetWithQuestionsAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var dbSet = await GetDbSetAsync();
        return await dbSet
            .Include(x => x.Questions.OrderBy(q => q.Order))
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }
}
