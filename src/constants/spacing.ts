/**
 * ifood Uygulaması Boşluk ve Boyut Sabitleri
 * Margin, padding, border radius ve diğer boyutlar
 */

export const SPACING = {
    // Temel Boşluk Birimleri
    XS: 4,
    SM: 8,
    MD: 16,
    LG: 24,
    XL: 32,
    '2XL': 48,
    '3XL': 64,
    '4XL': 96,

    // Özel Boşluklar
    SCREEN_PADDING: 16,
    CARD_PADDING: 16,
    BUTTON_PADDING: 12,
    INPUT_PADDING: 16,

    // Border Radius
    RADIUS: {
        XS: 4,
        SM: 8,
        MD: 12,
        LG: 16,
        XL: 24,
        FULL: 9999,
    },

    // Gölge Değerleri
    SHADOW: {
        SM: {
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
        },
        MD: {
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
            elevation: 4,
        },
        LG: {
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 8,
        },
    },
} as const;

export type SpacingType = keyof typeof SPACING;
