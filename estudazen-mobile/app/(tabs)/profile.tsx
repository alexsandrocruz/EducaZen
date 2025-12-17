import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../src/stores/authStore';
import { Card, Button, Badge, Avatar } from '../../src/components/ui';
import { theme } from '../../src/theme';

export default function ProfileScreen() {
    const router = useRouter();
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        Alert.alert(
            'Sair',
            'Tem certeza que deseja sair?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Sair',
                    style: 'destructive',
                    onPress: async () => {
                        await logout();
                        router.replace('/');
                    },
                },
            ]
        );
    };

    const getStatusBadge = () => {
        switch (user?.status) {
            case 'PENDING':
                return <Badge variant="warning">Aguardando Aprovação</Badge>;
            case 'APPROVED':
                return <Badge variant="success">Ativo</Badge>;
            case 'REJECTED':
                return <Badge variant="error">Rejeitado</Badge>;
            default:
                return <Badge>Desconhecido</Badge>;
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Perfil</Text>
                </View>

                {/* User Card */}
                <Card style={styles.userCard}>
                    <View style={styles.avatarContainer}>
                        <Avatar
                            size="xl"
                            name={user?.fullName || 'Estudante'}
                            uri={user?.photoUrl}
                        />
                    </View>

                    <Text style={styles.userName}>{user?.fullName || 'Estudante'}</Text>
                    <Text style={styles.userEmail}>{user?.email}</Text>

                    <View style={styles.statusBadge}>
                        {getStatusBadge()}
                    </View>
                </Card>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    <Card style={styles.statCard}>
                        <Text style={styles.statValue}>{user?.currentLevel || 1}</Text>
                        <Text style={styles.statLabel}>Nível</Text>
                    </Card>

                    <Card style={styles.statCard}>
                        <Text style={styles.statValue}>{user?.totalXp || 0}</Text>
                        <Text style={styles.statLabel}>XP Total</Text>
                    </Card>

                    <Card style={styles.statCard}>
                        <Text style={styles.statValue}>{user?.currentStreak || 0}</Text>
                        <Text style={styles.statLabel}>Dias</Text>
                    </Card>
                </View>

                {/* Info Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Informações</Text>

                    {user?.cpf && (
                        <Card style={styles.infoCard}>
                            <Text style={styles.infoLabel}>CPF</Text>
                            <Text style={styles.infoValue}>{user.cpf}</Text>
                        </Card>
                    )}

                    {user?.schoolName && (
                        <Card style={styles.infoCard}>
                            <Text style={styles.infoLabel}>Escola</Text>
                            <Text style={styles.infoValue}>{user.schoolName}</Text>
                        </Card>
                    )}

                    <Card style={styles.infoCard}>
                        <Text style={styles.infoLabel}>Email</Text>
                        <Text style={styles.infoValue}>{user?.email}</Text>
                    </Card>
                </View>

                {/* Actions */}
                <View style={styles.section}>
                    <Button
                        variant="secondary"
                        size="lg"
                        onPress={handleLogout}
                    >
                        🚪 Sair
                    </Button>
                </View>

                {/* App Version */}
                <Text style={styles.version}>EstudaZen v1.0.0</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.dark,
    },
    scrollContent: {
        padding: theme.spacing.xl,
        paddingTop: 60,
    },
    header: {
        marginBottom: theme.spacing.xl,
    },
    title: {
        fontSize: theme.typography.sizes['3xl'],
        fontWeight: '800',
        color: theme.colors.text.primary,
    },
    userCard: {
        padding: theme.spacing.xl,
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
    },
    avatarContainer: {
        marginBottom: theme.spacing.lg,
    },
    userName: {
        fontSize: theme.typography.sizes.xl,
        fontWeight: '700',
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.xs,
    },
    userEmail: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.text.secondary,
        marginBottom: theme.spacing.md,
    },
    statusBadge: {
        marginTop: theme.spacing.sm,
    },
    statsGrid: {
        flexDirection: 'row',
        gap: theme.spacing.md,
        marginBottom: theme.spacing.xl,
    },
    statCard: {
        flex: 1,
        padding: theme.spacing.lg,
        alignItems: 'center',
    },
    statValue: {
        fontSize: theme.typography.sizes['2xl'],
        fontWeight: '800',
        color: theme.colors.primary,
        marginBottom: theme.spacing.xs,
    },
    statLabel: {
        fontSize: theme.typography.sizes.xs,
        color: theme.colors.text.secondary,
        textAlign: 'center',
    },
    section: {
        marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
        fontSize: theme.typography.sizes.lg,
        fontWeight: '700',
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.md,
    },
    infoCard: {
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.md,
    },
    infoLabel: {
        fontSize: theme.typography.sizes.xs,
        color: theme.colors.text.secondary,
        marginBottom: 4,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    infoValue: {
        fontSize: theme.typography.sizes.base,
        fontWeight: '600',
        color: theme.colors.text.primary,
    },
    version: {
        fontSize: theme.typography.sizes.xs,
        color: theme.colors.text.secondary,
        textAlign: 'center',
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing['2xl'],
    },
});
