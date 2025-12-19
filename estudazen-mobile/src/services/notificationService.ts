import api from './api';

export interface NotificationItem {
    id: string;
    type: 'Achievement' | 'Quiz' | 'System' | 'Streak' | 'Ranking' | 'Tip';
    title: string;
    message: string;
    icon: string;
    actionUrl?: string;
    isRead: boolean;
    creationTime: string;
    relativeTime: string;
}

export interface NotificationListResult {
    unreadCount: number;
    totalCount: number;
    items: NotificationItem[];
}

export const notificationService = {
    /**
     * Get list of notifications
     */
    async getList(skipCount = 0, maxResultCount = 20): Promise<NotificationListResult> {
        try {
            const response = await api.get('/app/notification', {
                params: { skipCount, maxResultCount }
            });
            return response.data;
        } catch (error: any) {
            throw new Error(error.message || 'Erro ao buscar notificações');
        }
    },

    /**
     * Get unread count
     */
    async getUnreadCount(): Promise<number> {
        try {
            const response = await api.get('/app/notification/unread-count');
            return response.data;
        } catch (error: any) {
            return 0;
        }
    },

    /**
     * Mark notification as read
     */
    async markAsRead(id: string): Promise<void> {
        try {
            await api.post(`/app/notification/${id}/read`);
        } catch (error: any) {
            throw new Error(error.message || 'Erro ao marcar como lida');
        }
    },

    /**
     * Mark all notifications as read
     */
    async markAllAsRead(): Promise<void> {
        try {
            await api.post('/app/notification/read-all');
        } catch (error: any) {
            throw new Error(error.message || 'Erro ao marcar todas como lidas');
        }
    },
};

export default notificationService;
