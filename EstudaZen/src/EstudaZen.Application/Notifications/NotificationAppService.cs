using System;
using System.Linq;
using System.Threading.Tasks;
using EstudaZen.Students;
using Volo.Abp.Application.Services;
using Volo.Abp.Users;

namespace EstudaZen.Notifications;

public class NotificationAppService : ApplicationService, INotificationAppService
{
    private readonly INotificationRepository _notificationRepository;
    private readonly IStudentRepository _studentRepository;
    private readonly ICurrentUser _currentUser;

    public NotificationAppService(
        INotificationRepository notificationRepository,
        IStudentRepository studentRepository,
        ICurrentUser currentUser)
    {
        _notificationRepository = notificationRepository;
        _studentRepository = studentRepository;
        _currentUser = currentUser;
    }

    public async Task<NotificationListResultDto> GetListAsync(int skipCount = 0, int maxResultCount = 20)
    {
        var student = await GetCurrentStudentAsync();
        
        var notifications = await _notificationRepository.GetListAsync(
            student.Id, skipCount, maxResultCount);
            
        var unreadCount = await _notificationRepository.GetUnreadCountAsync(student.Id);
        
        // Get total count via query
        var allNotifications = await _notificationRepository.GetListAsync(student.Id, 0, int.MaxValue);
        var totalCount = allNotifications.Count;

        return new NotificationListResultDto
        {
            UnreadCount = unreadCount,
            TotalCount = (int)totalCount,
            Items = notifications.Select(MapToDto).ToArray()
        };
    }

    public async Task<int> GetUnreadCountAsync()
    {
        var student = await GetCurrentStudentAsync();
        return await _notificationRepository.GetUnreadCountAsync(student.Id);
    }

    public async Task MarkAsReadAsync(Guid id)
    {
        await _notificationRepository.MarkAsReadAsync(id);
    }

    public async Task MarkAllAsReadAsync()
    {
        var student = await GetCurrentStudentAsync();
        await _notificationRepository.MarkAllAsReadAsync(student.Id);
    }

    private async Task<Student> GetCurrentStudentAsync()
    {
        if (!_currentUser.Id.HasValue)
            throw new Volo.Abp.Authorization.AbpAuthorizationException("User not authenticated");

        var student = await _studentRepository.FindByUserIdAsync(_currentUser.Id.Value);
        if (student == null)
            throw new Volo.Abp.BusinessException("EstudaZen:StudentNotFound");

        return student;
    }

    private NotificationDto MapToDto(Notification notification)
    {
        return new NotificationDto
        {
            Id = notification.Id,
            Type = notification.Type,
            Title = notification.Title,
            Message = notification.Message,
            Icon = notification.Icon,
            ActionUrl = notification.ActionUrl,
            IsRead = notification.IsRead,
            CreationTime = notification.CreationTime,
            RelativeTime = GetRelativeTime(notification.CreationTime)
        };
    }

    private static string GetRelativeTime(DateTime dateTime)
    {
        var timeSpan = DateTime.UtcNow - dateTime;

        return timeSpan.TotalMinutes switch
        {
            < 1 => "agora",
            < 60 => $"há {(int)timeSpan.TotalMinutes} min",
            < 1440 => $"há {(int)timeSpan.TotalHours}h",
            < 10080 => $"há {(int)timeSpan.TotalDays} dias",
            _ => dateTime.ToString("dd/MM")
        };
    }
}
