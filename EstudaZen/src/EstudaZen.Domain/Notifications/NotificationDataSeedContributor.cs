using System;
using System.Linq;
using System.Threading.Tasks;
using EstudaZen.Students;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Guids;

namespace EstudaZen.Notifications;

/// <summary>
/// Seeds example notifications for all students
/// </summary>
public class NotificationDataSeedContributor : IDataSeedContributor, ITransientDependency
{
    private readonly IRepository<Notification, Guid> _notificationRepository;
    private readonly IStudentRepository _studentRepository;
    private readonly IGuidGenerator _guidGenerator;

    public NotificationDataSeedContributor(
        IRepository<Notification, Guid> notificationRepository,
        IStudentRepository studentRepository,
        IGuidGenerator guidGenerator)
    {
        _notificationRepository = notificationRepository;
        _studentRepository = studentRepository;
        _guidGenerator = guidGenerator;
    }

    public async Task SeedAsync(DataSeedContext context)
    {
        // Check if notifications already exist
        if (await _notificationRepository.GetCountAsync() >= 10)
        {
            return;
        }

        // Get all students
        var students = await _studentRepository.GetListAsync();
        if (!students.Any())
        {
            return;
        }

        // Create notifications for each student
        foreach (var student in students)
        {
            await CreateNotificationsForStudent(student, context.TenantId);
        }
    }

    private async Task CreateNotificationsForStudent(Student student, Guid? tenantId)
    {
        // Check if student already has notifications
        var existing = await _notificationRepository.GetListAsync(n => n.StudentId == student.Id);
        if (existing.Any())
        {
            return;
        }

        var notifications = new[]
        {
            // Unread notifications
            new Notification(_guidGenerator.Create(), student.Id, NotificationType.System,
                "Bem-vindo ao EstudaZen! 👋", 
                $"Olá {student.FullName ?? "estudante"}! Complete seu primeiro quiz para ganhar XP.", 
                tenantId)
                { Icon = "hand-wave" },

            new Notification(_guidGenerator.Create(), student.Id, NotificationType.Streak,
                "Comece sua sequência! 🔥", 
                "Estude todos os dias para construir uma sequência de estudos!", 
                tenantId)
                { Icon = "fire" },

            new Notification(_guidGenerator.Create(), student.Id, NotificationType.Tip,
                "Dica do dia 💡", 
                "Use a técnica Pomodoro: 25 min de estudo, 5 min de pausa.", 
                tenantId)
                { Icon = "lightbulb" },

            // Read notifications
            new Notification(_guidGenerator.Create(), student.Id, NotificationType.Ranking,
                "Ranking disponível! 📊", 
                "Confira sua posição no ranking e compare com outros estudantes.", 
                tenantId)
                { Icon = "trending-up", ActionUrl = "/ranking" },

            new Notification(_guidGenerator.Create(), student.Id, NotificationType.Achievement,
                "Conquistas disponíveis! 🏆", 
                "Desbloqueie conquistas completando desafios e ganhe recompensas.", 
                tenantId)
                { Icon = "trophy", ActionUrl = "/achievements" },
        };

        // Mark last 2 as already read
        notifications[3].MarkAsRead();
        notifications[4].MarkAsRead();

        foreach (var notification in notifications)
        {
            await _notificationRepository.InsertAsync(notification);
        }
    }
}

