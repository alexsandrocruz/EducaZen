import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../theme';

interface LeagueCardProps {
    leagueName: string;
    currentXp: number;
    requiredXp: number;
    streakDays: number;
    rankPercent: number;
}

export function LeagueCard({
    leagueName = 'Bronze III',
    currentXp = 450,
    requiredXp = 1000,
    streakDays = 12,
    rankPercent = 5,
}: LeagueCardProps) {
    const progress = (currentXp / requiredXp) * 100;
    const remainingXp = requiredXp - currentXp;

    return (
        <LinearGradient
            colors={['#6a11cb', '#2575fc']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            {/* Background decorations */}
            <View style={styles.bgCircle1} />
            <View style={styles.bgCircle2} />

            {/* Content */}
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.label}>Liga Atual</Text>
                        <Text style={styles.leagueName}>{leagueName}</Text>
                    </View>
                    <View style={styles.medalContainer}>
                        <MaterialCommunityIcons
                            name="medal"
                            size={36}
                            color="#fbbf24"
                        />
                    </View>
                </View>

                {/* Progress Section */}
                <View style={styles.progressSection}>
                    <View style={styles.progressHeader}>
                        <Text style={styles.xpText}>
                            {currentXp}{' '}
                            <Text style={styles.xpMuted}>/ {requiredXp} XP</Text>
                        </Text>
                        <Text style={styles.remainingText}>
                            Faltam {remainingXp} XP
                        </Text>
                    </View>

                    {/* Progress Bar */}
                    <View style={styles.progressBarBg}>
                        <LinearGradient
                            colors={['#fbbf24', '#f59e0b']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={[styles.progressBarFill, { width: `${progress}%` }]}
                        />
                    </View>
                </View>

                {/* Stats Footer */}
                <View style={styles.statsFooter}>
                    <View style={styles.statItem}>
                        <MaterialCommunityIcons
                            name="fire"
                            size={20}
                            color="#fb923c"
                        />
                        <Text style={styles.statText}>{streakDays} Dias</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.statItem}>
                        <MaterialCommunityIcons
                            name="lightning-bolt"
                            size={20}
                            color="#fbbf24"
                        />
                        <Text style={styles.statText}>Top {rankPercent}%</Text>
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: theme.borderRadius.xl,
        overflow: 'hidden',
        position: 'relative',
    },
    bgCircle1: {
        position: 'absolute',
        top: -40,
        right: -40,
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    bgCircle2: {
        position: 'absolute',
        bottom: -40,
        left: -40,
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: 'rgba(127, 19, 236, 0.3)',
    },
    content: {
        padding: theme.spacing.xl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    label: {
        fontSize: theme.typography.sizes.sm,
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '500',
    },
    leagueName: {
        fontSize: theme.typography.sizes['3xl'],
        fontWeight: '800',
        color: '#ffffff',
        marginTop: 4,
    },
    medalContainer: {
        width: 56,
        height: 56,
        borderRadius: theme.borderRadius.lg,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressSection: {
        marginTop: theme.spacing.xl,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: theme.spacing.sm,
    },
    xpText: {
        fontSize: theme.typography.sizes.sm,
        fontWeight: '600',
        color: '#ffffff',
    },
    xpMuted: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontWeight: '400',
    },
    remainingText: {
        fontSize: theme.typography.sizes.xs,
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    progressBarBg: {
        height: 12,
        borderRadius: 6,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 6,
    },
    statsFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: theme.spacing.lg,
        paddingTop: theme.spacing.lg,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    statText: {
        fontSize: theme.typography.sizes.sm,
        fontWeight: '700',
        color: '#ffffff',
    },
    divider: {
        width: 1,
        height: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginHorizontal: theme.spacing.lg,
    },
});
