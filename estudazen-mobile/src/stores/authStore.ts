import { create } from 'zustand';
import authService, { StudentData } from '../services/authService';

interface AuthState {
    // State
    user: StudentData | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (email: string, password: string) => Promise<void>;
    register: (data: {
        name: string;
        email: string;
        cpf: string;
        password: string;
        schoolCode?: string;
    }) => Promise<void>;
    logout: () => Promise<void>;
    loadUser: () => Promise<void>;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    // Initial state
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    // Login
    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            await authService.login({ email, password });
            const user = await authService.getCurrentStudent();

            if (user) {
                // Verificar se aluno está aprovado
                if (user.status === 'PENDING') {
                    set({
                        user,
                        isAuthenticated: false, // Não autenticar enquanto pendente
                        isLoading: false,
                        error: 'Sua conta está aguardando aprovação da escola'
                    });
                    await authService.logout(); // Remover token
                    return;
                }

                if (user.status === 'REJECTED') {
                    set({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false,
                        error: 'Sua conta foi rejeitada pela escola'
                    });
                    await authService.logout();
                    return;
                }

                set({ user, isAuthenticated: true, isLoading: false });
            } else {
                throw new Error('Não foi possível carregar dados do usuário');
            }
        } catch (error: any) {
            set({
                error: error.message || 'Erro ao fazer login',
                isLoading: false,
                isAuthenticated: false,
                user: null
            });
            throw error;
        }
    },

    // Register
    register: async (data) => {
        set({ isLoading: true, error: null });
        try {
            await authService.register(data);
            set({ isLoading: false });

            // Não fazer login automaticamente se tiver código de escola
            // pois precisa de aprovação
        } catch (error: any) {
            set({
                error: error.message || 'Erro ao registrar',
                isLoading: false
            });
            throw error;
        }
    },

    // Logout
    logout: async () => {
        await authService.logout();
        set({ user: null, isAuthenticated: false, error: null });
    },

    // Load user from storage
    loadUser: async () => {
        set({ isLoading: true });
        try {
            const hasToken = await authService.hasToken();

            if (hasToken) {
                const user = await authService.getCurrentStudent();

                if (user && user.status === 'APPROVED') {
                    set({ user, isAuthenticated: true });
                } else {
                    // Token existe mas usuário não está aprovado
                    await authService.logout();
                    set({ user: null, isAuthenticated: false });
                }
            } else {
                set({ user: null, isAuthenticated: false });
            }
        } catch (error) {
            // Token inválido ou expirado
            await authService.logout();
            set({ user: null, isAuthenticated: false });
        } finally {
            set({ isLoading: false });
        }
    },

    // Clear error
    clearError: () => set({ error: null }),
}));

export default useAuthStore;
