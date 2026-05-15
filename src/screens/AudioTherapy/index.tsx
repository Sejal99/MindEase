import React, { useEffect, useRef, useState } from "react";
import {
  View,
  ScrollView,
  Pressable,
  Animated,
  StyleSheet,
} from "react-native";
import TrackPlayer, {
  usePlaybackState,
  useProgress,
  State,
  RepeatMode,
} from "react-native-track-player";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Leaf,
  Droplets,
  Waves,
  Flame,
  Music,
  Radio,
  Stars,
  Heart,
  Brain,
  Wind,
  Moon,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  ChevronDown,
} from "lucide-react-native";
import Slider from "@react-native-community/slider";

import AppText from "../../components/atoms/AppText";
import { N } from "../../theme/warm-colors";
import {
  ALL_TRACKS,
  TRACK_CATEGORIES,
  BrowsableTrack,
  TrackCategory,
} from "../../models/audio-sessions";

// ── Icon map ────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.FC<{ color: string; size: number }>> = {
  Leaf,
  Droplets,
  Waves,
  Flame,
  Music,
  Radio,
  Stars,
  Heart,
  Brain,
  Wind,
  Moon,
};

const TrackIcon = ({
  name,
  color,
  size,
}: {
  name: string;
  color: string;
  size: number;
}) => {
  const Icon = ICON_MAP[name] ?? Music;
  return <Icon color={color} size={size} />;
};

// ── Category colors ─────────────────────────────────────────────────────────
const CATEGORY_COLORS: Record<
  TrackCategory,
  { bg: string; icon: string; border: string }
> = {
  nature: { bg: "#E1F5EE", icon: "#0F6E56", border: "#9FE1CB" },
  music: { bg: "#EEEDFE", icon: "#534AB7", border: "#AFA9EC" },
  guided: { bg: "#FBEAF0", icon: "#993556", border: "#ED93B1" },
  sleep: { bg: "#E6F1FB", icon: "#185FA5", border: "#85B7EB" },
};

// ── Format seconds ──────────────────────────────────────────────────────────
const fmt = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

interface Props {
  route?: { params?: { mood?: string; intensity?: number } };
}

export default function AudioTherapyScreen({ route }: Props) {
  const mood = route?.params?.mood ?? "calm";
  const intensity = route?.params?.intensity ?? 1;

  const playbackState = usePlaybackState();
  const progress = useProgress();
  const isPlaying = playbackState.state === State.Playing;

  const [activeCategory, setActiveCategory] = useState<TrackCategory | "all">(
    "all",
  );
  const [currentTrack, setCurrentTrack] = useState<BrowsableTrack | null>(null);
  const [volume, setVolume] = useState(0.8);

  const orbAnim = useRef(new Animated.Value(1)).current;

  // Filtered track list
  const filteredTracks =
    activeCategory === "all"
      ? ALL_TRACKS
      : ALL_TRACKS.filter((t) => t.category === activeCategory);

  // Group for rendering
  const grouped = TRACK_CATEGORIES.filter((c) => c.key !== "all")
    .map((c) => ({
      ...c,
      tracks: filteredTracks.filter((t) => t.category === c.key),
    }))
    .filter((g) => g.tracks.length > 0);

  // Orb pulse while playing
  useEffect(() => {
    if (!isPlaying) {
      orbAnim.setValue(1);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(orbAnim, {
          toValue: 1.1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(orbAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [isPlaying]);

  // Initialize TrackPlayer on mount
  useEffect(() => {
    const setupPlayer = async () => {
      try {
        await TrackPlayer.setupPlayer({
          maxCacheSize: 1024 * 5,
        });
      } catch (error) {
        // Player already initialized
        console.log('TrackPlayer already initialized');
      }
    };
    setupPlayer();
  }, []);

  // Auto-start mood-matched track on first load
  useEffect(() => {
    const moodTrackMap: Record<string, string> = {
      calm: "forest-birds",
      tense: "gentle-rain",
      anxious: "ocean-waves",
      exhausted: "deep-ambient",
      overwhelmed: "stillness",
    };
    const id = moodTrackMap[mood] ?? "forest-birds";
    const track = ALL_TRACKS.find((t) => t.id === id) ?? ALL_TRACKS[0];
    playTrack(track);
  }, []);

  const playTrack = async (track: BrowsableTrack) => {
    setCurrentTrack(track);
    await TrackPlayer.reset();
    await TrackPlayer.add({
      id: track.id,
      url: track.url,
      title: track.title,
      artist: track.artist,
    });
    if (!track.duration) await TrackPlayer.setRepeatMode(RepeatMode.Track);
    else await TrackPlayer.setRepeatMode(RepeatMode.Off);
    await TrackPlayer.setVolume(volume);
    await TrackPlayer.play();
  };

  const handleVolumeChange = async (val: number) => {
    setVolume(val);
    await TrackPlayer.setVolume(val);
  };

  const skipTrack = async (dir: "next" | "prev") => {
    if (!currentTrack) return;
    const idx = ALL_TRACKS.findIndex((t) => t.id === currentTrack.id);
    const next =
      dir === "next"
        ? ALL_TRACKS[(idx + 1) % ALL_TRACKS.length]
        : ALL_TRACKS[(idx - 1 + ALL_TRACKS.length) % ALL_TRACKS.length];
    await playTrack(next);
  };

  const cc = currentTrack
    ? CATEGORY_COLORS[currentTrack.category]
    : CATEGORY_COLORS.nature;

  return (
    <SafeAreaView style={s.root}>
      {/* ── NOW PLAYING HERO ─────────────────────────────────────────── */}
      <View style={s.hero}>
        {/* Mood pill */}
        <View style={s.moodPill}>
          <View style={[s.moodDot, { backgroundColor: cc.icon }]} />
          <AppText style={s.moodPillText}>
            Tuned for{" "}
            <AppText style={[s.moodPillBold, { color: cc.icon }]}>
              {mood}
            </AppText>
          </AppText>
        </View>

        {/* Orb */}
        <Animated.View
          style={[
            s.orbOuter,
            {
              backgroundColor: cc.bg,
              borderColor: cc.border,
              transform: [{ scale: orbAnim }],
            },
          ]}
        >
          <View style={[s.orbInner, { backgroundColor: cc.icon }]}>
            {currentTrack && (
              <TrackIcon name={currentTrack.iconName} color="#fff" size={26} />
            )}
          </View>
        </Animated.View>

        {/* Track info */}
        <AppText style={s.trackTitle}>{currentTrack?.title ?? "—"}</AppText>
        <AppText style={s.trackArtist}>{currentTrack?.artist ?? ""}</AppText>

        {/* Progress */}
        <View style={s.progressWrap}>
          <Slider
            style={{ width: "100%" }}
            minimumValue={0}
            maximumValue={progress.duration || 1}
            value={progress.position}
            onSlidingComplete={(v) => TrackPlayer.seekTo(v)}
            minimumTrackTintColor={cc.icon}
            maximumTrackTintColor={N.border}
            thumbTintColor={cc.icon}
          />
          <View style={s.progressTimes}>
            <AppText style={s.progressTime}>{fmt(progress.position)}</AppText>
            <AppText style={s.progressTime}>
              {currentTrack?.duration ? fmt(currentTrack.duration) : "∞"}
            </AppText>
          </View>
        </View>

        {/* Controls */}
        <View style={s.controls}>
          <Pressable style={s.ctrlBtn} onPress={() => skipTrack("prev")}>
            <SkipBack color={N.textMuted} size={20} />
          </Pressable>
          <Pressable
            style={[s.playBtn, { backgroundColor: cc.icon }]}
            onPress={() =>
              isPlaying ? TrackPlayer.pause() : TrackPlayer.play()
            }
          >
            {isPlaying ? (
              <Pause color="#fff" size={26} />
            ) : (
              <Play color="#fff" size={26} />
            )}
          </Pressable>
          <Pressable style={s.ctrlBtn} onPress={() => skipTrack("next")}>
            <SkipForward color={N.textMuted} size={20} />
          </Pressable>
        </View>

      </View>

      {/* ── LIBRARY ──────────────────────────────────────────────────── */}
      <View style={s.libraryHeader}>
        <AppText style={s.libraryTitle}>Sound library</AppText>
        <AppText style={s.libraryCount}>{ALL_TRACKS.length} tracks</AppText>
      </View>

      {/* Category filter chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={s.chipScroll}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 6 }}
      >
        {TRACK_CATEGORIES.map((c) => {
          const active = activeCategory === c.key;
          return (
            <Pressable
              key={c.key}
              style={[s.chip, active && s.chipActive]}
              onPress={() => setActiveCategory(c.key)}
            >
              <AppText style={[s.chipText, active && s.chipTextActive]}>
                {c.label}
              </AppText>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Track list */}
      <ScrollView style={s.trackList} showsVerticalScrollIndicator={false}>
        {grouped.map((group) => (
          <View key={group.key}>
            <AppText style={s.groupLabel}>{group.label.toUpperCase()}</AppText>
            {group.tracks.map((track) => {
              const isActive = currentTrack?.id === track.id;
              const colors = CATEGORY_COLORS[track.category];
              return (
                <Pressable
                  key={track.id}
                  style={[
                    s.trackRow,
                    isActive && { backgroundColor: colors.bg },
                  ]}
                  onPress={() => playTrack(track)}
                >
                  <View
                    style={[
                      s.trackOrb,
                      { backgroundColor: isActive ? colors.icon : colors.bg },
                    ]}
                  >
                    <TrackIcon
                      name={track.iconName}
                      color={isActive ? "#fff" : colors.icon}
                      size={16}
                    />
                  </View>

                  <View style={s.trackInfo}>
                    <AppText
                      style={[s.trackName, isActive && { color: colors.icon }]}
                    >
                      {track.title}
                    </AppText>
                    <AppText style={s.trackMeta}>
                      {track.artist} ·{" "}
                      {track.duration ? fmt(track.duration) : "Looping"}
                    </AppText>
                  </View>

                  {isActive ? (
                    <View
                      style={[s.playingBadge, { backgroundColor: colors.icon }]}
                    >
                      <AppText style={s.playingBadgeText}>Playing</AppText>
                    </View>
                  ) : (
                    <View style={s.playIconWrap}>
                      <Play color={N.textMuted} size={13} />
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>
        ))}
        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: N.bg },
  hero: {
    padding: 20,
    alignItems: "center",
    backgroundColor: N.surface,
    borderBottomWidth: 0.5,
    borderBottomColor: N.border,
  },
  moodPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: N.bg,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 0.5,
    borderColor: N.border,
    marginBottom: 16,
  },
  moodDot: { width: 7, height: 7, borderRadius: 4 },
  moodPillText: { fontSize: 12, color: N.textSecondary },
  moodPillBold: { fontWeight: "600" },
  orbOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  orbInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  trackTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: N.text,
    marginBottom: 2,
  },
  trackArtist: { fontSize: 12, color: N.textMuted, marginBottom: 12 },
  progressWrap: { width: "100%" },
  progressTimes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -4,
  },
  progressTime: { fontSize: 11, color: N.textMuted },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginTop: 12,
  },
  ctrlBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: N.bg,
    borderWidth: 0.5,
    borderColor: N.border,
    alignItems: "center",
    justifyContent: "center",
  },
  playBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  volRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
    marginTop: 12,
  },
  libraryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 4,
  },
  libraryTitle: { fontSize: 14, fontWeight: "600", color: N.text },
  libraryCount: { fontSize: 12, color: N.textMuted },
  chipScroll: { flexGrow: 0, paddingVertical: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: N.border,
    backgroundColor: N.surface,
  },
  chipActive: { backgroundColor: "#E1F5EE", borderColor: "#5DCAA5" },
  chipText: { fontSize: 12, color: N.textSecondary },
  chipTextActive: { color: "#085041", fontWeight: "600" },
  trackList: { flex: 1 },
  groupLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: N.textMuted,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
    letterSpacing: 0.5,
  },
  trackRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderTopColor: N.border,
  },
  trackOrb: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  trackInfo: { flex: 1 },
  trackName: { fontSize: 13, fontWeight: "500", color: N.text },
  trackMeta: { fontSize: 11, color: N.textMuted, marginTop: 2 },
  playingBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  playingBadgeText: { fontSize: 10, color: "#fff", fontWeight: "600" },
  playIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: N.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: N.surface,
  },
});
