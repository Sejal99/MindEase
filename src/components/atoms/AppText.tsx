import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

interface AppTextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  style?: TextStyle | TextStyle[];
  color?: string;
}

const AppText: React.FC<AppTextProps> = ({
  children,
  variant = 'body',
  style,
  color,
}) => {
  return (
    <Text style={[styles.text, styles[variant], color ? { color } : undefined, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#F9FAFB',
  },
  h1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: '#9CA3AF',
  },
});

export default AppText;
