/**
 * ifood Uygulaması Renk Paleti
 * Ana marka renkleri ve UI renkleri
 */

export const COLORS = {
    // Ana Marka Renkleri
    PRIMARY: '#EA1D2C', // ifood kırmızısı
    PRIMARY_DARK: '#D41423',
    PRIMARY_LIGHT: '#FF6B6B',

    // İkincil Renkler
    SECONDARY: '#FFC107', // Sarı
    SUCCESS: '#4CAF50', // Yeşil
    WARNING: '#FF9800', // Turuncu
    ERROR: '#F44336', // Kırmızı
    BLUE: '#1877F2', // Facebook mavisi

    // Nötr Renkler
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    GRAY_50: '#FAFAFA',
    GRAY_100: '#F5F5F5',
    GRAY_200: '#EEEEEE',
    GRAY_300: '#E0E0E0',
    GRAY_400: '#BDBDBD',
    GRAY_500: '#9E9E9E',
    GRAY_600: '#757575',
    GRAY_700: '#616161',
    GRAY_800: '#424242',
    GRAY_900: '#212121',

    // Arka Plan Renkleri
    BACKGROUND: '#FFFFFF',
    BACKGROUND_SECONDARY: '#F8F9FA',
    BACKGROUND_DARK: '#1A1A1A',

    // Metin Renkleri
    TEXT_PRIMARY: '#212121',
    TEXT_SECONDARY: '#757575',
    TEXT_DISABLED: '#BDBDBD',
    TEXT_INVERSE: '#FFFFFF',
    TEXT_DARK: '#212121',
    TEXT_MUTED: '#757575',

    // Kenarlık Renkleri
    BORDER: '#E0E0E0',
    BORDER_LIGHT: '#F5F5F5',
    BORDER_DARK: '#BDBDBD',

    // Gölge Renkleri
    SHADOW: 'rgba(0, 0, 0, 0.1)',
    SHADOW_DARK: 'rgba(0, 0, 0, 0.2)',

    // Overlay Renkleri
    OVERLAY: 'rgba(0, 0, 0, 0.5)',
    OVERLAY_LIGHT: 'rgba(0, 0, 0, 0.3)',
} as const;

export type ColorType = keyof typeof COLORS;
