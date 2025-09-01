/**
 * ifood Uygulaması Phone Auth Screen
 * Telefon numarası girme ekranı
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';
import { Button } from '../../components/ui/Button';

// Phone Auth Screen Bileşeni
export const PhoneAuthScreen: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleBack = () => {
        router.back();
    };

    const formatPhoneNumber = (text: string) => {
        // Sadece rakamları al
        const numbers = text.replace(/[^0-9]/g, '');

        // +90 ile başlayacak şekilde formatla
        if (numbers.length <= 3) {
            return numbers;
        } else if (numbers.length <= 6) {
            return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)}`;
        } else if (numbers.length <= 8) {
            return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 8)}`;
        } else {
            return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 8)} ${numbers.slice(8, 10)}`;
        }
    };

    const handlePhoneChange = (text: string) => {
        const formatted = formatPhoneNumber(text);
        setPhoneNumber(formatted);
    };

    const handleSendSMS = async () => {
        if (phoneNumber.replace(/\s/g, '').length < 10) {
            Alert.alert('Hata', 'Lütfen geçerli bir telefon numarası girin.');
            return;
        }

        setIsLoading(true);

        // Simüle edilmiş SMS gönderme
        setTimeout(() => {
            setIsLoading(false);
            // SMS doğrulama sayfasına git
            router.push({
                pathname: '/(auth)/verification',
                params: { phoneNumber: `+90${phoneNumber.replace(/\s/g, '')}` }
            });
        }, 1500);
    };

    const handleWhatsAppSend = () => {
        Alert.alert('WhatsApp', 'WhatsApp ile kod gönderimi şu an mevcut değil.');
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.WHITE} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.TEXT_PRIMARY} />
                </TouchableOpacity>
            </View>

            {/* Content */}
            <View style={styles.content}>
                <Text style={styles.title}>Cep telefonu numaranız nedir?</Text>

                {/* Phone Input Container */}
                <View style={styles.phoneContainer}>
                    <View style={styles.countryCode}>
                        <Text style={styles.flagEmoji}>🇹🇷</Text>
                        <Text style={styles.countryCodeText}>+90</Text>
                    </View>

                    <TextInput
                        style={styles.phoneInput}
                        value={phoneNumber}
                        onChangeText={handlePhoneChange}
                        placeholder="5xx xxx xx xx"
                        placeholderTextColor={COLORS.TEXT_SECONDARY}
                        keyboardType="numeric"
                        maxLength={13} // Format için boşluklar dahil
                        autoFocus
                    />
                </View>

                <Text style={styles.subtitle}>Kodu nasıl almak istiyorsunuz?</Text>

                {/* Action Buttons */}
                <View style={styles.actionButtonsContainer}>
                    <Button
                        title="SMS ile al"
                        variant="primary"
                        size="large"
                        fullWidth
                        loading={isLoading}
                        onPress={handleSendSMS}
                        style={styles.actionButton}
                    />

                    <Button
                        title="WhatsApp ile al"
                        variant="outline"
                        size="large"
                        fullWidth
                        onPress={handleWhatsAppSend}
                        style={styles.actionButton}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? SPACING['2XL'] : SPACING.LG,
        paddingHorizontal: SPACING.SCREEN_PADDING,
        paddingBottom: SPACING.MD,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        paddingHorizontal: SPACING.SCREEN_PADDING,
        paddingTop: SPACING.XL,
    },
    title: {
        fontSize: TYPOGRAPHY.FONT_SIZE['2XL'],
        fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
        color: COLORS.TEXT_PRIMARY,
        marginBottom: SPACING['2XL'],
        lineHeight: TYPOGRAPHY.LINE_HEIGHT.TIGHT * TYPOGRAPHY.FONT_SIZE['2XL'],
    },
    phoneContainer: {
        flexDirection: 'row',
        marginBottom: SPACING['2XL'],
        borderBottomWidth: 2,
        borderBottomColor: COLORS.GRAY_300,
        paddingBottom: SPACING.SM,
    },
    countryCode: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: SPACING.MD,
        paddingRight: SPACING.MD,
        borderRightWidth: 1,
        borderRightColor: COLORS.GRAY_300,
    },
    flagEmoji: {
        fontSize: TYPOGRAPHY.FONT_SIZE.LG,
        marginRight: SPACING.XS,
    },
    countryCodeText: {
        fontSize: TYPOGRAPHY.FONT_SIZE.LG,
        fontWeight: TYPOGRAPHY.FONT_WEIGHT.MEDIUM,
        color: COLORS.TEXT_PRIMARY,
    },
    phoneInput: {
        flex: 1,
        fontSize: TYPOGRAPHY.FONT_SIZE.LG,
        color: COLORS.TEXT_PRIMARY,
        fontWeight: TYPOGRAPHY.FONT_WEIGHT.MEDIUM,
        padding: 0, // TextInput'un default padding'ini kaldır
    },
    subtitle: {
        fontSize: TYPOGRAPHY.FONT_SIZE.LG,
        fontWeight: TYPOGRAPHY.FONT_WEIGHT.MEDIUM,
        color: COLORS.TEXT_PRIMARY,
        marginBottom: SPACING.XL,
    },
    actionButtonsContainer: {
        gap: SPACING.MD,
    },
    actionButton: {
        marginBottom: SPACING.SM,
    },
});

// Default export
export default PhoneAuthScreen;