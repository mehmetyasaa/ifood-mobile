/**
 * ifood Uygulaması Kişisel Bilgiler Ekranı
 * Kayıt olma akışının son adımı - kişisel bilgiler girişi
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Linking,
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

// Kişisel Bilgiler Ekranı Bileşeni
export const RegisterPersonalInfoScreen: React.FC = () => {
    const { email, phone } = useLocalSearchParams<{ email: string; phone: string }>();
    const [fullName, setFullName] = useState('');
    const [cpf, setCpf] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const [cpfError, setCpfError] = useState('');
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const insets = useSafeAreaInsets(); // Safe area bilgilerini al

    // Ad soyad validation
    const validateFullName = (name: string) => {
        const trimmedName = name.trim();
        if (trimmedName.length < 3) {
            return 'Ad soyad en az 3 karakter olmalı';
        }
        if (trimmedName.split(' ').length < 2) {
            return 'Ad ve soyad giriniz';
        }
        return '';
    };

    // CPF validation (basit kontrol)
    const validateCPF = (cpf: string) => {
        const digitsOnly = cpf.replace(/\D/g, '');
        if (digitsOnly.length !== 11) {
            return 'TCKN 11 haneli olmalı';
        }
        return '';
    };

    // Ad soyad değişikliğini handle et
    const handleFullNameChange = (text: string) => {
        setFullName(text);
        setFullNameError('');
    };

    // CPF değişikliğini handle et
    const handleCPFChange = (text: string) => {
        setCpf(text);
        setCpfError('');
    };

    // Devam et butonuna basıldığında
    const handleContinue = () => {
        // Validation kontrolleri
        const fullNameValidation = validateFullName(fullName);
        const cpfValidation = validateCPF(cpf);

        if (fullNameValidation) {
            setFullNameError(fullNameValidation);
            return;
        }

        if (cpfValidation) {
            setCpfError(cpfValidation);
            return;
        }

        if (!isTermsAccepted) {
            // Kullanıcıya şartları kabul etmesi gerektiğini bildir
            return;
        }

        // Burada normalde API'ye kayıt bilgileri gönderilir
        console.log('Kayıt tamamlandı:', { email, phone, fullName, cpf });

        // Ana sayfaya yönlendir
        router.push('/(tabs)');
    };

    // Geri git butonuna basıldığında
    const handleBack = () => {
        router.back();
    };

    // Şartları kabul et
    const handleTermsToggle = () => {
        setIsTermsAccepted(!isTermsAccepted);
    };

    // Kullanım şartlarını aç
    const handleTermsOfService = () => {
        // Kullanım şartları sayfasını aç
        Linking.openURL('https://www.ifood.com.br/termos-de-uso');
    };

    // Gizlilik politikasını aç
    const handlePrivacyPolicy = () => {
        // Gizlilik politikası sayfasını aç
        Linking.openURL('https://www.ifood.com.br/politica-de-privacidade');
    };

    // Tüm alanlar dolu mu ve şartlar kabul edildi mi kontrol et
    const isFormComplete = fullName.trim() && cpf.trim() && isTermsAccepted;

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
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Hesap bilgilerinizi tamamlayın</Text>
                <Text style={styles.subtitle}>
                    Mağazada kimlik doğrulaması ve hesap güvenliği için verilerinizi kaydedin
                </Text>

                {/* Ad Soyad Input */}
                <Input
                    label="Adınız nedir?"
                    placeholder="Ad ve soyad"
                    value={fullName}
                    onChangeText={handleFullNameChange}
                    error={fullNameError}
                    leftIcon="person"
                    autoCapitalize="words"
                />

                {/* CPF Input */}
                <Input
                    label="Kimlik numaranız nedir?"
                    placeholder="Kimlik numarası"
                    value={cpf}
                    onChangeText={handleCPFChange}
                    error={cpfError}
                    leftIcon="person"
                    keyboardType="numeric"
                    maxLength={11} // XXX.XXX.XXX-XX formatı için
                />

                {/* Şartlar ve Koşullar */}
                <View style={styles.termsContainer}>
                    <TouchableOpacity
                        onPress={handleTermsToggle}
                        style={styles.checkboxContainer}
                    >
                        <View style={[
                            styles.checkbox,
                            isTermsAccepted && styles.checkboxChecked
                        ]}>
                            {isTermsAccepted && (
                                <Ionicons name="checkmark" size={16} color={COLORS.WHITE} />
                            )}
                        </View>
                        <Text style={styles.termsText}>
                            Devam ederek{' '}
                            <Text style={styles.linkText} onPress={handleTermsOfService}>
                                Kullanım Şartları
                            </Text>
                            {' '}ve{' '}
                            <Text style={styles.linkText} onPress={handlePrivacyPolicy}>
                                Gizlilik Politikası
                            </Text>
                            {' '}nı kabul ediyorum.
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Devam Et Butonu - Ekranın en altında */}
            <View style={styles.buttonContainer}>
                <Button
                    title="Devam Et"
                    variant="primary"
                    size="large"
                    fullWidth
                    onPress={handleContinue}
                    disabled={!isFormComplete}
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
    termsContainer: {
        marginTop: SPACING.LG,
        marginBottom: SPACING.XL,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: SPACING.RADIUS.SM,
        borderWidth: 2,
        borderColor: COLORS.BORDER,
        backgroundColor: COLORS.WHITE,
        marginRight: SPACING.SM,
        marginTop: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: COLORS.PRIMARY,
        borderColor: COLORS.PRIMARY,
    },
    termsText: {
        fontSize: TYPOGRAPHY.FONT_SIZE.SM,
        color: COLORS.TEXT_MUTED,
        lineHeight: 18,
        flex: 1,
    },
    linkText: {
        color: COLORS.PRIMARY,
        textDecorationLine: 'underline',
    },
    buttonContainer: {
        paddingHorizontal: SPACING.SCREEN_PADDING,
        paddingBottom: SPACING.XL,
        paddingTop: SPACING.MD,
    },
}); 
