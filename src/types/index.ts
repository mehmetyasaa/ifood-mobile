/**
 * ifood Uygulaması Tip Tanımları
 * Uygulama genelinde kullanılan interface ve type tanımları
 */

// Kullanıcı Tipleri
export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Restoran Tipleri
export interface Restaurant {
    id: string;
    name: string;
    description: string;
    image: string;
    rating: number;
    deliveryTime: string;
    deliveryFee: number;
    minimumOrder: number;
    isOpen: boolean;
    category: string;
    tags: string[];
    address: Address;
    coordinates: Coordinates;
}

// Adres Tipi
export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    formattedAddress: string;
}

// Koordinat Tipi
export interface Coordinates {
    latitude: number;
    longitude: number;
}

// Menü Öğesi Tipi
export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    isAvailable: boolean;
    allergens: string[];
    nutritionalInfo?: NutritionalInfo;
}

// Beslenme Bilgisi Tipi
export interface NutritionalInfo {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
}

// Sipariş Tipleri
export interface Order {
    id: string;
    userId: string;
    restaurantId: string;
    items: OrderItem[];
    totalAmount: number;
    deliveryFee: number;
    tax: number;
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    deliveryAddress: Address;
    estimatedDeliveryTime: Date;
    createdAt: Date;
    updatedAt: Date;
}

// Sipariş Öğesi Tipi
export interface OrderItem {
    id: string;
    menuItemId: string;
    name: string;
    price: number;
    quantity: number;
    specialInstructions?: string;
}

// Sipariş Durumu
export enum OrderStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    PREPARING = 'preparing',
    READY = 'ready',
    OUT_FOR_DELIVERY = 'out_for_delivery',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled',
}

// Ödeme Yöntemi
export enum PaymentMethod {
    CASH = 'cash',
    CREDIT_CARD = 'credit_card',
    DEBIT_CARD = 'debit_card',
    DIGITAL_WALLET = 'digital_wallet',
}

// Navigasyon Tipleri
export type RootStackParamList = {
    Splash: undefined;
    Onboarding: undefined;
    Auth: undefined;
    Main: undefined;
};

export type OnboardingStackParamList = {
    Welcome: undefined;
    Permissions: undefined;
    AuthChoice: undefined;
};

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
    ForgotPassword: undefined;
};

export type MainTabParamList = {
    Home: undefined;
    Search: undefined;
    Orders: undefined;
    Profile: undefined;
};

// API Response Tipleri
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

// Form Tipleri
export interface LoginForm {
    email: string;
    password: string;
}

export interface RegisterForm {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

// Konum İzinleri
export interface LocationPermission {
    granted: boolean;
    status: 'granted' | 'denied' | 'restricted' | 'undetermined';
}

// Bildirim Tipleri
export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'order' | 'promo' | 'system';
    isRead: boolean;
    createdAt: Date;
    data?: Record<string, any>;
}
