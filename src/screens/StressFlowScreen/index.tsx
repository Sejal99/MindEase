import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { ArrowRight, HeartPulse } from 'lucide-react-native';

import AppText from '../../components/atoms/AppText';
import StressForm from '../../components/organisms/StressForm';
import useStressFlowViewModel from '../../viewmodels/stressFlowViewModel';
import useSessionViewModel from '../../viewmodels/sessionViewModel';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';
import { colors } from '../../theme/warm-colors';

type StressFlowScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'StressFlow'>;

interface StressFlowScreenProps {
  navigation: StressFlowScreenNavigationProp;
}

const StressFlowScreen: React.FC<StressFlowScreenProps> = ({ navigation }) => {
  const { trigger, intensity, setTrigger, setIntensity, canProceed } = useStressFlowViewModel();
  const { startSession } = useSessionViewModel();
  const { t } = useTranslation();
  const isReady = canProceed();

  const formatTrigger = (value: string | null) => {
    if (!value) return t('stressFlow.summary.notSelected');
    return value
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (char) => char.toUpperCase());
  };

  const handleContinue = () => {
    if (isReady && trigger && intensity) {
      startSession(trigger, intensity);
      navigation.navigate('ActionSelection', { trigger, intensity });
    }
  };

  return (
    <View style={styles.container}>
      <View pointerEvents="none" style={styles.blobTopRight} />
      <View pointerEvents="none" style={styles.blobBottomLeft} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <AppText variant="h1" style={styles.title}>{t('stressFlow.title')}</AppText>
            <AppText variant="body" style={styles.subtitle}>
              {t('stressFlow.subtitle')}
            </AppText>
          </View>

          <View style={styles.headerBadge}>
            <HeartPulse color={colors.accentDeep} size={24} />
          </View>
        </View>

        <View style={styles.promptCard}>
          <View style={styles.promptTop}>
            <View style={styles.promptIcon}>
              <HeartPulse color={colors.accentDeep} size={22} />
            </View>
            <View style={styles.promptText}>
              <AppText style={styles.promptTitle}>{t('stressFlow.promptTitle')}</AppText>
              <AppText style={styles.promptBody}>
                {t('stressFlow.promptBody')}
              </AppText>
            </View>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <AppText style={styles.summaryLabel}>{t('stressFlow.summary.trigger')}</AppText>
            <AppText
              style={[
                styles.summaryValue,
                trigger ? {} : styles.summaryMuted,
              ]}
            >
              {formatTrigger(trigger)}
            </AppText>
          </View>
          <View style={styles.summaryItem}>
            <AppText style={styles.summaryLabel}>{t('stressFlow.summary.intensity')}</AppText>
            <AppText
              style={[
                styles.summaryValue,
                intensity ? {} : styles.summaryMuted,
              ]}
            >
              {intensity ? `${intensity}/5` : t('stressFlow.summary.notSelected')}
            </AppText>
          </View>
        </View>

        <StressForm
          selectedTrigger={trigger}
          selectedIntensity={intensity}
          onTriggerSelect={setTrigger}
          onIntensitySelect={setIntensity}
        />

        <View style={styles.buttonContainer}>
          <Pressable
            accessibilityRole="button"
            disabled={!isReady}
            onPress={handleContinue}
            style={[
              styles.continueButton,
              isReady ? {} : styles.continueButtonDisabled,
            ]}
          >
            <AppText
              style={[
                styles.continueText,
                isReady ? {} : styles.continueTextDisabled,
              ]}
            >
              {t('stressFlow.continue')}
            </AppText>
            <ArrowRight color={isReady ? colors.surface : colors.textMuted} size={19} />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};


export default StressFlowScreen;
