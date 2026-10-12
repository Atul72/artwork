
import React from 'react';
import { ScrollView, View, Text, Linking, Alert } from 'react-native';
import { useApp } from '../context/AppContext';
import { styles } from '../styles';
import { Header, Button } from '../components';

export function AboutScreen() {
  const { goBack } = useApp();
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Header title="About Art Explorer" subtitle="Made for curious minds" onBack={goBack} />
      <View style={styles.aboutLogo}><Text style={{ fontSize: 54 }}>🎨</Text><Text style={styles.aboutName}>Art Explorer</Text><Text style={styles.aboutTagline}>Big art. Little discoveries.</Text></View>
      <Text style={styles.sectionTitle}>Where the artwork comes from</Text>
      <Text style={styles.aboutBody}>This app uses The Metropolitan Museum of Art Collection API to discover collection records and image URLs. For this build, artworks are shown only when the API marks them as public domain and provides an image.</Text>
      <Button title="Read The Met API documentation ↗" variant="outline" onPress={() => Linking.openURL('https://metmuseum.github.io/').catch(() => {})} />
      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Privacy-minded by design</Text>
      <Text style={styles.aboutBody}>This demo does not ask children to create an account, submit their name, or share a location. Favorites and onboarding status are stored on this device. The app contacts The Met API when searching the collection.</Text>
      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Before publishing</Text>
      <Text style={styles.aboutBody}>Review age suitability, add a parent-facing privacy policy, test links and network errors, and review current Google Play Families requirements. This prototype is not a certification of child-safety or store-policy compliance.</Text>
    </ScrollView>
  );
}
