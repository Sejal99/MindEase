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
  // Nature
  {
    id: 'forest-birds',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    title: 'Forest birds',
    artist: 'Nature',
    category: 'nature',
    iconName: 'Leaf',
  },
  {
    id: 'gentle-rain',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    title: 'Gentle rain',
    artist: 'Nature',
    category: 'nature',
    iconName: 'Droplets',
  },
  {
    id: 'ocean-waves',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    title: 'Ocean waves',
    artist: 'Nature',
    category: 'nature',
    iconName: 'Waves',
  },
  {
    id: 'crackling-fire',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    title: 'Crackling fire',
    artist: 'Nature',
    category: 'nature',
    iconName: 'Flame',
  },
  // Music
  {
    id: 'deep-ambient',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    title: 'Deep ambient',
    artist: 'Soundscape',
    category: 'music',
    duration: 1200,
    iconName: 'Music',
  },
  {
    id: 'binaural-calm',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    title: 'Binaural calm',
    artist: 'Soundscape',
    category: 'music',
    duration: 1800,
    iconName: 'Radio',
  },
  {
    id: 'stillness',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    title: 'Stillness',
    artist: 'Soundscape',
    category: 'music',
    duration: 900,
    iconName: 'Stars',
  },
  // Guided
  {
    id: 'body-scan',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    title: 'Body scan',
    artist: 'Guide',
    category: 'guided',
    duration: 600,
    iconName: 'Heart',
  },
  {
    id: 'grounding',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    title: '5-4-3-2-1 grounding',
    artist: 'Guide',
    category: 'guided',
    duration: 480,
    iconName: 'Brain',
  },
  {
    id: 'tension-release',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    title: 'Tension release',
    artist: 'Guide',
    category: 'guided',
    duration: 720,
    iconName: 'Wind',
  },
  // Sleep
  {
    id: 'sleep-rain',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
    title: 'Sleep rain',
    artist: 'Sleep',
    category: 'sleep',
    iconName: 'Moon',
  },
  {
    id: 'night-forest',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
    title: 'Night forest',
    artist: 'Sleep',
    category: 'sleep',
    iconName: 'Stars',
  },
];


export const TRACK_CATEGORIES: { key: TrackCategory | 'all'; label: string }[] = [
  { key: 'all',     label: 'All'     },
  { key: 'nature',  label: 'Nature'  },
  { key: 'music',   label: 'Music'   },
  { key: 'guided',  label: 'Guided'  },
  { key: 'sleep',   label: 'Sleep'   },
];