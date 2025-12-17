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

    const handleStartQuiz = async (quizId: string) => {
        try {
            await startQuiz(quizId);
            // TODO: Criar tela de quiz taking
            Alert.alert('Quiz Iniciado!', 'A tela de fazer quiz será implementada em breve.');
            // router.push(`/quiz/${quizId}`);
        } catch (error: any) {
            Alert.alert('Erro', error.message || 'Não foi possível iniciar o quiz');
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
                    <Text style={styles.title}>Quizzes</Text>
                    <Text style={styles.subtitle}>
                        Teste seus conhecimentos e ganhe XP!
                    </Text>
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

                {/* Quiz List */}
                {availableQuizzes.map((quiz) => (
                    <Card key={quiz.id} style={styles.quizCard}>
                        <View style={styles.quizHeader}>
                            <View style={styles.quizTitleContainer}>
                                <Text style={styles.quizTitle}>{quiz.title}</Text>
                                {quiz.subjectName && (
                                    <Text style={styles.quizSubject}>{quiz.subjectName}</Text>
                                )}
                            </View>
                            {getDifficultyBadge(quiz.difficulty)}
                        </View>

                        {quiz.description && (
                            <Text style={styles.quizDescription}>{quiz.description}</Text>
                        )}

                        <View style={styles.quizStats}>
                            <View style={styles.stat}>
                                <Text style={styles.statIcon}>📋</Text>
                                <Text style={styles.statText}>
                                    {quiz.totalQuestions} questões
                                </Text>
                            </View>
                            <View style={styles.stat}>
                                <Text style={styles.statIcon}>⭐</Text>
                                <Text style={styles.statText}>
                                    {quiz.totalPoints} pontos
                                </Text>
                            </View>
                            {quiz.timeLimit && (
                                <View style={styles.stat}>
                                    <Text style={styles.statIcon}>⏱️</Text>
                                    <Text style={styles.statText}>
                                        {quiz.timeLimit} min
                                    </Text>
                                </View>
                            )}
                        </View>

                        <TouchableOpacity
                            style={styles.startButton}
                            onPress={() => handleStartQuiz(quiz.id)}
                        >
                            <Text style={styles.startButtonText}>Começar Quiz</Text>
                            <Text style={styles.startButtonIcon}>→</Text>
                        </TouchableOpacity>
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
});
