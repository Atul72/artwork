import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Pressable, Keyboard, Image, ActivityIndicator } from 'react-native';
import { useApp } from '../context/AppContext';
import { styles } from '../styles';
import { C } from '../constants';
import { Artwork } from '../types';
import { fetchLiveSearchSuggestions } from '../services/api';

interface SearchBarProps {
  placeholder?: string;
  autoFocus?: boolean;
}

export function SearchBar({ placeholder = 'Search art, animals, flowers...', autoFocus = false }: SearchBarProps) {
  const { query, setQuery, searchFor, navigate } = useApp();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [liveSuggestions, setLiveSuggestions] = useState<Artwork[]>([]);
  const latestQueryRef = useRef<string>(query);

  latestQueryRef.current = query;

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setLiveSuggestions([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const results = await fetchLiveSearchSuggestions(trimmed, 4);
        // Only update if the user hasn't typed something else in the meantime
        if (latestQueryRef.current.trim().toLowerCase() === trimmed.toLowerCase()) {
          setLiveSuggestions(results);
        }
      } catch {
        if (latestQueryRef.current.trim().toLowerCase() === trimmed.toLowerCase()) {
          setLiveSuggestions([]);
        }
      } finally {
        if (latestQueryRef.current.trim().toLowerCase() === trimmed.toLowerCase()) {
          setIsSearching(false);
        }
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelectArtwork = (artwork: Artwork) => {
    Keyboard.dismiss();
    setIsFocused(false);
    navigate('detail', { artwork });
  };

  const handleSeeAll = () => {
    Keyboard.dismiss();
    setIsFocused(false);
    searchFor(query);
  };

  const handleClear = () => {
    setQuery('');
    setLiveSuggestions([]);
    setIsSearching(false);
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    setIsFocused(false);
    searchFor(query);
  };

  const showDropdown = isFocused && query.trim().length >= 2;

  return (
    <View style={styles.searchContainer}>
      <View style={[styles.searchBox, isFocused && styles.searchBoxFocused]}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            if (!isFocused) setIsFocused(true);
          }}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          placeholderTextColor="#9892AA"
          style={styles.searchInput}
          returnKeyType="search"
          onSubmitEditing={handleSubmit}
          accessibilityLabel="Search the art collection"
          autoFocus={autoFocus}
        />
        {query.length > 0 ? (
          <Pressable onPress={handleClear} style={styles.searchClear} accessibilityLabel="Clear search input">
            <Text style={styles.searchClearText}>✕</Text>
          </Pressable>
        ) : null}
        <Pressable onPress={handleSubmit} style={styles.searchGo} accessibilityLabel="Search">
          <Text style={styles.searchGoText}>Go</Text>
        </Pressable>
      </View>

      {showDropdown ? (
        <View style={styles.suggestionsCard}>
          <View style={styles.suggestionsHeader}>
            <Text style={styles.suggestionsTitle}>
              {isSearching ? 'FINDING ARTWORKS...' : 'SUGGESTED ARTWORKS'}
            </Text>
            <Pressable onPress={() => setIsFocused(false)} hitSlop={8}>
              <Text style={styles.suggestionsCount}>Close ✕</Text>
            </Pressable>
          </View>

          {isSearching ? (
            <View style={styles.suggestionLoadingRow}>
              <ActivityIndicator size="small" color={C.primary} />
              <Text style={styles.suggestionLoadingText}>Searching collection for “{query.trim()}”...</Text>
            </View>
          ) : liveSuggestions.length > 0 ? (
            <>
              {liveSuggestions.map((item) => {
                const imageUri = item.primaryImageSmall || item.primaryImage;
                return (
                  <Pressable
                    key={String(item.objectID)}
                    onPress={() => handleSelectArtwork(item)}
                    style={({ pressed }) => [styles.suggestionRow, pressed && styles.suggestionRowPressed]}
                  >
                    {imageUri ? (
                      <Image source={{ uri: imageUri }} style={styles.suggestionThumbnail} resizeMode="cover" />
                    ) : (
                      <View style={styles.suggestionThumbnailPlaceholder}>
                        <Text style={{ fontSize: 18 }}>🖼️</Text>
                      </View>
                    )}
                    <View style={styles.suggestionTextWrap}>
                      <Text numberOfLines={1} style={styles.suggestionLabel}>
                        {item.title || 'Untitled artwork'}
                      </Text>
                      <Text numberOfLines={1} style={styles.suggestionQuery}>
                        {item.artistDisplayName || 'Artist not listed'}
                      </Text>
                    </View>
                    <Text style={styles.suggestionArrow}>›</Text>
                  </Pressable>
                );
              })}

              <Pressable onPress={handleSeeAll} style={styles.suggestionSeeAllRow}>
                <Text style={styles.suggestionSeeAllText}>
                  🔍 View all results for “{query.trim()}” →
                </Text>
              </Pressable>
            </>
          ) : (
            <Pressable onPress={handleSeeAll} style={styles.suggestionSeeAllRow}>
              <Text style={styles.suggestionSeeAllText}>
                No quick preview. Tap here to search full collection for “{query.trim()}” →
              </Text>
            </Pressable>
          )}
        </View>
      ) : null}
    </View>
  );
}
