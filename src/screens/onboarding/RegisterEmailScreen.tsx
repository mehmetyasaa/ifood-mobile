/**
 * ifood Uygulaması Email Giriş Ekranı
 * Kayıt olma akışının ilk adımı - email girişi
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
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';
import { Input } from '../../components/forms/Input';
import { Button } from '../../components/ui/Button';
import { validateEmailWithMessage } from '../../utils/validation/emailValidation';

// Email Giriş Ekranı Bileşeni
export const RegisterEmailScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const insets = useSafeAreaInsets(); // Safe area bilgilerini al

    // Email değişikliğini handle et
    const handleEmailChange = (text: string) => {
        setEmail(text);
        setEmailError(''); // Hata mesajını temizle
    };

    // Devam et butonuna basıldığında
    const handleContinue = () => {
        // Mevcut validation fonksiyonunu kullan
        const emailValidation = validateEmailWithMessage(email);
        
        if (!emailValidation.isValid) {
            setEmailError(emailValidation.message || 'Email hatası');
            return;
        }

        // Email doğrulama ekranına git
        router.push({
            pathname: '/(onboarding)/register-email-verification',
            params: { email: email.trim() }
        });
    };

    // Geri git butonuna basıldığında
    const handleBack = () => {
        router.back();
    };

    // Email boş değilse ve geçerliyse buton aktif olsun
    const isButtonEnabled = email.trim() && validateEmailWithMessage(email).isValid;

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
                <Text style={styles.title}>Email adresiniz nedir?</Text>
                <Text style={styles.subtitle}>
                    Hesabınızı oluşturmak için geçerli bir email adresi kullanmanız önemli
                </Text>

                <Input
                    label="Email"
                    placeholder="Email"
                    value={email}
                    onChangeText={handleEmailChange}
                    error={emailError}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    leftIcon="mail"
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
        width: 40, // Geri butonu ile aynı genişlik
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