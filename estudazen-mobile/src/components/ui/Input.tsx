import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TextInputProps,
    TouchableOpacity,
} from 'react-native';
import { theme } from '../../theme';

export interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    icon,
    rightIcon,
    secureTextEntry,
    ...rest
}) => {
    const [isSecure, setIsSecure] = useState(secureTextEntry);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={[
                styles.inputContainer,
                isFocused && styles.inputContainerFocused,
                error && styles.inputContainerError,
            ]}>
                {icon && <View style={styles.icon}>{icon}</View>}

                <TextInput
                    {...rest}
                    secureTextEntry={isSecure}
                    style={[styles.input, icon ? styles.inputWithIcon : null]}
                    placeholderTextColor={theme.colors.text.muted}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />

                {secureTextEntry && (
                    <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
                        <Text style={styles.eyeIcon}>{isSecure ? '👁️' : '👁️‍🗨️'}</Text>
                    </TouchableOpacity>
                )}

                {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
            </View>

            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: theme.spacing.md,
    },
    label: {
        fontSize: theme.typography.sizes.sm,
        fontWeight: '600',
        color: theme.colors.text.secondary,
        marginBottom: theme.spacing.sm,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: theme.borderRadius.lg,
        borderWidth: 2,
        borderColor: 'transparent',
        paddingHorizontal: theme.spacing.lg,
    },
    inputContainerFocused: {
        borderColor: theme.colors.primary,
    },
    inputContainerError: {
        borderColor: theme.colors.status.error,
    },
    input: {
        flex: 1,
        height: 48,
        fontSize: theme.typography.sizes.base,
        color: theme.colors.text.primary,
    },
    inputWithIcon: {
        marginLeft: theme.spacing.sm,
    },
    icon: {
        marginRight: theme.spacing.xs,
    },
    rightIcon: {
        marginLeft: theme.spacing.xs,
    },
    eyeIcon: {
        fontSize: 20,
    },
    error: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.status.error,
        marginTop: theme.spacing.xs,
    },
});
