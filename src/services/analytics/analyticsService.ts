/**
 * Analytics Service
 * 
 * NEDEN YAPILDI?
 * - Kullanıcı davranışlarını takip etmek
 * - App performansını ölçmek
 * - Business metrics toplamak
 * - A/B testing yapmak
 * - Error tracking
 * - User journey analizi
 * 
 * NASIL ÇALIŞIR?
 * - Singleton pattern ile tek instance
 * - Event-based tracking sistemi
 * - Timestamp ile zaman damgası
 * - Properties ile detaylı bilgi
 * - Enable/disable özelliği
 * 
 * KULLANIM ALANLARI:
 * - Screen view tracking
 * - User action tracking
 * - Error tracking
 * - Performance monitoring
 * - Conversion tracking
 * 
 * ÖRNEK KULLANIM:
 * // Screen tracking
 * analyticsService.trackScreen('HomeScreen');
 * 
 * // User action
 * analyticsService.trackUserAction('button_click', { button: 'login' });
 * 
 * // Error tracking
 * analyticsService.trackError(error, { screen: 'LoginScreen' });
 */

export interface AnalyticsEvent {
    name: string;
    properties?: Record<string, any>;
    timestamp?: number;
}

class AnalyticsService {
    private isEnabled = true;

    // Event tracking
    trackEvent(event: AnalyticsEvent) {
        if (!this.isEnabled) return;

        const eventData = {
            ...event,
            timestamp: event.timestamp || Date.now(),
        };

        console.log('📊 Analytics Event:', eventData);

        // TODO: Firebase Analytics, Mixpanel, Amplitude entegrasyonu
        // firebase.analytics().logEvent(event.name, event.properties);
    }

    // Screen tracking
    trackScreen(screenName: string, properties?: Record<string, any>) {
        this.trackEvent({
            name: 'screen_view',
            properties: {
                screen_name: screenName,
                ...properties,
            },
        });
    }

    // User action tracking
    trackUserAction(action: string, properties?: Record<string, any>) {
        this.trackEvent({
            name: 'user_action',
            properties: {
                action,
                ...properties,
            },
        });
    }

    // Error tracking
    trackError(error: Error, context?: Record<string, any>) {
        this.trackEvent({
            name: 'error',
            properties: {
                error_message: error.message,
                error_stack: error.stack,
                ...context,
            },
        });
    }

    // Enable/Disable analytics
    setEnabled(enabled: boolean) {
        this.isEnabled = enabled;
    }
}

export const analyticsService = new AnalyticsService();
