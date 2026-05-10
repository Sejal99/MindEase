import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

import Button from '../components/atoms/Button';
import AppText from '../components/atoms/AppText';
import StressForm from '../components/organisms/StressForm';
import useStressFlowViewModel from '../viewmodels/stressFlowViewModel';
import useHomeViewModel from '../viewmodels/homeViewModel';
import useSessionViewModel from '../viewmodels/sessionViewModel';
import { useTranslation } from 'react-i18next';

type StressFlowScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'StressFlow'>;

interface StressFlowScreenProps {
  navigation: StressFlowScreenNavigationProp;
}

const StressFlowScreen: React.FC<StressFlowScreenProps> = ({ navigation }) => {
  const { trigger, intensity, setTrigger, setIntensity, canProceed, reset } = useStressFlowViewModel();
  const { addEvent } = useHomeViewModel();
  const { startSession } = useSessionViewModel();
  const { t } = useTranslation();

  const handleContinue = () => {
    if (canProceed() && trigger && intensity) {
      startSession(trigger, intensity);
      navigation.navigate('ActionSelection', { trigger, intensity });
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <AppText variant="h2">{t('stressFlow.title')}</AppText>
        <AppText variant="body" color="#9CA3AF" style={styles.subtitle}>
          {t('stressFlow.subtitle')}
        </AppText>
      </View>

      <StressForm
        selectedTrigger={trigger}
        selectedIntensity={intensity}
        onTriggerSelect={setTrigger}
        onIntensitySelect={setIntensity}
      />

      <View style={styles.buttonContainer}>
        <Button
          title={t('stressFlow.continue')}
          onPress={handleContinue}
          variant="primary"
          disabled={!canProceed()}
        />
      </View>
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
  },
  subtitle: {
    marginTop: 8,
  },
  buttonContainer: {
    marginTop: 24,
  },
});

export default StressFlowScreen;
