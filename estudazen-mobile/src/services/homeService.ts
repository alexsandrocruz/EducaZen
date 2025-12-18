import api from './api';

/**
 * Status do aluno
 */
export type StudentStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

/**
 * Dica para exibição na Home
 */
export interface TipDto {
    id: string;
    type: 'highlight' | 'normal';
    category: string;
    title: string;
    description: string;
    icon: string;
    iconColor?: string;
    iconBgColor?: string;
}

/**
 * Dashboard da Home do aluno
 */
export interface StudentHomeDashboardDto {
    // User Info
    fullName: string;
    photoUrl?: string;
    status: StudentStatus;
    currentLevel: number;

    // League Info
    leagueName: string;
    currentXp: number;
    xpToNextLeague: number;
    streakDays: number;
    rankPercentile: number;

    // Stats
    questionsToday: number;
    dailyGoal: number;
    accuracyRate: number;
    totalQuestionsAnswered: number;
    totalCorrectAnswers: number;

    // Tips
    tips: TipDto[];
}

/**
 * Serviço para dados da Home do aluno
 */
export const homeService = {
    /**
     * Buscar dados unificados da Home
     */
    async getHomeDashboard(): Promise<StudentHomeDashboardDto> {
        try {
            const response = await api.get<StudentHomeDashboardDto>('/app/student/home-dashboard');
            return response.data;
        } catch (error: any) {
            console.error('Erro ao carregar dashboard:', error.message);
            throw new Error(error.message || 'Erro ao carregar dados da Home');
        }
    },
};

export default homeService;
