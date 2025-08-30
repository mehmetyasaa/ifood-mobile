/**
 * ifood Uygulaması Tipografi Sabitleri
 * Font boyutları, ağırlıkları ve satır yükseklikleri
 */

export const TYPOGRAPHY = {
    // Font Boyutları
    FONT_SIZE: {
        XS: 12,
        SM: 14,
        BASE: 16,
        LG: 18,
        XL: 20,
        '2XL': 24,
        '3XL': 30,
        '4XL': 36,
        '5XL': 48,
    },

    // Font Ağırlıkları
    FONT_WEIGHT: {
        LIGHT: '300',
        NORMAL: '400',
        MEDIUM: '500',
        SEMIBOLD: '600',
        BOLD: '700',
        EXTRABOLD: '800',
    },

    // Satır Yükseklikleri
    LINE_HEIGHT: {
        TIGHT: 1.2,
        NORMAL: 1.4,
        RELAXED: 1.6,
        LOOSE: 1.8,
    },

    // Letter Spacing
    LETTER_SPACING: {
        TIGHT: -0.5,
        NORMAL: 0,
        WIDE: 0.5,
        WIDER: 1,
    },
} as const;

export type TypographyType = keyof typeof TYPOGRAPHY;
