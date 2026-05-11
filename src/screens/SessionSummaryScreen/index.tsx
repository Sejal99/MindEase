import React from 'react';
import { View, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

import Button from '../../components/atoms/Button';
import AppText from '../../components/atoms/AppText';
import Card from '../../components/atoms/Card';
import useSessionViewModel from '../../viewmodels/sessionViewModel';
import { formatActionName } from '../../utils/insights';
import { formatTrigger, getEffectivenessLabel, getEffectivenessColor } from '../../utils/formatters';
import { Trophy, CheckCircle, XCircle, MinusCircle } from 'lucide-react-native';
import { styles } from './styles';
import { insightsPalette, darkTheme } from '../../theme/colors';

type SessionSummaryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SessionSummary'>;

interface SessionSummaryScreenProps {
  navigation: SessionSummaryScreenNavigationProp;
}

const EffectivenessIcon = ({ effectiveness, color, size }: { effectiveness: string; color: string; size: number }) => {
  switch (effectiveness) {
    case 'yes': return <CheckCircle color={color} size={size} />;
    case 'no': return <XCircle color={color} size={size} />;
    case 'neutral': return <MinusCircle color={color} size={size} />;
    default: return null;
  }
};

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
        <AppText variant="body" color={insightsPalette.textLight} style={styles.subtitle}>
          You've completed all 5 exercises
        </AppText>
      </View>

      {mostEffective && (
        <Card style={styles.highlightCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <Trophy color={insightsPalette.purple} size={20} />
            <AppText variant="h3" style={[styles.highlightTitle, { marginBottom: 0 }]}>
              Most Effective Exercise
            </AppText>
          </View>
          <AppText variant="h1" style={styles.highlightAction}>
            {formatActionName(mostEffective)}
          </AppText>
          <AppText variant="body" color={insightsPalette.textLight} style={styles.highlightSubtitle}>
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
              <AppText variant="caption" color={darkTheme.textSecondary}>
                {new Date(exercise.completedAt).toLocaleTimeString()}
              </AppText>
            </View>
            <View style={styles.effectivenessBadge}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <EffectivenessIcon
                  effectiveness={exercise.effectiveness}
                  color={getEffectivenessColor(exercise.effectiveness)}
                  size={16}
                />
                <AppText
                  variant="body"
                  style={{ color: getEffectivenessColor(exercise.effectiveness) }}
                >
                  {getEffectivenessLabel(exercise.effectiveness)}
                </AppText>
              </View>
            </View>
          </View>
        ))}
      </Card>

      <Card style={styles.statsCard}>
        <AppText variant="h3" style={styles.statsTitle}>
          Session Stats
        </AppText>
        <View style={styles.statRow}>
          <AppText variant="body" color={darkTheme.textSecondary}>Trigger</AppText>
          <AppText variant="body" style={styles.statValue}>
            {formatTrigger(session.trigger)}
          </AppText>
        </View>
        <View style={styles.statRow}>
          <AppText variant="body" color={darkTheme.textSecondary}>Intensity</AppText>
          <AppText variant="body" style={styles.statValue}>
            {session.intensity}/5
          </AppText>
        </View>
        <View style={styles.statRow}>
          <AppText variant="body" color={darkTheme.textSecondary}>Total Exercises</AppText>
          <AppText variant="body" style={styles.statValue}>
            {session.completedExercises.length}
          </AppText>
        </View>
      </Card>

      <Button
        title="Back to Home"
        onPress={() => navigation.navigate('MainTabs')}
        variant="primary"
        style={styles.homeButton}
      />
    </ScrollView>
  );
};


export default SessionSummaryScreen;
