/**
 * ifood Uygulaması Button Bileşeni
 * Yeniden kullanılabilir, özelleştirilebilir buton bileşeni
 */

import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
    TouchableOpacityProps,
} from 'react-native';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';

// Button Variant Tipleri
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

// Button Props Interface'i
interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

// Button Bileşeni
export const Button: React.FC<ButtonProps> = ({
    title,
    variant = 'primary',
    size = 'medium',
    loading = false,
    disabled = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    style,
    textStyle,
    ...props
}) => {
    // Button stilini belirle
    const buttonStyle = [
        styles.base,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
    ];

    // Text stilini belirle
    const buttonTextStyle = [
        styles.text,
        styles[`${variant}Text`],
        styles[`${size}Text`],
        disabled && styles.disabledText,
        textStyle,
    ];

    return (
        <TouchableOpacity
            style={buttonStyle}
            disabled={disabled || loading}
            activeOpacity={0.8}
            {...props}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === 'primary' ? COLORS.WHITE : COLORS.PRIMARY}
                    size="small"
                />
            ) : (
                <>
                    {leftIcon && <>{leftIcon}</>}
                    <Text style={buttonTextStyle}>{title}</Text>
                    {rightIcon && <>{rightIcon}</>}
                </>
            )}
        </TouchableOpacity>
    );
};

// Stiller
const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SPACING.RADIUS.MD,
        borderWidth: 1,
        borderColor: 'transparent',
    },

    // Variant Stilleri
    primary: {
        backgroundColor: COLORS.PRIMARY,
        borderColor: COLORS.PRIMARY,
    },
    secondary: {
        backgroundColor: COLORS.GRAY_100,
        borderColor: COLORS.GRAY_200,
    },
    outline: {
        backgroundColor: 'transparent',
        borderColor: COLORS.PRIMARY,
    },
    ghost: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
    },
    danger: {
        backgroundColor: COLORS.ERROR,
        borderColor: COLORS.ERROR,
    },

    // Size Stilleri
    small: {
        paddingHorizontal: SPACING.SM,
        paddingVertical: SPACING.XS,
        minHeight: 32,
    },
    medium: {
        paddingHorizontal: SPACING.MD,
        paddingVertical: SPACING.SM,
        minHeight: 44,
    },
    large: {
        paddingHorizontal: SPACING.LG,
        paddingVertical: SPACING.MD,
        minHeight: 56,
    },

    // Text Stilleri
    text: {
        fontWeight: TYPOGRAPHY.FONT_WEIGHT.MEDIUM,
        textAlign: 'center',
    },
    primaryText: {
        color: COLORS.WHITE,
    },
    secondaryText: {
        color: COLORS.TEXT_PRIMARY,
    },
    outlineText: {
        color: COLORS.PRIMARY,
    },
    ghostText: {
        color: COLORS.PRIMARY,
    },
    dangerText: {
        color: COLORS.WHITE,
    },

    // Size Text Stilleri
    smallText: {
        fontSize: TYPOGRAPHY.FONT_SIZE.SM,
    },
    mediumText: {
        fontSize: TYPOGRAPHY.FONT_SIZE.BASE,
    },
    largeText: {
        fontSize: TYPOGRAPHY.FONT_SIZE.LG,
    },

    // Utility Stilleri
    fullWidth: {
        width: '100%',
    },
    disabled: {
        opacity: 0.6,
    },
    disabledText: {
        opacity: 0.6,
    },
});
