
import React from 'react';
import { Pressable, Text, GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import { styles } from '../styles';

interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: 'primary' | 'outline' | 'soft' | 'danger';
  small?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Button({ title, onPress, variant = 'primary', small = false, disabled = false, style }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        variant === 'outline' && styles.buttonOutline,
        variant === 'soft' && styles.buttonSoft,
        variant === 'danger' && styles.buttonDanger,
        small && styles.buttonSmall,
        disabled && styles.buttonDisabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.buttonText, variant === 'outline' && styles.buttonOutlineText, variant === 'soft' && styles.buttonSoftText, small && styles.buttonTextSmall]}>{title}</Text>
    </Pressable>
  );
}
