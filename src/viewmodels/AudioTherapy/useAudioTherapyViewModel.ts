import { useEffect, useMemo, useState } from "react";
import TrackPlayer, {
  usePlaybackState,
  useProgress,
  State,
  RepeatMode,
} from "react-native-track-player";

import {
  ALL_TRACKS,
  TRACK_CATEGORIES,
  BrowsableTrack,
  TrackCategory,
} from "../../models/audio-sessions";

import { CAT_THEME } from "../../constants/audio";
import strings from "../../constants/strings";

export const useAudioTherapyViewModel = (mood: string) => {
  const playbackState = usePlaybackState();
  const progress = useProgress();

  const isPlaying = playbackState.state === State.Playing;

  const [activeCategory, setActiveCategory] =
    useState<TrackCategory | "all">("all");

  const [activeMood, setActiveMood] = useState(mood);

  const [currentTrack, setCurrentTrack] =
    useState<BrowsableTrack | null>(null);

  const [volume, setVolume] = useState(0.8);

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return strings.UI_STRINGS.TIME.GOOD_MORNING;
    }

    if (hour < 17) {
      return strings.UI_STRINGS.TIME.GOOD_AFTERNOON;
    }

    return strings.UI_STRINGS.TIME.GOOD_EVENING;
  };

  // Setup player
  useEffect(() => {
    TrackPlayer.setupPlayer({
      maxCacheSize: 1024 * 5,
    }).catch(() => {});
  }, []);

  const playTrack = async (track: BrowsableTrack) => {
    try {
      setCurrentTrack(track);

      await TrackPlayer.reset();

      await TrackPlayer.add({
        id: track.id,
        url: track.url,
        title: track.title,
        artist: track.artist,
      });

      await TrackPlayer.setRepeatMode(
        track.duration
          ? RepeatMode.Off
          : RepeatMode.Track,
      );

      await TrackPlayer.setVolume(volume);
      await TrackPlayer.play();
    } catch (error) {
      console.log("playTrack error", error);
    }
  };

  // Auto mood track
  useEffect(() => {
    const moodTrackMap: Record<string, string> = {
      calm: "forest-birds",
      tense: "gentle-rain",
      anxious: "ocean-waves",
      exhausted: "deep-ambient",
      overwhelmed: "stillness",
    };

    const id =
      moodTrackMap[mood] ?? "forest-birds";

    const track =
      ALL_TRACKS.find((t) => t.id === id) ??
      ALL_TRACKS[0];

    playTrack(track);
  }, []);

  const handleVolumeChange = async (
    value: number,
  ) => {
    setVolume(value);
    await TrackPlayer.setVolume(value);
  };

  const skipTrack = async (
    dir: "next" | "prev",
  ) => {
    if (!currentTrack) return;

    const idx = ALL_TRACKS.findIndex(
      (t) => t.id === currentTrack.id,
    );

    const next =
      dir === "next"
        ? ALL_TRACKS[
            (idx + 1) % ALL_TRACKS.length
          ]
        : ALL_TRACKS[
            (idx - 1 + ALL_TRACKS.length) %
              ALL_TRACKS.length
          ];

    await playTrack(next);
  };

  const seekRelative = async (
    delta: number,
  ) => {
    const position = Math.max(
      0,
      progress.position + delta,
    );

    await TrackPlayer.seekTo(position);
  };

  const filteredTracks = useMemo(() => {
    return activeCategory === "all"
      ? ALL_TRACKS
      : ALL_TRACKS.filter(
          (t) =>
            t.category === activeCategory,
        );
  }, [activeCategory]);

  const groupedTracks = useMemo(() => {
    return TRACK_CATEGORIES
      .filter((c) => c.key !== "all")
      .map((c) => ({
        ...c,
        tracks: filteredTracks.filter(
          (t) => t.category === c.key,
        ),
      }))
      .filter((g) => g.tracks.length > 0);
  }, [filteredTracks]);

  const currentTheme = currentTrack
    ? CAT_THEME[currentTrack.category]
    : CAT_THEME.nature;

  return {
    // states
    isPlaying,
    progress,
    volume,
    currentTrack,
    activeMood,
    activeCategory,

    // derived
    groupedTracks,
    currentTheme,
    greeting: getGreeting(),

    // setters
    setActiveMood,
    setActiveCategory,

    // actions
    playTrack,
    skipTrack,
    seekRelative,
    handleVolumeChange,
  };
};