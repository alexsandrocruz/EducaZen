import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import rankingService, { RankingEntry } from '../../src/services/rankingService';
import { Card, Avatar } from '../../src/components/ui';
import { theme } from '../../src/theme';
import { useAuthStore } from '../../src/stores/authStore';

export default function RankingScreen() {
    const { user } = useAuthStore();
    const [ranking, setRanking] = useState<RankingEntry[]>([]);
    const [myPosition, setMyPosition] = useState<RankingEntry | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<'GLOBAL' | 'SCHOOL'>('GLOBAL');

    useEffect(() => {
        // TODO: Descomentar quando backend estiver completo
        // loadRanking();
    }, [filter]);

    const loadRanking = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const [rankingData, positionData] = await Promise.all([
                rankingService.getRanking({ scope: filter }),
                rankingService.getMyPosition(),
            ]);

            setRanking(rankingData);
            setMyPosition(positionData);
        } catch (error: any) {
            setError(error.message || 'Erro ao carregar ranking');
        } finally {
            setIsLoading(false);
        }
    };

    const getMedalIcon = (position: number) => {
        switch (position) {
            case 1:
                return '🥇';
            case 2:
                return '🥈';
            case 3:
                return '🥉';
            default:
                return `#${position}`;
        }
    };

    const isCurrentUser = (entry: RankingEntry) => {
        return entry.studentId === user?.id;
    };

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={styles.loadingText}>Carregando ranking...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Ranking</Text>
                    <Text style={styles.subtitle}>
                        Veja os melhores estudantes!
                    </Text>
                </View>

                {/* Filter */}
                <View style={styles.filterContainer}>
                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            filter === 'GLOBAL' && styles.filterButtonActive,
                        ]}
                        onPress={() => setFilter('GLOBAL')}
                    >
                        <Text
                            style={[
                                styles.filterButtonText,
                                filter === 'GLOBAL' && styles.filterButtonTextActive,
                            ]}
                        >
                            🌍 Global
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            filter === 'SCHOOL' && styles.filterButtonActive,
                        ]}
                        onPress={() => setFilter('SCHOOL')}
                    >
                        <Text
                            style={[
                                styles.filterButtonText,
                                filter === 'SCHOOL' && styles.filterButtonTextActive,
                            ]}
                        >
                            🏫 Minha Escola
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Error */}
                {error && (
                    <Card style={styles.errorCard}>
                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity onPress={loadRanking}>
                            <Text style={styles.errorRetry}>Tentar novamente</Text>
                        </TouchableOpacity>
                    </Card>
                )}

                {/* My Position Card */}
                {myPosition && (
                    <Card style={styles.myPositionCard}>
                        <Text style={styles.myPositionLabel}>Sua Posição</Text>
                        <View style={styles.myPositionContent}>
                            <Text style={styles.myPositionRank}>
                                {getMedalIcon(myPosition.position)}
                            </Text>
                            <View style={styles.myPositionStats}>
                                <Text style={styles.myPositionXp}>
                                    {myPosition.totalXp} XP
                                </Text>
                                <Text style={styles.myPositionLevel}>
                                    Nível {myPosition.currentLevel}
                                </Text>
                            </View>
                        </View>
                    </Card>
                )}

                {/* Ranking List */}
                {ranking.length === 0 && !isLoading && (
                    <Card style={styles.emptyCard}>
                        <Text style={styles.emptyIcon}>🏆</Text>
                        <Text style={styles.emptyText}>
                            Nenhum dado de ranking disponível
                        </Text>
                    </Card>
                )}

                {ranking.map((entry, index) => (
                    <Card
                        key={entry.id}
                        style={[
                            styles.rankCard,
                            isCurrentUser(entry) && styles.rankCardHighlight,
                        ]}
                    >
                        <View style={styles.rankPosition}>
                            <Text style={styles.rankPositionText}>
                                {getMedalIcon(entry.position)}
                            </Text>
                        </View>

                        <Avatar size="md" />

                        <View style={styles.rankInfo}>
                            <Text style={styles.rankName}>
                                {entry.studentName}
                                {isCurrentUser(entry) && (
                                    <Text style={styles.rankYou}> (Você)</Text>
                                )}
                            </Text>
                            <Text style={styles.rankStats}>
                                Nível {entry.currentLevel} • {entry.totalXp} XP
                            </Text>
                        </View>

                        {entry.currentStreak > 0 && (
                            <View style={styles.rankStreak}>
                                <Text style={styles.rankStreakIcon}>🔥</Text>
                                <Text style={styles.rankStreakText}>
                                    {entry.currentStreak}
                                </Text>
                            </View>
                        )}
                    </Card>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.dark,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background.dark,
    },
    loadingText: {
        marginTop: theme.spacing.md,
        fontSize: theme.typography.sizes.base,
        color: theme.colors.text.secondary,
    },
    scrollContent: {
        padding: theme.spacing.xl,
        paddingTop: 60,
    },
    header: {
        marginBottom: theme.spacing.xl,
    },
    title: {
        fontSize: theme.typography.sizes['3xl'],
        fontWeight: '800',
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.xs,
    },
    subtitle: {
        fontSize: theme.typography.sizes.base,
        color: theme.colors.text.secondary,
    },
    filterContainer: {
        flexDirection: 'row',
        gap: theme.spacing.md,
        marginBottom: theme.spacing.xl,
    },
    filterButton: {
        flex: 1,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
        backgroundColor: theme.colors.background.card,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    filterButtonActive: {
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.primary + '20',
    },
    filterButtonText: {
        fontSize: theme.typography.sizes.sm,
        fontWeight: '600',
        color: theme.colors.text.secondary,
    },
    filterButtonTextActive: {
        color: theme.colors.primary,
    },
    errorCard: {
        backgroundColor: theme.colors.status.error + '20',
        borderColor: theme.colors.status.error,
        borderWidth: 1,
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.xl,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    errorText: {
        flex: 1,
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.status.error,
    },
    errorRetry: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.status.error,
        fontWeight: '600',
    },
    myPositionCard: {
        padding: theme.spacing.xl,
        marginBottom: theme.spacing.xl,
        backgroundColor: theme.colors.primary + '15',
        borderColor: theme.colors.primary + '40',
        borderWidth: 1,
    },
    myPositionLabel: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.text.secondary,
        marginBottom: theme.spacing.md,
    },
    myPositionContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.lg,
    },
    myPositionRank: {
        fontSize: 48,
    },
    myPositionStats: {},
    myPositionXp: {
        fontSize: theme.typography.sizes['2xl'],
        fontWeight: '800',
        color: theme.colors.primary,
        marginBottom: theme.spacing.xs,
    },
    myPositionLevel: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.text.secondary,
    },
    emptyCard: {
        padding: theme.spacing['2xl'],
        alignItems: 'center',
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: theme.spacing.lg,
    },
    emptyText: {
        fontSize: theme.typography.sizes.base,
        color: theme.colors.text.secondary,
        textAlign: 'center',
    },
    rankCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.md,
        gap: theme.spacing.md,
    },
    rankCardHighlight: {
        backgroundColor: theme.colors.primary + '10',
        borderColor: theme.colors.primary + '30',
        borderWidth: 1,
    },
    rankPosition: {
        width: 40,
        alignItems: 'center',
    },
    rankPositionText: {
        fontSize: theme.typography.sizes.xl,
        fontWeight: '700',
    },
    rankInfo: {
        flex: 1,
    },
    rankName: {
        fontSize: theme.typography.sizes.base,
        fontWeight: '600',
        color: theme.colors.text.primary,
        marginBottom: 2,
    },
    rankYou: {
        color: theme.colors.primary,
        fontSize: theme.typography.sizes.sm,
    },
    rankStats: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.text.secondary,
    },
    rankStreak: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: theme.colors.gamification.fire + '20',
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.md,
    },
    rankStreakIcon: {
        fontSize: 16,
    },
    rankStreakText: {
        fontSize: theme.typography.sizes.sm,
        fontWeight: '700',
        color: theme.colors.gamification.fire,
    },
});
