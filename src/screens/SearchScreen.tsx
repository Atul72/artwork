import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useApp } from '../context/AppContext';
import { styles } from '../styles';
import { Header, Pill, LoadingBlock, Button, ArtworkCard, SearchBar } from '../components';
import { CATEGORIES } from '../constants';
import { Artwork } from '../types';

export function SearchScreen() {
  const { searchFor, galleryTerm, total, loading, gallery, error, loadPage, loadingMore, nextOffset, navigate, isFavorite, toggleFavorite } = useApp();

  const renderGrid = (items: Artwork[], compact = false) => {
    if (!items?.length) return null;
    return (
      <View style={styles.grid}>
        {items.map((item) => (
          <ArtworkCard
            key={String(item.objectID)}
            artwork={item}
            compact={compact}
            favorite={isFavorite(item)}
            onToggleFavorite={toggleFavorite}
            onPress={() => navigate('detail', { artwork: item })}
          />
        ))}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
      <Header title="Find your art" subtitle="What would you like to discover?" />
      
      <SearchBar placeholder="Try animals, flowers, birds, Monet..." />

      <Text style={styles.sectionTitle}>Popular searches</Text>
      <View style={styles.pillWrap}>
        {CATEGORIES.slice(0, 8).map((cat) => (
          <Pill key={cat.label} title={cat.label} emoji={cat.emoji} onPress={() => searchFor(cat.query)} />
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Results for “{galleryTerm}”</Text>
          <Text style={styles.sectionSub}>
            {total ? `${total.toLocaleString()} artworks found` : 'Art collection'}
          </Text>
        </View>
      </View>

      {loading && gallery.length === 0 ? <LoadingBlock /> : null}
      {!!error ? (
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>{error}</Text>
          <Button title="Try again" small onPress={() => loadPage(galleryTerm, 0, false)} />
        </View>
      ) : null}

      {renderGrid(gallery)}

      {loadingMore ? <LoadingBlock text="Finding more art..." /> : null}

      {!loading && nextOffset < Math.min(total || 0, 10000) ? (
        <Button
          title="Load more artwork ↓"
          variant="outline"
          onPress={() => loadPage(galleryTerm, nextOffset, true)}
          disabled={loadingMore}
          style={{ marginTop: 8 }}
        />
      ) : null}

      <Text style={styles.disclaimer}>
        Explore timeless paintings, sculptures, and historic treasures from around the world.
      </Text>
    </ScrollView>
  );
}
