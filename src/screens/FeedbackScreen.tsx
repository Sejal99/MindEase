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
import { StressEvent } from '../models/types';

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

  const handleFeedback = (effectiveness: 'yes' | 'neutral' | 'no') => {
    setEffectiveness(effectiveness);

    const newEvent: StressEvent = {
      id: Date.now().toString(),
      trigger,
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
          Did this help?
        </AppText>
        <AppText variant="body" color="#9CA3AF" style={styles.subtitle}>
          Your feedback helps us understand what works best for you
        </AppText>

        <Card style={styles.feedbackCard}>
          <Button
            title="Yes, it helped"
            onPress={() => handleFeedback('yes')}
            variant="primary"
            style={styles.feedbackButton}
          />
          <Button
            title="Somewhat"
            onPress={() => handleFeedback('neutral')}
            variant="secondary"
            style={styles.feedbackButton}
          />
          <Button
            title="No, it didn't help"
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
