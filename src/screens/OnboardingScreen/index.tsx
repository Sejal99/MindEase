import React, { useState, useRef } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Activity, PenLine, Target, BarChart3, Sparkles } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import Button from '../../components/atoms/Button';
import AppText from '../../components/atoms/AppText';
import Card from '../../components/atoms/Card';
import useHomeViewModel from '../../viewmodels/homeViewModel';
import { styles } from './styles';
import { darkTheme } from '../../theme/colors';

type OnboardingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

interface OnboardingScreenProps {
  navigation: OnboardingScreenNavigationProp;
}

const { width } = Dimensions.get('window');

interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const SLIDES: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Welcome to Stress Guide',
    description: 'Your personal mental wellness companion. Track your stress, practice relief techniques, and build healthy habits.',
    icon: <Activity color={darkTheme.primary} size={48} />,
    color: darkTheme.primary,
  },
  {
    id: 2,
    title: 'Log Your Stress',
    description: 'When you feel stressed, tap "I\'m Stressed" to log your trigger and intensity level.',
    icon: <PenLine color={darkTheme.success} size={48} />,
    color: darkTheme.success,
  },
  {
    id: 3,
    title: 'Choose Your Relief',
    description: 'Select from 5 evidence-based techniques: Breathing, Grounding, Brain Dump, Movement, or Thought Reframing.',
    icon: <Target color={darkTheme.warning} size={48} />,
    color: darkTheme.warning,
  },
  {
    id: 4,
    title: 'Track Your Progress',
    description: 'View your history, gain insights from your patterns, and unlock achievements as you build your streak.',
    icon: <BarChart3 color={darkTheme.accent} size={48} />,
    color: darkTheme.accent,
  },
  {
    id: 5,
    title: 'Build Healthy Habits',
    description: 'Consistent practice leads to better stress management. Start your journey today!',
    icon: <Sparkles color={darkTheme.primary} size={48} />,
    color: darkTheme.primary,
  },
];

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const { completeOnboarding } = useHomeViewModel();
  const { t } = useTranslation();

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({ x: nextIndex * width, animated: true });
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    completeOnboarding();
    navigation.replace('MainTabs');
  };

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / width);
    setCurrentIndex(newIndex);
  };

  // Create a mapping from original titles to translation keys
  const slideTitleMap: Record<string, string> = {
    'Welcome to Stress Guide': 'onboarding.slides.0.title',
    'Log Your Stress': 'onboarding.slides.1.title',
    'Choose Your Relief': 'onboarding.slides.2.title',
    'Track Your Progress': 'onboarding.slides.3.title',
    'Build Healthy Habits': 'onboarding.slides.4.title',
  };

  const slideDescriptionMap: Record<string, string> = {
    'Your personal mental wellness companion. Track your stress, practice relief techniques, and build healthy habits.': 'onboarding.slides.0.description',
    'When you feel stressed, tap "I\'m Stressed" to log your trigger and intensity level.': 'onboarding.slides.1.description',
    'Select from 5 evidence-based techniques: Breathing, Grounding, Brain Dump, Movement, or Thought Reframing.': 'onboarding.slides.2.description',
    'View your history, gain insights from your patterns, and unlock achievements as you build your streak.': 'onboarding.slides.3.description',
    'Consistent practice leads to better stress management. Start your journey today!': 'onboarding.slides.4.description',
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.scrollView}
      >
        {SLIDES.map((slide) => (
          <View key={slide.id} style={[styles.slide, { width }]}>
            <View style={styles.content}>
              <View style={[styles.iconContainer, { backgroundColor: slide.color + '20' }]}>
                {slide.icon}
              </View>

              <AppText variant="h2" style={styles.title}>
                {t(slideTitleMap[slide.title] || slide.title)}
              </AppText>

              <AppText variant="body" color={darkTheme.textSecondary} style={styles.description}>
                {t(slideDescriptionMap[slide.description] || slide.description)}
              </AppText>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          {currentIndex < SLIDES.length - 1 && (
            <Button
              title={t('onboarding.skip')}
              onPress={handleSkip}
              variant="secondary"
              style={styles.skipButton}
            />
          )}
          <Button
            title={currentIndex === SLIDES.length - 1 ? t('onboarding.getStarted') : t('onboarding.next')}
            onPress={handleNext}
            variant="primary"
            style={currentIndex === SLIDES.length - 1 ? styles.fullButton : styles.nextButton}
          />
        </View>
      </View>
    </View>
  );
};


export default OnboardingScreen;
