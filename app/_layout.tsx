/**
 * ifood Uygulaması Ana Layout
 * Root layout ve navigation yapısı
 */

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { COLORS } from '../src/constants/colors';
import { useAppStore } from '../src/store/useAppStore';
import { ErrorBoundary } from '../src/components/common/ErrorBoundary';

export default function RootLayout() {
  const { setOnboardingCompleted } = useAppStore();

  useEffect(() => {
    // Uygulama başlangıç ayarları
    console.log('ifood uygulaması başlatılıyor...');
  }, []);

  return (
    <ErrorBoundary>
      <StatusBar style="auto" backgroundColor={COLORS.PRIMARY} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.BACKGROUND },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ErrorBoundary>
  );
}
