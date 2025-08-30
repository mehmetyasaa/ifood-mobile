/**
 * Error Boundary Bileşeni
 * 
 * NEDEN YAPILDI?
 * - Uygulama çökmesini önlemek için
 * - Kullanıcıya anlaşılır hata mesajları göstermek
 * - Hataları loglamak ve analiz etmek
 * - Production'da kullanıcı deneyimini iyileştirmek
 * 
 * NASIL ÇALIŞIR?
 * - React'in componentDidCatch lifecycle metodunu kullanır
 * - Hata oluştuğunda fallback UI gösterir
 * - Hata bilgilerini analytics servisine gönderir
 * 
 * KULLANIM ALANLARI:
 * - Root layout'ta tüm uygulamayı sarmalar
 * - Kritik component'lerde kullanılır
 * - API çağrılarında hata yakalama
 * 
 * ÖRNEK KULLANIM:
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Hata loglama servisi entegrasyonu
        console.error('ErrorBoundary caught an error:', error, errorInfo);

        // TODO: Sentry, Crashlytics gibi servislere gönder
        // logErrorToService(error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: undefined });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <View style={styles.container}>
                    <Ionicons name="alert-circle" size={64} color={COLORS.ERROR} />
                    <Text style={styles.title}>Bir Hata Oluştu</Text>
                    <Text style={styles.message}>
                        Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.
                    </Text>
                    <TouchableOpacity style={styles.retryButton} onPress={this.handleRetry}>
                        <Text style={styles.retryText}>Tekrar Dene</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return this.props.children;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.LG,
        backgroundColor: COLORS.BACKGROUND,
    },
    title: {
        fontSize: TYPOGRAPHY.FONT_SIZE.XL,
        fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
        color: COLORS.TEXT_PRIMARY,
        marginTop: SPACING.MD,
        marginBottom: SPACING.SM,
    },
    message: {
        fontSize: TYPOGRAPHY.FONT_SIZE.BASE,
        color: COLORS.TEXT_SECONDARY,
        textAlign: 'center',
        marginBottom: SPACING.LG,
        lineHeight: 24,
    },
    retryButton: {
        backgroundColor: COLORS.PRIMARY,
        paddingHorizontal: SPACING.LG,
        paddingVertical: SPACING.MD,
        borderRadius: SPACING.RADIUS.MD,
    },
    retryText: {
        color: COLORS.WHITE,
        fontSize: TYPOGRAPHY.FONT_SIZE.BASE,
        fontWeight: TYPOGRAPHY.FONT_WEIGHT.MEDIUM,
    },
});
