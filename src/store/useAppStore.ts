/**
 * ifood Uygulaması Global State Management
 * Zustand ile merkezi state yönetimi
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Restaurant, Order, LocationPermission } from '../types';

// Uygulama Durumu Interface'i
interface AppState {
    // Kullanıcı Durumu
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    // Konum Durumu
    location: {
        latitude: number;
        longitude: number;
        address: string;
    } | null;
    locationPermission: LocationPermission;

    // Restoran Durumu
    nearbyRestaurants: Restaurant[];
    selectedRestaurant: Restaurant | null;

    // Sipariş Durumu
    currentOrder: Order | null;
    orderHistory: Order[];

    // UI Durumu
    theme: 'light' | 'dark';
    language: 'tr' | 'en';
    onboardingCompleted: boolean;

    // Actions
    setUser: (user: User | null) => void;
    setAuthenticated: (isAuthenticated: boolean) => void;
    setLoading: (isLoading: boolean) => void;
    setLocation: (location: { latitude: number; longitude: number; address: string } | null) => void;
    setLocationPermission: (permission: LocationPermission) => void;
    setNearbyRestaurants: (restaurants: Restaurant[]) => void;
    setSelectedRestaurant: (restaurant: Restaurant | null) => void;
    setCurrentOrder: (order: Order | null) => void;
    addToOrderHistory: (order: Order) => void;
    setTheme: (theme: 'light' | 'dark') => void;
    setLanguage: (language: 'tr' | 'en') => void;
    setOnboardingCompleted: (completed: boolean) => void;
    logout: () => void;
    clearStore: () => void;
}

// Başlangıç Durumu
const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    location: null,
    locationPermission: {
        granted: false,
        status: 'undetermined' as const,
    },
    nearbyRestaurants: [],
    selectedRestaurant: null,
    currentOrder: null,
    orderHistory: [],
    theme: 'light' as const,
    language: 'tr' as const,
    onboardingCompleted: false,
};

// Store Oluşturma
export const useAppStore = create<AppState>()(
    persist(
        (set, get) => ({
            ...initialState,

            // Kullanıcı Actions
            setUser: (user) => set({ user, isAuthenticated: !!user }),
            setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
            setLoading: (isLoading) => set({ isLoading }),

            // Konum Actions
            setLocation: (location) => set({ location }),
            setLocationPermission: (locationPermission) => set({ locationPermission }),

            // Restoran Actions
            setNearbyRestaurants: (nearbyRestaurants) => set({ nearbyRestaurants }),
            setSelectedRestaurant: (selectedRestaurant) => set({ selectedRestaurant }),

            // Sipariş Actions
            setCurrentOrder: (currentOrder) => set({ currentOrder }),
            addToOrderHistory: (order) =>
                set((state) => ({
                    orderHistory: [order, ...state.orderHistory]
                })),

            // UI Actions
            setTheme: (theme) => set({ theme }),
            setLanguage: (language) => set({ language }),
            setOnboardingCompleted: (onboardingCompleted) => set({ onboardingCompleted }),

            // Genel Actions
            logout: () => set({
                user: null,
                isAuthenticated: false,
                currentOrder: null,
                selectedRestaurant: null,
            }),

            clearStore: () => set(initialState),
        }),
        {
            name: 'ifood-store',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
                location: state.location,
                locationPermission: state.locationPermission,
                orderHistory: state.orderHistory,
                theme: state.theme,
                language: state.language,
                onboardingCompleted: state.onboardingCompleted,
            }),
        }
    )
);

// Selector Hooks
export const useUser = () => useAppStore((state) => state.user);
export const useIsAuthenticated = () => useAppStore((state) => state.isAuthenticated);
export const useIsLoading = () => useAppStore((state) => state.isLoading);
export const useLocation = () => useAppStore((state) => state.location);
export const useLocationPermission = () => useAppStore((state) => state.locationPermission);
export const useNearbyRestaurants = () => useAppStore((state) => state.nearbyRestaurants);
export const useSelectedRestaurant = () => useAppStore((state) => state.selectedRestaurant);
export const useCurrentOrder = () => useAppStore((state) => state.currentOrder);
export const useOrderHistory = () => useAppStore((state) => state.orderHistory);
export const useTheme = () => useAppStore((state) => state.theme);
export const useLanguage = () => useAppStore((state) => state.language);
export const useOnboardingCompleted = () => useAppStore((state) => state.onboardingCompleted);
