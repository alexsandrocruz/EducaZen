import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Alterar para o IP correto do seu backend
// Para iOS Simulator: use localhost:44349
// Para Android Emulator: use 10.0.2.2:44349
// Para dispositivo físico: use o IP da sua máquina (ex: 192.168.1.100:44349)
const API_BASE_URL = __DEV__
    ? 'http://localhost:44349/api'  // Altere conforme necessário
    : 'https://api.estudazen.com/api';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 segundos
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Token expirado ou inválido, fazer logout
            await AsyncStorage.removeItem('access_token');
            await AsyncStorage.removeItem('refresh_token');
            // TODO: Navegar para tela de login
        }

        // Extrair mensagem de erro do backend ABP
        const message = error.response?.data?.error?.message
            || error.response?.data?.message
            || error.message
            || 'Erro ao conectar com o servidor';

        return Promise.reject(new Error(message));
    }
);

export default api;
