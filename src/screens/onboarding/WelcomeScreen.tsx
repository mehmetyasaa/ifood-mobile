/**
 * ifood Uygulaması Welcome Screen
 * Hoş geldin ekranı - konum izni ve restoran örnekleri
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    Dimensions,
    Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useAppStore } from '../../store/useAppStore';

const { width } = Dimensions.get('window');

// Welcome Screen Bileşeni
export const WelcomeScreen: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { setLocation, setOnboardingCompleted } = useAppStore();

    const requestLocationPermission = async () => {
        setIsLoading(true);

        try {
            // Konum izni iste
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status === 'granted') {
                // Konum al
                const location = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High,
                });

                console.log('Konum alındı:', location);

                // Store'a kaydet
                setLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    address: 'Konum alındı', // Geçici adres
                });

                // Onboarding'i tamamla
                setOnboardingCompleted(true);

                // Ana ekrana yönlendir
                router.replace('/(tabs)');
            } else {
                Alert.alert(
                    'Konum İzni Gerekli',
                    'Restoranları bulabilmek için konum iznine ihtiyacımız var.',
                    [
                        { text: 'İptal', style: 'cancel' },
                        { text: 'Ayarlar', onPress: () => Location.requestForegroundPermissionsAsync() }
                    ]
                );
            }
        } catch (error) {
            console.error('Konum alma hatası:', error);
            Alert.alert('Hata', 'Konum alınırken bir hata oluştu.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleContinue = () => {
        // Auth choice sayfasına yönlendir
        router.push('/(onboarding)/auth-choice');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.WHITE} />

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>HOŞ GELDİNİZ</Text>
                </View>

                {/* Placeholder Content */}
                <View style={styles.placeholderContainer}>
                    <View style={styles.placeholderItem}>
                        <View style={styles.placeholderCircle} />
                        <View style={styles.placeholderText}>
                            <View style={styles.placeholderLine} />
                            <View style={styles.placeholderLine} />
                        </View>
                    </View>

                    <View style={styles.placeholderItem}>
                        <View style={styles.placeholderCircle} />
                        <View style={styles.placeholderText}>
                            <View style={styles.placeholderLine} />
                            <View style={styles.placeholderLine} />
                        </View>
                    </View>
                </View>

                {/* Restaurant Card Example */}
                <Card style={styles.restaurantCard}>
                    <View style={styles.restaurantHeader}>
                        <View style={styles.restaurantIcon}>
                            <Ionicons name="restaurant" size={24} color={COLORS.PRIMARY} />
                        </View>
                        <View style={styles.restaurantInfo}>
                            <Text style={styles.restaurantName}>Burger Evi</Text>
                            <Text style={styles.restaurantDetails}>Hamburger • 30-40 dk</Text>
                        </View>
                        <View style={styles.ratingContainer}>
                            <Ionicons name="star" size={16} color={COLORS.SECONDARY} />
                            <Text style={styles.rating}>4,8</Text>
                        </View>
                    </View>

                    <View style={styles.promotionContainer}>
                        <Text style={styles.promotionText}>ÜCRETSİZ TESLİMAT</Text>
                    </View>
                </Card>

                {/* Location Permission Section */}
                <View style={styles.permissionSection}>
                    <View style={styles.permissionHeader}>
                        <Ionicons name="location" size={24} color={COLORS.PRIMARY} />
                        <Text style={styles.permissionTitle}>Konum iznine izin ver</Text>
                    </View>
                    <Text style={styles.permissionDescription}>
                        Bölgenizde teslimat yapan restoranları keşfetmek için
                    </Text>
                </View>
            </ScrollView>

            {/* Continue Button */}
            <View style={styles.buttonContainer}>
                <Button
                    title={isLoading ? "Konum alınıyor..." : "Devam Et"}
                    variant="primary"
                    size="large"
                    fullWidth
                    loading={isLoading}
                    onPress={handleContinue}
                />
            </View>
        </View>
    );
};

// Stiller
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: SPACING.SCREEN_PADDING,
        paddingTop: SPACING.XL,
        paddingBottom: SPACING.XL,
    },
    header: {
        alignItems: 'center',
        marginBottom: SPACING.XL,
    },
    title: {
        fontSize: TYPOGRAPHY.FONT_SIZE['3XL'],
        fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
        color: COLORS.TEXT_PRIMARY,
    },
    placeholderContainer: {
        marginBottom: SPACING.LG,
    },
    placeholderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.MD,
    },
    placeholderCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.GRAY_200,
        marginRight: SPACING.SM,
    },
    placeholderText: {
        flex: 1,
    },
    placeholderLine: {
        height: 12,
        backgroundColor: COLORS.GRAY_200,
        borderRadius: 6,
        marginBottom: SPACING.XS,
    },
    restaurantCard: {
        marginBottom: SPACING.XL,
    },
    restaurantHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.SM,
    },
    restaurantIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.GRAY_100,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SPACING.SM,
    },
    restaurantInfo: {
        flex: 1,
    },
    restaurantName: {
        fontSize: TYPOGRAPHY.FONT_SIZE.LG,
        fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
        color: COLORS.TEXT_PRIMARY,
        marginBottom: SPACING.XS,
    },
    restaurantDetails: {
        fontSize: TYPOGRAPHY.FONT_SIZE.SM,
        color: COLORS.TEXT_SECONDARY,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: TYPOGRAPHY.FONT_SIZE.SM,
        fontWeight: TYPOGRAPHY.FONT_WEIGHT.MEDIUM,
        color: COLORS.TEXT_PRIMARY,
        marginLeft: SPACING.XS,
    },
    promotionContainer: {
        backgroundColor: COLORS.SUCCESS,
        paddingHorizontal: SPACING.SM,
        paddingVertical: SPACING.XS,
        borderRadius: SPACING.RADIUS.SM,
        alignSelf: 'flex-start',
    },
    promotionText: {
        fontSize: TYPOGRAPHY.FONT_SIZE.XS,
        fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
        color: COLORS.WHITE,
    },
    permissionSection: {
        marginBottom: SPACING.XL,
    },
    permissionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.SM,
    },
    permissionTitle: {
        fontSize: TYPOGRAPHY.FONT_SIZE.LG,
        fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
        color: COLORS.TEXT_PRIMARY,
        marginLeft: SPACING.SM,
    },
    permissionDescription: {
        fontSize: TYPOGRAPHY.FONT_SIZE.SM,
        color: COLORS.TEXT_SECONDARY,
        lineHeight: TYPOGRAPHY.LINE_HEIGHT.RELAXED * TYPOGRAPHY.FONT_SIZE.SM,
    },
    buttonContainer: {
        paddingHorizontal: SPACING.SCREEN_PADDING,
        paddingBottom: SPACING.LG,
    },
});
