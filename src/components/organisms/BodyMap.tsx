import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Easing } from 'react-native';

interface BodyMapProps {
  activePart: string;
  phaseColor: string;
}

const BodyMap: React.FC<BodyMapProps> = ({ activePart, phaseColor }) => {
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    glowAnim.setValue(0);
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(glowAnim, {
          toValue: 0.5,
          duration: 900,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ]),
    ).start();
  }, [activePart]);

  return (
    <View style={styles.container}>
      <View style={styles.bodyOutline}>
        {/* Simplified body representation */}
        <Animated.View
          style={[
            styles.bodyPart,
            activePart === 'head' && styles.headActive,
            { borderColor: activePart === 'head' ? phaseColor : '#374151' }
          ]}
        />
        <Animated.View
          style={[
            styles.bodyPart,
            activePart === 'shoulders' && styles.shouldersActive,
            { borderColor: activePart === 'shoulders' ? phaseColor : '#374151' }
          ]}
        />
        <Animated.View
          style={[
            styles.bodyPart,
            activePart === 'arms' && styles.armsActive,
            { borderColor: activePart === 'arms' ? phaseColor : '#374151' }
          ]}
        />
        <Animated.View
          style={[
            styles.bodyPart,
            activePart === 'hands' && styles.handsActive,
            { borderColor: activePart === 'hands' ? phaseColor : '#374151' }
          ]}
        />
        <Animated.View
          style={[
            styles.bodyPart,
            activePart === 'chest' && styles.chestActive,
            { borderColor: activePart === 'chest' ? phaseColor : '#374151' }
          ]}
        />
        <Animated.View
          style={[
            styles.bodyPart,
            activePart === 'core' && styles.coreActive,
            { borderColor: activePart === 'core' ? phaseColor : '#374151' }
          ]}
        />
        <Animated.View
          style={[
            styles.bodyPart,
            activePart === 'thighs' && styles.thighsActive,
            { borderColor: activePart === 'thighs' ? phaseColor : '#374151' }
          ]}
        />
        <Animated.View
          style={[
            styles.bodyPart,
            activePart === 'calves' && styles.calvesActive,
            { borderColor: activePart === 'calves' ? phaseColor : '#374151' }
          ]}
        />
        <Animated.View
          style={[
            styles.bodyPart,
            activePart === 'feet' && styles.feetActive,
            { borderColor: activePart === 'feet' ? phaseColor : '#374151' }
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyOutline: {
    width: 80,
    height: 160,
    position: 'relative',
  },
  bodyPart: {
    position: 'absolute',
    borderWidth: 2,
    borderRadius: 4,
  },
  headActive: {
    width: 20,
    height: 20,
    top: 0,
    left: 30,
  },
  shouldersActive: {
    width: 40,
    height: 8,
    top: 25,
    left: 20,
  },
  armsActive: {
    width: 8,
    height: 30,
    top: 30,
    left: 15,
  },
  handsActive: {
    width: 12,
    height: 12,
    top: 60,
    left: 13,
  },
  chestActive: {
    width: 30,
    height: 20,
    top: 35,
    left: 25,
  },
  coreActive: {
    width: 25,
    height: 25,
    top: 60,
    left: 27.5,
  },
  thighsActive: {
    width: 20,
    height: 30,
    top: 90,
    left: 30,
  },
  calvesActive: {
    width: 12,
    height: 25,
    top: 120,
    left: 34,
  },
  feetActive: {
    width: 15,
    height: 10,
    top: 145,
    left: 32.5,
  },
});

export default BodyMap;
