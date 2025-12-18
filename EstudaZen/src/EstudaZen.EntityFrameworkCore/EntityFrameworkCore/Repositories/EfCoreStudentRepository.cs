using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using EstudaZen.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace EstudaZen.Students;

public class EfCoreStudentRepository : EfCoreRepository<EstudaZenDbContext, Student, Guid>, IStudentRepository
{
    public EfCoreStudentRepository(IDbContextProvider<EstudaZenDbContext> dbContextProvider)
        : base(dbContextProvider)
    {
    }

    public async Task<Student?> FindByUserIdAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        var dbSet = await GetDbSetAsync();
        return await dbSet
            .Include(x => x.School)
            .FirstOrDefaultAsync(x => x.UserId == userId, cancellationToken);
    }

    public async Task<List<Student>> GetTopByXpAsync(
        int count,
        Guid? schoolId = null,
        CancellationToken cancellationToken = default)
    {
        var dbSet = await GetDbSetAsync();
        return await dbSet
            .Include(x => x.School)
            .WhereIf(schoolId.HasValue, x => x.SchoolId == schoolId.Value)
            .OrderByDescending(x => x.TotalXp)
            .Take(count)
            .ToListAsync(cancellationToken);
    }

    public async Task<int> GetRankByXpAsync(Guid studentId, Guid? schoolId = null, CancellationToken cancellationToken = default)
    {
        var dbSet = await GetDbSetAsync();
        var student = await dbSet.FirstOrDefaultAsync(x => x.Id == studentId, cancellationToken);
        if (student == null)
            return 0;

        var rank = await dbSet
            .WhereIf(schoolId.HasValue, x => x.SchoolId == schoolId.Value)
            .CountAsync(x => x.TotalXp > student.TotalXp, cancellationToken);

        return rank + 1;
    }

    public async Task<List<Student>> GetBySchoolAsync(Guid schoolId, CancellationToken cancellationToken = default)
    {
        var dbSet = await GetDbSetAsync();
        return await dbSet
            .Where(x => x.SchoolId == schoolId)
            .OrderByDescending(x => x.TotalXp)
            .ToListAsync(cancellationToken);
    }

    public async Task<int> GetTotalCountAsync(Guid? tenantId = null, CancellationToken cancellationToken = default)
    {
        var dbSet = await GetDbSetAsync();
        return await dbSet.CountAsync(cancellationToken);
    }
}
