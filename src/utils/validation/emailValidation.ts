/**
 * Email Validation
 * 
 * NEDEN YAPILDI?
 * - Form validation için
 * - Kullanıcı girişlerini doğrulamak
 * - Güvenlik sağlamak
 * - UX'i iyileştirmek (anında feedback)
 * - Data integrity korumak
 * 
 * NASIL ÇALIŞIR?
 * - Regex pattern ile email formatını kontrol eder
 * - Boolean dönen basit validation
 * - Message ile birlikte detaylı validation
 * - Empty check ve format check
 * 
 * KULLANIM ALANLARI:
 * - Login formları
 * - Register formları
 * - Profil güncelleme
 * - Newsletter signup
 * - Contact formları
 * 
 * ÖRNEK KULLANIM:
 * const emailValidation = validateEmailWithMessage(email);
 * if (!emailValidation.isValid) {
 *   setEmailError(emailValidation.message);
 * }
 * 
 * // Basit kullanım:
 * const isValid = validateEmail(email);
 */

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateEmailWithMessage = (email: string): { isValid: boolean; message?: string } => {
    if (!email) {
        return { isValid: false, message: 'Email adresi gereklidir' };
    }

    if (!validateEmail(email)) {
        return { isValid: false, message: 'Geçerli bir email adresi giriniz' };
    }

    return { isValid: true };
};
