import React, { useEffect, useRef } from 'react';
import { View, Pressable, Animated, StyleSheet } from 'react-native';
import AppText from '../atoms/AppText';

interface HeroButtonProps {
  onPress: () => void;
}

const HeroButton: React.FC<HeroButtonProps> = ({ onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const enterAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(enterAnim, {
        toValue: 1,
        duration: 600,
        delay: 100,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        delay: 100,
        useNativeDriver: true,
        speed: 12,
        bounciness: 5,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0.8],
  });

  return (
    <Animated.View
      style={{
        opacity: enterAnim,
        transform: [{ translateY: slideAnim }],
        marginBottom: 20,
      }}
    >
      <Pressable
        onPressIn={() =>
          Animated.spring(scaleAnim, {
            toValue: 0.97,
            useNativeDriver: true,
            speed: 50,
            bounciness: 0,
          }).start()
        }
        onPressOut={() =>
          Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            speed: 20,
            bounciness: 5,
          }).start()
        }
        onPress={onPress}
      >
        <Animated.View
          style={[styles.hero, { transform: [{ scale: scaleAnim }] }]}
        >
          <Animated.View style={[styles.heroGlow, { opacity: glowOpacity }]} />

          <View style={styles.heroInner}>
            <View style={styles.heroLeft}>
              <View style={styles.heroBadge}>
                <AppText style={styles.heroBadgeText}>CHECK IN</AppText>
              </View>
              <AppText style={styles.heroTitle}>
                How are you{'\n'}feeling?
              </AppText>
              <AppText style={styles.heroSub}>
                Get matched to the right activity for your state right now.
              </AppText>
            </View>
            <View style={styles.heroRight}>
              <AppText style={styles.heroEmoji}>💙</AppText>
              <View style={styles.heroArrowBox}>
                <AppText style={styles.heroArrow}>→</AppText>
              </View>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  hero: {
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#0F1828',
    borderWidth: 1,
    borderColor: '#1E3A5F',
  },
  heroGlow: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOpacity: 0.6,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 0 },
  },
  heroInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 22,
    gap: 16,
  },
  heroLeft: { flex: 1 },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#1E3A5F',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2563EB40',
  },
  heroBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#60A5FA',
    letterSpacing: 1.5,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#E8EDF5',
    lineHeight: 32,
    marginBottom: 8,
  },
  heroSub: { fontSize: 13, color: '#3D4F6E', lineHeight: 19 },
  heroRight: { alignItems: 'center', gap: 12 },
  heroEmoji: { fontSize: 20 },
  heroArrowBox: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroArrow: { fontSize: 16, color: '#fff', fontWeight: '700' },
});

export default HeroButton;
