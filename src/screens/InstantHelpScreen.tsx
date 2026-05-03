import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

import Button from '../components/atoms/Button';
import AppText from '../components/atoms/AppText';
import Card from '../components/atoms/Card';

type InstantHelpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'InstantHelp'>;
type InstantHelpScreenRouteProp = RouteProp<RootStackParamList, 'InstantHelp'>;

interface InstantHelpScreenProps {
  navigation: InstantHelpScreenNavigationProp;
  route: InstantHelpScreenRouteProp;
}

const BREATHING_CYCLE = 8000; // 8 seconds per cycle
const INHALE_DURATION = 4000;
const HOLD_DURATION = 1000;
const EXHALE_DURATION = 3000;

const InstantHelpScreen: React.FC<InstantHelpScreenProps> = ({ navigation, route }) => {
  const { trigger, intensity } = route.params;
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [scale] = useState(new Animated.Value(1));

  useEffect(() => {
    let phaseTimer: NodeJS.Timeout;
    let animationTimer: NodeJS.Timeout;

    const animateBreathing = () => {
      setPhase('inhale');
      
      // Inhale animation
      Animated.timing(scale, {
        toValue: 1.5,
        duration: INHALE_DURATION,
        useNativeDriver: true,
      }).start();

      phaseTimer = setTimeout(() => {
        setPhase('hold');
        
        // Hold
        animationTimer = setTimeout(() => {
          setPhase('exhale');
          
          // Exhale animation
          Animated.timing(scale, {
            toValue: 1,
            duration: EXHALE_DURATION,
            useNativeDriver: true,
          }).start();
        }, HOLD_DURATION);
      }, INHALE_DURATION);
    };

    animateBreathing();
    const interval = setInterval(animateBreathing, BREATHING_CYCLE);

    return () => {
      clearInterval(interval);
      clearTimeout(phaseTimer);
      clearTimeout(animationTimer);
    };
  }, [scale]);

  const handleDone = () => {
    navigation.navigate('Feedback', {
      trigger,
      intensity,
      action: 'breathing',
    });
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return 'Inhale';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Exhale';
    }
  };

  const getInstruction = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe in slowly through your nose';
      case 'hold':
        return 'Hold your breath gently';
      case 'exhale':
        return 'Breathe out slowly through your mouth';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <AppText variant="h2" style={styles.title}>
          Breathing Exercise
        </AppText>
        <AppText variant="body" color="#9CA3AF" style={styles.subtitle}>
          Follow the circle to calm your mind
        </AppText>

        <View style={styles.circleContainer}>
          <Animated.View
            style={[
              styles.circle,
              {
                transform: [{ scale }],
              },
            ]}
          />
          <View style={styles.phaseTextContainer}>
            <AppText variant="h3" style={styles.phaseText}>
              {getPhaseText()}
            </AppText>
          </View>
        </View>

        <Card style={styles.instructionCard}>
          <AppText variant="body" style={styles.instruction}>
            {getInstruction()}
          </AppText>
        </Card>

        <Button
          title="I'm Done"
          onPress={handleDone}
          variant="primary"
          style={styles.doneButton}
        />
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
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 40,
  },
  circleContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  circle: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#6366F1',
    opacity: 0.3,
  },
  phaseTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  phaseText: {
    color: '#6366F1',
  },
  instructionCard: {
    marginBottom: 32,
    width: '100%',
  },
  instruction: {
    textAlign: 'center',
  },
  doneButton: {
    width: '100%',
  },
});

export default InstantHelpScreen;
