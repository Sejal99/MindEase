import React from 'react';
import { View, Pressable, Modal, StyleSheet } from 'react-native';
import AppText from '../atoms/AppText';
import { warmColors as colors } from '../../theme/colors';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface DayPickerModalProps {
  visible: boolean;
  currentDay: string;
  onSelect: (day: string) => void;
  onClose: () => void;
}

const DayPickerModal: React.FC<DayPickerModalProps> = ({
  visible,
  currentDay,
  onSelect,
  onClose,
}) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <Pressable style={styles.modalOverlay} onPress={onClose}>
      <View style={[styles.modalContent, { width: 260 }]} onStartShouldSetResponder={() => true}>
        <AppText variant="h3" style={styles.modalTitle}>Select Day</AppText>
        {DAYS.map((day) => (
          <Pressable
            key={day}
            style={currentDay === day ? styles.dayItemActive : styles.dayItem}
            onPress={() => { onSelect(day); onClose(); }}
          >
            <AppText style={currentDay === day ? styles.dayItemTextActive : styles.dayItemText}>{day}</AppText>
          </Pressable>
        ))}
      </View>
    </Pressable>
  </Modal>
);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: '#1A3A1A66',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalTitle: { marginBottom: 16, textAlign: 'center', color: colors.textPrimary },
  dayItem: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 2,
    backgroundColor: colors.surface,
  },
  dayItemActive: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 2,
    backgroundColor: colors.accentDim,
  },
  dayItemText: { fontSize: 16, color: colors.textSecondary },
  dayItemTextActive: { fontSize: 16, color: colors.accentDeep, fontWeight: '700' },
});

export default DayPickerModal;
