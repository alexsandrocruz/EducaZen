import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../theme';

export interface ProgressProps {
    value: number; // 0-100
    max?: number;
    showLabel?: boolean;
    variant?: 'default' | 'gradient' | 'streak';
    style?: ViewStyle;
}

export const Progress: React.FC<ProgressProps> = ({
    value,
    max = 100,
    showLabel = false,
    variant = 'default',
    style,
}) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
        <View style={[styles.container, style]}>
            {showLabel && (
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>
                        {value} <Text style={styles.labelMuted}>/ {max}</Text>
                    </Text>
                    <Text style={styles.percentage}>{Math.round(percentage)}%</Text>
                </View>
            )}

            <View style={styles.track}>
                {variant === 'gradient' ? (
                    <LinearGradient
                        colors={[theme.colors.primary, theme.colors.secondary]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[styles.fill, { width: `${percentage}%` }]}
                    />
                ) : (
                    <View
                        style={[
                            styles.fill,
                            { width: `${percentage}%` },
                            variant === 'streak' && styles.fillStreak,
                        ]}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.sm,
    },
    label: {
        fontSize: theme.typography.sizes.sm,
        fontWeight: '600',
        color: theme.colors.text.primary,
    },
    labelMuted: {
        color: theme.colors.text.secondary,
    },
    percentage: {
        fontSize: theme.typography.sizes.sm,
        fontWeight: '600',
        color: theme.colors.text.secondary,
    },
    track: {
        height: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: theme.borderRadius.full,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.full,
    },
    fillStreak: {
        backgroundColor: theme.colors.gamification.fire,
    },
});
