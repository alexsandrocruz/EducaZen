import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../theme';

interface PerformanceStatsProps {
    accuracyRate: number;
    questionsToday: number;
    dailyGoal: number;
    onSeeMore?: () => void;
}

export function PerformanceStats({
    accuracyRate = 72,
    questionsToday = 24,
    dailyGoal = 50,
    onSeeMore,
}: PerformanceStatsProps) {
    const questionsProgress = (questionsToday / dailyGoal) * 100;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Seu Desempenho</Text>
                <TouchableOpacity onPress={onSeeMore}>
                    <Text style={styles.seeMore}>Ver mais</Text>
                </TouchableOpacity>
            </View>

            {/* Stats Grid */}
            <View style={styles.grid}>
                {/* Accuracy Rate */}
                <View style={styles.statCard}>
                    <Text style={styles.statLabel}>Taxa de Acertos</Text>
                    <View style={styles.statValueRow}>
                        <Text style={[styles.statValue, { color: theme.colors.status.success }]}>
                            {accuracyRate}%
                        </Text>
                        <MaterialCommunityIcons
                            name="trending-up"
                            size={16}
                            color={theme.colors.status.success}
                        />
                    </View>
                    <View style={styles.progressBarBg}>
                        <View
                            style={[
                                styles.progressBarFill,
                                {
                                    width: `${accuracyRate}%`,
                                    backgroundColor: theme.colors.status.success,
                                },
                            ]}
                        />
                    </View>
                </View>

                {/* Questions Today */}
                <View style={styles.statCard}>
                    <Text style={styles.statLabel}>Questões Hoje</Text>
                    <View style={styles.statValueRow}>
                        <Text style={[styles.statValue, { color: theme.colors.primary }]}>
                            {questionsToday}
                        </Text>
                        <Text style={styles.statGoal}>/ {dailyGoal}</Text>
                    </View>
                    <View style={styles.progressBarBg}>
                        <View
                            style={[
                                styles.progressBarFill,
                                {
                                    width: `${questionsProgress}%`,
                                    backgroundColor: theme.colors.primary,
                                },
                            ]}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: theme.spacing.md,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    title: {
        fontSize: theme.typography.sizes.lg,
        fontWeight: '700',
        color: theme.colors.text.primary,
    },
    seeMore: {
        fontSize: theme.typography.sizes.sm,
        fontWeight: '600',
        color: theme.colors.primary,
    },
    grid: {
        flexDirection: 'row',
        gap: theme.spacing.md,
    },
    statCard: {
        flex: 1,
        backgroundColor: theme.colors.background.card,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 1,
        borderColor: theme.colors.border.dark,
        padding: theme.spacing.lg,
    },
    statLabel: {
        fontSize: theme.typography.sizes.xs,
        fontWeight: '500',
        color: theme.colors.text.secondary,
        marginBottom: theme.spacing.sm,
    },
    statValueRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 4,
        marginBottom: theme.spacing.sm,
    },
    statValue: {
        fontSize: theme.typography.sizes['2xl'],
        fontWeight: '700',
    },
    statGoal: {
        fontSize: theme.typography.sizes.xs,
        color: theme.colors.text.muted,
    },
    progressBarBg: {
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 3,
    },
});
