using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace EstudaZen.Notifications;

/// <summary>
/// Serviço de aplicação para notificações do aluno
/// </summary>
public interface INotificationAppService : IApplicationService
{
    /// <summary>
    /// Listar notificações do aluno atual
    /// </summary>
    Task<NotificationListResultDto> GetListAsync(int skipCount = 0, int maxResultCount = 20);

    /// <summary>
    /// Obter contagem de notificações não lidas
    /// </summary>
    Task<int> GetUnreadCountAsync();

    /// <summary>
    /// Marcar notificação como lida
    /// </summary>
    Task MarkAsReadAsync(Guid id);

    /// <summary>
    /// Marcar todas as notificações como lidas
    /// </summary>
    Task MarkAllAsReadAsync();
}
