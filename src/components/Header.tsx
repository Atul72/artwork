
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from '../styles';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: React.ReactNode;
}

export function Header({ title, subtitle, onBack, right }: HeaderProps) {
  return (
    <View style={styles.headerRow}>
      {onBack ? <Pressable onPress={onBack} style={styles.backCircle} accessibilityLabel="Go back"><Text style={styles.backArrow}>‹</Text></Pressable> : null}
      <View style={{ flex: 1 }}>
        <Text style={styles.screenTitle}>{title}</Text>
        {subtitle ? <Text style={styles.screenSubtitle}>{subtitle}</Text> : null}
      </View>
      {right || null}
    </View>
  );
}
