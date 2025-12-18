import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    Alert,
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../src/stores/authStore';
import { theme } from '../../src/theme';

// Types
interface StatCardProps {
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    iconColor: string;
    iconBgColor: string;
    label: string;
    value: string;
}

interface AchievementProps {
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    title: string;
    colors: readonly [string, string, ...string[]];
    locked?: boolean;
}

// Components
function StatCard({ icon, iconColor, iconBgColor, label, value }: StatCardProps) {
    return (
        <View style={styles.statCard}>
            <View style={styles.statCardHeader}>
                <View style={[styles.statIconContainer, { backgroundColor: iconBgColor }]}>
                    <MaterialCommunityIcons name={icon} size={20} color={iconColor} />
                </View>
                <Text style={styles.statLabel}>{label}</Text>
            </View>
            <Text style={styles.statValue}>{value}</Text>
        </View>
    );
}

function AchievementBadge({ icon, title, colors, locked }: AchievementProps) {
    return (
        <View style={[styles.achievementContainer, locked && styles.achievementLocked]}>
            {locked ? (
                <View style={styles.achievementBadgeLocked}>
                    <MaterialCommunityIcons name={icon} size={32} color="#6b7280" />
                </View>
            ) : (
                <LinearGradient colors={colors} style={styles.achievementBadge}>
                    <MaterialCommunityIcons name={icon} size={32} color="#ffffff" />
                </LinearGradient>
            )}
            <Text style={styles.achievementTitle}>{title}</Text>
        </View>
    );
}

export default function ProfileScreen() {
    const router = useRouter();
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        Alert.alert('Sair', 'Tem certeza que deseja sair?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Sair',
                style: 'destructive',
                onPress: async () => {
                    await logout();
                    router.replace('/');
                },
            },
        ]);
    };

    // Mock data - these would come from API
    const userLevel = user?.currentLevel || 5;
    const currentXp = 1250;
    const requiredXp = 2000;
    const xpProgress = (currentXp / requiredXp) * 100;
    const streakDays = user?.currentStreak || 14;
    const ranking = 420;
    const accuracy = 85;
    const questionsAnswered = 320;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Meu Perfil</Text>
                <TouchableOpacity style={styles.settingsButton}>
                    <MaterialCommunityIcons name="cog" size={24} color={theme.colors.text.secondary} />
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Profile Avatar Section */}
                <View style={styles.avatarSection}>
                    <View style={styles.avatarGlow} />
                    <LinearGradient
                        colors={['#7f13ec', '#9d4dff']}
                        style={styles.avatarGradientBorder}
                    >
                        <View style={styles.avatarInner}>
                            {user?.photoUrl ? (
                                <Image source={{ uri: user.photoUrl }} style={styles.avatarImage} />
                            ) : (
                                <View style={styles.avatarPlaceholder}>
                                    <Text style={styles.avatarInitials}>
                                        {user?.fullName?.charAt(0)?.toUpperCase() || 'E'}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </LinearGradient>
                    <TouchableOpacity style={styles.editButton}>
                        <MaterialCommunityIcons name="pencil" size={16} color={theme.colors.primary} />
                    </TouchableOpacity>
                </View>

                {/* Name and Level */}
                <View style={styles.nameSection}>
                    <Text style={styles.userName}>{user?.fullName || 'Estudante'}</Text>
                    <View style={styles.levelBadge}>
                        <MaterialCommunityIcons name="medal" size={18} color="#facc15" />
                        <Text style={styles.levelText}>Nível {userLevel} - Explorador</Text>
                    </View>
                </View>

                {/* XP Progress */}
                <View style={styles.xpSection}>
                    <View style={styles.xpHeader}>
                        <Text style={styles.xpLabel}>PRÓXIMO NÍVEL</Text>
                        <Text style={styles.xpValue}>{currentXp} / {requiredXp} XP</Text>
                    </View>
                    <View style={styles.xpBarBackground}>
                        <LinearGradient
                            colors={['#7f13ec', '#9d4dff']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={[styles.xpBarFill, { width: `${xpProgress}%` }]}
                        />
                    </View>
                    <Text style={styles.xpHint}>Faltam {requiredXp - currentXp} XP para se tornar Mestre da Redação</Text>
                </View>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    <StatCard
                        icon="fire"
                        iconColor="#f97316"
                        iconBgColor="rgba(249, 115, 22, 0.1)"
                        label="Sequência"
                        value={`${streakDays} Dias`}
                    />
                    <StatCard
                        icon="podium"
                        iconColor="#eab308"
                        iconBgColor="rgba(234, 179, 8, 0.1)"
                        label="Ranking"
                        value={`#${ranking}`}
                    />
                    <StatCard
                        icon="target"
                        iconColor="#22c55e"
                        iconBgColor="rgba(34, 197, 94, 0.1)"
                        label="Acerto"
                        value={`${accuracy}%`}
                    />
                    <StatCard
                        icon="help-circle"
                        iconColor="#3b82f6"
                        iconBgColor="rgba(59, 130, 246, 0.1)"
                        label="Questões"
                        value={questionsAnswered.toString()}
                    />
                </View>

                {/* Achievements Section */}
                <View style={styles.achievementsSection}>
                    <View style={styles.achievementsHeader}>
                        <Text style={styles.sectionTitle}>Minhas Conquistas</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllButton}>Ver tudo</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.achievementsScroll}
                    >
                        <AchievementBadge
                            icon="trophy"
                            title="Nota 1000"
                            colors={['#facc15', '#f97316']}
                        />
                        <AchievementBadge
                            icon="book-open-page-variant"
                            title="Maratona Hist."
                            colors={['#60a5fa', '#6366f1']}
                        />
                        <AchievementBadge
                            icon="calculator"
                            title="Rei da Mat."
                            colors={['#4ade80', '#14b8a6']}
                        />
                        <AchievementBadge
                            icon="flask"
                            title="Cientista Louco"
                            colors={['#94a3b8', '#64748b']}
                            locked
                        />
                    </ScrollView>
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <MaterialCommunityIcons name="logout" size={20} color="#ef4444" />
                    <Text style={styles.logoutText}>Sair da conta</Text>
                </TouchableOpacity>

                {/* Version */}
                <Text style={styles.version}>EstudaZen v1.0.0</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.dark,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 56,
        paddingBottom: 12,
        backgroundColor: 'rgba(25, 16, 34, 0.95)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: theme.colors.text.primary,
    },
    settingsButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingBottom: 100,
    },
    avatarSection: {
        alignItems: 'center',
        paddingTop: 24,
        position: 'relative',
    },
    avatarGlow: {
        position: 'absolute',
        top: 20,
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: 'rgba(127, 19, 236, 0.3)',
    },
    avatarGradientBorder: {
        width: 136,
        height: 136,
        borderRadius: 68,
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarInner: {
        width: 128,
        height: 128,
        borderRadius: 64,
        backgroundColor: theme.colors.background.dark,
        overflow: 'hidden',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    avatarPlaceholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
    },
    avatarInitials: {
        fontSize: 48,
        fontWeight: '700',
        color: '#ffffff',
    },
    editButton: {
        position: 'absolute',
        bottom: 4,
        right: '35%',
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: theme.colors.background.card,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: theme.colors.background.dark,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    nameSection: {
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 20,
    },
    userName: {
        fontSize: 24,
        fontWeight: '700',
        color: theme.colors.text.primary,
        marginBottom: 4,
    },
    levelBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    levelText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#ad92c9',
    },
    xpSection: {
        paddingHorizontal: 24,
        marginBottom: 20,
    },
    xpHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 12,
    },
    xpLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: theme.colors.primary,
        letterSpacing: 1,
    },
    xpValue: {
        fontSize: 14,
        fontWeight: '500',
        color: theme.colors.text.secondary,
    },
    xpBarBackground: {
        height: 16,
        borderRadius: 8,
        backgroundColor: 'rgba(42, 31, 54, 1)',
        overflow: 'hidden',
    },
    xpBarFill: {
        height: '100%',
        borderRadius: 8,
    },
    xpHint: {
        fontSize: 12,
        color: theme.colors.text.muted,
        textAlign: 'center',
        marginTop: 8,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    statCard: {
        width: '48%',
        backgroundColor: theme.colors.background.card,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    statCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    statIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 13,
        fontWeight: '500',
        color: theme.colors.text.secondary,
    },
    statValue: {
        fontSize: 24,
        fontWeight: '700',
        color: theme.colors.text.primary,
    },
    achievementsSection: {
        marginBottom: 24,
    },
    achievementsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: theme.colors.text.primary,
    },
    seeAllButton: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.primary,
    },
    achievementsScroll: {
        paddingHorizontal: 16,
        gap: 16,
    },
    achievementContainer: {
        width: 100,
        alignItems: 'center',
        gap: 8,
    },
    achievementLocked: {
        opacity: 0.5,
    },
    achievementBadge: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: theme.colors.background.card,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    achievementBadgeLocked: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 4,
        borderColor: theme.colors.background.card,
    },
    achievementTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: theme.colors.text.primary,
        textAlign: 'center',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginHorizontal: 16,
        paddingVertical: 16,
        borderRadius: 12,
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        marginBottom: 16,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ef4444',
    },
    version: {
        fontSize: 12,
        color: theme.colors.text.muted,
        textAlign: 'center',
        marginBottom: 20,
    },
});

