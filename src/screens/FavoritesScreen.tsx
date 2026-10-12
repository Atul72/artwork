
import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useApp } from '../context/AppContext';
import { styles } from '../styles';
import { Header, Button, ArtworkCard } from '../components';
import { Artwork } from '../types';

export function FavoritesScreen() {
  const { favorites, switchTab, navigate, isFavorite, toggleFavorite } = useApp();

  const renderGrid = (items: Artwork[], compact = false) => {
    if (!items?.length) return null;
    return (
      <View style={styles.grid}>
        {items.map((item) => (
          <ArtworkCard key={String(item.objectID)} artwork={item} compact={compact}
            favorite={isFavorite(item)} onToggleFavorite={toggleFavorite}
            onPress={() => navigate('detail', { artwork: item })} />
        ))}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Header title="My favorites 💜" subtitle="Your little gallery of keepers." />
      {favorites.length ? (
        <>
          <Text style={[styles.sectionSub, { marginBottom: 14 }]}>
            {favorites.length} saved {favorites.length === 1 ? 'artwork' : 'artworks'}
          </Text>
          {renderGrid(favorites)}
        </>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>💜</Text>
          <Text style={styles.emptyTitle}>Your gallery is waiting</Text>
          <Text style={styles.emptyBody}>Tap the heart on any artwork to keep it here.</Text>
          <Button title="Discover artwork" onPress={() => switchTab('search')} style={{ marginTop: 16 }} />
        </View>
      )}
    </ScrollView>
  );
}
