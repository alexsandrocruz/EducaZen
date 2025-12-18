import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../theme';

interface TipItem {
    id: string;
    type: 'highlight' | 'normal';
    category: string;
    title: string;
    description: string;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    iconColor?: string;
    iconBgColor?: string;
}

interface TipsCarouselProps {
    tips?: TipItem[];
    onSeeAll?: () => void;
    onTipPress?: (tip: TipItem) => void;
}

const defaultTips: TipItem[] = [
    {
        id: '1',
        type: 'highlight',
        category: 'Dica do Dia',
        title: 'Fórmula de Bhaskara',
        description: 'Revise equações de 2º grau para garantir pontos em Matemática básica.',
        icon: 'lightbulb',
        iconColor: '#ffffff',
    },
    {
        id: '2',
        type: 'normal',
        category: 'Novidade',
        title: 'Edital FUVEST 2024',
        description: 'Confira as principais mudanças no formato da prova e datas de inscrição.',
        icon: 'newspaper',
        iconColor: '#3b82f6',
        iconBgColor: 'rgba(59, 130, 246, 0.1)',
    },
    {
        id: '3',
        type: 'normal',
        category: 'Estudos',
        title: 'Aulão de Revisão',
        description: 'Participe da live de História Geral hoje às 19h no app.',
        icon: 'school',
        iconColor: theme.colors.primary,
        iconBgColor: 'rgba(127, 19, 236, 0.1)',
    },
];

export function TipsCarousel({
    tips = defaultTips,
    onSeeAll,
    onTipPress,
}: TipsCarouselProps) {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Para Você</Text>
                <TouchableOpacity onPress={onSeeAll}>
                    <Text style={styles.seeAll}>Ver todos</Text>
                </TouchableOpacity>
            </View>

            {/* Cards Carousel */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                snapToInterval={268} // card width + gap
                decelerationRate="fast"
            >
                {tips.map((tip) => (
                    <TouchableOpacity
                        key={tip.id}
                        activeOpacity={0.9}
                        onPress={() => onTipPress?.(tip)}
                    >
                        {tip.type === 'highlight' ? (
                            <LinearGradient
                                colors={['#FF9966', '#FF5E62']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.highlightCard}
                            >
                                <View style={styles.highlightBgCircle} />
                                <View style={styles.cardContent}>
                                    {/* Card Header */}
                                    <View style={styles.cardHeader}>
                                        <View style={styles.highlightIconContainer}>
                                            <MaterialCommunityIcons
                                                name={tip.icon}
                                                size={24}
                                                color="#ffffff"
                                            />
                                        </View>
                                        <View style={styles.highlightBadge}>
                                            <Text style={styles.highlightBadgeText}>
                                                {tip.category}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Card Footer */}
                                    <View style={styles.cardFooter}>
                                        <Text style={styles.highlightTitle}>{tip.title}</Text>
                                        <Text
                                            style={styles.highlightDescription}
                                            numberOfLines={2}
                                        >
                                            {tip.description}
                                        </Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        ) : (
                            <View style={styles.normalCard}>
                                <View style={styles.cardContent}>
                                    {/* Card Header */}
                                    <View style={styles.cardHeader}>
                                        <View
                                            style={[
                                                styles.normalIconContainer,
                                                { backgroundColor: tip.iconBgColor },
                                            ]}
                                        >
                                            <MaterialCommunityIcons
                                                name={tip.icon}
                                                size={24}
                                                color={tip.iconColor}
                                            />
                                        </View>
                                        <Text style={styles.normalBadgeText}>{tip.category}</Text>
                                    </View>

                                    {/* Card Footer */}
                                    <View style={styles.cardFooter}>
                                        <Text style={styles.normalTitle}>{tip.title}</Text>
                                        <Text
                                            style={styles.normalDescription}
                                            numberOfLines={2}
                                        >
                                            {tip.description}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: theme.spacing.md,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    title: {
        fontSize: theme.typography.sizes.lg,
        fontWeight: '700',
        color: theme.colors.text.primary,
    },
    seeAll: {
        fontSize: theme.typography.sizes.sm,
        fontWeight: '600',
        color: theme.colors.primary,
    },
    scrollContent: {
        paddingRight: theme.spacing.xl,
        gap: theme.spacing.md,
    },

    // Highlight card
    highlightCard: {
        width: 260,
        borderRadius: theme.borderRadius.xl,
        overflow: 'hidden',
        position: 'relative',
    },
    highlightBgCircle: {
        position: 'absolute',
        top: -32,
        right: -32,
        width: 128,
        height: 128,
        borderRadius: 64,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    cardContent: {
        padding: 20,
        minHeight: 140,
        justifyContent: 'space-between',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    highlightIconContainer: {
        width: 40,
        height: 40,
        borderRadius: theme.borderRadius.md,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    highlightBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: 4,
        borderRadius: theme.borderRadius.full,
    },
    highlightBadgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#ffffff',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    cardFooter: {
        marginTop: 'auto',
    },
    highlightTitle: {
        fontSize: theme.typography.sizes.lg,
        fontWeight: '700',
        color: '#ffffff',
    },
    highlightDescription: {
        fontSize: theme.typography.sizes.sm,
        color: 'rgba(255, 255, 255, 0.9)',
        marginTop: 4,
        fontWeight: '500',
    },

    // Normal card
    normalCard: {
        width: 260,
        backgroundColor: theme.colors.background.card,
        borderRadius: theme.borderRadius.xl,
        borderWidth: 1,
        borderColor: theme.colors.border.dark,
    },
    normalIconContainer: {
        width: 40,
        height: 40,
        borderRadius: theme.borderRadius.md,
        justifyContent: 'center',
        alignItems: 'center',
    },
    normalBadgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: theme.colors.text.muted,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    normalTitle: {
        fontSize: theme.typography.sizes.lg,
        fontWeight: '700',
        color: theme.colors.text.primary,
    },
    normalDescription: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.text.secondary,
        marginTop: 4,
    },
});
