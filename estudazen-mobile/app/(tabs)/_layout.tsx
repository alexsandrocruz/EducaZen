import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../src/theme';

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

function TabBarIcon({ name, color, focused }: { name: IconName; color: string; focused: boolean }) {
    return (
        <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
            <MaterialCommunityIcons name={name} size={24} color={color} />
        </View>
    );
}

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme.colors.background.dark,
                    borderTopColor: 'rgba(255, 255, 255, 0.05)',
                    borderTopWidth: 1,
                    height: 88,
                    paddingBottom: 24,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.text.muted,
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '600',
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Início',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name="home" color={color} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="quiz"
                options={{
                    title: 'Matérias',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name="book-open-variant" color={color} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="ranking"
                options={{
                    title: 'Ranking',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name="podium" color={color} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name="account" color={color} focused={focused} />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainerActive: {
        backgroundColor: 'rgba(127, 19, 236, 0.1)',
    },
});
