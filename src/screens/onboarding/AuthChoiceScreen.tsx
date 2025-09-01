/**
 * ifood Uygulaması Auth Choice Screen
 * Giriş/Kayıt seçenekleri ekranı
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    StatusBar,
    Dimensions,
    Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';
import { Button } from '../../components/ui/Button';
import { LoginMethodModal } from '../auth/LoginMethodScreen';

const { height } = Dimensions.get('window');

// Auth Choice Screen Bileşeni
export const AuthChoiceScreen: React.FC = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const handleLogin = () => {
        // Modal'i aç
        setShowLoginModal(true);
    };

    const handleRegister = () => {
        // Kayıt sayfasına yönlendir
        console.log('Kayıt ol');
        router.push('/(onboarding)/register-email');

    };

    const handleCloseModal = () => {
        setShowLoginModal(false);
    };

    const handlePhoneLogin = () => {
        setShowLoginModal(false);
        router.push('/(auth)/phone');
    };

    const handleEmailLogin = () => {
        setShowLoginModal(false);
        console.log('Email ile giriş yapılacak');
        // Gelecekte email giriş sayfası oluşturulabilir

    };

    const handleAppleLogin = () => {
        console.log('Apple ile giriş yap');
    };

    const handleFacebookLogin = () => {
        console.log('Facebook ile giriş yap');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <View style={styles.backgroundImage}>
                {/* Üst kısım - Boş bırakıldı, görselin görünmesi için */}
                <View style={styles.topSection} />

                {/* Alt kısım - Giriş/Kayıt seçenekleri */}
                <View style={styles.bottomSection}>
                    {/* BlurView yerine View ve yarı saydam arka plan */}
                    <View style={styles.overlay}>
                        <Text style={styles.title}>ifood'a Hoş Geldiniz!</Text>
                        <Text style={styles.subtitle}>En sevdiğiniz yemekler kapınızda.</Text>

                        <Button
                            title="Zaten hesabım var"
                            variant="primary"
                            size="large"
                            fullWidth
                            onPress={handleLogin}
                            style={styles.button}
                        />
                        <Button
                            title="Yeni hesap oluştur"
                            variant="outline"
                            size="large"
                            fullWidth
                            onPress={handleRegister}
                            style={styles.button}
                        />

                        <Text style={styles.accessWithText}>İle giriş yap</Text>

                        <View style={styles.socialButtonsContainer}>
                            <View style={styles.socialButton} onTouchEnd={handleAppleLogin}>
                                <Ionicons name="logo-apple" size={TYPOGRAPHY.FONT_SIZE['2XL']} color={COLORS.BLACK} />
                            </View>
                            <View style={styles.socialButton} onTouchEnd={handleFacebookLogin}>
                                <Ionicons name="logo-facebook" size={TYPOGRAPHY.FONT_SIZE['2XL']} color={COLORS.BLUE} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            {/* Login Method Modal */}
            <LoginMethodModal
                visible={showLoginModal}
                onClose={handleCloseModal}
                onPhoneLogin={handlePhoneLogin}
                onEmailLogin={handleEmailLogin}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND_DARK,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: COLORS.PRIMARY,
    },
    topSection: {
        flex: 0.6, // Görselin daha fazla görünmesi için
    },
    bottomSection: {
        flex: 0.4, // Alt kısım için ayrılan alan
        justifyContent: 'flex-end',
    },
    overlay: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)', // Yarı saydam beyaz arka plan
        borderTopLeftRadius: SPACING.RADIUS.XL,
        borderTopRightRadius: SPACING.RADIUS.XL,
        padding: SPACING.SCREEN_PADDING,
        paddingBottom: Platform.OS === 'ios' ? SPACING['3XL'] : SPACING.XL, // iOS için alt boşluk
        alignItems: 'center',
    },
    title: {
        fontSize: TYPOGRAPHY.FONT_SIZE['3XL'],
        fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
        color: COLORS.TEXT_DARK,
        marginBottom: SPACING.XS,
    },
    subtitle: {
        fontSize: TYPOGRAPHY.FONT_SIZE.LG,
        color: COLORS.TEXT_MUTED,
        marginBottom: SPACING.XL,
        textAlign: 'center',
    },
    button: {
        marginBottom: SPACING.SM,
    },
    accessWithText: {
        fontSize: TYPOGRAPHY.FONT_SIZE.SM,
        color: COLORS.TEXT_MUTED,
        marginTop: SPACING.MD,
        marginBottom: SPACING.SM,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: SPACING.MD,
    },
    socialButton: {
        width: 60,
        height: 60,
        borderRadius: SPACING.RADIUS.FULL,
        backgroundColor: COLORS.WHITE,
        ...SPACING.SHADOW.SM,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
