using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using EstudaZen.Exams;
using EstudaZen.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace EstudaZen.Exams;

public class EfCoreExamSessionRepository : EfCoreRepository<EstudaZenDbContext, ExamSession, Guid>, IExamSessionRepository
{
    public EfCoreExamSessionRepository(IDbContextProvider<EstudaZenDbContext> dbContextProvider) 
        : base(dbContextProvider)
    {
    }

    public async Task<ExamSession?> GetActiveSessionAsync(
        Guid studentId,
        Guid examId,
        CancellationToken cancellationToken = default)
    {
        var dbSet = await GetDbSetAsync();
        return await dbSet
            .FirstOrDefaultAsync(
                x => x.StudentId == studentId && 
                     x.ExamId == examId && 
                     x.Status == ExamSessionStatus.InProgress,
                cancellationToken
            );
    }

    public async Task<List<ExamSession>> GetStudentSessionsAsync(
        Guid studentId,
        CancellationToken cancellationToken = default)
    {
        var dbSet = await GetDbSetAsync();
        return await dbSet
            .Where(x => x.StudentId == studentId)
            .OrderByDescending(x => x.StartedAt)
            .ToListAsync(cancellationToken);
    }

    public async Task<ExamSession?> GetSessionWithAnswersAsync(
        Guid sessionId,
        CancellationToken cancellationToken = default)
    {
        var dbSet = await GetDbSetAsync();
        return await dbSet
            .Include(x => x.Answers)
            .FirstOrDefaultAsync(x => x.Id == sessionId, cancellationToken);
    }

    public async Task<List<ExamSession>> GetExamSessionsAsync(
        Guid examId,
        CancellationToken cancellationToken = default)
    {
        var dbSet = await GetDbSetAsync();
        return await dbSet
            .Where(x => x.ExamId == examId)
            .OrderByDescending(x => x.StartedAt)
            .ToListAsync(cancellationToken);
    }
}
