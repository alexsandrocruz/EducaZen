using System;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace EstudaZen.Classes;

public interface IClassRepository : IRepository<Class, Guid>
{
    /// <summary>
    /// Find class by school and code
    /// </summary>
    Task<Class?> FindByCodeAsync(
        Guid schoolId,
        string code,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Get active classes for a school and year
    /// </summary>
    Task<System.Collections.Generic.List<Class>> GetActiveClassesAsync(
        Guid schoolId,
        int schoolYear,
        CancellationToken cancellationToken = default);
}
