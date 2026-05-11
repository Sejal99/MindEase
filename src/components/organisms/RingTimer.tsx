import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import AppText from '../atoms/AppText';
import { darkTheme } from '../../theme/colors';

interface RingTimerProps {
  timeLeft: number;
  total: number;
  color: string;
}

const RingTimer: React.FC<RingTimerProps> = ({ timeLeft, total, color }) => {
  const progress = (total - timeLeft) / total;
  const rotation = progress * 360;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <View style={styles.container}>
      <View style={[styles.ring, { borderColor: color + "30" }]}>
        <Animated.View
          style={[
            styles.progress,
            {
              borderColor: color,
              transform: [{ rotate: `${rotation}deg` }],
            },
          ]}
        />
      </View>
      <View style={styles.center}>
        <AppText variant="h3" style={[styles.time, { color }]}>
          {minutes}:{seconds.toString().padStart(2, "0")}
        </AppText>
        <AppText variant="caption" color={darkTheme.textSecondary} style={styles.label}>
          remaining
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  ring: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  progress: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 8,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
  },
  center: {
    alignItems: "center",
  },
  time: {
    fontSize: 20,
    fontWeight: "800",
  },
  label: {
    marginTop: 2,
  },
});

export default RingTimer;
