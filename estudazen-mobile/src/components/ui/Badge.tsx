import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../theme';

export interface BadgeProps {
    label: string;
    variant?: 'subject' | 'difficulty' | 'status';
    color?: string;
    icon?: React.ReactNode;
    style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
    label,
    variant = 'subject',
    color,
    icon,
    style,
}) => {
    const getVariantStyle = () => {
        switch (variant) {
            case 'subject':
                return {
                    backgroundColor: color ? `${color}20` : 'rgba(127, 19, 236, 0.1)',
                    borderColor: color ? `${color}40` : 'rgba(127, 19, 236, 0.2)',
                };
            case 'difficulty':
                return {
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderColor: 'rgba(59, 130, 246, 0.2)',
                };
            case 'status':
                return {
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    borderColor: 'rgba(76, 175, 80, 0.2)',
                };
            default:
                return {};
        }
    };

    const getTextColor = () => {
        if (color) return color;
        switch (variant) {
            case 'subject':
                return theme.colors.primary;
            case 'difficulty':
                return theme.colors.status.info;
            case 'status':
                return theme.colors.status.success;
            default:
                return theme.colors.primary;
        }
    };

    return (
        <View style={[styles.container, getVariantStyle(), style]}>
            {icon && <View style={styles.icon}>{icon}</View>}
            <Text style={[styles.label, { color: getTextColor() }]}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.md,
        borderWidth: 1,
    },
    icon: {
        marginRight: theme.spacing.xs,
    },
    label: {
        fontSize: theme.typography.sizes.xs,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
});
