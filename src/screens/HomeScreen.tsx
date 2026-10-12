
import React from 'react';
import { ScrollView, View, Text, TextInput, Pressable } from 'react-native';
import { useApp } from '../context/AppContext';
import { styles } from '../styles';
import { Button, ArtworkCard, LoadingBlock } from '../components';
import { CATEGORIES } from '../constants';
import { Artwork } from '../types';

export function HomeScreen() {
  const { activeLearningMode, query, setQuery, searchFor, navigate, searchCategory, startQuiz, galleryTerm, loading, gallery, error, loadPage, toggleFavorite, isFavorite } = useApp();

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
      <View style={styles.homeTop}>
        <View><Text style={styles.brandSmall}>YOUR CREATIVE CORNER</Text><Text style={styles.homeTitle}>Art Explorer <Text>🎨</Text></Text><Text style={styles.homeSubtitle}>Big art. Little discoveries.</Text><Text style={styles.learningModeHint}>{activeLearningMode.emoji} {activeLearningMode.label} · {activeLearningMode.ages}</Text></View>
        <View style={styles.avatar}><Text style={{ fontSize: 29 }}>🧑‍🎨</Text></View>
      </View>
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput value={query} onChangeText={setQuery} placeholder="Search art, animals, flowers..." placeholderTextColor="#9892AA" style={styles.searchInput} returnKeyType="search" onSubmitEditing={() => searchFor(query)} accessibilityLabel="Search the art collection" />
        <Pressable onPress={() => searchFor(query)} style={styles.searchGo}><Text style={styles.searchGoText}>Go</Text></Pressable>
      </View>
      <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Pick an adventure</Text><Pressable onPress={() => navigate('categories')}><Text style={styles.textLink}>See all</Text></Pressable></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryStrip}>
        {CATEGORIES.slice(0, 7).map((category) => <Pressable key={category.label} onPress={() => searchCategory(category)} style={[styles.categoryTile, { backgroundColor: category.tint }]}><Text style={styles.categoryEmoji}>{category.emoji}</Text><Text style={styles.categoryLabel}>{category.label}</Text></Pressable>)}
      </ScrollView>
      <View style={[styles.heroCard, { backgroundColor: '#EEEAFE' }]}>
        <View style={{ flex: 1 }}><Text style={styles.heroEyebrow}>TODAY'S LITTLE CHALLENGE</Text><Text style={styles.heroTitle}>Look closer 👀</Text><Text style={styles.heroBody}>Find a color or tiny detail that makes you smile.</Text><Button title="Try a mini quiz" small onPress={startQuiz} style={{ alignSelf: 'flex-start', marginTop: 12 }} /></View>
        <Text style={styles.heroArt}>🖼️</Text>
      </View>
      <View style={styles.sectionHeader}><View><Text style={styles.sectionTitle}>Little art discoveries</Text><Text style={styles.sectionSub}>From The Met's collection</Text></View><Pressable onPress={() => { setQuery(galleryTerm || 'sunflowers'); navigate('search'); }}><Text style={styles.textLink}>View all →</Text></Pressable></View>
      {loading && gallery.length === 0 ? <LoadingBlock /> : null}
      {error && gallery.length === 0 ? <View style={styles.errorCard}><Text style={styles.errorText}>{error}</Text><Button title="Try again" small onPress={() => loadPage('sunflowers', 0, false)} /></View> : null}
      {renderGrid(gallery.slice(0, 6), true)}
      {!loading && gallery.length === 0 && !error ? <Text style={styles.mutedText}>Your next discovery is just around the corner.</Text> : null}
      <View style={styles.bottomTip}><Text style={{ fontSize: 23 }}>💡</Text><View style={{ flex: 1 }}><Text style={styles.bottomTipTitle}>Curiosity is creative</Text><Text style={styles.bottomTipBody}>There are lots of ways to see and make art. Explore at your own pace.</Text></View></View>
    </ScrollView>
  );
}
