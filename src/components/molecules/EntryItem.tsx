import React, { useEffect, useRef } from 'react';
import { View, TextInput, Animated, StyleSheet } from 'react-native';
import AppText from '../atoms/AppText';
import { N } from '../../theme/warm-colors';

interface EntryItemProps {
  index: number;
  color: string;
  dimColor: string;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
}

const EntryItem: React.FC<EntryItemProps> = ({
  index,
  color,
  dimColor,
  placeholder,
  value,
  onChange,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const isDone = value.trim().length > 0;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 350, delay: index * 80, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, delay: index * 80, useNativeDriver: true, speed: 14, bounciness: 6 }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.entryRow, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <View style={[styles.indexBadge, { backgroundColor: isDone ? color : dimColor, borderColor: isDone ? color : N.border }]}>
        <AppText variant="caption" style={[styles.indexText, { color: isDone ? N.surface : N.textSecondary }]}>
          {isDone ? '✓' : String(index + 1)}
        </AppText>
      </View>
      <TextInput
        style={[styles.entryInput, { borderBottomColor: isDone ? color : N.border }]}
        placeholder={placeholder}
        placeholderTextColor={N.textMuted}
        value={value}
        onChangeText={onChange}
        multiline={false}
        returnKeyType="done"
        selectionColor={color}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  entryRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  indexBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    flexShrink: 0,
  },
  indexText: { fontSize: 12, fontWeight: '700' },
  entryInput: {
    flex: 1,
    color: N.textPrimary,
    fontSize: 15,
    fontWeight: '500',
    paddingBottom: 6,
    borderBottomWidth: 1.5,
  },
});

export default EntryItem;
