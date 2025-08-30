/**
 * Loading Spinner Bileşeni
 * 
 * NEDEN YAPILDI?
 * - Kullanıcıya yükleme durumunu göstermek
 * - Tutarlı loading UI sağlamak
 * - UX'i iyileştirmek (kullanıcı ne olduğunu bilsin)
 * - Farklı loading durumları için esneklik
 * 
 * NASIL ÇALIŞIR?
 * - ActivityIndicator kullanarak native loading animasyonu
 * - Props ile özelleştirilebilir (size, color, text)
 * - Fullscreen veya inline kullanım seçenekleri
 * 
 * KULLANIM ALANLARI:
 * - API çağrıları sırasında
 * - Sayfa yüklenirken
 * - Form submit edilirken
 * - Dosya upload edilirken
 * 
 * ÖRNEK KULLANIM:
 * <LoadingSpinner 
 *   size="large" 
 *   text="Yükleniyor..." 
 *   fullScreen={true} 
 * />
 */

import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';

interface LoadingSpinnerProps {
    size?: 'small' | 'large';
    color?: string;
    text?: string;
    fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'large',
    color = COLORS.PRIMARY,
    text,
    fullScreen = false,
}) => {
    const containerStyle = fullScreen ? styles.fullScreenContainer : styles.container;

    return (
        <View style={containerStyle}>
            <ActivityIndicator size={size} color={color} />
            {text && <Text style={styles.text}>{text}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: SPACING.LG,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fullScreenContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.BACKGROUND,
    },
    text: {
        marginTop: SPACING.MD,
        fontSize: TYPOGRAPHY.FONT_SIZE.BASE,
        color: COLORS.TEXT_SECONDARY,
        textAlign: 'center',
    },
});
