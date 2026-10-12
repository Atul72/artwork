
import React from 'react';
import { Pressable, View, Text, Image } from 'react-native';
import { styles } from '../styles';
import { Artwork } from '../types';

interface ArtworkCardProps {
  artwork: Artwork;
  onPress: () => void;
  favorite?: boolean;
  onToggleFavorite?: (artwork: Artwork) => void;
  compact?: boolean;
}

export function ArtworkCard({ artwork, onPress, favorite, onToggleFavorite, compact = false }: ArtworkCardProps) {
  const imageUri = artwork.primaryImageSmall || artwork.primaryImage;
  return (
    <Pressable onPress={onPress} style={[styles.artCard, compact && styles.artCardCompact]}>
      <View style={styles.artImageWrap}>
        {imageUri ? <Image source={{ uri: imageUri }} style={[styles.artImage, compact && styles.artImageCompact]} resizeMode="cover" /> : <View style={styles.imagePlaceholder}><Text style={styles.placeholderEmoji}>🖼️</Text></View>}
        {onToggleFavorite ? (
          <Pressable onPress={(event) => { event.stopPropagation?.(); onToggleFavorite(artwork); }} style={styles.heartButton} accessibilityLabel={favorite ? 'Remove from favorites' : 'Add to favorites'}>
            <Text style={{ fontSize: 17 }}>{favorite ? '♥' : '♡'}</Text>
          </Pressable>
        ) : null}
      </View>
      <Text numberOfLines={2} style={styles.artTitle}>{artwork.title || 'Untitled artwork'}</Text>
      <Text numberOfLines={1} style={styles.artArtist}>{artwork.artistDisplayName || 'Artist not listed'}</Text>
    </Pressable>
  );
}
