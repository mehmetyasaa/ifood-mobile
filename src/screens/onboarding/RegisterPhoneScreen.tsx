/**
 * ifood Uygulaması Telefon Numarası Giriş Ekranı
 * Kayıt olma akışının üçüncü adımı - telefon numarası girişi
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';
import { Input } from '../../components/forms/Input';
import { Button } from '../../components/ui/Button';

// Telefon Numarası Giriş Ekranı Bileşeni
export const RegisterPhoneScreen: React.FC = () => {
    const { email } = useLocalSearchParams<{ email: string }>();
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const insets = useSafeAreaInsets(); // Safe area bilgilerini al

    // Telefon numarası validation fonksiyonu
    const validatePhone = (phone: string) => {
        // Sadece rakamları al
        const digitsOnly = phone.replace(/\D/g, '');
        // En az 10, en fazla 11 rakam olmalı (Türkiye için)
        return digitsOnly.length >= 10 && digitsOnly.length <= 11;
    };

    // Telefon numarası değişikliğini handle et
    const handlePhoneChange = (text: string) => {
        setPhone(text);
        setPhoneError(''); // Hata mesajını temizle
    };

    // Devam et butonuna basıldığında
    const handleContinue = () => {
        if (!phone.trim()) {
            setPhoneError('Telefon numarası gerekli');
            return;
        }

        if (!validatePhone(phone)) {
            setPhoneError('Geçerli bir telefon numarası girin');
            return;
        }

        // SMS doğrulama ekranına git
        router.push({
            pathname: '/(onboarding)/register-sms-verification',
            params: { 
                email,
                phone: phone.trim()
            }
        });
    };

    // Geri git butonuna basıldığında
    const handleBack = () => {
        router.back();
    };

    // Telefon numarası boş değilse ve geçerliyse buton aktif olsun
    const isButtonEnabled = phone.trim() && validatePhone(phone);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.WHITE} />
            
            {/* Header */}
            <View style={[styles.header, { marginTop: insets.top > 0 ? insets.top - 10 : 0 }]}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.PRIMARY} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>HESAP OLUŞTUR</Text>
                <View style={styles.placeholder} />
            </View>

            {/* Ana İçerik */}
            <View style={styles.content}>
                <Text style={styles.title}>Telefon numaranız nedir?</Text>
                <Text style={styles.subtitle}>
                    Bu telefon, hesabınıza erişim ve doğrulama için ana araç olarak kullanılacak
                </Text>

                <Input
                    label="Telefon"
                    placeholder="Telefon"
                    value={phone}
                    onChangeText={handlePhoneChange}
                    error={phoneError}
                    keyboardType="phone-pad"
                    leftIcon="call"
                    maxLength={14} // (5XX) XXX-XXXX formatı için
                />
            </View>

            {/* Buton - Ekranın en altında */}
            <View style={styles.buttonContainer}>
                <Button
                    title="Devam Et"
                    variant="primary"
                    size="large"
                    fullWidth
                    onPress={handleContinue}
                    disabled={!isButtonEnabled}
                />
            </View>
        </SafeAreaView>
    );
};

// Stiller
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.SCREEN_PADDING,
        paddingVertical: SPACING.MD,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.BORDER_LIGHT,
        backgroundColor: COLORS.WHITE,
    },
    backButton: {
        padding: SPACING.XS,
    },
    headerTitle: {
        fontSize: TYPOGRAPHY.FONT_SIZE.LG,
        fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
        color: COLORS.TEXT_DARK,
    },
    placeholder: {
        width: 40,
    },
    content: {
        flex: 1,
        padding: SPACING.SCREEN_PADDING,
        paddingTop: SPACING.XL,
    },
    title: {
        fontSize: TYPOGRAPHY.FONT_SIZE['2XL'],
        fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
        color: COLORS.TEXT_DARK,
        marginBottom: SPACING.SM,
        textAlign: 'left', // Sola yaslı
    },
    subtitle: {
        fontSize: TYPOGRAPHY.FONT_SIZE.BASE,
        color: COLORS.TEXT_MUTED,
        marginBottom: SPACING.XL,
        textAlign: 'left', // Sola yaslı
        lineHeight: 22,
    },
    buttonContainer: {
        paddingHorizontal: SPACING.SCREEN_PADDING,
        paddingBottom: SPACING.XL,
        paddingTop: SPACING.MD,
    },
}); 
