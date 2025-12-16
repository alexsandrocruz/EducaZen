using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using EstudaZen.Classes;
using EstudaZen.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace EstudaZen.Classes;

public class EfCoreClassRepository : EfCoreRepository<EstudaZenDbContext, Class, Guid>, IClassRepository
{
    public EfCoreClassRepository(IDbContextProvider<EstudaZenDbContext> dbContextProvider) 
        : base(dbContextProvider)
    {
    }

    public async Task<Class?> FindByCodeAsync(
        Guid schoolId,
        string code,
        CancellationToken cancellationToken = default)
    {
        var dbSet = await GetDbSetAsync();
        return await dbSet
            .FirstOrDefaultAsync(
                x => x.SchoolId == schoolId && x.Code == code,
                cancellationToken
            );
    }

    public async Task<List<Class>> GetActiveClassesAsync(
        Guid schoolId,
        int schoolYear,
        CancellationToken cancellationToken = default)
    {
        var dbSet = await GetDbSetAsync();
        return await dbSet
            .Where(x => x.SchoolId == schoolId && x.SchoolYear == schoolYear && x.IsActive)
            .OrderBy(x => x.Name)
            .ToListAsync(cancellationToken);
    }
}
