import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useApp } from '../context/AppContext';
import { styles } from '../styles';
import { Header } from '../components';

export function AboutScreen() {
  const { goBack } = useApp();
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Header title="About Art Explorer" subtitle="Made for curious minds" onBack={goBack} />
      <View style={styles.aboutLogo}>
        <Text style={{ fontSize: 54 }}>🎨</Text>
        <Text style={styles.aboutName}>Art Explorer</Text>
        <Text style={styles.aboutTagline}>Big art. Little discoveries.</Text>
      </View>
      <Text style={styles.sectionTitle}>A World of Art</Text>
      <Text style={styles.aboutBody}>
        Art Explorer brings centuries of masterworks, classical paintings, historic sculptures, and cultural treasures together in a pocket gallery for art lovers everywhere.
      </Text>
      
      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Interactive Exploration</Text>
      <Text style={styles.aboutBody}>
        Discover legendary artists, test your knowledge with interactive art quizzes, and explore curated topics from animals and nature to ancient history at your own pace.
      </Text>

      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Privacy-Minded by Design</Text>
      <Text style={styles.aboutBody}>
        Art Explorer does not require an account, does not collect personal data, and does not track your location. All saved favorites and preferences remain stored safely and privately on your device.
      </Text>
    </ScrollView>
  );
}
