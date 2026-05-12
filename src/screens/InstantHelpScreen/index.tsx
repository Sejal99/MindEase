import React, { useState, useEffect } from 'react';
import { View, Animated } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';

import Button from '../../components/atoms/Button';
import AppText from '../../components/atoms/AppText';
import Card from '../../components/atoms/Card';
import { styles } from './styles';

type InstantHelpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'InstantHelp'>;
type InstantHelpScreenRouteProp = RouteProp<RootStackParamList, 'InstantHelp'>;

interface InstantHelpScreenProps {
  navigation: InstantHelpScreenNavigationProp;
  route: InstantHelpScreenRouteProp;
}

// Breathing exercise timing constants (in milliseconds)
const BREATHING_CYCLE = 8000;
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
      <View pointerEvents="none" style={styles.blobTopRight} />
      <View pointerEvents="none" style={styles.blobBottomLeft} />
      <View style={styles.content}>
        <AppText variant="h2" style={styles.title}>
          Breathing Exercise
        </AppText>
        <AppText variant="body" style={styles.subtitle}>
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
          textStyle={styles.doneButtonText}
        />
      </View>
    </View>
  );
};


export default InstantHelpScreen;
