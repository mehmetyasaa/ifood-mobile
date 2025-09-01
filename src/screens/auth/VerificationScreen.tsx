/**
 * ifood Uygulaması Verification Screen
 * SMS kodu doğrulama ekranı
 */

import React, { useState, useRef, useEffect } from 'react';
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
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';
import { useAppStore } from '../../store/useAppStore';

// Verification Screen Bileşeni
export const VerificationScreen: React.FC = () => {
    const params = useLocalSearchParams();
    const phoneNumber = params.phoneNumber as string;

    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const [canResend, setCanResend] = useState(false);

    const inputRefs = useRef<(TextInput | null)[]>([]);
    const { setOnboardingCompleted } = useAppStore();

    // Geri sayım timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    setCanResend(true);
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleBack = () => {
        router.back();
    };

    const handleCodeChange = (value: string, index: number) => {
        // Sadece rakam kabul et
        if (!/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Otomatik olarak bir sonraki input'a geç
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Kod tamamlandığında otomatik doğrula
        if (newCode.every(digit => digit !== '') && newCode.join('').length === 6) {
            handleVerifyCode(newCode.join(''));
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        // Backspace tuşu ile önceki input'a geç
        if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerifyCode = async (verificationCode?: string) => {
        const codeToVerify = verificationCode || code.join('');

        if (codeToVerify.length !== 6) {
            Alert.alert('Hata', 'Lütfen 6 haneli kodu tam olarak girin.');
            return;
        }

        setIsLoading(true);

        // Simüle edilmiş kod doğrulama
        setTimeout(() => {
            setIsLoading(false);

            // Mock doğrulama - gerçek uygulamada API'ye istek gönderilir
            if (codeToVerify === '123456' || codeToVerify === '000000') {
                // Doğrulama başarılı
                setOnboardingCompleted(true);
                router.replace('/(tabs)');
            } else {
                Alert.alert('Hata', 'Girdiğiniz kod geçersiz. Lütfen tekrar deneyin.');
                setCode(['', '', '', '', '', '']);
                inputRefs.current[0]?.focus();
            }
        }, 1500);
    };

    const handleResendCode = () => {
        if (!canResend) return;

        Alert.alert('Kod Gönderildi', 'Yeni doğrulama kodu gönderildi.');
        setTimeLeft(60);
        setCanResend(false);
        setCode(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
                <Text style={styles.title}>
                    Size SMS ile gönderdiğimiz{'\n'}6 haneli kodu girin
                </Text>

                <Text style={styles.phoneNumber}>{phoneNumber}</Text>

                {/* Code Input */}
                <View style={styles.codeContainer}>
                    {code.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => inputRefs.current[index] = ref}
                            style={[
                                styles.codeInput,
                                digit ? styles.codeInputFilled : null
                            ]}
                            value={digit}
                            onChangeText={(value) => handleCodeChange(value, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            keyboardType="numeric"
                            maxLength={1}
                            selectTextOnFocus
                        />
                    ))}
                </View>

                <Text style={styles.securityNote}>
                    Güvenliğiniz için bu kodu kimseyle paylaşmayın.
                </Text>

                {/* Resend Code */}
                <View style={styles.resendContainer}>
                    {canResend ? (
                        <TouchableOpacity onPress={handleResendCode}>
                            <Text style={styles.resendText}>Kodu tekrar gönder</Text>
                        </TouchableOpacity>
                    ) : (
                        <Text style={styles.timerText}>
                            Kodu tekrar gönder {formatTime(timeLeft)}
                        </Text>
                    )}
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
        paddingTop: SPACING.LG,
    },
    title: {
        fontSize: TYPOGRAPHY.FONT_SIZE.XL,
        fontWeight: TYPOGRAPHY.FONT_WEIGHT.MEDIUM,
        color: COLORS.TEXT_PRIMARY,
        textAlign: 'center',
        marginBottom: SPACING.SM,
        lineHeight: TYPOGRAPHY.LINE_HEIGHT.RELAXED * TYPOGRAPHY.FONT_SIZE.XL,
    },
    phoneNumber: {
        fontSize: TYPOGRAPHY.FONT_SIZE.LG,
        fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
        color: COLORS.PRIMARY,
        textAlign: 'center',
        marginBottom: SPACING['2XL'],
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: SPACING.SM,
        marginBottom: SPACING.LG,
    },
    codeInput: {
        width: 45,
        height: 55,
        borderWidth: 2,
        borderColor: COLORS.GRAY_300,
        borderRadius: SPACING.RADIUS.SM,
        textAlign: 'center',
        fontSize: TYPOGRAPHY.FONT_SIZE.XL,
        fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
        color: COLORS.TEXT_PRIMARY,
    },
    codeInputFilled: {
        borderColor: COLORS.PRIMARY,
        backgroundColor: COLORS.GRAY_50,
    },
    securityNote: {
        fontSize: TYPOGRAPHY.FONT_SIZE.SM,
        color: COLORS.TEXT_SECONDARY,
        textAlign: 'center',
        marginBottom: SPACING.XL,
    },
    resendContainer: {
        alignItems: 'center',
        marginBottom: SPACING.XL,
    },
    resendText: {
        fontSize: TYPOGRAPHY.FONT_SIZE.MD,
        color: COLORS.PRIMARY,
        fontWeight: TYPOGRAPHY.FONT_WEIGHT.MEDIUM,
    },
    timerText: {
        fontSize: TYPOGRAPHY.FONT_SIZE.SM,
        color: COLORS.TEXT_SECONDARY,
    },
});

// Default export
export default VerificationScreen;