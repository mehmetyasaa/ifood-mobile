/**
 * ifood Uygulaması Card Bileşeni
 * Yeniden kullanılabilir kart bileşeni
 */

import React from 'react';
import {
    View,
    StyleSheet,
    ViewStyle,
    TouchableOpacity,
    TouchableOpacityProps,
} from 'react-native';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';

// Card Variant Tipleri
export type CardVariant = 'default' | 'elevated' | 'outlined';

// Card Props Interface'i
interface CardProps {
    children: React.ReactNode;
    variant?: CardVariant;
    style?: ViewStyle;
    onPress?: () => void;
    disabled?: boolean;
}

// Card Bileşeni
export const Card: React.FC<CardProps> = ({
    children,
    variant = 'default',
    style,
    onPress,
    disabled = false,
}) => {
    const cardStyle = [
        styles.base,
        styles[variant],
        style,
    ];

    if (onPress) {
        return (
            <TouchableOpacity
                style={cardStyle}
                onPress={onPress}
                disabled={disabled}
                activeOpacity={0.8}
            >
                {children}
            </TouchableOpacity>
        );
    }

    return (
        <View style={cardStyle}>
            {children}
        </View>
    );
};

// Stiller
const styles = StyleSheet.create({
    base: {
        backgroundColor: COLORS.WHITE,
        borderRadius: SPACING.RADIUS.LG,
        padding: SPACING.CARD_PADDING,
    },
    default: {
        ...SPACING.SHADOW.SM,
    },
    elevated: {
        ...SPACING.SHADOW.MD,
    },
    outlined: {
        borderWidth: 1,
        borderColor: COLORS.BORDER,
    },
});
