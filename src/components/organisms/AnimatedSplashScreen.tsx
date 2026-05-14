import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  StatusBar,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Sparkles, BrainCircuit } from "lucide-react-native";

import { N } from "../../theme/warm-colors";

interface AnimatedSplashScreenProps {
  onFinish: () => void;
}

const FLOATING_ORBS = [
  { size: 280, color: "rgba(132,205,190,0.18)", x: -140, y: -180 },
  { size: 220, color: "rgba(186,167,255,0.14)", x: 130, y: -120 },
  { size: 240, color: "rgba(255,194,163,0.12)", x: -110, y: 190 },
];

export default function AnimatedSplashScreen({
  onFinish,
}: AnimatedSplashScreenProps) {
  const { height, width } = useWindowDimensions();

  // MAIN ANIMS
  const intro = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const glow = useRef(new Animated.Value(0)).current;
  const breathe = useRef(new Animated.Value(0)).current;
  const textReveal = useRef(new Animated.Value(0)).current;
  const loader = useRef(new Animated.Value(0)).current;
  const exit = useRef(new Animated.Value(1)).current;

  // PARTICLES
  const particles = useRef(
    [...Array(18)].map(() => ({
      x: new Animated.Value(0),
      y: new Animated.Value(0),
      scale: new Animated.Value(0),
      opacity: new Animated.Value(0),
    })),
  ).current;

  useEffect(() => {
    StatusBar.setBarStyle("dark-content");

    Animated.parallel([
      Animated.timing(intro, {
        toValue: 1,
        duration: 1200,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),

      Animated.timing(textReveal, {
        toValue: 1,
        duration: 1500,
        delay: 300,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),

      Animated.timing(loader, {
        toValue: 1,
        duration: 3200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    // FLOATING PARTICLES
    particles.forEach((p, i) => {
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(p.x, {
              toValue: Math.random() * 120 - 60,
              duration: 3000 + i * 120,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(p.y, {
              toValue: Math.random() * 160 - 80,
              duration: 3000 + i * 140,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(p.scale, {
              toValue: 1,
              duration: 900,
              useNativeDriver: true,
            }),
            Animated.timing(p.opacity, {
              toValue: 1,
              duration: 900,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(p.scale, {
              toValue: 0.4,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(p.opacity, {
              toValue: 0.3,
              duration: 2000,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ).start();
    });

    // ROTATING ENERGY RING
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 14000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    // BREATHING EFFECT
    Animated.loop(
      Animated.sequence([
        Animated.timing(breathe, {
          toValue: 1,
          duration: 2600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(breathe, {
          toValue: 0,
          duration: 2600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // GLOW PULSE
    Animated.loop(
      Animated.sequence([
        Animated.timing(glow, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(glow, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ]),
    ).start();

    // MICRO PULSE
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    const timeout = setTimeout(() => {
      Animated.parallel([
        Animated.timing(exit, {
          toValue: 0,
          duration: 550,
          easing: Easing.in(Easing.exp),
          useNativeDriver: true,
        }),
      ]).start(onFinish);
    }, 4200);

    return () => clearTimeout(timeout);
  }, []);

  const rotateDeg = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const reverseRotate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["360deg", "0deg"],
  });

  const scalePulse = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.06],
  });

  const breatheScale = breathe.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.08],
  });

  const glowShadow = glow.interpolate({
    inputRange: [0, 1],
    outputRange: [12, 32],
  });

  const titleTranslate = textReveal.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 0],
  });

  return (
    <Animated.View
      style={[
        styles.root,
        {
          minHeight: height,
          opacity: exit,
          transform: [
            {
              scale: exit.interpolate({
                inputRange: [0, 1],
                outputRange: [1.12, 1],
              }),
            },
          ],
        },
      ]}
    >
      {/* BACKGROUND */}
      <LinearGradient
        colors={["#FDFCF8", "#EEF7F3", "#F6F1FF", "#FFF8F3"]}
        locations={[0, 0.35, 0.7, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* MASSIVE FLOATING BLUR ORBS */}
      {FLOATING_ORBS.map((orb, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bgOrb,
            {
              width: orb.size,
              height: orb.size,
              borderRadius: orb.size / 2,
              backgroundColor: orb.color,
              transform: [
                { translateX: orb.x },
                { translateY: orb.y },
                { scale: breatheScale },
              ],
            },
          ]}
        />
      ))}

      {/* PARTICLES */}
      {particles.map((p, index) => (
        <Animated.View
          key={index}
          style={[
            styles.particle,
            {
              left: width / 2,
              top: height / 2 - 60,
              opacity: p.opacity,
              transform: [
                { translateX: p.x },
                { translateY: p.y },
                { scale: p.scale },
              ],
            },
          ]}
        />
      ))}

      <Animated.View
        style={[
          styles.content,
          {
            opacity: intro,
            transform: [{ scale: scalePulse }],
          },
        ]}
      >
        {/* ENERGY SYSTEM */}
        <View style={styles.energyWrap}>
          {/* OUTER ROTATION */}
          <Animated.View
            style={[
              styles.energyRing,
              styles.energyRingOuter,
              {
                transform: [{ rotate: rotateDeg }],
              },
            ]}
          />

          {/* MIDDLE ROTATION */}
          <Animated.View
            style={[
              styles.energyRing,
              styles.energyRingMiddle,
              {
                transform: [{ rotate: reverseRotate }],
              },
            ]}
          />

          {/* GLOW */}
          <Animated.View
            style={[
              styles.glow,
              {
                shadowRadius: glowShadow,
              },
            ]}
          />

          {/* MAIN LOGO CONTAINER */}
          <Animated.View
            style={[
              styles.logoContainer,
              {
                transform: [{ scale: breatheScale }],
              },
            ]}
          >
            <LinearGradient
              colors={["#FFFFFF", "#F7F9F8"]}
              style={styles.logoGradient}
            >
              {/* GLASS OVERLAY */}
              <View style={styles.glassOverlay} />

              <View style={styles.iconCore}>
                <Image
                  source={require("../../../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png")}
                  style={styles.icon}
                />
              </View>

              {/* FLOATING CHIP */}
              <View style={styles.aiBadge}>
                <BrainCircuit color="#2F6E63" size={15} />
              </View>

              {/* SHIMMER */}
              <Animated.View
                style={[
                  styles.shimmer,
                  {
                    transform: [
                      {
                        translateX: glow.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-120, 120],
                        }),
                      },
                      { rotate: "18deg" },
                    ],
                  },
                ]}
              />
            </LinearGradient>
          </Animated.View>

          {/* FLOATING STAR */}
          <Animated.View
            style={[
              styles.sparkle,
              {
                transform: [
                  {
                    scale: scalePulse,
                  },
                ],
              },
            ]}
          >
            <Sparkles color="#5E7B74" size={18} />
          </Animated.View>
        </View>

        {/* TYPOGRAPHY */}
        <Animated.View
          style={{
            opacity: textReveal,
            transform: [{ translateY: titleTranslate }],
          }}
        >
          <Text style={styles.title}>MindEase</Text>

          <Text style={styles.subtitle}>
            Your safe space to breathe, reset & heal
          </Text>
        </Animated.View>

        {/* ADVANCED LOADER */}
        <View style={styles.loaderWrap}>
          <View style={styles.loaderTrack}>
            <Animated.View
              style={[
                styles.loaderFill,
                {
                  transform: [{ scaleX: loader }],
                },
              ]}
            />
          </View>

          <View style={styles.dotRow}>
            {[0, 1, 2].map((i) => {
              const dotScale = pulse.interpolate({
                inputRange: [0, 1],
                outputRange: [0.7, 1.4],
              });

              return (
                <Animated.View
                  key={i}
                  style={[
                    styles.dot,
                    {
                      transform: [{ scale: dotScale }],
                      opacity: pulse.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.35, 1],
                      }),
                    },
                  ]}
                />
              );
            })}
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FDFCF8",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  bgOrb: {
    position: "absolute",
    opacity: 1,
  },

  particle: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#9FD5C7",
  },

  content: {
    alignItems: "center",
    justifyContent: "center",
  },

  energyWrap: {
    width: 310,
    height: 310,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 34,
  },

  energyRing: {
    position: "absolute",
    borderRadius: 999,
  },

  energyRingOuter: {
    width: 290,
    height: 290,
    borderWidth: 1,
    borderColor: "rgba(92,143,131,0.18)",
    borderStyle: "dashed",
  },

  energyRingMiddle: {
    width: 240,
    height: 240,
    borderWidth: 1,
    borderColor: "rgba(140,119,255,0.16)",
  },

  glow: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 999,
    backgroundColor: "rgba(146,216,196,0.18)",
    shadowColor: "#77B6A5",
    shadowOpacity: 0.5,
    elevation: 25,
  },

  logoContainer: {
    width: 170,
    height: 170,
    borderRadius: 52,
    overflow: "hidden",
    shadowColor: "#7DB5A4",
    shadowOffset: {
      width: 0,
      height: 25,
    },
    shadowOpacity: 0.24,
    shadowRadius: 30,
    elevation: 18,
  },

  logoGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 52,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.7)",
    overflow: "hidden",
  },

  glassOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "50%",
    backgroundColor: "rgba(255,255,255,0.28)",
  },

  iconCore: {
    width: 92,
    height: 92,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "#fff",
  },

  icon: {
    width: "100%",
    height: "100%",
  },

  aiBadge: {
    position: "absolute",
    bottom: 18,
    right: 18,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#ECFFFA",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(92,143,131,0.14)",
  },

  shimmer: {
    position: "absolute",
    width: 40,
    height: 260,
    backgroundColor: "rgba(255,255,255,0.35)",
  },

  sparkle: {
    position: "absolute",
    top: 42,
    right: 34,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#7DB5A4",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },

  title: {
    fontSize: 48,
    fontWeight: "900",
    color: "#64a89d",
    letterSpacing: -2,
    textAlign: "center"
  },

  subtitle: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 24,
    color: "#58726D",
    textAlign: "center",
    fontWeight: "600",
    paddingHorizontal: 40,
  },

  loaderWrap: {
    marginTop: 42,
    alignItems: "center",
  },

  loaderTrack: {
    width: 210,
    height: 6,
    borderRadius: 999,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.05)",
  },

  loaderFill: {
    width: "100%",
    height: "100%",
    backgroundColor: "#7CB7A8",
    borderRadius: 999,
  },

  dotRow: {
    flexDirection: "row",
    marginTop: 16,
    gap: 8,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#7CB7A8",
  },
});