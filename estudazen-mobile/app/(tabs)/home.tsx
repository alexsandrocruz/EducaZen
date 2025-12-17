import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import { useAuthStore } from '../../src/stores/authStore';
import { Card, Button, Progress, Badge } from '../../src/components/ui';
import { theme } from '../../src/theme';

export default function HomeScreen() {
    const { user, logout } = useAuthStore();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Olá,</Text>
                        <Text style={styles.userName}>{user?.fullName || 'Estudante'} 👋</Text>
                    </View>
                    <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                        <Text style={styles.logoutIcon}>🚪</Text>
                    </TouchableOpacity>
                </View>

                {/* Status Card */}
                {user?.status === 'PENDING' && (
                    <Card style={styles.pendingCard}>
                        <Text style={styles.pendingIcon}>⏳</Text>
                        <Text style={styles.pendingTitle}>Aguardando Aprovação</Text>
                        <Text style={styles.pendingText}>
                            Sua conta está sendo analisada pela escola.
                            Você receberá uma notificação quando for aprovado!
                        </Text>
                    </Card>
                )}

                {/* Stats Card */}
                <Card style={styles.statsCard}>
                    <Text style={styles.statsTitle}>Seu Progresso</Text>

                    <View style={styles.statRow}>
                        <View style={styles.stat}>
                            <Text style={styles.statValue}>{user?.currentLevel || 1}</Text>
                            <Text style={styles.statLabel}>Nível</Text>
                        </View>
                        <View style={styles.stat}>
                            <Text style={styles.statValue}>{user?.totalXp || 0}</Text>
                            <Text style={styles.statLabel}>XP Total</Text>
                        </View>
                        <View style={styles.stat}>
                            <Text style={styles.statValue}>{user?.currentStreak || 0}</Text>
                            <Text style={styles.statLabel}>Dias Seguidos</Text>
                        </View>
                    </View>
                </Card>

                {/* Quick Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ações Rápidas</Text>

                    <Card style={styles.actionCard}>
                        <Text style={styles.actionIcon}>📝</Text>
                        <View style={styles.actionContent}>
                            <Text style={styles.actionTitle}>Fazer Quiz</Text>
                            <Text style={styles.actionDescription}>
                                Teste seus conhecimentos
                            </Text>
                        </View>
                        <Text style={styles.actionArrow}>→</Text>
                    </Card>

                    <Card style={styles.actionCard}>
                        <Text style={styles.actionIcon}>🏆</Text>
                        <View style={styles.actionContent}>
                            <Text style={styles.actionTitle}>Ver Ranking</Text>
                            <Text style={styles.actionDescription}>
                                Confira sua posição
                            </Text>
                        </View>
                        <Text style={styles.actionArrow}>→</Text>
                    </Card>
                </View>

                {/* School Info */}
                {user?.schoolName && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Informações</Text>
                        <Card style={styles.infoCard}>
                            <Text style={styles.infoLabel}>Escola</Text>
                            <Text style={styles.infoValue}>{user.schoolName}</Text>
                        </Card>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.dark,
    },
    scrollContent: {
        padding: theme.spacing.xl,
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing['2xl'],
    },
    greeting: {
        fontSize: theme.typography.sizes.base,
        color: theme.colors.text.secondary,
    },
    userName: {
        fontSize: theme.typography.sizes['2xl'],
        fontWeight: '800',
        color: theme.colors.text.primary,
    },
    logoutButton: {
        width: 44,
        height: 44,
        borderRadius: theme.borderRadius.lg,
        backgroundColor: theme.colors.background.card,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutIcon: {
        fontSize: 20,
    },
    pendingCard: {
        backgroundColor: theme.colors.status.warning + '20',
        borderColor: theme.colors.status.warning,
        borderWidth: 1,
        padding: theme.spacing.xl,
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
    },
    pendingIcon: {
        fontSize: 48,
        marginBottom: theme.spacing.md,
    },
    pendingTitle: {
        fontSize: theme.typography.sizes.lg,
        fontWeight: '700',
        color: theme.colors.status.warning,
        marginBottom: theme.spacing.sm,
    },
    pendingText: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.text.secondary,
        textAlign: 'center',
    },
    statsCard: {
        padding: theme.spacing.xl,
        marginBottom: theme.spacing.xl,
    },
    statsTitle: {
        fontSize: theme.typography.sizes.lg,
        fontWeight: '700',
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.lg,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    stat: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: theme.typography.sizes['3xl'],
        fontWeight: '800',
        color: theme.colors.primary,
        marginBottom: theme.spacing.xs,
    },
    statLabel: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.text.secondary,
    },
    section: {
        marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
        fontSize: theme.typography.sizes.lg,
        fontWeight: '700',
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.md,
    },
    actionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.md,
    },
    actionIcon: {
        fontSize: 32,
        marginRight: theme.spacing.md,
    },
    actionContent: {
        flex: 1,
    },
    actionTitle: {
        fontSize: theme.typography.sizes.base,
        fontWeight: '600',
        color: theme.colors.text.primary,
        marginBottom: 2,
    },
    actionDescription: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.text.secondary,
    },
    actionArrow: {
        fontSize: 24,
        color: theme.colors.text.secondary,
    },
    infoCard: {
        padding: theme.spacing.lg,
    },
    infoLabel: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.text.secondary,
        marginBottom: 4,
    },
    infoValue: {
        fontSize: theme.typography.sizes.base,
        fontWeight: '600',
        color: theme.colors.text.primary,
    },
});
