import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL para OAuth (sem /api)
const BASE_URL = __DEV__
    ? 'http://localhost:44335'
    : 'https://educa.zensuite.com.br';

export interface RegisterData {
    name: string;          // FullName
    email: string;
    cpf: string;
    password: string;
    schoolCode?: string;   // Código da escola (opcional)
}

export interface LoginData {
    email: string;         // Pode ser email ou CPF
    password: string;
}

export interface AuthResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
    refresh_token?: string;
}

export interface StudentData {
    id: string;
    fullName: string;
    email: string;
    cpf?: string;
    schoolId?: string;
    schoolName?: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    totalXp: number;
    currentLevel: number;
    currentStreak: number;
}

export const authService = {
    /**
     * Registrar novo aluno
     */
    async register(data: RegisterData): Promise<void> {
        try {
            await api.post('/app/student-auth/register', {
                name: data.name,
                email: data.email,
                cpf: data.cpf,
                password: data.password,
                schoolCode: data.schoolCode || undefined,
            });
        } catch (error: any) {
            throw new Error(error.message || 'Erro ao registrar');
        }
    },

    /**
     * Login com email/CPF e senha
     */
    async login(data: LoginData): Promise<AuthResponse> {
        try {
            // OAuth endpoint está na raiz, não em /api
            const tokenUrl = `${BASE_URL}/connect/token`;

            const formData = new URLSearchParams();
            formData.append('grant_type', 'password');
            formData.append('username', data.email);
            formData.append('password', data.password);
            formData.append('client_id', 'EstudaZen_App');
            formData.append('scope', 'offline_access EstudaZen');

            console.log('Login attempt:', data.email);
            console.log('Token URL:', tokenUrl);

            // Usar axios diretamente (não api) para evitar baseURL com /api
            const axios = (await import('axios')).default;
            const response = await axios.post(tokenUrl, formData.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            const authData: AuthResponse = response.data;

            // Salvar tokens no AsyncStorage
            await AsyncStorage.setItem('access_token', authData.access_token);
            if (authData.refresh_token) {
                await AsyncStorage.setItem('refresh_token', authData.refresh_token);
            }

            return authData;
        } catch (error: any) {
            console.error('Login error:', error.response?.status, error.response?.data || error.message);
            throw new Error(error.message || 'Email ou senha incorretos');
        }
    },

    /**
     * Logout - limpar tokens
     */
    async logout(): Promise<void> {
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('refresh_token');
        await AsyncStorage.removeItem('user_data');
    },

    /**
     * Obter dados do aluno atual
     */
    async getCurrentStudent(): Promise<StudentData | null> {
        try {
            const response = await api.get('/app/student/my-profile');
            const student: StudentData = response.data;

            // Cachear dados do usuário
            await AsyncStorage.setItem('user_data', JSON.stringify(student));

            return student;
        } catch (error) {
            return null;
        }
    },

    /**
     * Verificar se há token salvo
     */
    async hasToken(): Promise<boolean> {
        const token = await AsyncStorage.getItem('access_token');
        return !!token;
    },

    /**
     * Obter usuário do cache (offline)
     */
    async getCachedUser(): Promise<StudentData | null> {
        try {
            const userData = await AsyncStorage.getItem('user_data');
            return userData ? JSON.parse(userData) : null;
        } catch {
            return null;
        }
    },
};

export default authService;
