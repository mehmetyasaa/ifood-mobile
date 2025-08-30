/**
 * ifood Uygulaması Home Screen
 * Ana sayfa - restoran listesi ve öne çıkanlar
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';
import { Card } from '../../components/ui/Card';

const { width } = Dimensions.get('window');

// Home Screen Bileşeni
export const HomeScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.WHITE} />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <View style={styles.locationContainer}>
                        <Ionicons name="location" size={20} color={COLORS.PRIMARY} />
                        <Text style={styles.locationText}>Entregar em</Text>
                        <Text style={styles.addressText}>Rua das Flores, 123</Text>
                        <Ionicons name="chevron-down" size={16} color={COLORS.TEXT_SECONDARY} />
                    </View>

                    <View style={styles.headerActions}>
                        <Ionicons name="search" size={24} color={COLORS.TEXT_PRIMARY} />
                        <Ionicons name="notifications" size={24} color={COLORS.TEXT_PRIMARY} />
                    </View>
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Promo Banner */}
                <Card style={styles.promoCard}>
                    <View style={styles.promoContent}>
                        <View style={styles.promoText}>
                            <Text style={styles.promoTitle}>Frete Grátis</Text>
                            <Text style={styles.promoSubtitle}>Em pedidos acima de R$ 20</Text>
                        </View>
                        <Ionicons name="gift" size={32} color={COLORS.PRIMARY} />
                    </View>
                </Card>

                {/* Categories */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Categorias</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoriesContainer}
                    >
                        {['Pizza', 'Hambúrguer', 'Sushi', 'Sobremesa', 'Bebidas'].map((category, index) => (
                            <View key={index} style={styles.categoryItem}>
                                <View style={styles.categoryIcon}>
                                    <Ionicons name="restaurant" size={24} color={COLORS.PRIMARY} />
                                </View>
                                <Text style={styles.categoryText}>{category}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* Featured Restaurants */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Restaurantes em Destaque</Text>

                    {[1, 2, 3].map((item, index) => (
                        <Card key={index} style={styles.restaurantCard}>
                            <View style={styles.restaurantHeader}>
                                <View style={styles.restaurantImage}>
                                    <Ionicons name="restaurant" size={32} color={COLORS.PRIMARY} />
                                </View>
                                <View style={styles.restaurantInfo}>
                                    <Text style={styles.restaurantName}>Restaurante {item}</Text>
                                    <Text style={styles.restaurantCategory}>Comida Brasileira</Text>
                                    <View style={styles.restaurantMeta}>
                                        <View style={styles.ratingContainer}>
                                            <Ionicons name="star" size={14} color={COLORS.SECONDARY} />
                                            <Text style={styles.rating}>4.{8 - index}</Text>
                                        </View>
                                        <Text style={styles.deliveryTime}>30-45 min</Text>
                                        <Text style={styles.deliveryFee}>R$ 5,00</Text>
                                    </View>
                                </View>
                            </View>

                            {index === 0 && (
                                <View style={styles.promotionTag}>
                                    <Text style={styles.promotionText}>Frete Grátis</Text>
                                </View>
                            )}
                        </Card>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

// Stiller
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
    },
    header: {
        backgroundColor: COLORS.WHITE,
        paddingTop: SPACING.XL,
        paddingHorizontal: SPACING.SCREEN_PADDING,
        paddingBottom: SPACING.MD,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.BORDER_LIGHT,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    locationText: {
        fontSize: TYPOGRAPHY.FONT_SIZE.SM,
        color: COLORS.TEXT_SECONDARY,
        marginLeft: SPACING.XS,
    },
    addressText: {
        fontSize: TYPOGRAPHY.FONT_SIZE.SM,
        fontWeight: TYPOGRAPHY.FONT_WEIGHT.MEDIUM,
        color: COLORS.TEXT_PRIMARY,
        marginLeft: SPACING.XS,
        marginRight: SPACING.XS,
    },
    headerActions: {
        flexDirection: 'row',
        gap: SPACING.MD,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: SPACING.SCREEN_PADDING,
        paddingTop: SPACING.MD,
        paddingBottom: SPACING.XL,
    },
    promoCard: {
        marginBottom: SPACING.LG,
        backgroundColor: COLORS.PRIMARY_LIGHT,
    },
    promoContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    promoText: {
        flex: 1,
    },
    promoTitle: {
        fontSize: TYPOGRAPHY.FONT_SIZE.LG,
        fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
        color: COLORS.WHITE,
        marginBottom: SPACING.XS,
    },
    promoSubtitle: {
        fontSize: TYPOGRAPHY.FONT_SIZE.SM,
        color: COLORS.WHITE,
        opacity: 0.9,
    },
    section: {
        marginBottom: SPACING.XL,
    },
    sectionTitle: {
        fontSize: TYPOGRAPHY.FONT_SIZE.XL,
        fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
        color: COLORS.TEXT_PRIMARY,
        marginBottom: SPACING.MD,
    },
    categoriesContainer: {
        paddingRight: SPACING.SCREEN_PADDING,
    },
    categoryItem: {
        alignItems: 'center',
        marginRight: SPACING.LG,
    },
    categoryIcon: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: COLORS.GRAY_100,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.SM,
    },
    categoryText: {
        fontSize: TYPOGRAPHY.FONT_SIZE.SM,
        fontWeight: TYPOGRAPHY.FONT_WEIGHT.MEDIUM,
        color: COLORS.TEXT_PRIMARY,
    },
    restaurantCard: {
        marginBottom: SPACING.MD,
    },
    restaurantHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    restaurantImage: {
        width: 80,
        height: 80,
        borderRadius: SPACING.RADIUS.MD,
        backgroundColor: COLORS.GRAY_100,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SPACING.MD,
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
    restaurantCategory: {
        fontSize: TYPOGRAPHY.FONT_SIZE.SM,
        color: COLORS.TEXT_SECONDARY,
        marginBottom: SPACING.SM,
    },
    restaurantMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.MD,
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
    deliveryTime: {
        fontSize: TYPOGRAPHY.FONT_SIZE.SM,
        color: COLORS.TEXT_SECONDARY,
    },
    deliveryFee: {
        fontSize: TYPOGRAPHY.FONT_SIZE.SM,
        color: COLORS.TEXT_SECONDARY,
    },
    promotionTag: {
        backgroundColor: COLORS.SUCCESS,
        paddingHorizontal: SPACING.SM,
        paddingVertical: SPACING.XS,
        borderRadius: SPACING.RADIUS.SM,
        alignSelf: 'flex-start',
        marginTop: SPACING.SM,
    },
    promotionText: {
        fontSize: TYPOGRAPHY.FONT_SIZE.XS,
        fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
        color: COLORS.WHITE,
    },
});
