/**
 * ifood Uygulaması Tabs Layout
 * Ana tab navigation yapısı
 */

import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../src/constants/colors';
import { SPACING } from '../../src/constants/spacing';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.PRIMARY,
                tabBarInactiveTintColor: COLORS.GRAY_500,
                tabBarStyle: {
                    backgroundColor: COLORS.WHITE,
                    borderTopWidth: 1,
                    borderTopColor: COLORS.BORDER,
                    paddingBottom: SPACING.XS,
                    paddingTop: SPACING.XS,
                    height: 60,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '500',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Início',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />

        </Tabs>
    );
}


