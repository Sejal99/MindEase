import { ALL_TRACKS, getSessionForMood } from '../models/audio-sessions';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
} from 'react-native-track-player';


class AudioTherapyService {
  private initialized = false;
  private currentSessionId: string | null = null;
  private voiceEnabled = true;

  async init() {
    if (this.initialized) return;
    try {
      await TrackPlayer.setupPlayer({
        maxCacheSize: 1024 * 5, // 5 MB
      });
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.Stop,
        ],
        compactCapabilities: [Capability.Play, Capability.Pause],
      });
      this.initialized = true;
    } catch {
      // already initialized — safe to continue
      this.initialized = true;
    }
  }

  async startSession(moodKey: string, intensity: number) {
    await this.init();

    const session = getSessionForMood(moodKey, intensity);

    // Don't restart if already playing this session
    if (this.currentSessionId === session.id) return;
    this.currentSessionId = session.id;

    await TrackPlayer.reset();

    const tracks = [session.base];
    if (this.voiceEnabled && session.voice) {
      tracks.push(session.voice);
    }

    await TrackPlayer.add(tracks);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue); // loop the session
    await TrackPlayer.play();
  }

  // Call this when mood changes mid-session
  async adaptToMood(moodKey: string, intensity: number) {
    const session = getSessionForMood(moodKey, intensity);
    if (this.currentSessionId === session.id) return; // no change needed
    await this.startSession(moodKey, intensity);
  }

  async toggleVoice(enabled: boolean) {
    this.voiceEnabled = enabled;
  }

  async pause() {
    await TrackPlayer.pause();
  }

  async resume() {
    await TrackPlayer.play();
  }

  async stop() {
    await TrackPlayer.reset();
    this.currentSessionId = null;
  }

  async setVolume(volume: number) { // 0.0 – 1.0
    await TrackPlayer.setVolume(volume);
  }

  async playTrackById(trackId: string) {
  await this.init();
  const track = ALL_TRACKS.find(t => t.id === trackId);
  if (!track) return;
  this.currentSessionId = track.id;
  await TrackPlayer.reset();
  await TrackPlayer.add({ id: track.id, url: track.url, title: track.title, artist: track.artist });
  if (!track.duration) await TrackPlayer.setRepeatMode(RepeatMode.Track);
  await TrackPlayer.play();
}
}



export default new AudioTherapyService();