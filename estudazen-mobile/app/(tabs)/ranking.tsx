import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../src/theme';

export default function RankingScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Ranking Screen - Em breve!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.dark,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: theme.typography.sizes.xl,
        color: theme.colors.text.primary,
    },
});
