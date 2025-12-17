import React from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacityProps,
} from 'react-native';
import { theme } from '../../theme';

export interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
    children: string;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    icon,
    children,
    ...rest
}) => {
    const isDisabled = disabled || loading;

    return (
        <TouchableOpacity
            {...rest}
            disabled={isDisabled}
            style={[
                styles.base,
                styles[variant],
                styles[size],
                isDisabled && styles.disabled,
            ]}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === 'primary' ? theme.colors.text.primary : theme.colors.primary}
                />
            ) : (
                <View style={styles.content}>
                    {icon && <View style={styles.icon}>{icon}</View>}
                    <Text
                        style={[
                            styles.text,
                            styles[`text_${variant}`],
                            styles[`text_${size}`],
                        ]}
                    >
                        {children}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.borderRadius.xl,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    icon: {
        marginRight: theme.spacing.xs,
    },

    // Variants
    primary: {
        backgroundColor: theme.colors.primary,
        ...theme.shadows.primary,
    },
    secondary: {
        backgroundColor: theme.colors.surface.light,
        borderWidth: 2,
        borderColor: theme.colors.primary,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: theme.colors.primary,
    },
    ghost: {
        backgroundColor: 'transparent',
    },

    // Sizes
    sm: {
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.lg,
        height: 40,
    },
    md: {
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.xl,
        height: 48,
    },
    lg: {
        paddingVertical: theme.spacing.lg,
        paddingHorizontal: theme.spacing['2xl'],
        height: 56,
    },

    // Text styles
    text: {
        fontWeight: '700',
    },
    text_primary: {
        color: theme.colors.text.primary,
    },
    text_secondary: {
        color: theme.colors.primary,
    },
    text_outline: {
        color: theme.colors.primary,
    },
    text_ghost: {
        color: theme.colors.primary,
    },
    text_sm: {
        fontSize: theme.typography.sizes.sm,
    },
    text_md: {
        fontSize: theme.typography.sizes.base,
    },
    text_lg: {
        fontSize: theme.typography.sizes.lg,
    },

    // Disabled state
    disabled: {
        opacity: 0.5,
    },
});
