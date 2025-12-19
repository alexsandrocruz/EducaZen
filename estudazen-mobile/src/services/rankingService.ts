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
            const scope = filter?.scope === 'SCHOOL' ? 'School' : 'Global';

            const response = await api.get('/app/student/ranking', {
                params: { scope }
            });

            // Map backend DTO to frontend interface
            const items = response.data.items || response.data || [];
            return items.map((item: any, idx: number) => ({
                id: item.studentId || item.id,
                studentId: item.studentId,
                studentName: item.studentName,
                schoolName: item.schoolName,
                avatarUrl: item.avatarUrl,
                totalXp: item.totalXp,
                currentLevel: item.level,
                currentStreak: item.currentStreak,
                position: item.rank || idx + 1,
            }));
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
