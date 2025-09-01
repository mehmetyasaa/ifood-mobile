/**
 * ifood Uygulaması Email Doğrulama Kodu Ekranı
 * Kayıt olma akışının ikinci adımı - email doğrulama kodu girişi
 */

import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    TextInput,
    Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';
import { Button } from '../../components/ui/Button';

// Email Doğrulama Kodu Ekranı Bileşeni
export const RegisterEmailVerificationScreen: React.FC = () => {
    const { email } = useLocalSearchParams<{ email: string }>();
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [resendCountdown, setResendCountdown] = useState(60);
    const insets = useSafeAreaInsets(); // Safe area bilgilerini al
    
    // Input referansları
    const inputRefs = useRef<TextInput[]>([]);

    // Geri sayım timer'ı
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (resendCountdown > 0 && isResendDisabled) {
            timer = setTimeout(() => {
                setResendCountdown(resendCountdown - 1);
            }, 1000);
        } else if (resendCountdown === 0) {
            setIsResendDisabled(false);
            setResendCountdown(60);
        }
        return () => clearTimeout(timer);
    }, [resendCountdown, isResendDisabled]);

    // Kod girişi değişikliğini handle et
    const handleCodeChange = (text: string, index: number) => {
        const newCode = [...verificationCode];
        newCode[index] = text;
        setVerificationCode(newCode);
        setError(''); // Hata mesajını temizle

        // Otomatik olarak sonraki input'a geç
        if (text && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Backspace ile önceki input'a geç
    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !verificationCode[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Devam et butonuna basıldığında
    const handleContinue = () => {
        const code = verificationCode.join('');
        
        if (code.length !== 6) {
            setError('6 haneli kodu tam olarak girin');
            return;
        }

        // Burada normalde API'ye doğrulama kodu gönderilir
        // Şimdilik basit bir kontrol yapıyoruz
        if (code === '123456') {
            // Telefon numarası ekranına git
            router.push({
                pathname: '/(onboarding)/register-phone',
                params: { email }
            });
        } else {
            setError('Girilen kodun doğru olduğunu kontrol edin');
        }
    };

    // Kodu yeniden gönder
    const handleResendCode = () => {
        setIsResendDisabled(true);
        setResendCountdown(60);
        setError('');
        // Burada normalde API'ye yeniden kod gönderme isteği yapılır
        console.log('Kod yeniden gönderildi');
    };

    // Geri git butonuna basıldığında
    const handleBack = () => {
        router.back();
    };

    // Kod tam olarak girildi mi kontrol et
    const isCodeComplete = verificationCode.every(digit => digit !== '');

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
                <Text style={styles.title}>Email'inize gönderilen kodu girin</Text>
                <Text style={styles.subtitle}>
                    {email} adresine 6 haneli kod gönderdik
                </Text>

                {/* Doğrulama Kodu Input'ları - Kare şeklinde */}
                <View style={styles.codeContainer}>
                    {verificationCode.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => {
                                if (ref) inputRefs.current[index] = ref;
                            }}
                            style={styles.codeInput}
                            value={digit}
                            onChangeText={(text) => handleCodeChange(text, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            keyboardType="numeric"
                            maxLength={1}
                            textAlign="center"
                            autoFocus={index === 0}
                        />
                    ))}
                </View>

                {/* Hata Mesajı */}
                {error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : null}

                {/* Kodu Yeniden Gönder - Kırmızı link */}
                <TouchableOpacity
                    onPress={handleResendCode}
                    disabled={isResendDisabled}
                    style={styles.resendContainer}
                >
                    <Text style={[
                        styles.resendText,
                        isResendDisabled && styles.resendTextDisabled
                    ]}>
                        {isResendDisabled 
                            ? `Kodu yeniden göndermek için ${resendCountdown} saniye bekleyin`
                            : 'Kodu yeniden gönder'
                        }
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Devam Et Butonu - Ekranın en altında, kırmızı */}
            <View style={styles.buttonContainer}>
                <Button
                    title="Devam Et"
                    variant="primary"
                    size="large"
                    fullWidth
                    onPress={handleContinue}
                    disabled={!isCodeComplete}
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
        paddingBottom: SPACING['3XL'],
    },
    title: {
        fontSize: TYPOGRAPHY.FONT_SIZE['2XL'], // Görüntüdeki gibi büyük
        fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
        color: COLORS.TEXT_DARK,
        marginBottom: SPACING.SM,
        textAlign: 'left',
        lineHeight: 34,
    },
    subtitle: {
        fontSize: TYPOGRAPHY.FONT_SIZE.BASE, // Görüntüdeki gibi
        color: COLORS.TEXT_MUTED,
        marginBottom: SPACING.XL,
        textAlign: 'left',
        lineHeight: 22,
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.XL,
        paddingHorizontal: 0,
        gap: 8, // Görüntüdeki gibi belirgin boşluk
    },
    codeInput: {
        width: 45, // Görüntüdeki gibi
        height: 55,
        borderWidth: 1, // Daha ince kenarlık
        borderColor: COLORS.BORDER,
        borderRadius: 4, // Daha az yuvarlak
        fontSize: 24, // Görüntüdeki gibi
        fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
        color: COLORS.TEXT_DARK,
        backgroundColor: COLORS.WHITE,
        textAlign: 'center',
    },
    errorText: {
        fontSize: TYPOGRAPHY.FONT_SIZE.SM,
        color: COLORS.ERROR,
        textAlign: 'center',
        marginBottom: SPACING.LG,
        fontWeight: TYPOGRAPHY.FONT_WEIGHT.MEDIUM,
    },
    resendContainer: {
        alignItems: 'flex-start',
        marginBottom: SPACING.XL,
    },
    resendText: {
        fontSize: TYPOGRAPHY.FONT_SIZE.BASE, // Görüntüdeki gibi
        color: COLORS.PRIMARY,
        textDecorationLine: 'underline',
        fontWeight: TYPOGRAPHY.FONT_WEIGHT.MEDIUM,
    },
    resendTextDisabled: {
        color: COLORS.TEXT_DISABLED,
        textDecorationLine: 'none',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: SPACING.SCREEN_PADDING,
        paddingBottom: SPACING.XL,
        paddingTop: SPACING.MD,
        backgroundColor: COLORS.WHITE,
        borderTopWidth: 1,
        borderTopColor: COLORS.BORDER_LIGHT,
    },
}); 







