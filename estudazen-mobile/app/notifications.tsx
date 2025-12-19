import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    StatusBar,
    ActivityIndicator,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import notificationService, { NotificationItem } from '../src/services/notificationService';
import { theme } from '../src/theme';

const ICON_MAP: Record<string, string> = {
    'hand-wave': 'hand-wave',
    'fire': 'fire',
    'lightbulb': 'lightbulb',
    'trophy': 'trophy',
    'trending-up': 'trending-up',
    'check-circle': 'check-circle',
    'bell': 'bell',
};

export default function NotificationsScreen() {
    const router = useRouter();
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const loadNotifications = useCallback(async () => {
        try {
            const result = await notificationService.getList(0, 50);
            setNotifications(result.items);
            setUnreadCount(result.unreadCount);
        } catch (error) {
            // Mock data for demo
            setNotifications([
                { id: '1', type: 'System', title: 'Bem-vindo ao EstudaZen! 👋', message: 'Complete seu primeiro quiz para ganhar XP.', icon: 'hand-wave', isRead: false, creationTime: new Date().toISOString(), relativeTime: 'agora' },
                { id: '2', type: 'Streak', title: 'Comece sua sequência! 🔥', message: 'Estude todos os dias para construir uma sequência!', icon: 'fire', isRead: false, creationTime: new Date().toISOString(), relativeTime: 'há 5 min' },
                { id: '3', type: 'Tip', title: 'Dica do dia 💡', message: 'Use a técnica Pomodoro: 25 min de estudo, 5 min de pausa.', icon: 'lightbulb', isRead: false, creationTime: new Date().toISOString(), relativeTime: 'há 1h' },
                { id: '4', type: 'Ranking', title: 'Ranking disponível! 📊', message: 'Confira sua posição no ranking.', icon: 'trending-up', isRead: true, creationTime: new Date().toISOString(), relativeTime: 'há 2h' },
                { id: '5', type: 'Achievement', title: 'Conquistas disponíveis! 🏆', message: 'Desbloqueie conquistas completando desafios.', icon: 'trophy', isRead: true, creationTime: new Date().toISOString(), relativeTime: 'há 1 dia' },
            ]);
            setUnreadCount(3);
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        loadNotifications();
    }, [loadNotifications]);

    const handleRefresh = () => {
        setRefreshing(true);
        loadNotifications();
    };

    const handleMarkAllRead = async () => {
        try {
            await notificationService.markAllAsRead();
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
            setUnreadCount(0);
        } catch (error) {
            // Ignore
        }
    };

    const handleNotificationPress = async (notification: NotificationItem) => {
        if (!notification.isRead) {
            try {
                await notificationService.markAsRead(notification.id);
                setNotifications(prev =>
                    prev.map(n => n.id === notification.id ? { ...n, isRead: true } : n)
                );
                setUnreadCount(prev => Math.max(0, prev - 1));
            } catch (error) {
                // Ignore
            }
        }

        // Navigate if actionUrl exists
        if (notification.actionUrl) {
            router.push(notification.actionUrl as any);
        }
    };

    const renderNotification = ({ item }: { item: NotificationItem }) => {
        const iconName = ICON_MAP[item.icon] || 'bell';

        return (
            <TouchableOpacity
                style={[styles.notificationCard, !item.isRead && styles.unreadCard]}
                onPress={() => handleNotificationPress(item)}
                activeOpacity={0.7}
            >
                <View style={[styles.iconContainer, !item.isRead && styles.unreadIcon]}>
                    <MaterialCommunityIcons
                        name={iconName as any}
                        size={24}
                        color={!item.isRead ? theme.colors.primary : '#9b92c9'}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={[styles.title, !item.isRead && styles.unreadTitle]}>
                        {item.title}
                    </Text>
                    <Text style={styles.message} numberOfLines={2}>
                        {item.message}
                    </Text>
                    <Text style={styles.time}>{item.relativeTime}</Text>
                </View>
                {!item.isRead && <View style={styles.unreadDot} />}
            </TouchableOpacity>
        );
    };

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={styles.loadingText}>Carregando notificações...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color={theme.colors.text.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notificações</Text>
                {unreadCount > 0 && (
                    <TouchableOpacity style={styles.markAllButton} onPress={handleMarkAllRead}>
                        <Text style={styles.markAllText}>Marcar todas</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Unread Count */}
            {unreadCount > 0 && (
                <View style={styles.unreadBanner}>
                    <MaterialCommunityIcons name="bell" size={16} color={theme.colors.primary} />
                    <Text style={styles.unreadBannerText}>
                        {unreadCount} {unreadCount === 1 ? 'nova notificação' : 'novas notificações'}
                    </Text>
                </View>
            )}

            {/* Notifications List */}
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                renderItem={renderNotification}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        tintColor={theme.colors.primary}
                    />
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <MaterialCommunityIcons name="bell-off" size={64} color="#9b92c9" />
                        <Text style={styles.emptyText}>Nenhuma notificação</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#131022',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#131022',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: theme.colors.text.secondary,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 56,
        paddingBottom: 16,
        backgroundColor: 'rgba(19, 16, 34, 0.95)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '700',
        color: theme.colors.text.primary,
        marginLeft: 8,
    },
    markAllButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    markAllText: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.primary,
    },
    unreadBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'rgba(127, 19, 236, 0.1)',
    },
    unreadBannerText: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.primary,
    },
    listContent: {
        padding: 16,
        gap: 12,
    },
    notificationCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        backgroundColor: '#1c182f',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    unreadCard: {
        backgroundColor: 'rgba(127, 19, 236, 0.08)',
        borderColor: 'rgba(127, 19, 236, 0.2)',
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#292348',
        justifyContent: 'center',
        alignItems: 'center',
    },
    unreadIcon: {
        backgroundColor: 'rgba(127, 19, 236, 0.2)',
    },
    contentContainer: {
        flex: 1,
    },
    title: {
        fontSize: 15,
        fontWeight: '600',
        color: theme.colors.text.primary,
        marginBottom: 4,
    },
    unreadTitle: {
        fontWeight: '700',
    },
    message: {
        fontSize: 13,
        color: theme.colors.text.secondary,
        lineHeight: 18,
    },
    time: {
        fontSize: 12,
        color: '#9b92c9',
        marginTop: 6,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.colors.primary,
        marginTop: 4,
    },
    emptyContainer: {
        alignItems: 'center',
        paddingTop: 80,
    },
    emptyText: {
        marginTop: 16,
        fontSize: 16,
        color: '#9b92c9',
    },
});
