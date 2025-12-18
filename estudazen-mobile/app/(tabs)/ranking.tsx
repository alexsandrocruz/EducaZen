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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import rankingService, { RankingEntry } from '../../src/services/rankingService';
import { Podium, RankingListItem, MyPositionFooter } from '../../src/components/ranking';
import { theme } from '../../src/theme';
import { useAuthStore } from '../../src/stores/authStore';

type FilterType = 'SCHOOL' | 'GLOBAL';

export default function RankingScreen() {
    const { user } = useAuthStore();
    const [ranking, setRanking] = useState<RankingEntry[]>([]);
    const [myPosition, setMyPosition] = useState<RankingEntry | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<FilterType>('SCHOOL');

    useEffect(() => {
        loadRanking();
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
        } catch (err: any) {
            setError(err.message || 'Erro ao carregar ranking');
            // Mock data for demo
            setRanking([
                { id: '1', studentId: '1', studentName: 'João Silva', position: 1, totalXp: 15000, currentLevel: 12, currentStreak: 14 },
                { id: '2', studentId: '2', studentName: 'Maria O.', position: 2, totalXp: 14200, currentLevel: 11, currentStreak: 7 },
                { id: '3', studentId: '3', studentName: 'Pedro S.', position: 3, totalXp: 13800, currentLevel: 11, currentStreak: 5 },
                { id: '4', studentId: '4', studentName: 'Ana Costa', schoolName: 'Colégio Militar', position: 4, totalXp: 12500, currentLevel: 10, currentStreak: 3 },
                { id: '5', studentId: '5', studentName: 'Lucas Pereira', schoolName: 'Escola Estadual Modelo', position: 5, totalXp: 11950, currentLevel: 10, currentStreak: 2 },
                { id: '6', studentId: '6', studentName: 'Carla Mendes', schoolName: 'Instituto Federal', position: 6, totalXp: 10200, currentLevel: 9, currentStreak: 10 },
                { id: '7', studentId: '7', studentName: 'Rafael Souza', schoolName: 'Colégio Santa Maria', position: 7, totalXp: 9800, currentLevel: 9, currentStreak: 0 },
                { id: '8', studentId: '8', studentName: 'Beatriz Lima', schoolName: 'Escola Técnica', position: 8, totalXp: 9450, currentLevel: 8, currentStreak: 4 },
            ]);
            setMyPosition({ id: 'me', studentId: user?.id || 'me', studentName: 'Você', position: 42, totalXp: 8900, currentLevel: 8, currentStreak: 7 });
        } finally {
            setIsLoading(false);
        }
    };

    const top3 = ranking.filter((e) => e.position <= 3).map(e => ({
        rank: e.position,
        studentName: e.studentName,
        avatarUrl: e.avatarUrl,
        totalXp: e.totalXp,
        isCurrentUser: e.studentId === user?.id,
    }));

    const restOfList = ranking.filter((e) => e.position > 3);

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

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerPlaceholder} />
                <Text style={styles.headerTitle}>Ranking</Text>
                <TouchableOpacity style={styles.headerButton}>
                    <MaterialCommunityIcons name="filter-variant" size={24} color={theme.colors.text.secondary} />
                </TouchableOpacity>
            </View>

            {/* Filter Tabs */}
            <View style={styles.filterContainer}>
                <View style={styles.filterTabs}>
                    <TouchableOpacity
                        style={[styles.filterTab, filter === 'SCHOOL' && styles.filterTabActive]}
                        onPress={() => setFilter('SCHOOL')}
                    >
                        <Text style={[styles.filterTabText, filter === 'SCHOOL' && styles.filterTabTextActive]}>
                            Por Escola
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterTab, filter === 'GLOBAL' && styles.filterTabActive]}
                        onPress={() => setFilter('GLOBAL')}
                    >
                        <Text style={[styles.filterTabText, filter === 'GLOBAL' && styles.filterTabTextActive]}>
                            Por Prefeitura
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Error */}
                {error && (
                    <View style={styles.errorBanner}>
                        <Text style={styles.errorText}>⚠️ Usando dados de demonstração</Text>
                    </View>
                )}

                {/* Podium */}
                {top3.length >= 3 && <Podium entries={top3} />}

                {/* List Header */}
                <View style={styles.listHeader}>
                    <Text style={styles.listHeaderText}>Rank</Text>
                    <Text style={styles.listHeaderText}>Pontuação</Text>
                </View>

                {/* Ranking List */}
                <View style={styles.list}>
                    {restOfList.map((entry) => (
                        <RankingListItem
                            key={entry.id}
                            rank={entry.position}
                            studentName={entry.studentName}
                            schoolName={entry.schoolName}
                            avatarUrl={entry.avatarUrl}
                            totalXp={entry.totalXp}
                            isCurrentUser={entry.studentId === user?.id}
                        />
                    ))}
                </View>
            </ScrollView>

            {/* My Position Footer */}
            {myPosition && (
                <MyPositionFooter
                    rank={myPosition.position}
                    studentName={myPosition.studentName}
                    avatarUrl={myPosition.avatarUrl}
                    totalXp={myPosition.totalXp}
                    positionChange={3}
                />
            )}
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 56,
        paddingBottom: 8,
        backgroundColor: 'rgba(19, 16, 34, 0.95)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    headerPlaceholder: {
        width: 48,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: theme.colors.text.primary,
    },
    headerButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterContainer: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#131022',
    },
    filterTabs: {
        flexDirection: 'row',
        backgroundColor: '#292348',
        borderRadius: 24,
        padding: 4,
    },
    filterTab: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: 'center',
    },
    filterTabActive: {
        backgroundColor: '#3713ec',
    },
    filterTabText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#9b92c9',
    },
    filterTabTextActive: {
        color: '#ffffff',
    },
    scrollContent: {
        paddingBottom: 180,
    },
    errorBanner: {
        marginHorizontal: 16,
        marginBottom: 8,
        padding: 8,
        backgroundColor: 'rgba(234, 179, 8, 0.1)',
        borderRadius: 8,
        alignItems: 'center',
    },
    errorText: {
        fontSize: 12,
        color: '#eab308',
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 8,
    },
    listHeaderText: {
        fontSize: 11,
        fontWeight: '500',
        color: '#9b92c9',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    list: {
        paddingHorizontal: 16,
        gap: 12,
    },
});

