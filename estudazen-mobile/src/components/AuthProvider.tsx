import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { useAuthStore } from '../stores/authStore';
import { theme } from '../theme';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading, loadUser } = useAuthStore();
    const segments = useSegments();
    const router = useRouter();

    // Carregar usuário ao iniciar app
    useEffect(() => {
        loadUser();
    }, []);

    // Proteção de rotas
    useEffect(() => {
        if (isLoading) return;

        const inAuthGroup = segments[0] === '(auth)';
        const inProtectedGroup = segments[0] === '(tabs)';

        if (!isAuthenticated && inProtectedGroup) {
            // Não autenticado tentando acessar rota protegida → redireciona para login
            router.replace('/(auth)/login');
        } else if (isAuthenticated && inAuthGroup) {
            // Autenticado na tela de auth → redireciona para home
            router.replace('/(tabs)/home');
        }
    }, [isAuthenticated, segments, isLoading]);

    // Mostrar loading enquanto carrega usuário
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    return <>{children}</>;
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background.dark,
    },
});
