/**
 * ifood Uygulaması Login Method Modal
 * Email/Telefon ile giriş seçenekleri modal bileşeni (2. resim)
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';
import { Button } from '../../components/ui/Button';

// Login Method Modal Props
interface LoginMethodModalProps {
    visible: boolean;
    onClose: () => void;
    onPhoneLogin: () => void;
    onEmailLogin: () => void;
}

// Login Method Modal Bileşeni
export const LoginMethodModal: React.FC<LoginMethodModalProps> = ({
    visible,
    onClose,
    onPhoneLogin,
    onEmailLogin,
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.overlay}
                activeOpacity={1}
                onPress={onClose}
            >
                <TouchableOpacity
                    style={styles.modalContent}
                    activeOpacity={1}
                    onPress={() => { }} // Modal içeriğine tıklamada kapanmasın
                >
                    <Text style={styles.title}>Nasıl devam etmek istiyorsunuz?</Text>

                    {/* Method Buttons */}
                    <View style={styles.methodButtonsContainer}>
                        <Button
                            title="Cep Telefonu"
                            variant="primary"
                            size="large"
                            fullWidth
                            onPress={onPhoneLogin}
                            style={styles.methodButton}
                            leftIcon={
                                <Ionicons name="call" size={20} color={COLORS.WHITE} />
                            }
                        />

                        <Button
                            title="E-posta"
                            variant="outline"
                            size="large"
                            fullWidth
                            onPress={onEmailLogin}
                            style={styles.methodButton}
                            leftIcon={
                                <Ionicons name="mail" size={20} color={COLORS.PRIMARY} />
                            }
                        />
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Arka plan gölgelendirme
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.WHITE,
        borderTopLeftRadius: SPACING.RADIUS.XL,
        borderTopRightRadius: SPACING.RADIUS.XL,
        padding: SPACING.LG,
        paddingBottom: SPACING['2XL'],
        ...SPACING.SHADOW.LG,
    },
    title: {
        fontSize: TYPOGRAPHY.FONT_SIZE.XL,
        fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
        color: COLORS.TEXT_PRIMARY,
        textAlign: 'center',
        marginBottom: SPACING.XL,
        lineHeight: TYPOGRAPHY.LINE_HEIGHT.TIGHT * TYPOGRAPHY.FONT_SIZE.XL,
    },
    methodButtonsContainer: {
        gap: SPACING.MD,
    },
    methodButton: {
        marginBottom: SPACING.SM,
    },
});