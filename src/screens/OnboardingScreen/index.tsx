import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StatusBar,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Leaf,
  PenLine,
  Wind,
} from "lucide-react-native";
import { useTranslation } from "react-i18next";

import AppText from "../../components/atoms/AppText";
import useHomeViewModel from "../../viewmodels/homeViewModel";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { N } from "../../theme/warm-colors";
import { styles } from "./styles";

type OnboardingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Onboarding"
>;

interface OnboardingScreenProps {
  navigation: OnboardingScreenNavigationProp;
}

const { width } = Dimensions.get("window");

type Slide = {
  id: string;
  title: string;
  description: string;
  note: string;
  color: string;
  soft: string;
  icon: React.ElementType;
};

const SLIDES: Slide[] = [
  {
    id: "notice",
    title: "Notice stress early.",
    description:
      "Check in with your body and name what is happening before it builds up.",
    note: "A calmer first step",
    color: N.accent,
    soft: N.accentDim,
    icon: Leaf,
  },
  {
    id: "log",
    title: "Log it in seconds.",
    description:
      "Capture your trigger and intensity with a simple flow made for real moments.",
    note: "Quick, private, useful",
    color: N.teal,
    soft: N.tealDim,
    icon: PenLine,
  },
  {
    id: "reset",
    title: "Choose a reset.",
    description:
      "Breathing, grounding, movement, reflection, and sound are ready when you need them.",
    note: "Tools for the moment",
    color: N.lavender,
    soft: N.lavenderDim,
    icon: Wind,
  },
  {
    id: "learn",
    title: "See your patterns.",
    description:
      "Gentle insights help you understand what supports you over time.",
    note: "Progress without pressure",
    color: N.blush,
    soft: N.blushDim,
    icon: BarChart3,
  },
];

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<any>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(1)).current;
  const fade = useRef(new Animated.Value(0)).current;
  const { completeOnboarding } = useHomeViewModel();
  const { t } = useTranslation();

  const currentSlide = SLIDES[currentIndex];

  useEffect(() => {
    StatusBar.setBarStyle("dark-content");

    Animated.timing(fade, {
      toValue: 1,
      duration: 450,
      useNativeDriver: true,
    }).start();

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.06,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
      ]),
    );

    loop.start();
    return () => {
      loop.stop();
      pulse.stopAnimation();
    };
  }, [fade, pulse]);

  const finish = () => {
    completeOnboarding();
    navigation.replace("MainTabs");
  };

  const next = () => {
    if (currentIndex === SLIDES.length - 1) {
      finish();
      return;
    }

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    scrollRef.current?.scrollTo({
      x: nextIndex * width,
      animated: true,
    });
  };

  const onScrollEnd = (event: {
    nativeEvent: { contentOffset: { x: number } };
  }) => {
    setCurrentIndex(Math.round(event.nativeEvent.contentOffset.x / width));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.header, { opacity: fade }]}>
        <AppText style={styles.brand}>Stress Guide</AppText>
        <Pressable onPress={finish} hitSlop={12}>
          <AppText style={styles.skip}>{t("onboarding.skip")}</AppText>
        </Pressable>
      </Animated.View>

      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
        style={styles.slider}
      >
        {SLIDES.map((slide, index) => {
          const Icon = slide.icon;
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [18, 0, 18],
            extrapolate: "clamp",
          });

          return (
            <View key={slide.id} style={[styles.slide, { width }]}>
              <Animated.View
                style={[
                  styles.slideInner,
                  {
                    opacity,
                    transform: [{ translateY }],
                  },
                ]}
              >
                <View style={styles.visualWrap}>
                  <Animated.View
                    style={[
                      styles.outerRing,
                      {
                        borderColor: slide.soft,
                        transform: [{ scale: index === currentIndex ? pulse : 1 }],
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.iconHalo,
                        { backgroundColor: slide.soft, borderColor: slide.color },
                      ]}
                    >
                      <View
                        style={[
                          styles.iconCore,
                          { backgroundColor: slide.color },
                        ]}
                      >
                        <Icon color={N.surface} size={34} strokeWidth={2.2} />
                      </View>
                    </View>
                  </Animated.View>
                </View>

                <View style={styles.copy}>
                  <AppText style={styles.note}>{slide.note}</AppText>
                  <AppText style={styles.title}>{slide.title}</AppText>
                  <AppText style={styles.description}>{slide.description}</AppText>
                </View>
              </Animated.View>
            </View>
          );
        })}
      </Animated.ScrollView>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {SLIDES.map((slide, index) => (
            <View
              key={slide.id}
              style={[
                styles.dot,
                index === currentIndex && {
                  width: 26,
                  backgroundColor: currentSlide.color,
                },
              ]}
            />
          ))}
        </View>

        <Pressable
          onPress={next}
          style={[styles.cta, { backgroundColor: currentSlide.color }]}
        >
          {currentIndex === SLIDES.length - 1 ? (
            <CheckCircle2 color={N.surface} size={19} />
          ) : null}
          <AppText style={styles.ctaText}>
            {currentIndex === SLIDES.length - 1
              ? t("onboarding.getStarted")
              : t("onboarding.next")}
          </AppText>
          {currentIndex === SLIDES.length - 1 ? null : (
            <ArrowRight color={N.surface} size={19} />
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
