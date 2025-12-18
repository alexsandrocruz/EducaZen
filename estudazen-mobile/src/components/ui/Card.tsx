import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
    ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../theme';

export interface CardProps extends Omit<TouchableOpacityProps, 'style'> {
    variant?: 'default' | 'glass' | 'gradient';
    children: React.ReactNode;
    style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
    variant = 'default',
    children,
    style,
    onPress,
    ...rest
}) => {
    const Container = onPress ? TouchableOpacity : View;

    if (variant === 'gradient') {
        return (
            <Container {...rest} onPress={onPress} style={[styles.base, style]}>
                <LinearGradient
                    colors={['#6a11cb', '#2575fc']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradient}
                >
                    {children}
                </LinearGradient>
            </Container>
        );
    }

    return (
        <Container
            {...rest}
            onPress={onPress}
            style={[
                styles.base,
                variant === 'glass' && styles.glass,
                variant === 'default' && styles.default,
                style,
            ]}
        >
            {children}
        </Container>
    );
};

const styles = StyleSheet.create({
    base: {
        borderRadius: theme.borderRadius.xl,
        overflow: 'hidden',
    },
    default: {
        backgroundColor: theme.colors.surface.dark,
        ...theme.shadows.md,
    },
    glass: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    gradient: {
        padding: theme.spacing.xl,
    },
});
