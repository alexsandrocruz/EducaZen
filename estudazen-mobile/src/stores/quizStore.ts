import { create } from 'zustand';
import quizService, { Quiz, Question, QuizResult } from '../services/quizService';

interface QuizState {
    // State
    availableQuizzes: Quiz[];
    currentQuiz: Quiz | null;
    currentQuestions: Question[];
    currentAttemptId: string | null;
    answers: Map<string, string>; // questionId -> alternativeId
    isLoading: boolean;
    isSubmitting: boolean;
    error: string | null;
    lastResult: QuizResult | null;

    // Actions
    loadAvailableQuizzes: () => Promise<void>;
    startQuiz: (options?: {
        subjectId?: string;
        difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
        totalQuestions?: number;
    }) => Promise<void>;
    setAnswer: (questionId: string, alternativeId: string) => void;
    submitQuiz: () => Promise<QuizResult>;
    resetQuiz: () => void;
    clearError: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
    // Initial state
    availableQuizzes: [],
    currentQuiz: null,
    currentQuestions: [],
    currentAttemptId: null,
    answers: new Map(),
    isLoading: false,
    isSubmitting: false,
    error: null,
    lastResult: null,

    // Load available quizzes
    loadAvailableQuizzes: async () => {
        set({ isLoading: true, error: null });
        try {
            const quizzes = await quizService.getAvailableQuizzes();
            set({ availableQuizzes: quizzes, isLoading: false });
        } catch (error: any) {
            set({
                error: error.message || 'Erro ao carregar quizzes',
                isLoading: false
            });
            throw error;
        }
    },

    // Start a new quiz
    startQuiz: async (options?: {
        subjectId?: string;
        difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
        totalQuestions?: number;
    }) => {
        set({ isLoading: true, error: null });
        try {
            const quizData = await quizService.startQuiz(options);
            set({
                currentQuiz: quizData,
                currentQuestions: [],
                currentAttemptId: quizData.id,
                answers: new Map(),
                lastResult: null,
                isLoading: false,
            });
        } catch (error: any) {
            set({
                error: error.message || 'Erro ao iniciar quiz',
                isLoading: false
            });
            throw error;
        }
    },

    // Set answer for a question
    setAnswer: (questionId: string, alternativeId: string) => {
        const { answers } = get();
        const newAnswers = new Map(answers);
        newAnswers.set(questionId, alternativeId);
        set({ answers: newAnswers });
    },

    // Submit quiz
    submitQuiz: async () => {
        const { currentAttemptId, answers } = get();

        if (!currentAttemptId) {
            throw new Error('Nenhum quiz em andamento');
        }

        set({ isSubmitting: true, error: null });

        try {
            const answersArray = Array.from(answers.entries()).map(([questionId, alternativeId]) => ({
                questionId,
                alternativeId,
            }));

            const result = await quizService.submitQuiz({
                attemptId: currentAttemptId,
                answers: answersArray,
            });

            set({
                lastResult: result,
                isSubmitting: false,
            });

            return result;
        } catch (error: any) {
            set({
                error: error.message || 'Erro ao submeter quiz',
                isSubmitting: false
            });
            throw error;
        }
    },

    // Reset quiz state
    resetQuiz: () => {
        set({
            currentQuiz: null,
            currentQuestions: [],
            currentAttemptId: null,
            answers: new Map(),
            lastResult: null,
            error: null,
        });
    },

    // Clear error
    clearError: () => set({ error: null }),
}));

export default useQuizStore;
