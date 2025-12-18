import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthStore } from '../../src/stores/authStore';
import { theme } from '../../src/theme';
import {
    LeagueCard,
    QuickActionCard,
    TipsCarousel,
    PerformanceStats,
} from '../../src/components/home';
import { homeService, StudentHomeDashboardDto } from '../../src/services/homeService';

export default function HomeScreen() {
    const router = useRouter();
    const { user } = useAuthStore();

    const [dashboard, setDashboard] = useState<StudentHomeDashboardDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadDashboard = useCallback(async () => {
        try {
            setError(null);
            const data = await homeService.getHomeDashboard();
            setDashboard(data);
        } catch (err: any) {
            console.error('Erro ao carregar dashboard:', err);
            setError(err.message || 'Erro ao carregar dados');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        loadDashboard();
    }, [loadDashboard]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadDashboard();
    }, [loadDashboard]);

    const handleStartQuiz = () => {
        router.push('/(tabs)/quiz');
    };

    const handleContinueExam = () => {
        router.push('/(tabs)/quiz');
    };

    const handlePracticeBySubject = () => {
        router.push('/(tabs)/quiz');
    };

    const handleNotifications = () => {
        // TODO: Navigate to notifications
    };

    // Loading state
    if (loading) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <StatusBar barStyle="light-content" />
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={styles.loadingText}>Carregando...</Text>
            </View>
        );
    }

    // Use dashboard data or fallback to user data
    const displayName = dashboard?.fullName || user?.fullName || 'Estudante';
    const firstName = displayName.split(' ')[0];
    const status = dashboard?.status || user?.status || 'APPROVED';
    const currentLevel = dashboard?.currentLevel || user?.currentLevel || 1;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={theme.colors.primary}
                        colors={[theme.colors.primary]}
                    />
                }
            >
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        {/* Avatar */}
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatarBorder}>
                                <View style={styles.avatar}>
                                    <Text style={styles.avatarText}>
                                        {displayName.charAt(0).toUpperCase()}
                                    </Text>
                                </View>
                            </View>
                            {/* Level badge */}
                            <View style={styles.levelBadge}>
                                <Text style={styles.levelText}>{currentLevel}</Text>
                            </View>
                        </View>

                        {/* Greeting */}
                        <View style={styles.greetingContainer}>
                            <Text style={styles.greetingLabel}>
                                Olá, {firstName}!
                            </Text>
                            <Text style={styles.greetingTitle}>Vamos estudar?</Text>
                        </View>
                    </View>

                    {/* Notification Button */}
                    <TouchableOpacity
                        style={styles.notificationButton}
                        onPress={handleNotifications}
                    >
                        <MaterialCommunityIcons
                            name="bell-outline"
                            size={24}
                            color={theme.colors.text.secondary}
                        />
                        <View style={styles.notificationDot} />
                    </TouchableOpacity>
                </View>

                {/* Error Banner */}
                {error && (
                    <View style={styles.errorBanner}>
                        <MaterialCommunityIcons
                            name="alert-circle-outline"
                            size={20}
                            color={theme.colors.status.error}
                        />
                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity onPress={loadDashboard}>
                            <Text style={styles.retryText}>Tentar novamente</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Pending Approval Banner */}
                {status === 'PENDING' && (
                    <View style={styles.pendingBanner}>
                        <MaterialCommunityIcons
                            name="clock-outline"
                            size={20}
                            color={theme.colors.status.warning}
                        />
                        <Text style={styles.pendingText}>
                            Aguardando aprovação da escola
                        </Text>
                    </View>
                )}

                {/* League Card */}
                <View style={styles.section}>
                    <LeagueCard
                        leagueName={dashboard?.leagueName || 'Bronze III'}
                        currentXp={dashboard?.currentXp || 0}
                        requiredXp={dashboard?.xpToNextLeague || 1000}
                        streakDays={dashboard?.streakDays || 0}
                        rankPercent={dashboard?.rankPercentile || 50}
                    />
                </View>

                {/* Quick Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ações Rápidas</Text>

                    {/* Primary Action - Start Quiz */}
                    <QuickActionCard
                        variant="primary"
                        title="Começar Simulado"
                        subtitle="Modo ENEM Completo • 90 Questões"
                        icon="play"
                        badge="Recomendado"
                        onPress={handleStartQuiz}
                        style={styles.primaryAction}
                    />

                    {/* Secondary Actions Grid */}
                    <View style={styles.actionsGrid}>
                        <QuickActionCard
                            variant="secondary"
                            title="Continuar prova"
                            subtitle="Humanas 2023"
                            icon="history"
                            iconColor="#3b82f6"
                            iconBgColor="rgba(59, 130, 246, 0.1)"
                            onPress={handleContinueExam}
                            style={styles.secondaryAction}
                        />
                        <QuickActionCard
                            variant="secondary"
                            title="Praticar por matéria"
                            subtitle="Treino focado"
                            icon="shape"
                            iconColor="#ec4899"
                            iconBgColor="rgba(236, 72, 153, 0.1)"
                            onPress={handlePracticeBySubject}
                            style={styles.secondaryAction}
                        />
                    </View>
                </View>

                {/* Tips Carousel */}
                <View style={styles.section}>
                    <TipsCarousel
                        tips={dashboard?.tips?.map(tip => ({
                            id: tip.id,
                            type: tip.type as 'highlight' | 'normal',
                            category: tip.category,
                            title: tip.title,
                            description: tip.description,
                            icon: tip.icon as any,
                            iconColor: tip.iconColor,
                            iconBgColor: tip.iconBgColor,
                        }))}
                    />
                </View>

                {/* Performance Stats */}
                <View style={styles.section}>
                    <PerformanceStats
                        accuracyRate={dashboard?.accuracyRate || 0}
                        questionsToday={dashboard?.questionsToday || 0}
                        dailyGoal={dashboard?.dailyGoal || 50}
                    />
                </View>

                {/* Bottom spacing for tab bar */}
                <View style={styles.bottomSpacing} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.dark,
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: theme.spacing.md,
        color: theme.colors.text.secondary,
        fontSize: theme.typography.sizes.base,
    },
    scrollContent: {
        paddingHorizontal: theme.spacing.xl,
        paddingTop: 60,
    },

    // Header
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatarBorder: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        padding: 2,
    },
    avatar: {
        flex: 1,
        borderRadius: 22,
        backgroundColor: theme.colors.background.card,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: theme.typography.sizes.lg,
        fontWeight: '700',
        color: theme.colors.text.primary,
    },
    levelBadge: {
        position: 'absolute',
        bottom: -4,
        right: -4,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: theme.colors.background.dark,
    },
    levelText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#ffffff',
    },
    greetingContainer: {
        gap: 2,
    },
    greetingLabel: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.text.secondary,
        fontWeight: '500',
    },
    greetingTitle: {
        fontSize: theme.typography.sizes.base,
        color: theme.colors.text.primary,
        fontWeight: '700',
    },
    notificationButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.colors.background.card,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    notificationDot: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.colors.status.error,
        borderWidth: 2,
        borderColor: theme.colors.background.card,
    },

    // Error banner
    errorBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 1,
        borderColor: theme.colors.status.error,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.xl,
    },
    errorText: {
        flex: 1,
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.status.error,
    },
    retryText: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.primary,
        fontWeight: '600',
    },

    // Pending banner
    pendingBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
        backgroundColor: 'rgba(255, 152, 0, 0.1)',
        borderWidth: 1,
        borderColor: theme.colors.status.warning,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.xl,
    },
    pendingText: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.status.warning,
        fontWeight: '500',
    },

    // Sections
    section: {
        marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
        fontSize: theme.typography.sizes.lg,
        fontWeight: '700',
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.md,
    },

    // Actions
    primaryAction: {
        marginBottom: theme.spacing.md,
    },
    actionsGrid: {
        flexDirection: 'row',
        gap: theme.spacing.md,
    },
    secondaryAction: {
        flex: 1,
    },

    // Bottom spacing
    bottomSpacing: {
        height: 100,
    },
});
