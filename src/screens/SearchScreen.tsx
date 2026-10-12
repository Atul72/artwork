
import React from 'react';
import { ScrollView, View, Text, TextInput, Pressable } from 'react-native';
import { useApp } from '../context/AppContext';
import { styles } from '../styles';
import { Header, Pill, LoadingBlock, Button, ArtworkCard } from '../components';
import { CATEGORIES } from '../constants';
import { Artwork } from '../types';

export function SearchScreen() {
  const { query, setQuery, searchFor, galleryTerm, total, loading, gallery, error, loadPage, loadingMore, nextOffset, navigate, isFavorite, toggleFavorite } = useApp();

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
    <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
      <Header title="Find your art" subtitle="What would you like to discover?" />
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>⌕</Text><TextInput value={query} onChangeText={setQuery} placeholder="Try animals, flowers, birds..." placeholderTextColor="#9892AA" style={styles.searchInput} returnKeyType="search" onSubmitEditing={() => searchFor(query)} accessibilityLabel="Search artworks" /><Pressable style={styles.searchGo} onPress={() => searchFor(query)}><Text style={styles.searchGoText}>Go</Text></Pressable>
      </View>
      <Text style={styles.sectionTitle}>Popular searches</Text>
      <View style={styles.pillWrap}>{CATEGORIES.slice(0, 8).map((cat) => <Pill key={cat.label} title={cat.label} emoji={cat.emoji} onPress={() => searchFor(cat.query)} />)}</View>
      <View style={styles.sectionHeader}><View><Text style={styles.sectionTitle}>Results for “{galleryTerm}”</Text><Text style={styles.sectionSub}>{total ? `${total.toLocaleString()} matching records in The Met` : 'Museum collection'}</Text></View></View>
      {loading && gallery.length === 0 ? <LoadingBlock /> : null}
      {!!error ? <View style={styles.errorCard}><Text style={styles.errorText}>{error}</Text><Button title="Try again" small onPress={() => loadPage(galleryTerm, 0, false)} /></View> : null}
      {renderGrid(gallery)}
      {loadingMore ? <LoadingBlock text="Finding more art..." /> : null}
      {!loading && nextOffset < Math.min(total || 0, 10000) ? <Button title="Load more artwork ↓" variant="outline" onPress={() => loadPage(galleryTerm, nextOffset, true)} disabled={loadingMore} style={{ marginTop: 8 }} /> : null}
      <Text style={styles.disclaimer}>Artworks shown here are filtered to records marked public domain with an available image.</Text>
    </ScrollView>
  );
}
