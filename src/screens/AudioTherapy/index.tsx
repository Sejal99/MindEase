import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Pressable,
  Animated,
  ScrollView,
} from 'react-native';
import TrackPlayer, {
  usePlaybackState,
  useProgress,
  State,
} from 'react-native-track-player';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pause, Play, Square, Volume2 } from 'lucide-react-native';
import Slider from '@react-native-community/slider';

import AppText from '../../components/atoms/AppText';
import AudioTherapyService from '../../services/AudioTherapyService';

import { N } from '../../theme/warm-colors';
import { getSessionForMood } from '../../models/audio-sessions';

interface Props {
  route?: {
    params?: {
      mood?: string;
      intensity?: number;
    };
  };
}

export default function AudioTherapyScreen({ route }: Props) {
  const mood = route?.params?.mood ?? 'calm'; 
   const intensity = route?.params?.intensity ?? 1; 
  const session = getSessionForMood(mood, intensity);
  const playbackState = usePlaybackState();
  const progress = useProgress();

  const [volume, setVolume] = useState(0.8);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const ringAnim = useRef(new Animated.Value(1)).current;

  const isPlaying = playbackState.state === State.Playing;

  // Pulse ring while playing
  useEffect(() => {
    if (!isPlaying) {
      ringAnim.stopAnimation();
      ringAnim.setValue(1);
      return;
    }
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(ringAnim, {
          toValue: 1.12,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(ringAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [isPlaying]);

  // Start session on mount
  useEffect(() => {
    AudioTherapyService.startSession(mood, intensity);
    return () => {
      AudioTherapyService.stop();
    };
  }, []);

  const handleVolumeChange = async (val: number) => {
    setVolume(val);
    await AudioTherapyService.setVolume(val);
  };

  const handleVoiceToggle = async () => {
    const next = !voiceEnabled;
    setVoiceEnabled(next);
    await AudioTherapyService.toggleVoice(next);
    // restart session to apply change
    await AudioTherapyService.startSession(mood, intensity);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: N.bg }}>
      <ScrollView contentContainerStyle={{ padding: 24, alignItems: 'center' }}>

        {/* Session label */}
        <AppText style={{ fontSize: 13, color: N.textMuted, marginBottom: 8 }}>
          {session.label}
        </AppText>

        {/* Pulsing orb */}
        <Animated.View
          style={{
            width: 180,
            height: 180,
            borderRadius: 90,
            backgroundColor: N.accentDim,
            transform: [{ scale: ringAnim }],
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 32,
          }}
        >
          <Animated.View
            style={{
              width: 130,
              height: 130,
              borderRadius: 65,
              backgroundColor: N.accent,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AppText style={{ fontSize: 36 }}>
              {isPlaying ? '◉' : '○'}
            </AppText>
          </Animated.View>
        </Animated.View>

        {/* Track title */}
        <AppText style={{ fontSize: 18, fontWeight: '600', color: N.text }}>
          {session.base.title}
        </AppText>
        {voiceEnabled && session.voice && (
          <AppText style={{ fontSize: 13, color: N.textMuted, marginTop: 4 }}>
            + {session.voice.title}
          </AppText>
        )}

        {/* Progress bar */}
        <View style={{ width: '100%', marginTop: 24 }}>
          <Slider
            minimumValue={0}
            maximumValue={progress.duration || 1}
            value={progress.position}
            onSlidingComplete={(val) => TrackPlayer.seekTo(val)}
            minimumTrackTintColor={N.accent}
            maximumTrackTintColor={N.border}
            thumbTintColor={N.accent}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <AppText style={{ fontSize: 11, color: N.textMuted }}>
              {formatTime(progress.position)}
            </AppText>
            <AppText style={{ fontSize: 11, color: N.textMuted }}>
              {formatTime(progress.duration)}
            </AppText>
          </View>
        </View>

        {/* Playback controls */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 24,
            marginTop: 32,
          }}
        >
          <Pressable
            onPress={() => AudioTherapyService.stop()}
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: N.surface,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Square color={N.textMuted} size={20} />
          </Pressable>

          <Pressable
            onPress={() =>
              isPlaying
                ? AudioTherapyService.pause()
                : AudioTherapyService.resume()
            }
            style={{
              width: 68,
              height: 68,
              borderRadius: 34,
              backgroundColor: N.accent,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isPlaying ? (
              <Pause color="#fff" size={28} />
            ) : (
              <Play color="#fff" size={28} />
            )}
          </Pressable>

          {/* Voice toggle */}
          <Pressable
            onPress={handleVoiceToggle}
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: voiceEnabled ? N.accentDim : N.surface,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AppText style={{ fontSize: 18 }}>🎙</AppText>
          </Pressable>
        </View>

        {/* Volume */}
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            marginTop: 32,
          }}
        >
          <Volume2 color={N.textMuted} size={18} />
          <Slider
            style={{ flex: 1 }}
            minimumValue={0}
            maximumValue={1}
            value={volume}
            onValueChange={handleVolumeChange}
            minimumTrackTintColor={N.accent}
            maximumTrackTintColor={N.border}
            thumbTintColor={N.accent}
          />
        </View>

        {/* Session info card */}
        <View
          style={{
            width: '100%',
            backgroundColor: N.surface,
            borderRadius: 16,
            padding: 16,
            marginTop: 32,
          }}
        >
          <AppText style={{ fontSize: 13, color: N.textMuted }}>
            This session is tuned for when you feel{' '}
            <AppText style={{ color: N.accent }}>{mood}</AppText>. The base
            layer loops continuously — the guided voice plays once and fades.
          </AppText>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}