import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView, Pressable, Animated } from "react-native";

import TrackPlayer, {
  usePlaybackState,
  useProgress,
  State,
  RepeatMode,
} from "react-native-track-player";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Music,
  Heart,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Volume,
  RotateCcw,
  RotateCw,
} from "lucide-react-native";
import Slider from "@react-native-community/slider";

import AppText from "../../components/atoms/AppText";
import {
  ALL_TRACKS,
  TRACK_CATEGORIES,
  BrowsableTrack,
  TrackCategory,
} from "../../models/audio-sessions";
import { COLORS } from "../../constants/colors";
import { styles } from "./styles";
import {
  CAT_THEME,
  fmt,
  ICON_MAP,
  MOOD_TILES,
  Props,
  wvHeights,
} from "../../constants/audio";

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

// ── Animated waveform bar ────────────────────────────────────────────────────
const WaveBar = ({
  delay,
  height,
  active,
}: {
  delay: number;
  height: number;
  active: boolean;
}) => {
  const anim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (!active) {
      anim.setValue(1);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 0.35,
          duration: 700 + delay * 60,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 1,
          duration: 700 + delay * 60,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [active]);
  return (
    <Animated.View
      style={{
        width: 3,
        height,
        borderRadius: 2,
        backgroundColor: active ? COLORS.ACCENT : COLORS.ACCENT_DARK,
        opacity: active ? 1 : 0.3,
        transform: [{ scaleY: anim }],
      }}
    />
  );
};

// ── Playing indicator (3 bars) ───────────────────────────────────────────────
const NowIndicator = () => (
  <View
    style={{ flexDirection: "row", alignItems: "flex-end", gap: 2, height: 14 }}
  >
    {[6, 12, 8].map((h, i) => (
      <WaveBar key={i} delay={i * 2} height={h} active />
    ))}
  </View>
);

export default function AudioTherapyScreen({ route }: Props) {
  const mood = route?.params?.mood ?? "calm";
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const isPlaying = playbackState.state === State.Playing;
  const [activeCategory, setActiveCategory] = useState<TrackCategory | "all">(
    "all",
  );
  const [activeMood, setActiveMood] = useState<string>(mood);
  const [currentTrack, setCurrentTrack] = useState<BrowsableTrack | null>(null);
  const [volume, setVolume] = useState(0.8);

  // Dynamic greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Orb pulse
  const orbAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (!isPlaying) {
      orbAnim.setValue(1);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(orbAnim, {
          toValue: 1.06,
          duration: 2800,
          useNativeDriver: true,
        }),
        Animated.timing(orbAnim, {
          toValue: 1,
          duration: 2800,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [isPlaying]);

  // Setup player
  useEffect(() => {
    TrackPlayer.setupPlayer({ maxCacheSize: 1024 * 5 }).catch(() => {});
  }, []);

  // Auto-start mood track
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
    await TrackPlayer.setRepeatMode(
      track.duration ? RepeatMode.Off : RepeatMode.Track,
    );
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

  const seekRelative = async (delta: number) => {
    const pos = Math.max(0, progress.position + delta);
    await TrackPlayer.seekTo(pos);
  };

  // Filtered + grouped tracks
  const filtered =
    activeCategory === "all"
      ? ALL_TRACKS
      : ALL_TRACKS.filter((t) => t.category === activeCategory);

  const grouped = TRACK_CATEGORIES.filter((c) => c.key !== "all")
    .map((c) => ({
      ...c,
      tracks: filtered.filter((t) => t.category === c.key),
    }))
    .filter((g) => g.tracks.length > 0);

  const ct = currentTrack ? CAT_THEME[currentTrack.category] : CAT_THEME.nature;

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} bounces>
        <View style={styles.hero}>
          <AppText style={styles.eyebrow}>Audio therapy</AppText>
          <AppText style={styles.heroTitle}>
            {getGreeting()},{"\n"}
            <AppText style={[styles.heroAccent, { color: COLORS.ACCENT }]}>
              {mood}
            </AppText>
            <AppText style={styles.heroTitle}> mode</AppText>
          </AppText>
          <AppText style={styles.heroSub}>
            7 tracks matched to your mood
          </AppText>

          <View style={[styles.playerCard, { shadowColor: ct.icon }]}>
            {/* Soft bg blobs */}
            <View
              style={[styles.blobTR, { backgroundColor: COLORS.ACCENT_LIGHT }]}
            />
            <View
              style={[styles.blobBL, { backgroundColor: COLORS.SAGE_LIGHT }]}
            />

            {/* Top row */}
            <View style={styles.playerTop}>
              <View style={styles.albumWrap}>
                <Animated.View
                  style={[
                    styles.albumPulse,
                    { borderColor: ct.border, transform: [{ scale: orbAnim }] },
                  ]}
                />
                <View
                  style={[
                    styles.albumArt,
                    {
                      backgroundColor: COLORS.ACCENT_LIGHT,
                      borderColor: COLORS.ACCENT_ALPHA_20,
                    },
                  ]}
                >
                  {currentTrack && (
                    <TrackIcon
                      name={currentTrack.iconName}
                      color={COLORS.ACCENT}
                      size={26}
                    />
                  )}
                </View>
              </View>

              <View style={styles.playerInfo}>
                <AppText style={styles.playerTrack}>
                  {currentTrack?.title ?? "—"}
                </AppText>
                <AppText style={styles.playerArtist}>
                  {currentTrack?.artist ?? ""}
                </AppText>
                <View
                  style={[
                    styles.nowBadge,
                    {
                      backgroundColor: COLORS.ACCENT_LIGHT,
                      borderColor: COLORS.ACCENT_ALPHA_25,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.badgeDot,
                      { backgroundColor: COLORS.ACCENT },
                    ]}
                  />
                  <AppText style={[styles.badgeTxt, { color: COLORS.ACCENT }]}>
                    Now playing
                  </AppText>
                </View>
              </View>

              <Pressable
                style={[
                  styles.iconBtn,
                  {
                    backgroundColor: COLORS.ACCENT_LIGHT,
                    borderColor: COLORS.ACCENT_ALPHA_25,
                  },
                ]}
              >
                <Heart color={COLORS.ACCENT} size={16} />
              </Pressable>
            </View>

            {/* Waveform */}
            <View style={styles.waveform}>
              {wvHeights.map((h, i) => (
                <WaveBar key={i} delay={i} height={h} active={isPlaying} />
              ))}
              <AppText style={styles.wvTime}>
                {currentTrack?.duration ? fmt(currentTrack.duration) : "∞ loop"}
              </AppText>
            </View>

            <View style={styles.progressWrap}>
              <Slider
                style={{ width: "100%", height: 20 }}
                minimumValue={0}
                maximumValue={progress.duration || 1}
                value={progress.position}
                onSlidingComplete={(v) => TrackPlayer.seekTo(v)}
                minimumTrackTintColor={COLORS.ACCENT}
                maximumTrackTintColor={COLORS.BLACK_ALPHA_08}
                thumbTintColor={COLORS.ACCENT}
              />
              <View style={styles.progressTimes}>
                <AppText style={styles.progressTime}>
                  {fmt(progress.position)}
                </AppText>
                <AppText style={styles.progressTime}>
                  {currentTrack?.duration
                    ? fmt(currentTrack.duration)
                    : "looping"}
                </AppText>
              </View>
            </View>

            <View style={styles.controls}>
              <View style={styles.ctrlGroup}>
                <Pressable
                  style={styles.ctrlBtn}
                  onPress={() => skipTrack("prev")}
                >
                  <SkipBack color={COLORS.TEXT_SECONDARY} size={15} />
                </Pressable>
                <Pressable
                  style={styles.ctrlBtn}
                  onPress={() => seekRelative(-10)}
                >
                  <RotateCcw color={COLORS.TEXT_SECONDARY} size={15} />
                </Pressable>
              </View>

              <Pressable
                style={[
                  styles.playBtn,
                  {
                    backgroundColor: COLORS.ACCENT,
                    shadowColor: COLORS.ACCENT,
                  },
                ]}
                onPress={() =>
                  isPlaying ? TrackPlayer.pause() : TrackPlayer.play()
                }
              >
                {isPlaying ? (
                  <Pause color={COLORS.WHITE} size={22} />
                ) : (
                  <Play color={COLORS.WHITE} size={22} />
                )}
              </Pressable>

              <View style={styles.ctrlGroup}>
                <Pressable
                  style={styles.ctrlBtn}
                  onPress={() => seekRelative(10)}
                >
                  <RotateCw color={COLORS.TEXT_SECONDARY} size={15} />
                </Pressable>
                <Pressable
                  style={styles.ctrlBtn}
                  onPress={() => skipTrack("next")}
                >
                  <SkipForward color={COLORS.TEXT_SECONDARY} size={15} />
                </Pressable>
              </View>
            </View>
          </View>

          <View style={styles.volRow}>
            <Volume2 color={COLORS.TEXT_TERTIARY} size={14} />
            <Slider
              style={{ flex: 1, height: 20 }}
              minimumValue={0}
              maximumValue={1}
              step={0.01}
              value={volume}
              onValueChange={handleVolumeChange}
              minimumTrackTintColor={COLORS.ACCENT_DARK}
              maximumTrackTintColor={COLORS.BLACK_ALPHA_08}
              thumbTintColor={COLORS.ACCENT_DARK}
            />
            <Volume color={COLORS.TEXT_TERTIARY} size={14} />
          </View>
        </View>

        {/* ── MOOD TILES ───────────────────────────────────────────── */}
        <View style={styles.sectionHead}>
          <AppText style={styles.secTitle}>Browse by mood</AppText>
          <AppText style={[styles.secLink, { color: COLORS.ACCENT }]}>
            See all
          </AppText>
        </View>
        <View style={styles.moodGrid}>
          {MOOD_TILES.map((tile) => {
            const active = activeMood === tile.key;
            return (
              <Pressable
                key={tile.key}
                style={[
                  styles.moodTile,
                  active && {
                    borderColor: COLORS.ACCENT_ALPHA_30,
                    backgroundColor: COLORS.ACCENT_LIGHT,
                  },
                ]}
                onPress={() => setActiveMood(tile.key)}
              >
                <View style={[styles.tileIcon, { backgroundColor: tile.bg }]}>
                  <TrackIcon
                    name={tile.iconName}
                    color={tile.color}
                    size={18}
                  />
                </View>
                <AppText style={styles.tileLabel}>{tile.label}</AppText>
                <AppText style={styles.tileCount}>{tile.count} tracks</AppText>
              </Pressable>
            );
          })}
        </View>

        {/* ── CATEGORY CHIPS ───────────────────────────────────────── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipScroll}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
        >
          {TRACK_CATEGORIES.map((c) => {
            const on = activeCategory === c.key;
            return (
              <Pressable
                key={c.key}
                style={[
                  styles.chip,
                  on && {
                    backgroundColor: COLORS.ACCENT,
                    borderColor: COLORS.ACCENT,
                  },
                ]}
                onPress={() => setActiveCategory(c.key)}
              >
                <AppText style={[styles.chipText, ...(on ? [styles.chipTextOn] : [])]}>
                  {c.label}
                </AppText>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* ── TRACK LIST ───────────────────────────────────────────── */}
        <View style={styles.trackList}>
          {grouped.map((group) => (
            <View key={group.key}>
              <AppText style={styles.groupLabel}>
                {group.label.toUpperCase()}
              </AppText>
              {group.tracks.map((track) => {
                const isActive = currentTrack?.id === track.id;
                const th = CAT_THEME[track.category];
                return (
                  <Pressable
                    key={track.id}
                    style={[
                      styles.trackRow,
                      isActive && {
                        backgroundColor: th.bg,
                        borderLeftWidth: 2,
                        borderLeftColor: th.icon,
                        paddingLeft: 18,
                      },
                    ]}
                    onPress={() => playTrack(track)}
                  >
                    <View style={[styles.trackArt, { backgroundColor: th.bg }]}>
                      <TrackIcon
                        name={track.iconName}
                        color={th.icon}
                        size={18}
                      />
                    </View>
                    <View style={styles.trackInfo}>
                      <AppText
                        style={[
                          styles.trackName,
                          ...(isActive ? [{ color: th.icon, fontWeight: "600" as const }] : []),
                        ]}
                      >
                        {track.title}
                      </AppText>
                      <AppText style={styles.trackMeta}>
                        {track.artist}
                        {track.duration ? ` · ${fmt(track.duration)}` : ""}
                      </AppText>
                    </View>
                    <View style={styles.trackRight}>
                      <AppText style={styles.trackDur}>
                        {track.duration ? fmt(track.duration) : "∞"}
                      </AppText>
                      {isActive ? (
                        <NowIndicator />
                      ) : (
                        <View style={styles.playIcon}>
                          <Play color={COLORS.TEXT_SECONDARY} size={11} />
                        </View>
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
