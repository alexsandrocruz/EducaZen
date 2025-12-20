using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace EstudaZen.Students;

/// <summary>
/// Repository for Student aggregate
/// </summary>
public interface IStudentRepository : IRepository<Student, Guid>
{
    Task<Student?> FindByUserIdAsync(Guid userId, CancellationToken cancellationToken = default);

    Task<List<Student>> GetTopByXpAsync(
        int count,
        Guid? schoolId = null,
        CancellationToken cancellationToken = default);

    Task<int> GetRankByXpAsync(Guid studentId, Guid? schoolId = null, CancellationToken cancellationToken = default);

    Task<List<Student>> GetBySchoolAsync(Guid schoolId, CancellationToken cancellationToken = default);
}
