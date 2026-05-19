import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import AppText from '../atoms/AppText';
import { natureColors as colors } from '../../theme/colors';

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
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
  },
  rowLeft: { flex: 1, marginRight: 16 },
  rowLabel: { fontSize: 16, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
  rowDesc: { fontSize: 13, color: colors.textSecondary, lineHeight: 18 },
  rowMeta: { flexDirection: 'row', gap: 8, marginTop: 8 },
  metaChip: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  metaChipText: { fontSize: 12, color: colors.accentDeep, fontWeight: '700' },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  toggleKnob: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.textMuted,
  },
  toggleKnobActive: { backgroundColor: colors.surface, marginLeft: 22 },
});

export default ToggleRow;
