import React from 'react';
import { View, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

import Button from '../../components/atoms/Button';
import AppText from '../../components/atoms/AppText';
import StressForm from '../../components/organisms/StressForm';
import useStressFlowViewModel from '../../viewmodels/stressFlowViewModel';
import useHomeViewModel from '../../viewmodels/homeViewModel';
import useSessionViewModel from '../../viewmodels/sessionViewModel';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';
import { darkTheme } from '../../theme/colors';

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
        <AppText variant="body" color={darkTheme.textSecondary} style={styles.subtitle}>
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


export default StressFlowScreen;
