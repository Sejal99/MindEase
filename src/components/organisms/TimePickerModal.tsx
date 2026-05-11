import React, { useState } from 'react';
import {
  View,
  Pressable,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';
import AppText from '../atoms/AppText';
import { darkTheme } from '../../theme/colors';

interface TimePickerModalProps {
  visible: boolean;
  currentTime: string;
  onSelect: (time: string) => void;
  onClose: () => void;
}

const TimePickerModal: React.FC<TimePickerModalProps> = ({
  visible,
  currentTime,
  onSelect,
  onClose,
}) => {
  const [h, m] = currentTime.split(':').map(Number);
  const [hours, setHours] = useState(h);
  const [minutes, setMinutes] = useState(m);

  const hoursList = Array.from({ length: 24 }, (_, i) => i);
  const minutesList = Array.from({ length: 12 }, (_, i) => i * 5);

  const confirm = () => {
    const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    onSelect(timeStr);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
          <AppText variant="h3" style={styles.modalTitle}>Select Time</AppText>

          <View style={styles.pickerRow}>
            <View style={styles.pickerColumn}>
              <AppText style={styles.pickerLabel}>Hour</AppText>
              <FlatList
                data={hoursList}
                keyExtractor={(item) => String(item)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Pressable
                    style={[styles.pickerItem, hours === item && styles.pickerItemActive]}
                    onPress={() => setHours(item)}
                  >
                    <AppText style={hours === item ? [styles.pickerItemText, styles.pickerItemTextActive] : [styles.pickerItemText]}>
                      {String(item).padStart(2, '0')}
                    </AppText>
                  </Pressable>
                )}
                style={styles.pickerList}
              />
            </View>
            <View style={styles.pickerSeparator}>
              <AppText style={styles.pickerColon}>:</AppText>
            </View>
            <View style={styles.pickerColumn}>
              <AppText style={styles.pickerLabel}>Minute</AppText>
              <FlatList
                data={minutesList}
                keyExtractor={(item) => String(item)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Pressable
                    style={[styles.pickerItem, minutes === item && styles.pickerItemActive]}
                    onPress={() => setMinutes(item)}
                  >
                    <AppText style={minutes === item ? [styles.pickerItemText, styles.pickerItemTextActive] : [styles.pickerItemText]}>
                      {String(item).padStart(2, '0')}
                    </AppText>
                  </Pressable>
                )}
                style={styles.pickerList}
              />
            </View>
          </View>

          <Pressable style={styles.confirmBtn} onPress={confirm}>
            <AppText style={styles.confirmBtnText}>Confirm</AppText>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: darkTheme.card,
    borderRadius: 16,
    padding: 20,
    width: 300,
    maxHeight: '70%',
  },
  modalTitle: { marginBottom: 16, textAlign: 'center' },
  pickerRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 16 },
  pickerColumn: { flex: 1, alignItems: 'center' },
  pickerLabel: { fontSize: 12, color: darkTheme.textSecondary, marginBottom: 8, fontWeight: '600' },
  pickerList: { maxHeight: 200 },
  pickerItem: {
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 2,
  },
  pickerItemActive: { backgroundColor: darkTheme.primary },
  pickerItemText: { fontSize: 16, color: darkTheme.text },
  pickerItemTextActive: { fontWeight: '700' },
  pickerSeparator: { justifyContent: 'center', paddingHorizontal: 8 },
  pickerColon: { fontSize: 20, color: darkTheme.text, fontWeight: '700' },
  confirmBtn: {
    backgroundColor: darkTheme.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  confirmBtnText: { color: darkTheme.text, fontSize: 16, fontWeight: '600' },
});

export default TimePickerModal;
