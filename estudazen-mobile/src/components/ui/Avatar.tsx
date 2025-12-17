import React from 'react';
import { View, Image, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../theme';

export interface AvatarProps {
    source?: string;
    size?: 'sm' | 'md' | 'lg';
    border?: boolean;
    badge?: number;
    style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
    source,
    size = 'md',
    border = false,
    badge,
    style,
}) => {
    const sizeStyles = {
        sm: { width: 32, height: 32 },
        md: { width: 48, height: 48 },
        lg: { width: 64, height: 64 },
    };

    const badgeSizes = {
        sm: 16,
        md: 20,
        lg: 24,
    };

    return (
        <View style={[styles.container, style]}>
            <View
                style={[
                    styles.avatar,
                    sizeStyles[size],
                    border && styles.avatarBorder,
                ]}
            >
                {source ? (
                    <Image source={{ uri: source }} style={styles.image} />
                ) : (
                    <View style={styles.placeholder}>
                        <Text style={styles.placeholderText}>?</Text>
                    </View>
                )}
            </View>

            {badge !== undefined && (
                <View
                    style={[
                        styles.badge,
                        { width: badgeSizes[size], height: badgeSizes[size] },
                    ]}
                >
                    <Text style={styles.badgeText}>{badge}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    avatar: {
        borderRadius: theme.borderRadius.full,
        overflow: 'hidden',
        backgroundColor: theme.colors.surface.dark,
    },
    avatarBorder: {
        borderWidth: 2,
        borderColor: theme.colors.primary,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    placeholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
    },
    placeholderText: {
        color: theme.colors.text.primary,
        fontWeight: '700',
        fontSize: theme.typography.sizes.lg,
    },
    badge: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.full,
        borderWidth: 2,
        borderColor: theme.colors.background.dark,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: theme.colors.text.primary,
        fontSize: theme.typography.sizes.xs,
        fontWeight: '700',
    },
});
