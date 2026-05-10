import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

import Button from '../components/atoms/Button';
import AppText from '../components/atoms/AppText';
import Card from '../components/atoms/Card';
import useStressFlowViewModel from '../viewmodels/stressFlowViewModel';
import useHomeViewModel from '../viewmodels/homeViewModel';
import useSessionViewModel from '../viewmodels/sessionViewModel';
import { StressEvent, EffectivenessType } from '../models/types';
import { useTranslation } from 'react-i18next';

type FeedbackScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Feedback'>;
type FeedbackScreenRouteProp = RouteProp<RootStackParamList, 'Feedback'>;

interface FeedbackScreenProps {
  navigation: FeedbackScreenNavigationProp;
  route: FeedbackScreenRouteProp;
}

const FeedbackScreen: React.FC<FeedbackScreenProps> = ({ navigation, route }) => {
  const { trigger, intensity, action } = route.params;
  const { setEffectiveness, reset } = useStressFlowViewModel();
  const { addEvent } = useHomeViewModel();
  const { addCompletedExercise, isSessionComplete, clearSession } = useSessionViewModel();
  const { t } = useTranslation();

  const handleFeedback = (effectiveness: EffectivenessType) => {
    setEffectiveness(effectiveness);

    const newEvent: StressEvent = {
      id: Date.now().toString(),
      trigger: trigger as any,
      intensity,
      action,
      effectiveness,
      createdAt: new Date().toISOString(),
    };

    addEvent(newEvent);
    addCompletedExercise(action, effectiveness);
    reset();

    if (isSessionComplete()) {
      clearSession();
      navigation.navigate('SessionSummary');
    } else {
      navigation.navigate('ActionSelection', { trigger, intensity });
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <AppText variant="h2" style={styles.title}>
          {t('feedback.title')}
        </AppText>
        <AppText variant="body" color="#9CA3AF" style={styles.subtitle}>
          {t('feedback.subtitle')}
        </AppText>

        <Card style={styles.feedbackCard}>
          <Button
            title={t('feedback.options.yes')}
            onPress={() => handleFeedback('yes')}
            variant="primary"
            style={styles.feedbackButton}
          />
          <Button
            title={t('feedback.options.neutral')}
            onPress={() => handleFeedback('neutral')}
            variant="secondary"
            style={styles.feedbackButton}
          />
          <Button
            title={t('feedback.options.no')}
            onPress={() => handleFeedback('no')}
            variant="secondary"
            style={styles.feedbackButton}
          />
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 40,
  },
  feedbackCard: {
    marginBottom: 24,
  },
  feedbackButton: {
    marginBottom: 12,
  },
});

export default FeedbackScreen;
