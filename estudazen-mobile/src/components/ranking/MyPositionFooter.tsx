import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../theme';

interface MyPositionFooterProps {
    rank: number;
    studentName: string;
    avatarUrl?: string;
    totalXp: number;
    positionChange?: number; // positive = subiu, negative = desceu
}

export function MyPositionFooter({
    rank,
    studentName,
    avatarUrl,
    totalXp,
    positionChange = 0,
}: MyPositionFooterProps) {
    const changeIcon = positionChange > 0 ? 'arrow-up' : positionChange < 0 ? 'arrow-down' : 'minus';
    const changeColor = positionChange > 0 ? '#4ade80' : positionChange < 0 ? '#ef4444' : '#9b92c9';
    const changeText = positionChange !== 0
        ? `${positionChange > 0 ? 'Subiu' : 'Desceu'} ${Math.abs(positionChange)} ${Math.abs(positionChange) === 1 ? 'posição' : 'posições'} hoje!`
        : 'Mantenha sua posição!';

    return (
        <View style={styles.wrapper}>
            <LinearGradient
                colors={['#3713ec', '#5e2de9']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.container}
            >
                {/* Background decoration */}
                <View style={styles.bgDecoration} />

                <View style={styles.content}>
                    {/* Rank with change indicator */}
                    <View style={styles.rankContainer}>
                        <MaterialCommunityIcons name={changeIcon} size={16} color={changeColor} />
                        <Text style={styles.rankText}>{rank}</Text>
                    </View>

                    {/* Avatar */}
                    {avatarUrl ? (
                        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <Text style={styles.avatarInitials}>
                                {studentName.charAt(0).toUpperCase()}
                            </Text>
                        </View>
                    )}

                    {/* Info */}
                    <View style={styles.info}>
                        <Text style={styles.youLabel}>Você</Text>
                        <Text style={styles.changeText} numberOfLines={1}>
                            {changeText}
                        </Text>
                    </View>

                    {/* XP */}
                    <Text style={styles.xp}>{totalXp.toLocaleString()} XP</Text>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        paddingBottom: 100, // account for tab bar
    },
    container: {
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        shadowColor: '#3713ec',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 10,
    },
    bgDecoration: {
        position: 'absolute',
        right: -40,
        top: -40,
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 12,
        paddingHorizontal: 16,
    },
    rankContainer: {
        width: 40,
        alignItems: 'center',
    },
    rankText: {
        fontSize: 20,
        fontWeight: '900',
        color: '#ffffff',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    avatarPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    avatarInitials: {
        fontSize: 16,
        fontWeight: '700',
        color: '#ffffff',
    },
    info: {
        flex: 1,
        minWidth: 0,
    },
    youLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#ffffff',
    },
    changeText: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    xp: {
        fontSize: 16,
        fontWeight: '900',
        color: '#ffffff',
        letterSpacing: 0.5,
    },
});
