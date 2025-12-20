using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace EstudaZen.Subjects;

/// <summary>
/// Repository for Subject aggregate
/// </summary>
public interface ISubjectRepository : IRepository<Subject, Guid>
{
    Task<Subject?> FindByNameAsync(string name, CancellationToken cancellationToken = default);

    Task<List<Subject>> GetActiveSubjectsAsync(CancellationToken cancellationToken = default);
}
