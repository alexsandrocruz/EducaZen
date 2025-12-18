import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useQuizStore } from '../../src/stores/quizStore';
import { Card, Badge } from '../../src/components/ui';
import { theme } from '../../src/theme';

export default function QuizScreen() {
    const router = useRouter();
    const {
        availableQuizzes,
        isLoading,
        error,
        loadAvailableQuizzes,
        startQuiz,
        clearError
    } = useQuizStore();

    useEffect(() => {
        loadQuizzes();
    }, []);

    const loadQuizzes = async () => {
        try {
            await loadAvailableQuizzes();
        } catch (error) {
            // Error já está no state
        }
    };

    const handleStartNewQuiz = async () => {
        try {
            // Iniciar um quiz aleatório com 10 questões
            await startQuiz();
            // Recarregar a lista para mostrar o novo quiz
            await loadQuizzes();
        } catch (error: any) {
            // Erro já exibido pelo store
        }
    };

    const handleContinueQuiz = async (quizId: string) => {
        try {
            router.push(`/quiz/${quizId}`);
        } catch (error: any) {
            Alert.alert('Erro', error.message || 'Não foi possível continuar o quiz');
        }
    };

    const getDifficultyBadge = (difficulty: 'EASY' | 'MEDIUM' | 'HARD') => {
        switch (difficulty) {
            case 'EASY':
                return <Badge label="Fácil" variant="status" />;
            case 'MEDIUM':
                return <Badge label="Médio" variant="status" />;
            case 'HARD':
                return <Badge label="Difícil" variant="status" />;
        }
    };

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={styles.loadingText}>Carregando quizzes...</Text>
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
                    <View>
                        <Text style={styles.title}>Quizzes</Text>
                        <Text style={styles.subtitle}>
                            Teste seus conhecimentos e ganhe XP!
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.newQuizButton}
                        onPress={() => handleStartNewQuiz()}
                    >
                        <Text style={styles.newQuizButtonText}>+ Novo Quiz</Text>
                    </TouchableOpacity>
                </View>

                {/* Error Message */}
                {error && (
                    <Card style={styles.errorCard}>
                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity onPress={clearError}>
                            <Text style={styles.errorDismiss}>Fechar</Text>
                        </TouchableOpacity>
                    </Card>
                )}

                {/* Empty State */}
                {!isLoading && availableQuizzes.length === 0 && (
                    <Card style={styles.emptyCard}>
                        <Text style={styles.emptyIcon}>📝</Text>
                        <Text style={styles.emptyTitle}>Nenhum quiz disponível</Text>
                        <Text style={styles.emptyText}>
                            Novos quizzes serão adicionados em breve!
                        </Text>
                    </Card>
                )}

                {/* Quiz List - Sorted by status (active first) */}
                {[...availableQuizzes]
                    .sort((a, b) => {
                        // InProgress first, then Completed, then Abandoned
                        const statusOrder = { InProgress: 0, Completed: 1, Abandoned: 2 };
                        return (statusOrder[a.status] || 3) - (statusOrder[b.status] || 3);
                    })
                    .map((quiz) => {
                        const isCompleted = quiz.status === 'Completed';
                        const isAbandoned = quiz.status === 'Abandoned';
                        const isActive = quiz.status === 'InProgress';

                        return (
                            <Card
                                key={quiz.id}
                                style={{
                                    ...styles.quizCard,
                                    ...(isCompleted ? styles.completedQuizCard : {}),
                                    ...(isAbandoned ? styles.abandonedQuizCard : {}),
                                }}
                            >
                                <View style={styles.quizHeader}>
                                    <View style={styles.quizTitleContainer}>
                                        <View style={styles.quizTitleRow}>
                                            {isActive && <Text style={styles.activeIndicator}>🔥</Text>}
                                            <Text style={[
                                                styles.quizTitle,
                                                isCompleted && styles.completedText,
                                                isAbandoned && styles.abandonedText,
                                            ]}>
                                                Quiz #{quiz.id.slice(-4).toUpperCase()}
                                            </Text>
                                        </View>
                                        {quiz.subjectName && (
                                            <Text style={styles.quizSubject}>{quiz.subjectName}</Text>
                                        )}
                                    </View>
                                    <Badge
                                        label={
                                            isCompleted ? '✓ Concluído' :
                                                isAbandoned ? 'Abandonado' :
                                                    'Em Progresso'
                                        }
                                        variant="status"
                                        color={
                                            isCompleted ? theme.colors.status.success :
                                                isAbandoned ? theme.colors.status.error :
                                                    theme.colors.primary
                                        }
                                    />
                                </View>

                                <View style={styles.quizStats}>
                                    <View style={styles.stat}>
                                        <Text style={styles.statIcon}>📋</Text>
                                        <Text style={styles.statText}>
                                            {quiz.totalQuestions} questões
                                        </Text>
                                    </View>
                                    {isCompleted && (
                                        <>
                                            <View style={styles.stat}>
                                                <Text style={styles.statIcon}>✅</Text>
                                                <Text style={styles.statText}>
                                                    {quiz.correctAnswers}/{quiz.totalQuestions} corretas
                                                </Text>
                                            </View>
                                            <View style={styles.stat}>
                                                <Text style={styles.statIcon}>⭐</Text>
                                                <Text style={styles.statText}>
                                                    {quiz.totalXpEarned} XP
                                                </Text>
                                            </View>
                                        </>
                                    )}
                                    {isActive && (
                                        <View style={styles.stat}>
                                            <Text style={styles.statIcon}>⏱️</Text>
                                            <Text style={styles.statText}>Em andamento</Text>
                                        </View>
                                    )}
                                </View>

                                {isCompleted ? (
                                    <TouchableOpacity
                                        style={styles.viewResultsButton}
                                        onPress={() => router.push(`/quiz/${quiz.id}/results`)}
                                    >
                                        <Text style={styles.viewResultsButtonText}>Ver Resultados</Text>
                                        <Text style={styles.startButtonIcon}>📊</Text>
                                    </TouchableOpacity>
                                ) : isAbandoned ? (
                                    <View style={styles.abandonedMessage}>
                                        <Text style={styles.abandonedMessageText}>Quiz abandonado</Text>
                                    </View>
                                ) : (
                                    <TouchableOpacity
                                        style={styles.startButton}
                                        onPress={() => handleContinueQuiz(quiz.id)}
                                    >
                                        <Text style={styles.startButtonText}>Continuar Quiz</Text>
                                        <Text style={styles.startButtonIcon}>→</Text>
                                    </TouchableOpacity>
                                )}
                            </Card>
                        );
                    })}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
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
    newQuizButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.lg,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.sm,
    },
    newQuizButtonText: {
        fontSize: theme.typography.sizes.sm,
        fontWeight: '700',
        color: '#ffffff',
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
    errorDismiss: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.status.error,
        fontWeight: '600',
    },
    emptyCard: {
        padding: theme.spacing['2xl'],
        alignItems: 'center',
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: theme.spacing.lg,
    },
    emptyTitle: {
        fontSize: theme.typography.sizes.xl,
        fontWeight: '700',
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.sm,
    },
    emptyText: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.text.secondary,
        textAlign: 'center',
    },
    quizCard: {
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.lg,
    },
    quizHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.md,
    },
    quizTitleContainer: {
        flex: 1,
        marginRight: theme.spacing.md,
    },
    quizTitle: {
        fontSize: theme.typography.sizes.lg,
        fontWeight: '700',
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.xs,
    },
    quizSubject: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.text.secondary,
    },
    quizDescription: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.text.secondary,
        marginBottom: theme.spacing.md,
        lineHeight: 20,
    },
    quizStats: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing.md,
        marginBottom: theme.spacing.lg,
    },
    stat: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.xs,
    },
    statIcon: {
        fontSize: 16,
    },
    statText: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.text.secondary,
    },
    startButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    startButtonText: {
        fontSize: theme.typography.sizes.base,
        fontWeight: '600',
        color: '#ffffff',
    },
    startButtonIcon: {
        fontSize: 20,
        color: '#ffffff',
    },
    // New styles for status-aware quiz cards
    completedQuizCard: {
        opacity: 0.85,
        borderColor: theme.colors.status.success,
        borderWidth: 1,
    },
    abandonedQuizCard: {
        opacity: 0.6,
        borderColor: theme.colors.status.error,
        borderWidth: 1,
    },
    quizTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    activeIndicator: {
        fontSize: 18,
    },
    completedText: {
        color: theme.colors.status.success,
    },
    abandonedText: {
        color: theme.colors.text.secondary,
    },
    viewResultsButton: {
        backgroundColor: theme.colors.status.success,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    viewResultsButtonText: {
        fontSize: theme.typography.sizes.base,
        fontWeight: '600',
        color: '#ffffff',
    },
    abandonedMessage: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        alignItems: 'center',
    },
    abandonedMessageText: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.text.secondary,
    },
});
