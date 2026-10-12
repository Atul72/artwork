
import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { styles } from '../styles';
import { C } from '../constants';

export function LoadingBlock({ text = 'Finding beautiful art...' }: { text?: string }) {
  return <View style={styles.loadingBlock}><ActivityIndicator size="large" color={C.primary} /><Text style={styles.mutedText}>{text}</Text></View>;
}
