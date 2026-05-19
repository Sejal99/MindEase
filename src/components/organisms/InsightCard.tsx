import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from '../atoms/Card';
import AppText from '../atoms/AppText';
import { InsightData } from '../../models/types';
import { formatTrigger } from '../../utils/formatters';
import { warmColors as colors } from '../../theme/colors';

interface InsightCardProps {
  insights: InsightData;
}

const InsightCard: React.FC<InsightCardProps> = ({ insights }) => {

  return (
    <Card style={styles.card}>
      <AppText variant="h3" style={styles.title}>
        Your Insights
      </AppText>
      
      <View style={styles.insightRow}>
        <AppText variant="caption" style={styles.label}>
          Most Common Trigger
        </AppText>
        <AppText variant="body" style={styles.value}>
          {insights.mostCommonTrigger ? formatTrigger(insights.mostCommonTrigger) : 'colors/A'}
        </AppText>
      </View>

      <View style={styles.insightRow}>
        <AppText variant="caption" style={styles.label}>
          Peak Stress Time
        </AppText>
        <AppText variant="body" style={styles.value}>
          {insights.peakStressTime || 'colors/A'}
        </AppText>
      </View>

      <View style={styles.insightRow}>
        <AppText variant="caption" style={styles.label}>
          Most Effective Action
        </AppText>
        <AppText variant="body" style={styles.value}>
          {insights.mostEffectiveAction || 'colors/A'}
        </AppText>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 22,
    marginBottom: 16,
    shadowColor: colors.accentDeep,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    color: colors.textPrimary,
    marginBottom: 16,
  },
  insightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
  },
  label: {
    flex: 1,
    color: colors.textMuted,
  },
  value: {
    flex: 1,
    textAlign: 'right',
    fontWeight: '600',
    color: colors.textPrimary,
  },
});

export default InsightCard;
