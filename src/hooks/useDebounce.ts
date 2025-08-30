/**
 * useDebounce Hook'u
 * 
 * NEDEN YAPILDI?
 * - Performance optimizasyonu
 * - API çağrılarını azaltmak
 * - Kullanıcı deneyimini iyileştirmek
 * - Gereksiz re-render'ları önlemek
 * - Search input'larında kullanım
 * 
 * NASIL ÇALIŞIR?
 * - useState ile debounced value'yu tutar
 * - useEffect ile timeout yönetimi
 * - Delay süresi sonunda value'yu günceller
 * - Cleanup ile memory leak'i önler
 * 
 * KULLANIM ALANLARI:
 * - Search input'ları
 * - Auto-complete
 * - Real-time filtering
 * - API çağrılarında throttling
 * 
 * ÖRNEK KULLANIM:
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 * 
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     searchAPI(debouncedSearchTerm);
 *   }
 * }, [debouncedSearchTerm]);
 */

import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
