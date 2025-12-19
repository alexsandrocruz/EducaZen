using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EstudaZen.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace EstudaZen.Notifications;

public class EfCoreNotificationRepository :
    EfCoreRepository<EstudaZenDbContext, Notification, Guid>,
    INotificationRepository
{
    public EfCoreNotificationRepository(
        IDbContextProvider<EstudaZenDbContext> dbContextProvider)
        : base(dbContextProvider)
    {
    }

    public async Task<List<Notification>> GetListAsync(
        Guid studentId,
        int skipCount = 0,
        int maxResultCount = 20,
        bool? isRead = null)
    {
        var dbContext = await GetDbContextAsync();
        var query = dbContext.Notifications
            .Where(n => n.StudentId == studentId);

        if (isRead.HasValue)
        {
            query = query.Where(n => n.IsRead == isRead.Value);
        }

        return await query
            .OrderByDescending(n => n.CreationTime)
            .Skip(skipCount)
            .Take(maxResultCount)
            .ToListAsync();
    }

    public async Task<int> GetUnreadCountAsync(Guid studentId)
    {
        var dbContext = await GetDbContextAsync();
        return await dbContext.Notifications
            .CountAsync(n => n.StudentId == studentId && !n.IsRead);
    }

    public async Task MarkAsReadAsync(Guid id)
    {
        var dbContext = await GetDbContextAsync();
        var notification = await dbContext.Notifications.FindAsync(id);
        if (notification != null)
        {
            notification.MarkAsRead();
        }
    }

    public async Task MarkAllAsReadAsync(Guid studentId)
    {
        var dbContext = await GetDbContextAsync();
        var now = DateTime.UtcNow;
        
        await dbContext.Notifications
            .Where(n => n.StudentId == studentId && !n.IsRead)
            .ExecuteUpdateAsync(setters => setters
                .SetProperty(n => n.IsRead, true)
                .SetProperty(n => n.ReadAt, now));
    }

    public async Task<List<Notification>> GetRecentAsync(Guid studentId, int count = 10)
    {
        var dbContext = await GetDbContextAsync();
        return await dbContext.Notifications
            .Where(n => n.StudentId == studentId)
            .OrderBy(n => n.IsRead) // Não lidas primeiro
            .ThenByDescending(n => n.CreationTime)
            .Take(count)
            .ToListAsync();
    }
}
