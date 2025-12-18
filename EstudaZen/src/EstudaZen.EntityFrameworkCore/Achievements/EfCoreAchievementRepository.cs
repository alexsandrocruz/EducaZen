using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EstudaZen.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace EstudaZen.Achievements;

public class EfCoreAchievementRepository :
    EfCoreRepository<EstudaZenDbContext, Achievement, Guid>,
    IAchievementRepository
{
    public EfCoreAchievementRepository(
        IDbContextProvider<EstudaZenDbContext> dbContextProvider)
        : base(dbContextProvider)
    {
    }

    public async Task<List<Achievement>> GetByTriggerAsync(AchievementTrigger trigger)
    {
        var dbContext = await GetDbContextAsync();
        return await dbContext.Achievements
            .Where(a => a.Trigger == trigger && a.IsActive)
            .OrderBy(a => a.Order)
            .ToListAsync();
    }

    public async Task<Achievement?> GetByCodeAsync(string code)
    {
        var dbContext = await GetDbContextAsync();
        return await dbContext.Achievements
            .FirstOrDefaultAsync(a => a.Code == code);
    }

    public async Task<List<Achievement>> GetActiveAsync()
    {
        var dbContext = await GetDbContextAsync();
        return await dbContext.Achievements
            .Where(a => a.IsActive)
            .OrderBy(a => a.Order)
            .ToListAsync();
    }

    public async Task<List<StudentAchievement>> GetStudentAchievementsAsync(Guid studentId)
    {
        var dbContext = await GetDbContextAsync();
        return await dbContext.StudentAchievements
            .Include(sa => sa.Achievement)
            .Where(sa => sa.StudentId == studentId)
            .OrderByDescending(sa => sa.CreationTime)
            .ToListAsync();
    }

    public async Task<bool> HasAchievementAsync(Guid studentId, Guid achievementId)
    {
        var dbContext = await GetDbContextAsync();
        return await dbContext.StudentAchievements
            .AnyAsync(sa => sa.StudentId == studentId && sa.AchievementId == achievementId);
    }

    public async Task<StudentAchievement> UnlockAsync(StudentAchievement studentAchievement)
    {
        var dbContext = await GetDbContextAsync();
        await dbContext.StudentAchievements.AddAsync(studentAchievement);
        return studentAchievement;
    }
}
