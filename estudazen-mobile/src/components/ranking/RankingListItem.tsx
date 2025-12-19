import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../theme';

interface RankingListItemProps {
    rank: number;
    studentName: string;
    schoolName?: string;
    avatarUrl?: string;
    totalXp: number;
    isCurrentUser?: boolean;
}

export function RankingListItem({
    rank,
    studentName,
    schoolName,
    avatarUrl,
    totalXp,
    isCurrentUser,
}: RankingListItemProps) {
    return (
        <View style={[styles.container, isCurrentUser && styles.containerHighlight]}>
            {/* Rank */}
            <Text style={styles.rank}>{rank}</Text>

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
                <Text style={styles.name} numberOfLines={1}>
                    {studentName}
                    {isCurrentUser && <Text style={styles.youLabel}> (Você)</Text>}
                </Text>
                {schoolName && (
                    <Text style={styles.school} numberOfLines={1}>
                        {schoolName}
                    </Text>
                )}
            </View>

            {/* XP Badge */}
            <View style={styles.xpBadge}>
                <MaterialCommunityIcons name="lightning-bolt" size={16} color={theme.colors.primary} />
                <Text style={styles.xpText}>{totalXp.toLocaleString()}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: '#1c182f',
        padding: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    containerHighlight: {
        backgroundColor: 'rgba(127, 19, 236, 0.15)',
        borderColor: 'rgba(127, 19, 236, 0.3)',
    },
    rank: {
        width: 24,
        fontSize: 18,
        fontWeight: '700',
        color: '#9b92c9',
        textAlign: 'center',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    avatarPlaceholder: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarInitials: {
        fontSize: 20,
        fontWeight: '700',
        color: '#ffffff',
    },
    info: {
        flex: 1,
        minWidth: 0,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text.primary,
    },
    youLabel: {
        fontSize: 14,
        color: theme.colors.primary,
    },
    school: {
        fontSize: 12,
        color: '#9b92c9',
        marginTop: 2,
    },
    xpBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#292348',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    xpText: {
        fontSize: 14,
        fontWeight: '700',
        color: theme.colors.text.primary,
    },
});
