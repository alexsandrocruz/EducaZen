using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace EstudaZen.Notifications;

/// <summary>
/// Repositório para Notification
/// </summary>
public interface INotificationRepository : IRepository<Notification, Guid>
{
    /// <summary>
    /// Buscar notificações do aluno com paginação
    /// </summary>
    Task<List<Notification>> GetListAsync(
        Guid studentId,
        int skipCount = 0,
        int maxResultCount = 20,
        bool? isRead = null);

    /// <summary>
    /// Contar notificações não lidas
    /// </summary>
    Task<int> GetUnreadCountAsync(Guid studentId);

    /// <summary>
    /// Marcar notificação como lida
    /// </summary>
    Task MarkAsReadAsync(Guid id);

    /// <summary>
    /// Marcar todas as notificações do aluno como lidas
    /// </summary>
    Task MarkAllAsReadAsync(Guid studentId);

    /// <summary>
    /// Buscar notificações recentes (não lidas primeiro)
    /// </summary>
    Task<List<Notification>> GetRecentAsync(Guid studentId, int count = 10);
}
