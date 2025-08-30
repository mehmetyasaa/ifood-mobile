/**
 * Theme Sistemi
 * 
 * NEDEN YAPILDI?
 * - Dark/Light mode desteği
 * - Tutarlı renk paleti
 * - Kullanıcı tercihi desteği
 * - Accessibility iyileştirmesi
 * - Brand consistency
 * 
 * NASIL ÇALIŞIR?
 * - Interface ile type safety
 * - Light ve dark theme objeleri
 * - getTheme fonksiyonu ile dinamik tema seçimi
 * - Tüm renkler merkezi olarak yönetilir
 * 
 * KULLANIM ALANLARI:
 * - Tüm component'lerde
 * - Background renkleri
 * - Text renkleri
 * - Border renkleri
 * - Status bar renkleri
 * 
 * ÖRNEK KULLANIM:
 * const theme = getTheme('dark');
 * const backgroundColor = theme.colors.background;
 * 
 * // Component'te kullanım:
 * <View style={{ backgroundColor: theme.colors.surface }}>
 */

import { COLORS } from './colors';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface Theme {
    mode: ThemeMode;
    colors: {
        primary: string;
        background: string;
        surface: string;
        text: {
            primary: string;
            secondary: string;
            disabled: string;
        };
        border: string;
        error: string;
        success: string;
        warning: string;
    };
}

export const lightTheme: Theme = {
    mode: 'light',
    colors: {
        primary: COLORS.PRIMARY,
        background: COLORS.BACKGROUND,
        surface: COLORS.WHITE,
        text: {
            primary: COLORS.TEXT_PRIMARY,
            secondary: COLORS.TEXT_SECONDARY,
            disabled: COLORS.TEXT_DISABLED,
        },
        border: COLORS.BORDER,
        error: COLORS.ERROR,
        success: COLORS.SUCCESS,
        warning: COLORS.WARNING,
    },
};

export const darkTheme: Theme = {
    mode: 'dark',
    colors: {
        primary: COLORS.PRIMARY,
        background: '#121212',
        surface: '#1E1E1E',
        text: {
            primary: '#FFFFFF',
            secondary: '#B0B0B0',
            disabled: '#666666',
        },
        border: '#333333',
        error: '#CF6679',
        success: '#4CAF50',
        warning: '#FF9800',
    },
};

export const getTheme = (mode: ThemeMode): Theme => {
    switch (mode) {
        case 'dark':
            return darkTheme;
        case 'light':
        default:
            return lightTheme;
    }
};
