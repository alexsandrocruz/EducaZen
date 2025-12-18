import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Badge, ProgressBar } from '../../src/components/ui';
import { theme } from '../../src/theme';

interface QuizQuestion {
    questionId: string;
    questionText: string;
    points: number;
    timeLimitSeconds?: number;
    currentQuestionNumber: number;
    totalQuestions: number;
    answers: {
        id: string;
        content: string;
    }[];
}

interface SubmitAnswerResult {
    isCorrect: boolean;
    correctAnswerId: string;
    xpEarned: number;
    hasNextQuestion: boolean;
    feedback?: string;
}

export default function QuizTakingScreen() {
    const { quizId } = useLocalSearchParams<{ quizId: string }>();
    const router = useRouter();

    const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [submittedAnswer, setSubmittedAnswer] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<SubmitAnswerResult | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

    useEffect(() => {
        if (!quizId) {
            Alert.alert('Erro', 'ID do quiz não encontrado');
            router.back();
            return;
        }
        loadCurrentQuestion();
    }, [quizId]);

    useEffect(() => {
        if (timeRemaining === null || timeRemaining <= 0 || submittedAnswer) return;

        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev === null || prev <= 1) {
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeRemaining, submittedAnswer]);

    const loadCurrentQuestion = async () => {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('access_token');

            console.log('=== Loading Quiz Question ===');
            console.log('Quiz ID:', quizId);
            console.log('Token:', token ? 'Present' : 'Missing');

            const url = `http://localhost:5000/api/app/student-quiz/current-question/${quizId}`;
            console.log('Fetching URL:', url);

            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);

            if (!response.ok) {
                const errorText = await response.text();
                console.log('Error response:', errorText);

                // Quiz completed or no more questions - redirect to results
                if (response.status === 404 || errorText.includes('Não há mais questões')) {
                    console.log('Quiz completed - Navigating to results');
                    router.replace(`/quiz/${quizId}/results`);
                    return;
                }
                throw new Error(`Erro ao carregar questão (${response.status})`);
            }

            const data: QuizQuestion = await response.json();
            console.log('Question loaded:', JSON.stringify(data, null, 2));

            setCurrentQuestion(data);
            setSelectedAnswer(null);
            setSubmittedAnswer(null);
            setFeedback(null);
            setTimeRemaining(data.timeLimitSeconds || null);
        } catch (error: any) {
            console.error('Error loading question:', error);
            Alert.alert('Erro', error.message || 'Não foi possível carregar a questão');
            router.back();
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitAnswer = async () => {
        if (!selectedAnswer || !currentQuestion) return;

        try {
            setSubmitting(true);
            setSubmittedAnswer(selectedAnswer);
            const token = await AsyncStorage.getItem('access_token');

            const response = await fetch(
                'http://localhost:5000/api/app/student-quiz/submit-answer',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        quizId,
                        questionId: currentQuestion.questionId,
                        selectedAnswerId: selectedAnswer,
                    }),
                }
            );

            if (!response.ok) throw new Error('Erro ao enviar resposta');

            const result: SubmitAnswerResult = await response.json();
            setFeedback(result);

            setTimeout(() => {
                if (result.hasNextQuestion) {
                    loadCurrentQuestion();
                } else {
                    router.replace(`/quiz/${quizId}/results`);
                }
            }, 2000);
        } catch (error: any) {
            Alert.alert('Erro', error.message || 'Não foi possível enviar resposta');
            setSubmittedAnswer(null);
        } finally {
            setSubmitting(false);
        }
    };

    const handleAbandonQuiz = () => {
        Alert.alert(
            'Abandonar Quiz',
            'Tem certeza que deseja abandonar este quiz?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Abandonar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const token = await AsyncStorage.getItem('access_token');
                            await fetch(
                                `http://localhost:5000/api/app/student-quiz/abandon-quiz/${quizId}`,
                                {
                                    method: 'POST',
                                    headers: { Authorization: `Bearer ${token}` },
                                }
                            );
                            router.back();
                        } catch (error) {
                            Alert.alert('Erro', 'Não foi possível abandonar o quiz');
                        }
                    },
                },
            ]
        );
    };

    const getAnswerStyle = (answerId: string) => {
        if (!submittedAnswer) {
            return answerId === selectedAnswer ? styles.answerSelected : styles.answer;
        }
        if (feedback) {
            if (answerId === feedback.correctAnswerId) {
                return styles.answerCorrect;
            }
            if (answerId === submittedAnswer && !feedback.isCorrect) {
                return styles.answerIncorrect;
            }
        }
        return styles.answer;
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary.DEFAULT} />
                <Text style={styles.loadingText}>Carregando questão...</Text>
            </View>
        );
    }

    if (!currentQuestion) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>Questão não encontrada</Text>
                <Button title="Voltar" onPress={() => router.back()} />
            </View>
        );
    }

    const progress = (currentQuestion.currentQuestionNumber / currentQuestion.totalQuestions) * 100;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    Questão {currentQuestion.currentQuestionNumber} de {currentQuestion.totalQuestions}
                </Text>
                <TouchableOpacity onPress={handleAbandonQuiz}>
                    <Text style={styles.abandonButton}>Sair</Text>
                </TouchableOpacity>
            </View>

            <ProgressBar progress={progress} />

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.questionInfo}>
                    <Badge label={`${currentQuestion.points} Pontos`} variant="primary" />
                    {timeRemaining !== null && (
                        <Badge
                            label={`${Math.floor(timeRemaining / 60)}:${(timeRemaining % 60).toString().padStart(2, '0')}`}
                            variant={timeRemaining < 30 ? 'danger' : 'default'}
                        />
                    )}
                </View>

                <View style={styles.questionCard}>
                    <Text style={styles.questionText}>{currentQuestion.questionText}</Text>
                </View>

                <View style={styles.answersContainer}>
                    {currentQuestion.answers.map((answer, index) => (
                        <TouchableOpacity
                            key={answer.id}
                            style={getAnswerStyle(answer.id)}
                            onPress={() => !submittedAnswer && setSelectedAnswer(answer.id)}
                            disabled={!!submittedAnswer}
                        >
                            <View style={styles.answerLetter}>
                                <Text style={styles.answerLetterText}>
                                    {String.fromCharCode(65 + index)}
                                </Text>
                            </View>
                            <Text style={styles.answerText}>{answer.content}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {feedback && (
                    <View style={[styles.feedbackCard, feedback.isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect]}>
                        <Text style={styles.feedbackTitle}>
                            {feedback.isCorrect ? '✓ Resposta Correta!' : '✗ Resposta Incorreta'}
                        </Text>
                        <Text style={styles.feedbackXP}>+{feedback.xpEarned} XP</Text>
                    </View>
                )}
            </ScrollView>

            {!submittedAnswer && (
                <View style={styles.footer}>
                    <Button
                        title={submitting ? 'Enviando...' : 'Enviar Resposta'}
                        onPress={handleSubmitAnswer}
                        disabled={!selectedAnswer || submitting}
                    />
                </View>
            )}
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        paddingTop: theme.spacing.xl + 20,
    },
    headerTitle: {
        fontSize: theme.typography.sizes.lg,
        fontWeight: theme.typography.weights.semibold,
        color: theme.colors.text.primary,
    },
    abandonButton: {
        color: theme.colors.status.danger,
        fontSize: theme.typography.sizes.base,
        fontWeight: theme.typography.weights.medium,
    },
    content: {
        flex: 1,
        paddingHorizontal: theme.spacing.lg,
    },
    questionInfo: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.lg,
    },
    questionCard: {
        backgroundColor: theme.colors.background.card,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.xl,
        marginBottom: theme.spacing.xl,
    },
    questionText: {
        fontSize: theme.typography.sizes.xl,
        fontWeight: theme.typography.weights.medium,
        color: theme.colors.text.primary,
        lineHeight: 28,
    },
    answersContainer: {
        gap: theme.spacing.md,
    },
    answer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.background.card,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    answerSelected: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.background.card,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        borderWidth: 2,
        borderColor: theme.colors.primary.DEFAULT,
    },
    answerCorrect: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.status.success + '20',
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        borderWidth: 2,
        borderColor: theme.colors.status.success,
    },
    answerIncorrect: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.status.danger + '20',
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        borderWidth: 2,
        borderColor: theme.colors.status.danger,
    },
    answerLetter: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: theme.colors.primary.DEFAULT,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.md,
    },
    answerLetterText: {
        color: '#FFFFFF',
        fontSize: theme.typography.sizes.base,
        fontWeight: theme.typography.weights.bold,
    },
    answerText: {
        flex: 1,
        fontSize: theme.typography.sizes.lg,
        color: theme.colors.text.primary,
    },
    feedbackCard: {
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.lg,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 2,
    },
    feedbackCorrect: {
        backgroundColor: theme.colors.status.success + '20',
        borderColor: theme.colors.status.success,
    },
    feedbackIncorrect: {
        backgroundColor: theme.colors.status.danger + '20',
        borderColor: theme.colors.status.danger,
    },
    feedbackTitle: {
        fontSize: theme.typography.sizes.xl,
        fontWeight: theme.typography.weights.bold,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.sm,
    },
    feedbackXP: {
        fontSize: theme.typography.sizes.lg,
        fontWeight: theme.typography.weights.semibold,
        color: theme.colors.primary.DEFAULT,
    },
    footer: {
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.background.dark,
        borderTopWidth: 1,
        borderTopColor: theme.colors.background.card,
    },
});
