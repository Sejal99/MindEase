import React, { useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Animated,
  Pressable,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { TabParamList } from "../../navigation/AppNavigator";

import AppText from "../../components/atoms/AppText";
import useHistoryViewModel from "../../viewmodels/historyViewModel";
import { formatActionName } from "../../utils/insights";
import { styles } from "./styles";
import {
  formatTrigger,
  formatTime,
  getEffectivenessColor,
} from "../../utils/formatters";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../theme/ThemeProvider";
import {
  Leaf,
  Briefcase,
  Home as HomeIcon,
  AlertCircle,
  HeartPulse,
  Circle,
  HelpCircle,
  Users,
  Sparkles,
  ClipboardList,
  MessageSquare,
  Wallet,
  BrainCircuit,
} from "lucide-react-native";

interface HistoryScreenProps {
  navigation: NavigationProp<TabParamList>;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ navigation }) => {
  const { groupedEvents, loadEvents } = useHistoryViewModel();
  const { t } = useTranslation();
  const { colors } = useTheme();

  const fadeAnims = useRef<Animated.Value[]>([]).current;
  const slideAnims = useRef<Animated.Value[]>([]).current;

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const dates = Object.keys(groupedEvents).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  );

  // Initialize animation values for each date group
  dates.forEach((_, i) => {
    if (!fadeAnims[i]) {
      fadeAnims[i] = new Animated.Value(0);
      slideAnims[i] = new Animated.Value(20);
    }
  });

  useEffect(() => {
    // Staggered gentle entrance
    const animations = dates.map((_, i) =>
      Animated.parallel([
        Animated.timing(fadeAnims[i], {
          toValue: 1,
          duration: 700,
          delay: i * 120,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnims[i], {
          toValue: 0,
          duration: 700,
          delay: i * 120,
          useNativeDriver: true,
        }),
      ]),
    );
    Animated.stagger(100, animations).start();
  }, [dates.length]);

  const totalSessions = dates.reduce(
    (sum, date) => sum + groupedEvents[date].length,
    0,
  );

  // Get a gentle accent color based on index
  const getAccentColors = (index: number) => {
    const palettes = [
      { main: colors.sage, light: colors.sageLight },
      { main: colors.lavender, light: colors.lavenderLight },
      { main: colors.peach, light: colors.peachLight },
      { main: colors.sky, light: colors.skyLight },
    ];
    return palettes[index % palettes.length];
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Soft decorative blobs — organic, hand-placed */}
      <View style={[styles.blob, styles.blobTopRight, { backgroundColor: colors.blob1 }]} pointerEvents="none" />
      <View style={[styles.blob, styles.blobMidLeft, { backgroundColor: colors.blob2 }]} pointerEvents="none" />
      <View
        style={[styles.blob, styles.blobBottomRight, { backgroundColor: colors.blob3 }]}
        pointerEvents="none"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <View style={styles.headerSection}>
          <AppText style={[styles.headerGreeting, { color: colors.textSecondary }]}>
            {t("history.greeting")}
          </AppText>
          <AppText style={[styles.headerTitle, { color: colors.text }]}>
            {t("history.title")}
          </AppText>

          {/* Soft stat pills */}
          <View style={styles.statRow}>
            <View style={[styles.statPill, { backgroundColor: colors.sageLight }]}>
              <AppText style={[styles.statNumber, { color: colors.sage }]}>
                {totalSessions}
              </AppText>
              <AppText style={[styles.statLabel, { color: colors.textSecondary }]}>
                {t("history.sessions")}
              </AppText>
            </View>
            <View style={[styles.statPill, { backgroundColor: colors.peachLight }]}>
              <AppText style={[styles.statNumber, { color: colors.peach }]}>
                {dates.length}
              </AppText>
              <AppText style={[styles.statLabel, { color: colors.textSecondary }]}>
                {t("history.days")}
              </AppText>
            </View>
          </View>
        </View>

        {/* ── EMPTY STATE ──────────────────────────────────────────────────── */}
        {dates.length === 0 && (
          <View style={styles.emptyState}>
            <View style={[styles.emptyIconCircle, { backgroundColor: colors.sageLight }]}>
              <Leaf color={colors.sage} size={32} />
            </View>
            <AppText style={[styles.emptyTitle, { color: colors.text }]}>
              {t("history.empty.title")}
            </AppText>
            <AppText style={[styles.emptyText, { color: colors.textSecondary }]}>
              {t("history.empty.subtitle")}
            </AppText>
            <Pressable
              style={[styles.emptyButton, { backgroundColor: colors.text }]}
              onPress={() => navigation.getParent()?.navigate("StressFlow")}
            >
              <AppText style={[styles.emptyButtonText, { color: colors.background }]}>
                {t("history.empty.cta")}
              </AppText>
            </Pressable>
          </View>
        )}

        {/* ── EVENT LIST ─────────────────────────────────────────────────── */}
        {dates.map((date, dateIndex) => {
          const accent = getAccentColors(dateIndex);
          return (
            <Animated.View
              key={date}
              style={[
                styles.dayGroup,
                {
                  opacity: fadeAnims[dateIndex] || 1,
                  transform: [{ translateY: slideAnims[dateIndex] || 0 }],
                },
              ]}
            >
              {/* Date header — soft, whispered */}
              <View style={styles.dateHeaderRow}>
                <View style={[styles.dateLine, { backgroundColor: colors.textMuted }]} />
                <AppText style={[styles.dateLabel, { color: colors.textMuted }]}>{date}</AppText>
                <View style={[styles.dateLine, { backgroundColor: colors.textMuted }]} />
              </View>

              {groupedEvents[date].map((event) => (
                <View
                  key={event.id}
                  style={[
                    styles.card,
                    {
                      backgroundColor:
                        dateIndex % 2 === 0 ? colors.card : colors.cardWarm,
                      shadowColor: colors.textSecondary,
                    },
                  ]}
                >
                  {/* Soft left accent bar */}
                  <View
                    style={[
                      styles.cardAccent,
                      {
                        backgroundColor:
                          getEffectivenessColor(event.effectiveness) + "40",
                      },
                    ]}
                  />

                  <View style={styles.cardBody}>
                    {/* Top row: trigger + time */}
                    <View style={styles.cardTop}>
                      <View style={styles.triggerRow}>
                        {getTriggerIcon(event.trigger, colors.text, 18)}
                        <AppText style={[styles.triggerName, { color: colors.text }]}>
                          {formatTrigger(event.trigger)}
                        </AppText>
                      </View>
                      <AppText style={[styles.timeLabel, { color: colors.textMuted }]}>
                        {formatTime(event.createdAt)}
                      </AppText>
                    </View>

                    {/* Action taken */}
                    <View style={styles.actionRow}>
                      <View
                        style={[
                          styles.actionBadge,
                          { backgroundColor: accent.light },
                        ]}
                      >
                        <AppText
                          style={[
                            styles.actionBadgeText,
                            { color: accent.main },
                          ]}
                        >
                          {formatActionName(event.action)}
                        </AppText>
                      </View>
                    </View>

                    {/* Bottom: intensity + effectiveness */}
                    <View style={styles.cardBottom}>
                      <View style={styles.intensityWrap}>
                        <View style={styles.dotsRow}>
                          {[1, 2, 3, 4, 5].map((step) => (
                            <View
                              key={step}
                              style={[
                                styles.intensityDot,
                                step <= event.intensity
                                  ? [
                                      styles.dotFilled,
                                      { backgroundColor: accent.main },
                                    ]
                                  : [styles.dotEmpty, { backgroundColor: colors.divider }],
                              ]}
                            />
                          ))}
                        </View>
                        <AppText style={[styles.intensityLabel, { color: colors.textMuted }]}>
                          {t("history.intensity")}{" "}
                          {event.intensity}/5
                        </AppText>
                      </View>

                      <View
                        style={[
                          styles.effectBadge,
                          {
                            backgroundColor:
                              getEffectivenessColor(event.effectiveness) + "18",
                          },
                        ]}
                      >
                        <View
                          style={[
                            styles.effectDot,
                            {
                              backgroundColor: getEffectivenessColor(
                                event.effectiveness,
                              ),
                            },
                          ]}
                        />
                        <AppText
                          style={[
                            styles.effectText,
                            {
                              color: getEffectivenessColor(event.effectiveness),
                            },
                          ]}
                        >
                          {event.effectiveness}
                        </AppText>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </Animated.View>
          );
        })}

        {/* Gentle closing space */}
        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// Helper: map triggers to Lucide icons
function getTriggerIcon(trigger: string, color: string, size: number) {
  const lower = trigger.toLowerCase();
  const map: Record<string, React.ReactNode> = {
    work: <Briefcase color={color} size={size} />,
    family: <HomeIcon color={color} size={size} />,
    health: <HeartPulse color={color} size={size} />,
    finance: <Wallet color={color} size={size} />,
    relationships: <MessageSquare color={color} size={size} />,
    other: <Circle color={color} size={size} />,
    overthinking: <BrainCircuit color={color} size={size} />,
    social: <Users color={color} size={size} />,
  };
  return map[lower] || <Sparkles color={color} size={size} />;
}


export default HistoryScreen;
