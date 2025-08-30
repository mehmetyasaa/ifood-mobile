/**
 * ESLint Konfigürasyonu
 * 
 * NEDEN YAPILDI?
 * - Code quality standartları
 * - Tutarlı kod stili
 * - Bug'ları önceden yakalamak
 * - Team collaboration
 * - TypeScript desteği
 * - React Native best practices
 * 
 * NASIL ÇALIŞIR?
 * - @react-native preset ile RN kuralları
 * - @typescript-eslint ile TS desteği
 * - prettier ile format uyumluluğu
 * - Custom rules ile proje ihtiyaçları
 * 
 * KURALLAR:
 * - no-unused-vars: Kullanılmayan değişkenleri yakalar
 * - no-inline-styles: Inline style kullanımını uyarır
 * - exhaustive-deps: useEffect dependency'lerini kontrol eder
 * - no-explicit-any: any type kullanımını uyarır
 * 
 * KULLANIM:
 * npm run lint - Tüm dosyaları kontrol eder
 * IDE'de otomatik linting
 * Pre-commit hook ile otomatik kontrol
 */
module.exports = {
    root: true,
    extends: [
        '@react-native',
        '@typescript-eslint/recommended',
        'prettier',
    ],
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        'react-hooks/exhaustive-deps': 'warn',
        'react-native/no-inline-styles': 'warn',
        'react-native/no-unused-styles': 'error',
        'react-native/split-platform-components': 'error',
    },
    env: {
        'react-native/react-native': true,
    },
};
