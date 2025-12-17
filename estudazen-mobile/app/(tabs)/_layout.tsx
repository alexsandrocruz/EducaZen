import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { theme } from '../../src/theme';

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme.colors.background.card,
                    borderTopColor: 'rgba(255, 255, 255, 0.1)',
                    borderTopWidth: 1,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.text.secondary,
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Início',
                    tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🏠</Text>,
                }}
            />
            <Tabs.Screen
                name="quiz"
                options={{
                    title: 'Quiz',
                    tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>📝</Text>,
                }}
            />
            <Tabs.Screen
                name="ranking"
                options={{
                    title: 'Ranking',
                    tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🏆</Text>,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>👤</Text>,
                }}
            />
        </Tabs>
    );
}
