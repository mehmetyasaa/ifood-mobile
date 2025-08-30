/**
 * Input Bileşeni
 * 
 * NEDEN YAPILDI?
 * - Tutarlı form input'ları sağlamak
 * - Validation ve error handling
 * - Password visibility toggle
 * - Icon desteği (left/right)
 * - Focus/blur state yönetimi
 * - Accessibility desteği
 * 
 * NASIL ÇALIŞIR?
 * - TextInput'u saran wrapper component
 * - State ile focus ve error durumlarını yönetir
 * - Password için visibility toggle
 * - Icon'lar için TouchableOpacity kullanır
 * 
 * KULLANIM ALANLARI:
 * - Login/Register formları
 * - Profil düzenleme
 * - Arama input'ları
 * - Herhangi bir form girişi
 * 
 * ÖRNEK KULLANIM:
 * <Input
 *   label="Email"
 *   placeholder="email@example.com"
 *   leftIcon="mail"
 *   error={emailError}
 *   isPassword={false}
 * />
 */

import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    leftIcon?: keyof typeof Ionicons.glyphMap;
    rightIcon?: keyof typeof Ionicons.glyphMap;
    onRightIconPress?: () => void;
    isPassword?: boolean;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    leftIcon,
    rightIcon,
    onRightIconPress,
    isPassword = false,
    style,
    ...props
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const getSecureTextEntry = () => {
        if (!isPassword) return false;
        return !isPasswordVisible;
    };

    const getRightIcon = () => {
        if (isPassword) {
            return isPasswordVisible ? 'eye-off' : 'eye';
        }
        return rightIcon;
    };

    const handleRightIconPress = () => {
        if (isPassword) {
            togglePasswordVisibility();
        } else if (onRightIconPress) {
            onRightIconPress();
        }
    };

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={[
                styles.inputContainer,
                isFocused && styles.inputContainerFocused,
                error && styles.inputContainerError,
                style,
            ]}>
                {leftIcon && (
                    <Ionicons
                        name={leftIcon}
                        size={20}
                        color={COLORS.TEXT_SECONDARY}
                        style={styles.leftIcon}
                    />
                )}

                <TextInput
                    style={styles.input}
                    secureTextEntry={getSecureTextEntry()}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholderTextColor={COLORS.TEXT_SECONDARY}
                    {...props}
                />

                {getRightIcon() && (
                    <TouchableOpacity onPress={handleRightIconPress} style={styles.rightIcon}>
                        <Ionicons
                            name={getRightIcon() as keyof typeof Ionicons.glyphMap}
                            size={20}
                            color={COLORS.TEXT_SECONDARY}
                        />
                    </TouchableOpacity>
                )}
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.MD,
    },
    label: {
        fontSize: TYPOGRAPHY.FONT_SIZE.SM,
        fontWeight: TYPOGRAPHY.FONT_WEIGHT.MEDIUM,
        color: COLORS.TEXT_PRIMARY,
        marginBottom: SPACING.XS,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.BORDER,
        borderRadius: SPACING.RADIUS.MD,
        backgroundColor: COLORS.WHITE,
        paddingHorizontal: SPACING.MD,
        minHeight: 48,
    },
    inputContainerFocused: {
        borderColor: COLORS.PRIMARY,
    },
    inputContainerError: {
        borderColor: COLORS.ERROR,
    },
    input: {
        flex: 1,
        fontSize: TYPOGRAPHY.FONT_SIZE.BASE,
        color: COLORS.TEXT_PRIMARY,
        paddingVertical: SPACING.SM,
    },
    leftIcon: {
        marginRight: SPACING.SM,
    },
    rightIcon: {
        marginLeft: SPACING.SM,
        padding: SPACING.XS,
    },
    errorText: {
        fontSize: TYPOGRAPHY.FONT_SIZE.SM,
        color: COLORS.ERROR,
        marginTop: SPACING.XS,
    },
});
