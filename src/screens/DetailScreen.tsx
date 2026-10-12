import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, Pressable, ActivityIndicator } from 'react-native';
import { useApp } from '../context/AppContext';
import { styles } from '../styles';
import { Header, Button } from '../components';
import { C } from '../constants';

export function DetailScreen() {
  const { params, goBack, isFavorite, toggleFavorite, navigate } = useApp();
  const artwork = params.artwork;

  if (!artwork) return <View style={styles.page}><Header title="Artwork not found" onBack={goBack} /></View>;
  const isSaved = isFavorite(artwork);

  const initialUri = artwork.primaryImageSmall || artwork.primaryImage;
  const [imageUri, setImageUri] = useState<string | undefined>(initialUri);
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    setImageUri(artwork.primaryImageSmall || artwork.primaryImage);
    setImageLoading(true);
    setImageError(false);
  }, [artwork.objectID]);

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Header
        title="Meet the artwork"
        subtitle="Take a closer look"
        onBack={goBack}
        right={
          <Pressable
            onPress={() => toggleFavorite(artwork)}
            style={styles.detailHeart}
            accessibilityLabel={isSaved ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Text style={{ fontSize: 22, color: C.red }}>{isSaved ? '♥' : '♡'}</Text>
          </Pressable>
        }
      />

      <View style={styles.detailArtWrap}>
        {imageUri && !imageError ? (
          <>
            <Image
              key={imageUri}
              source={{ uri: imageUri }}
              style={styles.detailArt}
              resizeMode="contain"
              fadeDuration={0}
              onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => setImageLoading(false)}
              onError={() => {
                if (imageUri === artwork.primaryImageSmall && artwork.primaryImage) {
                  setImageUri(artwork.primaryImage);
                } else {
                  setImageError(true);
                  setImageLoading(false);
                }
              }}
            />
            {imageLoading ? (
              <View style={styles.detailImageLoadingOverlay}>
                <ActivityIndicator size="large" color={C.primary} />
                <Text style={styles.detailImageLoadingText}>Loading artwork image...</Text>
              </View>
            ) : null}
          </>
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderEmoji}>🖼️</Text>
            <Text style={styles.mutedText}>Artwork image not available</Text>
          </View>
        )}
      </View>

      <Text style={styles.detailTitle}>{artwork.title || 'Untitled artwork'}</Text>
      <Pressable
        onPress={() => navigate('artist', { artwork, artistName: artwork.artistDisplayName || 'Artist not listed' })}
        style={styles.artistLinkRow}
      >
        <Text style={styles.detailArtist}>{artwork.artistDisplayName || 'Artist not listed'}</Text>
        <Text style={styles.textLink}>Meet artist →</Text>
      </Pressable>

      <View style={styles.metadataGrid}>
        <View style={styles.metadataCell}>
          <Text style={styles.metadataIcon}>📅</Text>
          <Text style={styles.metadataLabel}>DATE</Text>
          <Text style={styles.metadataValue}>{artwork.objectDate || 'Not listed'}</Text>
        </View>
        <View style={styles.metadataCell}>
          <Text style={styles.metadataIcon}>🌍</Text>
          <Text style={styles.metadataLabel}>CULTURE</Text>
          <Text style={styles.metadataValue}>{artwork.culture || artwork.country || 'Not listed'}</Text>
        </View>
        <View style={styles.metadataCell}>
          <Text style={styles.metadataIcon}>🖌️</Text>
          <Text style={styles.metadataLabel}>MEDIUM</Text>
          <Text style={styles.metadataValue}>{artwork.medium || 'Not listed'}</Text>
        </View>
        <View style={styles.metadataCell}>
          <Text style={styles.metadataIcon}>🏛️</Text>
          <Text style={styles.metadataLabel}>COLLECTION</Text>
          <Text style={styles.metadataValue}>{artwork.department || 'Fine Arts'}</Text>
        </View>
      </View>

      <View style={styles.didYouKnow}>
        <Text style={styles.factBulb}>💡</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.factTitle}>Look & wonder!</Text>
          <Text style={styles.factBody}>
            What colors do you notice first? Can you spot a tiny detail that someone else might miss?
          </Text>
        </View>
      </View>

      <View style={styles.sourceCard}>
        <Text style={styles.sourceTitle}>About this artwork</Text>
        <Text style={styles.sourceBody}>
          Historic artwork and cultural details preserved in international fine art archives.
        </Text>
      </View>

      <Button
        title={isSaved ? 'Saved to favorites ✓' : 'Add to favorites ♡'}
        onPress={() => toggleFavorite(artwork)}
        variant={isSaved ? 'soft' : 'primary'}
        style={{ marginTop: 10 }}
      />
    </ScrollView>
  );
}
