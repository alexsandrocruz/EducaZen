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
} from 'react-native';
import { Button, Input } from '../../src/components/ui';
import { theme } from '../../src/theme';

export default function RegisterScreen() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        cpf: '',
        password: '',
        confirmPassword: '',
        schoolCode: '',
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

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Nome completo é obrigatório';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (!formData.cpf.trim()) {
            newErrors.cpf = 'CPF é obrigatório';
        }

        if (!formData.password) {
            newErrors.password = 'Senha é obrigatória';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Senhas não coincidem';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        if (!validateForm()) return;

        setLoading(true);

        try {
            // TODO: API call to register
            console.log('Registering:', formData);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Navigate to login or home
        } catch (error) {
            console.error('Registration error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBackToLogin = () => {
        // Navigate to login screen
        console.log('Navigate to login');
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
                        <Text style={styles.title}>Criar Conta</Text>
                        <Text style={styles.subtitle}>
                            Comece sua jornada rumo à aprovação
                        </Text>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        <Input
                            label="Nome Completo"
                            placeholder="Digite seu nome completo"
                            value={formData.fullName}
                            onChangeText={(value) => handleInputChange('fullName', value)}
                            error={errors.fullName}
                            icon={<Text style={styles.inputIcon}>👤</Text>}
                        />

                        <Input
                            label="Email"
                            placeholder="seu@email.com"
                            value={formData.email}
                            onChangeText={(value) => handleInputChange('email', value)}
                            error={errors.email}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            icon={<Text style={styles.inputIcon}>✉️</Text>}
                        />

                        <Input
                            label="CPF"
                            placeholder="000.000.000-00"
                            value={formData.cpf}
                            onChangeText={(value) => handleInputChange('cpf', value)}
                            error={errors.cpf}
                            keyboardType="numeric"
                            icon={<Text style={styles.inputIcon}>🆔</Text>}
                        />

                        <Input
                            label="Senha"
                            placeholder="Mínimo 6 caracteres"
                            value={formData.password}
                            onChangeText={(value) => handleInputChange('password', value)}
                            error={errors.password}
                            secureTextEntry
                            icon={<Text style={styles.inputIcon}>🔒</Text>}
                        />

                        <Input
                            label="Confirmar Senha"
                            placeholder="Digite a senha novamente"
                            value={formData.confirmPassword}
                            onChangeText={(value) => handleInputChange('confirmPassword', value)}
                            error={errors.confirmPassword}
                            secureTextEntry
                            icon={<Text style={styles.inputIcon}>🔒</Text>}
                        />

                        <Input
                            label="Código da Escola (Opcional)"
                            placeholder="Digite o código da sua escola"
                            value={formData.schoolCode}
                            onChangeText={(value) => handleInputChange('schoolCode', value)}
                            icon={<Text style={styles.inputIcon}>🏫</Text>}
                        />

                        <Button
                            variant="primary"
                            size="lg"
                            onPress={handleRegister}
                            loading={loading}
                            disabled={loading}
                        >
                            Criar Conta
                        </Button>

                        <TouchableOpacity
                            onPress={handleBackToLogin}
                            style={styles.loginLink}
                        >
                            <Text style={styles.loginLinkText}>
                                Já tem uma conta?{' '}
                                <Text style={styles.loginLinkTextBold}>Fazer Login</Text>
                            </Text>
                        </TouchableOpacity>
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
    subtitle: {
        fontSize: theme.typography.sizes.base,
        color: theme.colors.text.secondary,
        textAlign: 'center',
    },
    form: {
        gap: theme.spacing.lg,
    },
    inputIcon: {
        fontSize: 20,
    },
    loginLink: {
        alignItems: 'center',
        marginTop: theme.spacing.md,
    },
    loginLinkText: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.text.secondary,
    },
    loginLinkTextBold: {
        fontWeight: '700',
        color: theme.colors.primary,
    },
});
