import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../theme';

interface PodiumEntry {
    rank: number;
    studentName: string;
    avatarUrl?: string;
    totalXp: number;
    isCurrentUser?: boolean;
}

interface PodiumProps {
    entries: PodiumEntry[];
}

const MEDAL_COLORS = {
    1: { border: '#FFD700', glow: 'rgba(255, 215, 0, 0.4)', bg: '#FFD700' },
    2: { border: '#C0C0C0', glow: 'rgba(192, 192, 192, 0.3)', bg: '#C0C0C0' },
    3: { border: '#CD7F32', glow: 'rgba(205, 127, 50, 0.3)', bg: '#CD7F32' },
};

function PodiumPlace({ entry, size }: { entry: PodiumEntry; size: 'large' | 'small' }) {
    const colors = MEDAL_COLORS[entry.rank as 1 | 2 | 3];
    const isFirst = entry.rank === 1;
    const avatarSize = isFirst ? 96 : 80;
    const labelSize = isFirst ? 16 : 14;

    return (
        <View style={[styles.placeContainer, isFirst && styles.firstPlaceContainer]}>
            {/* Label */}
            {isFirst ? (
                <View style={styles.crownContainer}>
                    <MaterialCommunityIcons name="crown" size={28} color="#FFD700" />
                </View>
            ) : (
                <Text style={[styles.placeLabel, { color: colors.border }]}>
                    {entry.rank}º Lugar
                </Text>
            )}

            {/* Avatar with border */}
            <View style={[styles.avatarWrapper, { shadowColor: colors.border }]}>
                <View
                    style={[
                        styles.avatarBorder,
                        {
                            width: avatarSize + 8,
                            height: avatarSize + 8,
                            borderColor: colors.border,
                            shadowColor: colors.border,
                        },
                    ]}
                >
                    {entry.avatarUrl ? (
                        <Image source={{ uri: entry.avatarUrl }} style={[styles.avatar, { width: avatarSize, height: avatarSize }]} />
                    ) : (
                        <View style={[styles.avatarPlaceholder, { width: avatarSize, height: avatarSize }]}>
                            <Text style={[styles.avatarInitials, { fontSize: isFirst ? 32 : 24 }]}>
                                {entry.studentName.charAt(0).toUpperCase()}
                            </Text>
                        </View>
                    )}
                </View>
                {/* Rank badge */}
                <View style={[styles.rankBadge, { backgroundColor: colors.bg }]}>
                    <Text style={[styles.rankBadgeText, { fontSize: isFirst ? 14 : 12 }]}>#{entry.rank}</Text>
                </View>
            </View>

            {/* Name and XP */}
            <View style={styles.infoContainer}>
                <Text style={[styles.name, isFirst && styles.firstName]} numberOfLines={1}>
                    {entry.studentName}
                </Text>
                <Text style={[styles.xp, { color: isFirst ? '#FFD700' : theme.colors.primary }]}>
                    {entry.totalXp.toLocaleString()} XP
                </Text>
            </View>
        </View>
    );
}

export function Podium({ entries }: PodiumProps) {
    const first = entries.find((e) => e.rank === 1);
    const second = entries.find((e) => e.rank === 2);
    const third = entries.find((e) => e.rank === 3);

    if (!first || !second || !third) {
        return null;
    }

    return (
        <View style={styles.container}>
            {/* Glow effect */}
            <View style={styles.glowEffect} />

            {/* Podium */}
            <View style={styles.podium}>
                {/* 2nd place - left */}
                <PodiumPlace entry={second} size="small" />

                {/* 1st place - center */}
                <PodiumPlace entry={first} size="large" />

                {/* 3rd place - right */}
                <PodiumPlace entry={third} size="small" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        paddingVertical: 16,
        paddingHorizontal: 8,
    },
    glowEffect: {
        position: 'absolute',
        top: 0,
        left: '25%',
        width: '50%',
        height: '100%',
        backgroundColor: 'rgba(55, 19, 236, 0.25)',
        borderRadius: 100,
    },
    podium: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 8,
    },
    placeContainer: {
        flex: 1,
        alignItems: 'center',
        maxWidth: 110,
    },
    firstPlaceContainer: {
        marginTop: -32,
        marginBottom: 16,
        maxWidth: 130,
    },
    crownContainer: {
        marginBottom: 8,
    },
    placeLabel: {
        fontSize: 12,
        fontWeight: '700',
        marginBottom: 8,
    },
    avatarWrapper: {
        position: 'relative',
    },
    avatarBorder: {
        borderRadius: 100,
        borderWidth: 4,
        padding: 4,
        backgroundColor: '#2a1f36',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 10,
    },
    avatar: {
        borderRadius: 100,
    },
    avatarPlaceholder: {
        borderRadius: 100,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarInitials: {
        color: '#ffffff',
        fontWeight: '700',
    },
    rankBadge: {
        position: 'absolute',
        bottom: -8,
        left: '50%',
        transform: [{ translateX: -16 }],
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    rankBadgeText: {
        color: '#131022',
        fontWeight: '800',
    },
    infoContainer: {
        alignItems: 'center',
        marginTop: 12,
    },
    name: {
        fontSize: 14,
        fontWeight: '700',
        color: theme.colors.text.primary,
        textAlign: 'center',
    },
    firstName: {
        fontSize: 16,
    },
    xp: {
        fontSize: 12,
        fontWeight: '600',
        marginTop: 2,
    },
});
