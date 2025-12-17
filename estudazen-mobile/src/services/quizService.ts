import api from './api';

export interface Quiz {
    id: string;
    title: string;
    description?: string;
    subjectId: string;
    subjectName?: string;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    totalQuestions: number;
    totalPoints: number;
    timeLimit?: number; // em minutos
    isActive: boolean;
}

export interface Question {
    id: string;
    quizId: string;
    questionText: string;
    questionType: 'MULTIPLE_CHOICE' | 'TRUE_FALSE';
    order: number;
    points: number;
    alternatives: Alternative[];
}

export interface Alternative {
    id: string;
    questionId: string;
    text: string;
    order: number;
    isCorrect: boolean;
}

export interface QuizAttempt {
    id: string;
    quizId: string;
    studentId: string;
    score: number;
    totalPoints: number;
    completedAt?: Date;
    answers: QuizAnswer[];
}

export interface QuizAnswer {
    questionId: string;
    alternativeId: string;
    isCorrect: boolean;
}

export interface StartQuizResponse {
    attemptId: string;
    quiz: Quiz;
    questions: Question[];
}

export interface SubmitQuizRequest {
    attemptId: string;
    answers: {
        questionId: string;
        alternativeId: string;
    }[];
}

export interface QuizResult {
    attemptId: string;
    score: number;
    totalPoints: number;
    correctAnswers: number;
    totalQuestions: number;
    xpEarned: number;
    answers: {
        questionId: string;
        selectedAlternativeId: string;
        correctAlternativeId: string;
        isCorrect: boolean;
    }[];
}

export const quizService = {
    /**
     * Listar quizzes disponíveis (histórico do estudante)
     */
    async getAvailableQuizzes(): Promise<Quiz[]> {
        try {
            const response = await api.get('/app/student-quiz/my-quizzes', {
                params: {
                    maxResultCount: 100
                }
            });
            return response.data.items || response.data;
        } catch (error: any) {
            throw new Error(error.message || 'Erro ao buscar quizzes');
        }
    },

    /**
     * Iniciar um novo quiz
     */
    async startQuiz(options?: {
        subjectId?: string;
        difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
        totalQuestions?: number;
    }): Promise<any> {
        try {
            const response = await api.post('/app/student-quiz/start', {
                subjectId: options?.subjectId || null,
                difficulty: options?.difficulty ?
                    (options.difficulty === 'EASY' ? 0 : options.difficulty === 'MEDIUM' ? 1 : 2) :
                    null,
                totalQuestions: options?.totalQuestions || 10
            });
            return response.data;
        } catch (error: any) {
            throw new Error(error.message || 'Erro ao iniciar quiz');
        }
    },

    /**
     * Submeter respostas do quiz
     */
    async submitQuiz(request: SubmitQuizRequest): Promise<QuizResult> {
        try {
            const response = await api.post('/app/quiz/submit', request);
            return response.data;
        } catch (error: any) {
            throw new Error(error.message || 'Erro ao submeter quiz');
        }
    },

    /**
     * Buscar histórico de tentativas
     */
    async getMyAttempts(): Promise<QuizAttempt[]> {
        try {
            const response = await api.get('/app/quiz/my-attempts');
            return response.data.items || response.data;
        } catch (error: any) {
            throw new Error(error.message || 'Erro ao buscar histórico');
        }
    },
};

export default quizService;
