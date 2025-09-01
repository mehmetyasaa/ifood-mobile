/**
 * ifood Uygulaması Auth Layout
 * Kimlik doğrulama ekranları için layout
 */

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function AuthLayout() {
    return (
        <>
            <StatusBar style="light" />
            <Stack
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                    animation: 'slide_from_right',
                }}
            >
                <Stack.Screen name="phone" />
                <Stack.Screen name="verification" />
            </Stack>
        </>
    );
}