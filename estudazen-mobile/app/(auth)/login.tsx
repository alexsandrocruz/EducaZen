import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Input, Card } from '../../src/components/ui';
import { theme } from '../../src/theme';
import { useAuthStore } from '../../src/stores/authStore';

export default function LoginScreen() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user types
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email ou CPF é obrigatório';
        }

        if (!formData.password) {
            newErrors.password = 'Senha é obrigatória';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {
        if (!validateForm()) return;

        setLoading(true);

        try {
            const { login } = useAuthStore.getState();

            await login(formData.email, formData.password);

            // Sucesso - redirecionar para home
            router.replace('/(tabs)/home');
        } catch (error: any) {
            Alert.alert('Erro', error.message || 'Email ou senha incorretos');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = () => {
        // TODO: Navigate to forgot password screen
        console.log('Navigate to forgot password');
    };

    const handleRegister = () => {
        router.push('/(auth)/register');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.logo}>
                            <Text style={styles.logoIcon}>🎓</Text>
                        </View>
                        <Text style={styles.title}>
                            Vesti<Text style={styles.titleAccent}>Quiz</Text>
                        </Text>
                        <Text style={styles.subtitle}>
                            Bem-vindo de volta! Continue sua jornada.
                        </Text>
                    </View>

                    {/* Form Card */}
                    <Card variant="default" style={styles.formCard}>
                        <View style={styles.form}>
                            {errors.general && (
                                <View style={styles.errorBanner}>
                                    <Text style={styles.errorBannerText}>{errors.general}</Text>
                                </View>
                            )}

                            <Input
                                label="Email ou CPF"
                                placeholder="seu@email.com ou 000.000.000-00"
                                value={formData.email}
                                onChangeText={(value) => handleInputChange('email', value)}
                                error={errors.email}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                icon={<Text style={styles.inputIcon}>👤</Text>}
                            />

                            <Input
                                label="Senha"
                                placeholder="Digite sua senha"
                                value={formData.password}
                                onChangeText={(value) => handleInputChange('password', value)}
                                error={errors.password}
                                secureTextEntry
                                icon={<Text style={styles.inputIcon}>🔒</Text>}
                            />

                            <View style={styles.options}>
                                <TouchableOpacity
                                    style={styles.checkbox}
                                    onPress={() =>
                                        setFormData(prev => ({
                                            ...prev,
                                            rememberMe: !prev.rememberMe,
                                        }))
                                    }
                                >
                                    <View
                                        style={[
                                            styles.checkboxBox,
                                            formData.rememberMe && styles.checkboxBoxChecked,
                                        ]}
                                    >
                                        {formData.rememberMe && (
                                            <Text style={styles.checkboxCheck}>✓</Text>
                                        )}
                                    </View>
                                    <Text style={styles.checkboxLabel}>Lembrar de mim</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={handleForgotPassword}>
                                    <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
                                </TouchableOpacity>
                            </View>

                            <Button
                                variant="primary"
                                size="lg"
                                onPress={handleLogin}
                                loading={loading}
                                disabled={loading}
                            >
                                Entrar
                            </Button>
                        </View>
                    </Card>

                    {/* Register Link */}
                    <View style={styles.registerSection}>
                        <Text style={styles.registerText}>Ainda não tem conta?</Text>
                        <TouchableOpacity onPress={handleRegister}>
                            <Text style={styles.registerLink}>Criar Conta Grátis</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Social Login (Optional) */}
                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>ou continuar com</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    <View style={styles.socialButtons}>
                        <Card variant="glass" style={styles.socialButton}>
                            <Text style={styles.socialIcon}>G</Text>
                        </Card>
                        <Card variant="glass" style={styles.socialButton}>
                            <Text style={styles.socialIcon}>f</Text>
                        </Card>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.dark,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing['2xl'],
    },
    header: {
        alignItems: 'center',
        marginBottom: theme.spacing['3xl'],
    },
    logo: {
        width: 64,
        height: 64,
        borderRadius: theme.borderRadius.xl,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
    },
    logoIcon: {
        fontSize: 32,
    },
    title: {
        fontSize: theme.typography.sizes['3xl'],
        fontWeight: '800',
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.sm,
    },
    titleAccent: {
        color: theme.colors.primary,
    },
    subtitle: {
        fontSize: theme.typography.sizes.base,
        color: theme.colors.text.secondary,
        textAlign: 'center',
    },
    formCard: {
        padding: theme.spacing.xl,
        marginBottom: theme.spacing.xl,
    },
    form: {
        gap: theme.spacing.lg,
    },
    inputIcon: {
        fontSize: 20,
    },
    errorBanner: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.3)',
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
    },
    errorBannerText: {
        color: theme.colors.status.error,
        fontSize: theme.typography.sizes.sm,
        textAlign: 'center',
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    checkboxBox: {
        width: 20,
        height: 20,
        borderRadius: theme.borderRadius.sm,
        borderWidth: 2,
        borderColor: theme.colors.text.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxBoxChecked: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    checkboxCheck: {
        color: theme.colors.text.primary,
        fontSize: 12,
        fontWeight: '700',
    },
    checkboxLabel: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.text.secondary,
    },
    forgotPassword: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.primary,
        fontWeight: '600',
    },
    registerSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: theme.spacing.xs,
        marginBottom: theme.spacing.xl,
    },
    registerText: {
        fontSize: theme.typography.sizes.base,
        color: theme.colors.text.secondary,
    },
    registerLink: {
        fontSize: theme.typography.sizes.base,
        color: theme.colors.primary,
        fontWeight: '700',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
        gap: theme.spacing.md,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    dividerText: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.text.muted,
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: theme.spacing.lg,
    },
    socialButton: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    socialIcon: {
        fontSize: 24,
        fontWeight: '700',
        color: theme.colors.text.primary,
    },
});
