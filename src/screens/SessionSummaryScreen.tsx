import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

import Button from '../components/atoms/Button';
import AppText from '../components/atoms/AppText';
import Card from '../components/atoms/Card';
import useSessionViewModel from '../viewmodels/sessionViewModel';
import { formatActionName } from '../utils/insights';
import { formatTrigger, getEffectivenessEmoji, getEffectivenessLabel, getEffectivenessColor } from '../utils/formatters';

type SessionSummaryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SessionSummary'>;

interface SessionSummaryScreenProps {
  navigation: SessionSummaryScreenNavigationProp;
}

const SessionSummaryScreen: React.FC<SessionSummaryScreenProps> = ({ navigation }) => {
  const { session, getMostEffectiveExercise } = useSessionViewModel();

  const mostEffective = getMostEffectiveExercise();

  if (!session) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <AppText variant="body">No session data found</AppText>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <AppText variant="h2">Session Complete!</AppText>
        <AppText variant="body" color="#9CA3AF" style={styles.subtitle}>
          You've completed all 5 exercises
        </AppText>
      </View>

      {mostEffective && (
        <Card style={styles.highlightCard}>
          <AppText variant="h3" style={styles.highlightTitle}>
            🏆 Most Effective Exercise
          </AppText>
          <AppText variant="h1" style={styles.highlightAction}>
            {formatActionName(mostEffective)}
          </AppText>
          <AppText variant="body" color="#9CA3AF" style={styles.highlightSubtitle}>
            This exercise helped you the most
          </AppText>
        </Card>
      )}

      <Card style={styles.summaryCard}>
        <AppText variant="h3" style={styles.summaryTitle}>
          Exercise Results
        </AppText>
        {session.completedExercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseRow}>
            <View style={styles.exerciseInfo}>
              <AppText variant="body">{formatActionName(exercise.action)}</AppText>
              <AppText variant="caption" color="#9CA3AF">
                {new Date(exercise.completedAt).toLocaleTimeString()}
              </AppText>
            </View>
            <View style={styles.effectivenessBadge}>
              <AppText
                variant="body"
                style={{ color: getEffectivenessColor(exercise.effectiveness) }}
              >
                {getEffectivenessEmoji(exercise.effectiveness)} {getEffectivenessLabel(exercise.effectiveness)}
              </AppText>
            </View>
          </View>
        ))}
      </Card>

      <Card style={styles.statsCard}>
        <AppText variant="h3" style={styles.statsTitle}>
          Session Stats
        </AppText>
        <View style={styles.statRow}>
          <AppText variant="body" color="#9CA3AF">Trigger</AppText>
          <AppText variant="body" style={styles.statValue}>
            {formatTrigger(session.trigger)}
          </AppText>
        </View>
        <View style={styles.statRow}>
          <AppText variant="body" color="#9CA3AF">Intensity</AppText>
          <AppText variant="body" style={styles.statValue}>
            {session.intensity}/5
          </AppText>
        </View>
        <View style={styles.statRow}>
          <AppText variant="body" color="#9CA3AF">Total Exercises</AppText>
          <AppText variant="body" style={styles.statValue}>
            {session.completedExercises.length}
          </AppText>
        </View>
      </Card>

      <Button
        title="Back to Home"
        onPress={() => navigation.navigate('Home')}
        variant="primary"
        style={styles.homeButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  subtitle: {
    marginTop: 8,
    textAlign: 'center',
  },
  highlightCard: {
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6366F1',
  },
  highlightTitle: {
    marginBottom: 8,
  },
  highlightAction: {
    fontSize: 28,
    fontWeight: '700',
    color: '#6366F1',
    marginBottom: 8,
    textAlign: 'center',
  },
  highlightSubtitle: {
    textAlign: 'center',
  },
  summaryCard: {
    marginBottom: 16,
  },
  summaryTitle: {
    marginBottom: 16,
  },
  exerciseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  exerciseInfo: {
    flex: 1,
  },
  effectivenessBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#374151',
  },
  statsCard: {
    marginBottom: 24,
  },
  statsTitle: {
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  statValue: {
    fontWeight: '600',
  },
  homeButton: {
    marginTop: 16,
  },
});

export default SessionSummaryScreen;
