export type TrackCategory = 'nature' | 'music' | 'guided' | 'sleep';

export interface BrowsableTrack {
  id: string;
  url: string;
  title: string;
  artist: string;
  category: TrackCategory;
  duration?: number;
  iconName: string;
}


export const ALL_TRACKS: BrowsableTrack[] = [
  // ───────────── NATURE CALM ─────────────
  {
    id: "forest-reset",
    url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8e54f44.mp3",
    title: "Forest Reset",
    artist: "Nature Therapy",
    category: "nature",
    duration: 900,
    iconName: "Leaf",
  },
  {
    id: "deep-rain",
    url: "https://cdn.pixabay.com/download/audio/2021/08/04/audio_c8a3a4a6f4.mp3",
    title: "Deep Rain Calm",
    artist: "Nature Therapy",
    category: "nature",
    duration: 1200,
    iconName: "Droplets",
  },
  {
    id: "ocean-breathing",
    url: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_5d0d5b2fa1.mp3",
    title: "Ocean Breathing",
    artist: "Sea Escape",
    category: "nature",
    duration: 1000,
    iconName: "Waves",
  },
  {
    id: "warm-fire",
    url: "https://cdn.pixabay.com/download/audio/2022/02/10/audio_0b5f2cb9a8.mp3",
    title: "Warm Fireplace",
    artist: "Cozy Sounds",
    category: "nature",
    duration: 800,
    iconName: "Flame",
  },

  // ───────────── HEALING MUSIC ─────────────
  {
    id: "inner-peace",
    url: "https://cdn.pixabay.com/download/audio/2022/05/16/audio_12b0f6b7f7.mp3",
    title: "Inner Peace",
    artist: "Healing Frequencies",
    category: "music",
    duration: 1200,
    iconName: "Music",
  },
  {
    id: "anxiety-release",
    url: "https://cdn.pixabay.com/download/audio/2022/03/22/audio_270f49b35d.mp3",
    title: "Anxiety Release",
    artist: "Calm Space",
    category: "music",
    duration: 900,
    iconName: "Radio",
  },
  {
    id: "mind-reset",
    url: "https://cdn.pixabay.com/download/audio/2022/08/04/audio_88447d1466.mp3",
    title: "Mind Reset",
    artist: "Ambient Therapy",
    category: "music",
    duration: 1000,
    iconName: "Stars",
  },
  {
    id: "soft-focus",
    url: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_946f6dbfe6.mp3",
    title: "Soft Focus",
    artist: "Deep Focus",
    category: "music",
    duration: 1100,
    iconName: "Music",
  },

  // ───────────── GUIDED / THERAPY ─────────────
  {
    id: "guided-breathing",
    url: "https://cdn.pixabay.com/download/audio/2022/03/09/audio_74d2a5c66d.mp3",
    title: "Guided Breathing",
    artist: "Mind Coach",
    category: "guided",
    duration: 300,
    iconName: "Heart",
  },
  {
    id: "ground-yourself",
    url: "https://cdn.pixabay.com/download/audio/2021/11/25/audio_91d6d66c71.mp3",
    title: "Ground Yourself",
    artist: "Mind Coach",
    category: "guided",
    duration: 420,
    iconName: "Brain",
  },
  {
    id: "release-tension",
    url: "https://cdn.pixabay.com/download/audio/2022/01/20/audio_3d13e0ebfa.mp3",
    title: "Release Tension",
    artist: "Calm Coach",
    category: "guided",
    duration: 600,
    iconName: "Wind",
  },
  {
    id: "body-relaxation",
    url: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_6fa61a6a1d.mp3",
    title: "Body Relaxation",
    artist: "Mind Coach",
    category: "guided",
    duration: 480,
    iconName: "Heart",
  },

  // ───────────── SLEEP ─────────────
  {
    id: "sleep-rain",
    url: "https://cdn.pixabay.com/download/audio/2022/01/20/audio_67b53c6c4d.mp3",
    title: "Sleep Rain",
    artist: "Sleep Space",
    category: "sleep",
    duration: 1800,
    iconName: "Moon",
  },
  {
    id: "night-forest",
    url: "https://cdn.pixabay.com/download/audio/2022/01/27/audio_0f07f8c19f.mp3",
    title: "Night Forest",
    artist: "Dream Escape",
    category: "sleep",
    duration: 2200,
    iconName: "Stars",
  },
  {
    id: "deep-sleep",
    url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_b9a4b9826e.mp3",
    title: "Deep Sleep Drift",
    artist: "Sleep Therapy",
    category: "sleep",
    duration: 2400,
    iconName: "Moon",
  },
];


export const TRACK_CATEGORIES: { key: TrackCategory | 'all'; label: string }[] = [
  { key: 'all',     label: 'All'     },
  { key: 'nature',  label: 'Nature'  },
  { key: 'music',   label: 'Music'   },
  { key: 'guided',  label: 'Guided'  },
  { key: 'sleep',   label: 'Sleep'   },
];