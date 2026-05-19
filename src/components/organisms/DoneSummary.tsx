import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import AppText from '../atoms/AppText';
import Button from '../atoms/Button';
import { warmColors as colors } from '../../theme/colors';

interface DoneSummaryProps {
  wordCount: number;
  charCount: number;
  onDone: () => void;
}

const DoneSummary: React.FC<DoneSummaryProps> = ({ wordCount, charCount, onDone }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        speed: 12,
        bounciness: 6,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.summaryCard,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      <AppText style={styles.summaryEmoji}>🧠</AppText>
      <AppText style={styles.summaryTitle}>That's it. You let it out.</AppText>
      <AppText style={styles.summaryBody}>
        You wrote {wordCount} words in 2 minutes. That's mental clutter cleared
        from your head and onto the page.
      </AppText>
      <View style={styles.statRow}>
        <View style={styles.statBox}>
          <AppText style={styles.statValue}>{wordCount}</AppText>
          <AppText style={styles.statLabel}>words</AppText>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <AppText style={styles.statValue}>{charCount}</AppText>
          <AppText style={styles.statLabel}>characters</AppText>
        </View>
      </View>
      <Button
        title="Continue →"
        onPress={onDone}
        variant="primary"
        style={styles.continueBtn}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 24,
    marginTop: 28,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  summaryEmoji: { fontSize: 40, marginBottom: 12 },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 10,
    textAlign: 'center',
  },
  summaryBody: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 20,
  },
  statBox: { alignItems: 'center' },
  statValue: { fontSize: 32, fontWeight: '800', color: colors.accent },
  statLabel: { fontSize: 12, color: colors.textSecondary, fontWeight: '600' },
  statDivider: { width: 1, height: 40, backgroundColor: colors.border },
  continueBtn: { width: '100%', borderRadius: 14 },
});

export default DoneSummary;
