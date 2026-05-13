export type AudioLayer = 'base' | 'voice';

export interface AudioTrack {
  id: string;
  url: string;
  title: string;
  artist: string;
  duration?: number;
}

export interface AudioSession {
  id: string;
  label: string;
  moodKeys: string[];
  intensityRange: [number, number];
  base: AudioTrack;
  voice?: AudioTrack;
}

export const AUDIO_SESSIONS: AudioSession[] = [
  // ── Calm (intensity 1–2) ──────────────────────────────────────────────
  {
    id: 'calm-forest',
    label: 'Forest calm',
    moodKeys: ['calm'],
    intensityRange: [1, 2],
    base: {
      id: 'base-forest',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      title: 'Forest birds',
      artist: 'Nature',
    },
  },

  // ── Tense (intensity 2–3) ─────────────────────────────────────────────
  {
    id: 'tense-rain',
    label: 'Rain release',
    moodKeys: ['tense'],
    intensityRange: [2, 3],
    base: {
      id: 'base-rain',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      title: 'Gentle rain',
      artist: 'Nature',
    },
  },

  // ── Anxious (intensity 3) ─────────────────────────────────────────────
  {
    id: 'anxious-ocean',
    label: 'Ocean grounding',
    moodKeys: ['anxious'],
    intensityRange: [3, 3],
    base: {
      id: 'base-ocean',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      title: 'Ocean waves',
      artist: 'Nature',
    },
  },

  // ── Exhausted (intensity 4) ───────────────────────────────────────────
  {
    id: 'exhausted-ambient',
    label: 'Deep restore',
    moodKeys: ['exhausted'],
    intensityRange: [4, 4],
    base: {
      id: 'base-ambient',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      title: 'Deep ambient',
      artist: 'Soundscape',
    },
  },

  // ── Overwhelmed (intensity 5) ─────────────────────────────────────────
  {
    id: 'overwhelmed-stillness',
    label: 'Emergency stillness',
    moodKeys: ['overwhelmed'],
    intensityRange: [5, 5],
    base: {
      id: 'base-stillness',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      title: 'Stillness',
      artist: 'Soundscape',
    },
  },
];

export function getSessionForMood(
  moodKey: string,
  intensity: number,
): AudioSession {
  const match = AUDIO_SESSIONS.find(
    (s) =>
      s.moodKeys.includes(moodKey) &&
      intensity >= s.intensityRange[0] &&
      intensity <= s.intensityRange[1],
  );
  return match ?? AUDIO_SESSIONS[0];
}