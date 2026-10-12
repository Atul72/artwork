
import React from 'react';
import { Pressable, Text } from 'react-native';
import { styles } from '../styles';

interface PillProps {
  title: string;
  onPress: () => void;
  selected?: boolean;
  emoji?: string;
}

export function Pill({ title, onPress, selected = false, emoji }: PillProps) {
  return (
    <Pressable onPress={onPress} style={[styles.pill, selected && styles.pillSelected]}>
      {emoji ? <Text style={styles.pillEmoji}>{emoji}</Text> : null}
      <Text style={[styles.pillText, selected && styles.pillTextSelected]}>{title}</Text>
    </Pressable>
  );
}
