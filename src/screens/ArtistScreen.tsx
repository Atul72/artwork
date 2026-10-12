
import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useApp } from '../context/AppContext';
import { styles } from '../styles';
import { Header, Button } from '../components';

export function ArtistScreen() {
  const { params, goBack, searchFor } = useApp();
  const artwork = params.artwork || {};
  const name = params.artistName || artwork.artistDisplayName || 'Artist';
  const bio = artwork.artistDisplayBio || 'The museum record does not include a short biography for this artist yet. Explore their work and notice the choices they made with shape, color, and materials.';
  
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Header title="Artist's corner" subtitle="A person behind the artwork" onBack={goBack} />
      <View style={styles.artistHero}>
        <Text style={styles.artistBigEmoji}>🧑‍🎨</Text><Text style={styles.artistName}>{name}</Text><Text style={styles.artistBio}>{bio}</Text>
      </View>
      <View style={styles.didYouKnow}>
        <Text style={styles.factBulb}>🔎</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.factTitle}>Be an art detective</Text>
          <Text style={styles.factBody}>Look at the artwork again. What do you think the artist wanted people to notice?</Text>
        </View>
      </View>
      <Button title={`Explore more by ${name.split(' ')[0] || 'this artist'} →`} onPress={() => searchFor(name)} />
      <Text style={styles.disclaimer}>Artist details come from the museum's artwork record and may not include a complete biography.</Text>
    </ScrollView>
  );
}
