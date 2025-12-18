import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../theme';

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

interface QuickActionCardProps {
    variant: 'primary' | 'secondary';
    title: string;
    subtitle?: string;
    icon: IconName;
    iconColor?: string;
    iconBgColor?: string;
    badge?: string;
    onPress?: () => void;
    style?: ViewStyle;
}

export function QuickActionCard({
    variant,
    title,
    subtitle,
    icon,
    iconColor,
    iconBgColor,
    badge,
    onPress,
    style,
}: QuickActionCardProps) {
    if (variant === 'primary') {
        return (
            <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={style}>
                <LinearGradient
                    colors={['#7f13ec', '#5c0db5']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.primaryContainer}
                >
                    {/* Background decorations */}
                    <View style={styles.primaryBgCircle1} />
                    <View style={styles.primaryBgCircle2} />

                    {/* Content */}
                    <View style={styles.primaryContent}>
                        {/* Header row */}
                        <View style={styles.primaryHeader}>
                            {badge && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{badge}</Text>
                                </View>
                            )}
                            <View style={styles.primaryIconContainer}>
                                <MaterialCommunityIcons
                                    name="play"
                                    size={32}
                                    color={theme.colors.primary}
                                />
                            </View>
                        </View>

                        {/* Title */}
                        <View style={styles.primaryTitleContainer}>
                            <Text style={styles.primaryTitle}>{title}</Text>
                            {subtitle && (
                                <Text style={styles.primarySubtitle}>{subtitle}</Text>
                            )}
                        </View>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    // Secondary variant
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={[styles.secondaryContainer, style]}
        >
            {/* Header */}
            <View style={styles.secondaryHeader}>
                <View
                    style={[
                        styles.secondaryIconContainer,
                        { backgroundColor: iconBgColor || 'rgba(59, 130, 246, 0.1)' },
                    ]}
                >
                    <MaterialCommunityIcons
                        name={icon}
                        size={20}
                        color={iconColor || theme.colors.status.info}
                    />
                </View>
                <MaterialCommunityIcons
                    name="arrow-right"
                    size={18}
                    color={theme.colors.text.muted}
                />
            </View>

            {/* Footer */}
            <View style={styles.secondaryFooter}>
                <Text style={styles.secondaryTitle}>{title}</Text>
                {subtitle && (
                    <Text style={styles.secondarySubtitle} numberOfLines={1}>
                        {subtitle}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    // Primary variant styles
    primaryContainer: {
        borderRadius: theme.borderRadius.xl,
        overflow: 'hidden',
        minHeight: 160,
        position: 'relative',
    },
    primaryBgCircle1: {
        position: 'absolute',
        top: -24,
        right: -24,
        width: 192,
        height: 192,
        borderRadius: 96,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    primaryBgCircle2: {
        position: 'absolute',
        bottom: -32,
        left: -32,
        width: 128,
        height: 128,
        borderRadius: 64,
        backgroundColor: 'rgba(0, 212, 255, 0.2)',
    },
    primaryContent: {
        flex: 1,
        padding: theme.spacing.xl,
        justifyContent: 'space-between',
    },
    primaryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    badge: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.md,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#ffffff',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    primaryIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    primaryTitleContainer: {
        marginTop: theme.spacing.md,
    },
    primaryTitle: {
        fontSize: theme.typography.sizes['2xl'],
        fontWeight: '800',
        color: '#ffffff',
    },
    primarySubtitle: {
        fontSize: theme.typography.sizes.sm,
        color: 'rgba(233, 213, 255, 0.9)',
        marginTop: 4,
        fontWeight: '500',
    },

    // Secondary variant styles
    secondaryContainer: {
        backgroundColor: theme.colors.background.card,
        borderRadius: theme.borderRadius.xl,
        borderWidth: 1,
        borderColor: theme.colors.border.dark,
        padding: theme.spacing.lg,
        height: 128,
        justifyContent: 'space-between',
    },
    secondaryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    secondaryIconContainer: {
        width: 40,
        height: 40,
        borderRadius: theme.borderRadius.lg,
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondaryFooter: {
        marginTop: 'auto',
    },
    secondaryTitle: {
        fontSize: theme.typography.sizes.base,
        fontWeight: '700',
        color: theme.colors.text.primary,
    },
    secondarySubtitle: {
        fontSize: theme.typography.sizes.xs,
        color: theme.colors.text.secondary,
        marginTop: 4,
    },
});
