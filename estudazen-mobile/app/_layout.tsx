import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function RootLayout() {
    return (
        <View style={{ flex: 1 }}>
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: '#130b1b' },
                    animation: 'slide_from_right',
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="(auth)" />
            </Stack>
        </View>
    );
}
