import React, { useEffect, useRef } from "react";
import { View, ScrollView, Pressable, Animated } from "react-native";

import TrackPlayer from "react-native-track-player";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Music,
  Heart,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  RotateCw,
} from "lucide-react-native";
import Slider from "@react-native-community/slider";

import AppText from "../../components/atoms/AppText";
import { ALL_TRACKS, TRACK_CATEGORIES } from "../../models/audio-sessions";
import { COLORS } from "../../constants/colors";
import { styles } from "./styles";
import {
  fmt,
  ICON_MAP,
  MOOD_TILES,
  wvHeights,
  CAT_THEME,
  WAVE_ANIMATION_DURATION,
  ORB_ANIMATION_DURATION,
  ORB_SCALE_MAX,
  WAVE_SCALE_MIN,
} from "../../constants/audio";
import strings from "../../constants/strings";
import { useAudioTherapyViewModel } from "../../viewmodels/AudioTherapy/useAudioTherapyViewModel";
import {
  TrackIconProps,
  WaveBarProps,
  PlayerCardProps,
  MoodTileProps,
  TrackRowProps,
} from "../../models/types";
import { RouteProp } from "@react-navigation/native";
import { TabParamList } from "../../navigation/AppNavigator";

const TrackIcon = ({ name, color, size }: TrackIconProps) => {
  const Icon = ICON_MAP[name] ?? Music;
  return <Icon color={color} size={size} />;
};

const WaveBar = ({ delay, height, active }: WaveBarProps) => {
  const anim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!active) {
      anim.setValue(1);
      return;
    }

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: WAVE_SCALE_MIN,
          duration: WAVE_ANIMATION_DURATION + delay * 60,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 1,
          duration: WAVE_ANIMATION_DURATION + delay * 60,
          useNativeDriver: true,
        }),
      ])
    );

    loop.start();
    return () => loop.stop();
  }, [active, delay]);

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

const NowIndicator = () => (
  <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 2, height: 14 }}>
    {[6, 12, 8].map((h, i) => (
      <WaveBar key={i} delay={i * 2} height={h} active />
    ))}
  </View>
);

const PlayerCard = ({
  currentTrack,
  isPlaying,
  progress,
  currentTheme,
  orbAnim,
  onPlayPause,
  onSkip,
  onSeek
}: PlayerCardProps) => (
  <View style={[styles.playerCard, { shadowColor: currentTheme.icon }]}>
    <View style={[styles.blobTR, { backgroundColor: COLORS.ACCENT_LIGHT }]} />
    <View style={[styles.blobBL, { backgroundColor: COLORS.SAGE_LIGHT }]} />

    <View style={styles.playerTop}>
      <View style={styles.albumWrap}>
        <Animated.View
          style={[styles.albumPulse, { borderColor: currentTheme.border, transform: [{ scale: orbAnim }] }]}
        />
        <View
          style={[styles.albumArt, { backgroundColor: COLORS.ACCENT_LIGHT, borderColor: COLORS.ACCENT_ALPHA_20 }]}
        >
          {currentTrack && <TrackIcon name={currentTrack.iconName} color={COLORS.ACCENT} size={26} />}
        </View>
      </View>

      <View style={styles.playerInfo}>
        <AppText style={styles.playerTrack}>{currentTrack?.title ?? "—"}</AppText>
        <AppText style={styles.playerArtist}>{currentTrack?.artist ?? ""}</AppText>
        <View style={[styles.nowBadge, { backgroundColor: COLORS.ACCENT_LIGHT, borderColor: COLORS.ACCENT_ALPHA_25 }]}>
          <View style={[styles.badgeDot, { backgroundColor: COLORS.ACCENT }]} />
          <AppText style={[styles.badgeTxt, { color: COLORS.ACCENT }]}>
            {strings.UI_STRINGS.AUDIO_THERAPY.NOW_PLAYING}
          </AppText>
        </View>
      </View>

      <Pressable style={[styles.iconBtn, { backgroundColor: COLORS.ACCENT_LIGHT, borderColor: COLORS.ACCENT_ALPHA_25 }]}>
        <Heart color={COLORS.ACCENT} size={16} />
      </Pressable>
    </View>

    <View style={styles.waveform}>
      {wvHeights.map((h, i) => (
        <WaveBar key={i} delay={i} height={h} active={isPlaying} />
      ))}
      <AppText style={styles.wvTime}>
        {currentTrack?.duration ? fmt(currentTrack.duration) : strings.UI_STRINGS.AUDIO_THERAPY.LOOP_INFINITY}
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
        <AppText style={styles.progressTime}>{fmt(progress.position)}</AppText>
        <AppText style={styles.progressTime}>
          {currentTrack?.duration ? fmt(currentTrack.duration) : strings.UI_STRINGS.AUDIO_THERAPY.LOOPING}
        </AppText>
      </View>
    </View>

    <View style={styles.controls}>
      <View style={styles.ctrlGroup}>
        <Pressable style={styles.ctrlBtn} onPress={() => onSkip("prev")}>
          <SkipBack color={COLORS.TEXT_SECONDARY} size={15} />
        </Pressable>
        <Pressable style={styles.ctrlBtn} onPress={() => onSeek(-10)}>
          <RotateCcw color={COLORS.TEXT_SECONDARY} size={15} />
        </Pressable>
      </View>

      <Pressable
        style={[styles.playBtn, { backgroundColor: COLORS.ACCENT, shadowColor: COLORS.ACCENT }]}
        onPress={onPlayPause}
      >
        {isPlaying ? <Pause color={COLORS.WHITE} size={22} /> : <Play color={COLORS.WHITE} size={22} />}
      </Pressable>

      <View style={styles.ctrlGroup}>
        <Pressable style={styles.ctrlBtn} onPress={() => onSeek(10)}>
          <RotateCw color={COLORS.TEXT_SECONDARY} size={15} />
        </Pressable>
        <Pressable style={styles.ctrlBtn} onPress={() => onSkip("next")}>
          <SkipForward color={COLORS.TEXT_SECONDARY} size={15} />
        </Pressable>
      </View>
    </View>
  </View>
);

const MoodTile = ({ tile, isActive, onPress }: MoodTileProps) => (
  <Pressable
    style={[
      styles.moodTile,
      isActive && {
        borderColor: COLORS.ACCENT_ALPHA_30,
        backgroundColor: COLORS.ACCENT_LIGHT,
      },
    ]}
    onPress={onPress}
  >
    <View style={[styles.tileIcon, { backgroundColor: tile.bg }]}>
      <TrackIcon name={tile.iconName} color={tile.color} size={18} />
    </View>
    <AppText style={styles.tileLabel}>{tile.label}</AppText>
    <AppText style={styles.tileCount}>
      {tile.count} {strings.UI_STRINGS.QUANTITIES.TRACKS}
    </AppText>
  </Pressable>
);

const TrackRow = ({ track, isActive, theme, onPress }: TrackRowProps) => (
  <Pressable
    style={[
      styles.trackRow,
      isActive && {
        backgroundColor: theme.bg,
        borderLeftWidth: 2,
        borderLeftColor: theme.icon,
        paddingLeft: 18,
      },
    ]}
    onPress={onPress}
  >
    <View style={[styles.trackArt, { backgroundColor: theme.bg }]}>
      <TrackIcon name={track.iconName} color={theme.icon} size={18} />
    </View>
    <View style={styles.trackInfo}>
      <AppText
        style={[
          styles.trackName,
          ...(isActive ? [{ color: theme.icon, fontWeight: "600" as const }] : []),
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
      <AppText style={styles.trackDur}>{track.duration ? fmt(track.duration) : "∞"}</AppText>
      {isActive ? <NowIndicator /> : <View style={styles.playIcon}><Play color={COLORS.TEXT_SECONDARY} size={11} /></View>}
    </View>
  </Pressable>
);

type AudioTherapyRouteProp = RouteProp<TabParamList, "AudioTherapyTab">;

export default function AudioTherapyScreen({ route }: { route: AudioTherapyRouteProp }) {
  const mood = route?.params?.mood ?? "calm";
  const {
    isPlaying,
    progress,
    volume,
    currentTrack,
    activeMood,
    activeCategory,
    groupedTracks,
    currentTheme,
    greeting,
    setActiveMood,
    setActiveCategory,
    playTrack,
    skipTrack,
    seekRelative,
    handleVolumeChange,
  } = useAudioTherapyViewModel(mood);

  const orbAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!isPlaying) {
      orbAnim.setValue(1);
      return;
    }

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(orbAnim, {
          toValue: ORB_SCALE_MAX,
          duration: ORB_ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(orbAnim, {
          toValue: 1,
          duration: ORB_ANIMATION_DURATION,
          useNativeDriver: true,
        }),
      ])
    );

    loop.start();
    return () => loop.stop();
  }, [isPlaying]);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} bounces>
        <View style={styles.hero}>
          <AppText style={styles.eyebrow}>{strings.SCREEN_TITLES.AUDIO_THERAPY}</AppText>
          <AppText style={styles.heroTitle}>
            {greeting},{"\n"}
            {/* <AppText style={[styles.heroAccent, { color: COLORS.ACCENT }]}>
              {mood}
            </AppText> */}
           <AppText style={[styles.heroAccent, { color: COLORS.ACCENT }]}>Relax, breathe, and feel lighter</AppText>
          </AppText>
          <AppText style={styles.heroSub}>
            {strings.UI_STRINGS.AUDIO_THERAPY.HERO_SUBTEXT.replace('{count}', String(ALL_TRACKS.length))}
          </AppText>

          <PlayerCard
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            progress={progress}
            volume={volume}
            currentTheme={currentTheme}
            orbAnim={orbAnim}
            onPlayPause={() => (isPlaying ? TrackPlayer.pause() : TrackPlayer.play())}
            onSkip={skipTrack}
            onSeek={seekRelative}
            onVolumeChange={handleVolumeChange}
          />

        </View>

        {/* ── MOOD TILES ───────────────────────────────────────────── */}
        <View style={styles.sectionHead}>
          <AppText style={styles.secTitle}>{strings.UI_STRINGS.AUDIO_THERAPY.BROWSE_BY_MOOD}</AppText>
          <AppText style={[styles.secLink, { color: COLORS.ACCENT }]}>{strings.UI_STRINGS.ACTIONS.SEE_ALL}</AppText>
        </View>
        <View style={styles.moodGrid}>
          {MOOD_TILES.map((tile) => (
            <MoodTile
              key={tile.key}
              tile={tile}
              isActive={activeMood === tile.key}
              onPress={() => setActiveMood(tile.key)}
            />
          ))}
        </View>

        {/* ── CATEGORY CHIPS ───────────────────────────────────────── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipScroll}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
        >
          {TRACK_CATEGORIES.map((c) => {
            const isActive = activeCategory === c.key;
            const activeStyle = isActive ? { backgroundColor: COLORS.ACCENT, borderColor: COLORS.ACCENT } : {};
            return (
              <Pressable
                key={c.key}
                style={[styles.chip, activeStyle]}
                onPress={() => setActiveCategory(c.key)}
              >
                <AppText style={[styles.chipText, ...(isActive ? [styles.chipTextOn] : [])]}>{c.label}</AppText>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* ── TRACK LIST ───────────────────────────────────────────── */}
        <View style={styles.trackList}>
          {groupedTracks.map((group) => (
            <View key={group.key}>
              <AppText style={styles.groupLabel}>{group.label.toUpperCase()}</AppText>
              {group.tracks.map((track) => (
                <TrackRow
                  key={track.id}
                  track={track}
                  isActive={currentTrack?.id === track.id}
                  theme={CAT_THEME[track.category]}
                  onPress={() => playTrack(track)}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
