import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card } from '../src/components/ui';
import { theme } from '../src/theme';

export default function WelcomeScreen() {
    const router = useRouter();

    const handleGetStarted = () => {
        router.push('/(auth)/register');
    };

    const handleSignIn = () => {
        router.push('/(auth)/login');
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
                    <View style={styles.logo}>
                        <Text style={styles.logoIcon}>🎓</Text>
                    </View>
                    <Text style={styles.title}>
                        Vesti<Text style={styles.titleAccent}>Quiz</Text>
                    </Text>
                </View>

                {/* Hero Section */}
                <View style={styles.heroContainer}>
                    {/* Floating badges */}
                    <Card variant="glass" style={styles.floatingBadge1}>
                        <Text style={styles.badgeText}>⭐ XP +50</Text>
                    </Card>

                    <Card variant="glass" style={styles.floatingBadge2}>
                        <Text style={styles.badgeText}>✅ Correto!</Text>
                    </Card>

                    {/* Main hero image placeholder */}
                    <View style={styles.heroImage}>
                        <Text style={styles.heroEmoji}>📚</Text>
                    </View>
                </View>

                {/* Main Content */}
                <View style={styles.content}>
                    <Text style={styles.heading}>
                        Domine o <Text style={styles.headingGradient}>ENEM</Text> jogando!
                    </Text>

                    <Text style={styles.description}>
                        Prepare-se para o vestibular com quizzes interativos, simulados
                        inteligentes e suba no ranking nacional.
                    </Text>

                    {/* Features */}
                    <View style={styles.features}>
                        <View style={styles.feature}>
                            <View style={[styles.featureIcon, { backgroundColor: '#ff980030' }]}>
                                <Text style={styles.featureEmoji}>🏆</Text>
                            </View>
                            <Text style={styles.featureLabel}>Rankings</Text>
                        </View>

                        <View style={styles.feature}>
                            <View style={[styles.featureIcon, { backgroundColor: '#7f13ec30' }]}>
                                <Text style={styles.featureEmoji}>🧠</Text>
                            </View>
                            <Text style={styles.featureLabel}>Quizzes</Text>
                        </View>

                        <View style={styles.feature}>
                            <View style={[styles.featureIcon, { backgroundColor: '#3b82f630' }]}>
                                <Text style={styles.featureEmoji}>📈</Text>
                            </View>
                            <Text style={styles.featureLabel}>Evolução</Text>
                        </View>
                    </View>

                    {/* CTA Buttons */}
                    <View style={styles.buttons}>
                        <Button
                            variant="primary"
                            size="lg"
                            onPress={handleGetStarted}
                        >
                            Começar Agora
                        </Button>

                        <Button
                            variant="secondary"
                            size="lg"
                            onPress={handleSignIn}
                        >
                            Já tenho conta
                        </Button>
                    </View>

                    <Text style={styles.terms}>
                        Ao continuar, você concorda com nossos{' '}
                        <Text style={styles.termsLink}>Termos</Text>.
                    </Text>
                </View>
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
        flexGrow: 1,
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing['2xl'],
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
        marginBottom: theme.spacing['2xl'],
    },
    logo: {
        width: 40,
        height: 40,
        borderRadius: theme.borderRadius.lg,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoIcon: {
        fontSize: 24,
    },
    title: {
        fontSize: theme.typography.sizes['2xl'],
        fontWeight: '700',
        color: theme.colors.text.primary,
    },
    titleAccent: {
        color: theme.colors.primary,
    },
    heroContainer: {
        alignItems: 'center',
        marginBottom: theme.spacing['3xl'],
        paddingVertical: theme.spacing['2xl'],
    },
    floatingBadge1: {
        position: 'absolute',
        top: 20,
        left: 20,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
    },
    floatingBadge2: {
        position: 'absolute',
        bottom: 40,
        right: 0,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
    },
    badgeText: {
        fontSize: theme.typography.sizes.xs,
        fontWeight: '700',
        color: theme.colors.text.primary,
    },
    heroImage: {
        width: 200,
        height: 200,
        borderRadius: theme.borderRadius['2xl'],
        backgroundColor: 'rgba(127, 19, 236, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    heroEmoji: {
        fontSize: 80,
    },
    content: {
        gap: theme.spacing.xl,
    },
    heading: {
        fontSize: theme.typography.sizes['4xl'],
        fontWeight: '800',
        color: theme.colors.text.primary,
        textAlign: 'center',
        lineHeight: theme.typography.sizes['4xl'] * 1.2,
    },
    headingGradient: {
        color: theme.colors.primary,
    },
    description: {
        fontSize: theme.typography.sizes.lg,
        color: theme.colors.text.secondary,
        textAlign: 'center',
        lineHeight: theme.typography.sizes.lg * 1.5,
        paddingHorizontal: theme.spacing.md,
    },
    features: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: theme.spacing.xl,
        marginVertical: theme.spacing.lg,
    },
    feature: {
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    featureIcon: {
        width: 48,
        height: 48,
        borderRadius: theme.borderRadius.lg,
        justifyContent: 'center',
        alignItems: 'center',
    },
    featureEmoji: {
        fontSize: 24,
    },
    featureLabel: {
        fontSize: theme.typography.sizes.xs,
        fontWeight: '500',
        color: theme.colors.text.secondary,
    },
    buttons: {
        gap: theme.spacing.md,
        marginTop: theme.spacing.md,
    },
    terms: {
        fontSize: theme.typography.sizes.xs,
        color: theme.colors.text.muted,
        textAlign: 'center',
        marginTop: theme.spacing.md,
    },
    termsLink: {
        textDecorationLine: 'underline',
        color: theme.colors.primary,
    },
});
