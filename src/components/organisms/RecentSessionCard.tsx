import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import AppText from '../atoms/AppText';
import { formatTrigger, formatDate } from '../../utils/formatters';
import { formatActionName } from '../../utils/insights';
import { ActionType } from '../../models/types';

interface RecentSessionCardProps {
  trigger: string;
  intensity: number;
  action: ActionType;
  createdAt: string;
  onPress: () => void;
}

const INTENSITY_COLOR = [
  '',
  '#10B981',
  '#6366F1',
  '#F59E0B',
  '#EF4444',
  '#7C3AED',
];

const RecentSessionCard: React.FC<RecentSessionCardProps> = ({
  trigger,
  intensity,
  action,
  createdAt,
  onPress,
}) => {
  const color = INTENSITY_COLOR[intensity] ?? '#6366F1';

  return (
    <Pressable style={styles.recentCard} onPress={onPress}>
      <View style={[styles.recentIntensityBar, { backgroundColor: color }]} />
      <View style={styles.recentContent}>
        <View style={styles.recentTop}>
          <View
            style={[
              styles.recentIntensityBadge,
              { backgroundColor: color + '20', borderColor: color + '40' },
            ]}
          >
            <AppText style={[styles.recentIntensityText, { color }]}>
              Intensity {intensity}/5
            </AppText>
          </View>
          <AppText style={styles.recentDate}>{formatDate(createdAt)}</AppText>
        </View>
        <AppText style={styles.recentTrigger}>{formatTrigger(trigger)}</AppText>
        <AppText style={styles.recentAction}>→ {formatActionName(action)}</AppText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  recentCard: {
    backgroundColor: '#0C1220',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#141E30',
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 24,
  },
  recentIntensityBar: { width: 4 },
  recentContent: { flex: 1, padding: 16 },
  recentTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  recentIntensityBadge: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  recentIntensityText: { fontSize: 11, fontWeight: '700' },
  recentDate: { fontSize: 11, color: '#2A3550' },
  recentTrigger: {
    fontSize: 15,
    fontWeight: '700',
    color: '#C5D0E6',
    marginBottom: 4,
  },
  recentAction: { fontSize: 13, color: '#3D4F6E' },
});

export default RecentSessionCard;
