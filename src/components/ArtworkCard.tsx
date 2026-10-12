
import React from 'react';
import { Pressable, View, Text, Image, useWindowDimensions } from 'react-native';
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
  const { width } = useWindowDimensions();
  // Page paddingHorizontal is 18 (left 18 + right 18 = 36).
  // Grid gap is 12. Total available width for 2 cards is width - 36 - 12.
  const cardWidth = Math.floor((width - 36 - 12) / 2);
  const imageUri = artwork.primaryImageSmall || artwork.primaryImage;

  return (
    <Pressable onPress={onPress} style={[styles.artCard, { width: cardWidth }, compact && styles.artCardCompact]}>
      <View style={styles.artImageWrap}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={[styles.artImage, compact && styles.artImageCompact]} resizeMode="cover" />
        ) : (
          <View style={[styles.imagePlaceholder, compact && styles.artImageCompact]}>
            <Text style={styles.placeholderEmoji}>🖼️</Text>
          </View>
        )}
        {onToggleFavorite ? (
          <Pressable
            onPress={(event) => {
              event.stopPropagation?.();
              onToggleFavorite(artwork);
            }}
            style={styles.heartButton}
            accessibilityLabel={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Text style={{ fontSize: 17 }}>{favorite ? '♥' : '♡'}</Text>
          </Pressable>
        ) : null}
      </View>
      <Text numberOfLines={2} style={styles.artTitle}>{artwork.title || 'Untitled artwork'}</Text>
      <Text numberOfLines={1} style={styles.artArtist}>{artwork.artistDisplayName || 'Artist not listed'}</Text>
    </Pressable>
  );
}
