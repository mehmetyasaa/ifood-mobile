/**
 * useApi Hook'u
 * 
 * NEDEN YAPILDI?
 * - API çağrılarını standartlaştırmak
 * - Loading, error, data state'lerini yönetmek
 * - Kod tekrarını önlemek
 * - Error handling'i merkezi hale getirmek
 * - Type safety sağlamak
 * 
 * NASIL ÇALIŞIR?
 * - useState ile loading, error, data state'lerini yönetir
 * - useCallback ile performans optimizasyonu
 * - Try-catch ile error handling
 * - Generic type ile type safety
 * 
 * KULLANIM ALANLARI:
 * - Tüm API çağrıları
 * - Login/Register işlemleri
 * - Data fetching
 * - Form submission
 * 
 * ÖRNEK KULLANIM:
 * const { data, loading, error, execute } = useApi(loginUser);
 * 
 * useEffect(() => {
 *   execute(email, password);
 * }, []);
 */

import { useState, useCallback } from 'react';

interface ApiState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

interface UseApiReturn<T> extends ApiState<T> {
    execute: (...args: any[]) => Promise<void>;
    reset: () => void;
}

export function useApi<T = any>(
    apiFunction: (...args: any[]) => Promise<T>
): UseApiReturn<T> {
    const [state, setState] = useState<ApiState<T>>({
        data: null,
        loading: false,
        error: null,
    });

    const execute = useCallback(
        async (...args: any[]) => {
            try {
                setState(prev => ({ ...prev, loading: true, error: null }));
                const result = await apiFunction(...args);
                setState({ data: result, loading: false, error: null });
            } catch (error) {
                setState({
                    data: null,
                    loading: false,
                    error: error instanceof Error ? error.message : 'Bir hata oluştu',
                });
            }
        },
        [apiFunction]
    );

    const reset = useCallback(() => {
        setState({ data: null, loading: false, error: null });
    }, []);

    return {
        ...state,
        execute,
        reset,
    };
}
