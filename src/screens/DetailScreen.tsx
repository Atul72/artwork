
import React from 'react';
import { ScrollView, View, Text, Image, Pressable, Linking, Alert } from 'react-native';
import { useApp } from '../context/AppContext';
import { styles } from '../styles';
import { Header, Button } from '../components';
import { C } from '../constants';

export function DetailScreen() {
  const { params, goBack, isFavorite, toggleFavorite, navigate } = useApp();
  const artwork = params.artwork;

  if (!artwork) return <View style={styles.page}><Header title="Artwork not found" onBack={goBack} /></View>;
  const isSaved = isFavorite(artwork);

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Header title="Meet the artwork" subtitle="Take a closer look" onBack={goBack} right={<Pressable onPress={() => toggleFavorite(artwork)} style={styles.detailHeart}><Text style={{ fontSize: 22, color: C.red }}>{isSaved ? '♥' : '♡'}</Text></Pressable>} />
      <View style={styles.detailArtWrap}>{(artwork.primaryImageSmall || artwork.primaryImage) ? <Image source={{ uri: artwork.primaryImageSmall || artwork.primaryImage }} style={styles.detailArt} resizeMode="contain" /> : null}</View>
      <Text style={styles.detailTitle}>{artwork.title || 'Untitled artwork'}</Text>
      <Pressable onPress={() => navigate('artist', { artwork, artistName: artwork.artistDisplayName || 'Artist not listed' })} style={styles.artistLinkRow}><Text style={styles.detailArtist}>{artwork.artistDisplayName || 'Artist not listed'}</Text><Text style={styles.textLink}>Meet artist →</Text></Pressable>
      <View style={styles.metadataGrid}>
        <View style={styles.metadataCell}><Text style={styles.metadataIcon}>📅</Text><Text style={styles.metadataLabel}>DATE</Text><Text style={styles.metadataValue}>{artwork.objectDate || 'Not listed'}</Text></View>
        <View style={styles.metadataCell}><Text style={styles.metadataIcon}>🌍</Text><Text style={styles.metadataLabel}>CULTURE</Text><Text style={styles.metadataValue}>{artwork.culture || artwork.country || 'Not listed'}</Text></View>
        <View style={styles.metadataCell}><Text style={styles.metadataIcon}>🖌️</Text><Text style={styles.metadataLabel}>MEDIUM</Text><Text style={styles.metadataValue}>{artwork.medium || 'Not listed'}</Text></View>
        <View style={styles.metadataCell}><Text style={styles.metadataIcon}>🏛️</Text><Text style={styles.metadataLabel}>DEPARTMENT</Text><Text style={styles.metadataValue}>{artwork.department || 'The Met collection'}</Text></View>
      </View>
      <View style={styles.didYouKnow}><Text style={styles.factBulb}>💡</Text><View style={{ flex: 1 }}><Text style={styles.factTitle}>Look & wonder!</Text><Text style={styles.factBody}>What colors do you notice first? Can you spot a tiny detail that someone else might miss?</Text></View></View>
      <View style={styles.sourceCard}><Text style={styles.sourceTitle}>About this record</Text><Text style={styles.sourceBody}>Artwork details are supplied by The Metropolitan Museum of Art. Some descriptions may be incomplete.</Text><Text style={styles.sourceBody}>Image marked public domain by the museum API.</Text></View>
      {artwork.objectURL ? <Button title="View original museum record ↗" variant="outline" onPress={() => Linking.openURL(artwork.objectURL).catch(() => Alert.alert('Unable to open link'))} /> : null}
      <Button title={isSaved ? 'Saved to favorites ✓' : 'Add to favorites ♡'} onPress={() => toggleFavorite(artwork)} variant={isSaved ? 'soft' : 'primary'} style={{ marginTop: 10 }} />
    </ScrollView>
  );
}
