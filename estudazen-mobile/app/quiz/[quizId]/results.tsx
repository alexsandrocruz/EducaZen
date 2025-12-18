import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Card, Badge } from '../../../src/components/ui';
import { theme } from '../../../src/theme';

interface QuizResult {
    quizId: string;
    totalQuestions: number;
    correctAnswers: number;
    totalXpEarned: number;
    highestStreak: number;
    accuracyPercentage: number;
    completedAt: string;
    questions: {
        id: string;
        questionText: string;
        points: number;
        answers: {
            id: string;
            content: string;
            isCorrect: boolean;
        }[];
    }[];
}

export default function QuizResultsScreen() {
    const { quizId } = useLocalSearchParams<{ quizId: string }>();
    const router = useRouter();

    const [result, setResult] = useState<QuizResult | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!quizId) {
            Alert.alert('Erro', 'ID do quiz não encontrado');
            router.back();
            return;
        }
        loadResults();
    }, [quizId]);

    const loadResults = async () => {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('access_token');

            const response = await fetch(
                `http://localhost:5000/api/app/student-quiz/quiz-result/${quizId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) throw new Error('Erro ao carregar resultados');

            const data: QuizResult = await response.json();
            setResult(data);
        } catch (error: any) {
            Alert.alert('Erro', error.message || 'Não foi possível carregar os resultados');
            router.back();
        } finally {
            setLoading(false);
        }
    };

    const getScorePercentage = () => {
        if (!result) return 0;
        return Math.round((result.correctAnswers / result.totalQuestions) * 100);
    };

    const getPerformanceMessage = () => {
        const percentage = getScorePercentage();
        if (percentage >= 90) return 'Excelente! 🎉';
        if (percentage >= 70) return 'Muito bom! 👏';
        if (percentage >= 50) return 'Bom trabalho! 👍';
        return 'Continue praticando! 💪';
    };

    const getPerformanceColor = () => {
        const percentage = getScorePercentage();
        if (percentage >= 70) return theme.colors.status.success;
        if (percentage >= 50) return theme.colors.status.warning;
        return theme.colors.status.danger;
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary.DEFAULT} />
                <Text style={styles.loadingText}>Carregando resultados...</Text>
            </View>
        );
    }

    if (!result) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>Resultados não encontrados</Text>
                <Button title="Voltar" onPress={() => router.back()} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Quiz Concluído!</Text>
                    <Text style={styles.headerSubtitle}>{getPerformanceMessage()}</Text>
                </View>

                <View style={styles.scoreContainer}>
                    <View style={[styles.scoreCircle, { borderColor: getPerformanceColor() }]}>
                        <Text style={[styles.scorePercentage, { color: getPerformanceColor() }]}>
                            {getScorePercentage()}%
                        </Text>
                        <Text style={styles.scoreLabel}>
                            {result.correctAnswers}/{result.totalQuestions} corretas
                        </Text>
                    </View>
                </View>

                <View style={styles.statsGrid}>
                    <Card style={styles.statCard}>
                        <Text style={styles.statValue}>{result.correctAnswers}</Text>
                        <Text style={styles.statLabel}>Acertos</Text>
                    </Card>

                    <Card style={styles.statCard}>
                        <Text style={[styles.statValue, { color: theme.colors.primary.DEFAULT }]}>
                            +{result.totalXpEarned}
                        </Text>
                        <Text style={styles.statLabel}>XP Ganho</Text>
                    </Card>

                    <Card style={styles.statCard}>
                        <Text style={styles.statValue}>🔥 {result.highestStreak}</Text>
                        <Text style={styles.statLabel}>Sequência</Text>
                    </Card>

                    <Card style={styles.statCard}>
                        <Text style={styles.statValue}>
                            {new Date(result.completedAt).toLocaleDateString('pt-BR')}
                        </Text>
                        <Text style={styles.statLabel}>Concluído</Text>
                    </Card>
                </View>

                <View style={styles.reviewSection}>
                    <Text style={styles.sectionTitle}>Revisão das Questões</Text>

                    {result.questions.map((q, index) => {
                        const hasCorrectAnswer = q.answers.some((a) => a.isCorrect);
                        return (
                            <TouchableOpacity
                                key={q.id}
                                style={[
                                    styles.questionItem,
                                    hasCorrectAnswer ? styles.questionCorrect : styles.questionIncorrect,
                                ]}
                            >
                                <View style={styles.questionHeader}>
                                    <Text style={styles.questionNumber}>Questão {index + 1}</Text>
                                    <Badge
                                        label={hasCorrectAnswer ? 'Correta' : 'Incorreta'}
                                        variant={hasCorrectAnswer ? 'success' : 'danger'}
                                    />
                                </View>
                                <Text style={styles.questionTextSmall} numberOfLines={2}>
                                    {q.questionText}
                                </Text>
                                <View style={styles.questionFooter}>
                                    <Text style={styles.questionPoints}>
                                        {hasCorrectAnswer ? q.points : 0}/{q.points} pontos
                                    </Text>
                                    {hasCorrectAnswer ? (
                                        <Text style={styles.checkmark}>✓</Text>
                                    ) : (
                                        <Text style={styles.crossmark}>✗</Text>
                                    )}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title="Voltar aos Quizzes"
                    onPress={() => router.push('/(tabs)/quiz')}
                    variant="primary"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.dark,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background.dark,
    },
    loadingText: {
        marginTop: theme.spacing.md,
        color: theme.colors.text.secondary,
        fontSize: theme.typography.sizes.base,
    },
    errorText: {
        color: theme.colors.status.danger,
        fontSize: theme.typography.sizes.lg,
        marginBottom: theme.spacing.lg,
    },
    content: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        paddingTop: theme.spacing.xl + 40,
        paddingHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.xl,
    },
    headerTitle: {
        fontSize: theme.typography.sizes['3xl'],
        fontWeight: theme.typography.weights.bold,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.sm,
    },
    headerSubtitle: {
        fontSize: theme.typography.sizes.xl,
        color: theme.colors.text.secondary,
    },
    scoreContainer: {
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
    },
    scoreCircle: {
        width: 180,
        height: 180,
        borderRadius: 90,
        borderWidth: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background.card,
    },
    scorePercentage: {
        fontSize: 56,
        fontWeight: theme.typography.weights.bold,
        marginBottom: theme.spacing.xs,
    },
    scoreLabel: {
        fontSize: theme.typography.sizes.base,
        color: theme.colors.text.secondary,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.xl,
    },
    statCard: {
        flex: 1,
        minWidth: '45%',
        alignItems: 'center',
        paddingVertical: theme.spacing.lg,
    },
    statValue: {
        fontSize: theme.typography.sizes['2xl'],
        fontWeight: theme.typography.weights.bold,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.xs,
    },
    statLabel: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.text.secondary,
    },
    reviewSection: {
        paddingHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
        fontSize: theme.typography.sizes.xl,
        fontWeight: theme.typography.weights.semibold,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.lg,
    },
    questionItem: {
        backgroundColor: theme.colors.background.card,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.md,
        borderLeftWidth: 4,
    },
    questionCorrect: {
        borderLeftColor: theme.colors.status.success,
    },
    questionIncorrect: {
        borderLeftColor: theme.colors.status.danger,
    },
    questionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    questionNumber: {
        fontSize: theme.typography.sizes.base,
        fontWeight: theme.typography.weights.semibold,
        color: theme.colors.text.primary,
    },
    questionTextSmall: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.text.secondary,
        marginBottom: theme.spacing.sm,
    },
    questionFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    questionPoints: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.text.secondary,
    },
    checkmark: {
        fontSize: 24,
        color: theme.colors.status.success,
    },
    crossmark: {
        fontSize: 24,
        color: theme.colors.status.danger,
    },
    footer: {
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.background.dark,
        borderTopWidth: 1,
        borderTopColor: theme.colors.background.card,
    },
});
