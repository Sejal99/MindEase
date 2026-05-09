import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import AppText from '../atoms/AppText';

interface ToggleRowProps {
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  time?: string;
  onTimePress?: () => void;
  day?: string;
  onDayPress?: () => void;
}

const ToggleRow: React.FC<ToggleRowProps> = ({
  label,
  description,
  enabled,
  onToggle,
  time,
  onTimePress,
  day,
  onDayPress,
}) => (
  <View style={styles.row}>
    <View style={styles.rowLeft}>
      <AppText style={styles.rowLabel}>{label}</AppText>
      <AppText style={styles.rowDesc}>{description}</AppText>
      {(time || day) && (
        <View style={styles.rowMeta}>
          {day && (
            <Pressable style={styles.metaChip} onPress={onDayPress}>
              <AppText style={styles.metaChipText}>{day}</AppText>
            </Pressable>
          )}
          {time && (
            <Pressable style={styles.metaChip} onPress={onTimePress}>
              <AppText style={styles.metaChipText}>{time}</AppText>
            </Pressable>
          )}
        </View>
      )}
    </View>
    <Pressable
      style={[styles.toggle, enabled && styles.toggleActive]}
      onPress={onToggle}
    >
      <View style={[styles.toggleKnob, enabled && styles.toggleKnobActive]} />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  rowLeft: { flex: 1, marginRight: 16 },
  rowLabel: { fontSize: 16, fontWeight: '600', color: '#F9FAFB', marginBottom: 4 },
  rowDesc: { fontSize: 13, color: '#9CA3AF', lineHeight: 18 },
  rowMeta: { flexDirection: 'row', gap: 8, marginTop: 8 },
  metaChip: {
    backgroundColor: '#1F2937',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#374151',
  },
  metaChipText: { fontSize: 12, color: '#9CA3AF', fontWeight: '600' },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#374151',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: { backgroundColor: '#6366F1' },
  toggleKnob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#9CA3AF',
  },
  toggleKnobActive: { backgroundColor: '#FFFFFF' },
});

export default ToggleRow;
