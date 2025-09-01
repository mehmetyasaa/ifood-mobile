/**
 * ifood Uygulaması Onboarding Layout
 * Onboarding ekranları için navigation yapısı
 */

import { Stack } from 'expo-router';
import { COLORS } from '../../src/constants/colors';

export default function OnboardingLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: COLORS.BACKGROUND },
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen name="welcome" />
            <Stack.Screen name="auth-choice" />
            {/* Kayıt olma akışı ekranları */}
            <Stack.Screen name="register-email" />
            <Stack.Screen name="register-email-verification" />
            <Stack.Screen name="register-phone" />
            <Stack.Screen name="register-sms-verification" />
            <Stack.Screen name="register-personal-info" />
        </Stack>
    );
}


