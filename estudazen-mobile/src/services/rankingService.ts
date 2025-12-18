import api from './api';

export interface RankingEntry {
    id: string;
    studentId: string;
    studentName: string;
    schoolName?: string;
    avatarUrl?: string;
    totalXp: number;
    currentLevel: number;
    currentStreak: number;
    position: number;
}

export interface RankingFilter {
    scope: 'GLOBAL' | 'SCHOOL' | 'CLASS';
    period?: 'ALL_TIME' | 'MONTH' | 'WEEK';
}

export const rankingService = {
    /**
     * Obter ranking geral
     */
    async getRanking(filter?: RankingFilter): Promise<RankingEntry[]> {
        try {
            const params = {
                scope: filter?.scope || 'GLOBAL',
                period: filter?.period || 'ALL_TIME',
            };

            const response = await api.get('/app/student/ranking', { params });
            return response.data.items || response.data;
        } catch (error: any) {
            throw new Error(error.message || 'Erro ao buscar ranking');
        }
    },

    /**
     * Obter posição do usuário atual
     */
    async getMyPosition(): Promise<RankingEntry | null> {
        try {
            const response = await api.get('/app/student/my-position');
            return response.data;
        } catch (error: any) {
            // Se não encontrar, retorna null
            return null;
        }
    },
};

export default rankingService;
