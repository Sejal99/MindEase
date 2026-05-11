import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import AppText from '../atoms/AppText';
import { darkTheme } from '../../theme/colors';

interface SectionHeaderProps {
  label: string;
  action?: string;
  onAction?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ label, action, onAction }) => (
  <View style={styles.sectionHeader}>
    <AppText style={styles.sectionLabel}>{label}</AppText>
    {action && (
      <Pressable onPress={onAction}>
        <AppText style={styles.sectionAction}>{action} →</AppText>
      </Pressable>
    )}
  </View>
);

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 8,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    color: darkTheme.text,
  },
  sectionAction: { fontSize: 12, color: darkTheme.textSecondary, fontWeight: '600' },
});

export default SectionHeader;
