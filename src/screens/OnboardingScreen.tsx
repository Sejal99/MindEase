import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

import Button from '../components/atoms/Button';
import AppText from '../components/atoms/AppText';
import Card from '../components/atoms/Card';
import useHomeViewModel from '../viewmodels/homeViewModel';

type OnboardingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

interface OnboardingScreenProps {
  navigation: OnboardingScreenNavigationProp;
}

const { width } = Dimensions.get('window');

interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  emoji: string;
  color: string;
}

const SLIDES: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Welcome to Stress Guide',
    description: 'Your personal mental wellness companion. Track your stress, practice relief techniques, and build healthy habits.',
    emoji: '🧘',
    color: '#6366F1',
  },
  {
    id: 2,
    title: 'Log Your Stress',
    description: 'When you feel stressed, tap "I\'m Stressed" to log your trigger and intensity level.',
    emoji: '📝',
    color: '#10B981',
  },
  {
    id: 3,
    title: 'Choose Your Relief',
    description: 'Select from 5 evidence-based techniques: Breathing, Grounding, Brain Dump, Movement, or Thought Reframing.',
    emoji: '🎯',
    color: '#F59E0B',
  },
  {
    id: 4,
    title: 'Track Your Progress',
    description: 'View your history, gain insights from your patterns, and unlock achievements as you build your streak.',
    emoji: '📊',
    color: '#EC4899',
  },
  {
    id: 5,
    title: 'Build Healthy Habits',
    description: 'Consistent practice leads to better stress management. Start your journey today!',
    emoji: '🌟',
    color: '#8B5CF6',
  },
];

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const { completeOnboarding } = useHomeViewModel();

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
    navigation.replace('Home');
  };

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / width);
    setCurrentIndex(newIndex);
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
              <View style={[styles.emojiContainer, { backgroundColor: slide.color + '20' }]}>
                <AppText variant="h1" style={styles.emoji}>
                  {slide.emoji}
                </AppText>
              </View>
              
              <AppText variant="h2" style={styles.title}>
                {slide.title}
              </AppText>
              
              <AppText variant="body" color="#9CA3AF" style={styles.description}>
                {slide.description}
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
              title="Skip"
              onPress={handleSkip}
              variant="secondary"
              style={styles.skipButton}
            />
          )}
          <Button
            title={currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
            onPress={handleNext}
            variant="primary"
            style={currentIndex === SLIDES.length - 1 ? styles.fullButton : styles.nextButton}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    maxWidth: 400,
  },
  emojiContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  emoji: {
    fontSize: 64,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#111827',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#6366F1',
    width: 24,
  },
  inactiveDot: {
    backgroundColor: '#374151',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  skipButton: {
    flex: 1,
  },
  nextButton: {
    flex: 2,
  },
  fullButton: {
    flex: 1,
  },
});

export default OnboardingScreen;
