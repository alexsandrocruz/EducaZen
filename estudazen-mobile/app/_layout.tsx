import { Stack } from 'expo-router';
import { AuthProvider } from '../src/components/AuthProvider';

export default function RootLayout() {
    return (
        <AuthProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: '#130b1b' },
                    animation: 'slide_from_right',
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(tabs)" />
            </Stack>
        </AuthProvider>
    );
}
