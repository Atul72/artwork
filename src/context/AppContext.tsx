
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Artwork, Route } from '../types';
import { LEARNING_MODES, QUIZZES, FUN_FACTS, STORAGE_KEYS } from '../constants';
import { fetchArtworkPage } from '../services/api';

export const AppContext = createContext<any>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState<boolean>(false);
  const [homeLoadStarted, setHomeLoadStarted] = useState<boolean>(false);
  const [onboarded, setOnboarded] = useState<boolean>(false);
  const [onboardingStep, setOnboardingStep] = useState<number>(0);
  const [routes, setRoutes] = useState<Route[]>([{ name: 'home', params: {} }]);
  const [query, setQuery] = useState<string>('sunflowers');
  const [galleryTerm, setGalleryTerm] = useState<string>('sunflowers');
  const [gallery, setGallery] = useState<Artwork[]>([]);
  const [nextOffset, setNextOffset] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [favorites, setFavorites] = useState<Artwork[]>([]);
  const [learningMode, setLearningMode] = useState<string>('family');
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizChoice, setQuizChoice] = useState<number | null>(null);
  const [quizComplete, setQuizComplete] = useState<boolean>(false);
  const [factIndex, setFactIndex] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string>('All time');

  const route = routes[routes.length - 1] || { name: 'home', params: {} };
  const screen = route.name;
  const params = route.params || {};
  const isRoot = routes.length === 1;

  useEffect(() => {
    (async () => {
      try {
        const [savedFavorites, savedOnboarding, savedLearningMode] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.favorites),
          AsyncStorage.getItem(STORAGE_KEYS.onboarded),
          AsyncStorage.getItem(STORAGE_KEYS.learningMode),
        ]);
        if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
        if (savedOnboarding === 'yes') setOnboarded(true);
        if (savedLearningMode && LEARNING_MODES.some((mode) => mode.id === savedLearningMode)) setLearningMode(savedLearningMode);
      } catch (e) {
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const loadPage = useCallback(async (term: string, offset = 0, append = false) => {
    if (append) setLoadingMore(true); else setLoading(true);
    setError('');
    try {
      const result = await fetchArtworkPage(term, offset);
      setGallery((previous) => {
        const newItems = append ? [...previous, ...result.items] : result.items;
        const seen = new Set();
        return newItems.filter((item: Artwork) => {
          if (seen.has(item.objectID)) return false;
          seen.add(item.objectID);
          return true;
        });
      });
      setGalleryTerm(term);
      setNextOffset(offset + result.idsReturned);
      setTotal(result.total);
      if (result.items.length === 0 && !append) {
        setError('No public-domain artwork with an image was found on this page. Try another word or tap Load more.');
      }
    } catch (e: any) {
      setError(e?.message || 'Unable to load artwork. Check your internet connection and try again.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    if (ready && onboarded && !homeLoadStarted) {
      setHomeLoadStarted(true);
      loadPage('sunflowers', 0, false);
    }
  }, [ready, onboarded, homeLoadStarted, loadPage]);

  useEffect(() => {
    if (ready) AsyncStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites)).catch(() => {});
  }, [favorites, ready]);

  useEffect(() => {
    if (ready) AsyncStorage.setItem(STORAGE_KEYS.learningMode, learningMode).catch(() => {});
  }, [learningMode, ready]);

  const navigate = useCallback((name: string, nextParams = {}) => {
    setRoutes((previous) => [...previous, { name, params: nextParams }]);
  }, []);

  const goBack = useCallback(() => {
    setRoutes((previous) => previous.length > 1 ? previous.slice(0, -1) : [{ name: 'home', params: {} }]);
  }, []);

  const switchTab = useCallback((name: string) => {
    setRoutes([{ name, params: {} }]);
    if (name === 'search') setQuery(galleryTerm || 'animals');
  }, [galleryTerm]);

  const completeOnboarding = useCallback(async () => {
    setOnboarded(true);
    setOnboardingStep(0);
    try { await AsyncStorage.setItem(STORAGE_KEYS.onboarded, 'yes'); } catch (e) {}
  }, []);

  const searchFor = useCallback((term: string) => {
    const clean = term.trim();
    if (!clean) { Alert.alert('What would you like to find?', 'Try a word like animals, flowers, or birds.'); return; }
    setQuery(clean);
    setGallery([]);
    setGalleryTerm(clean);
    setNextOffset(0);
    setRoutes([{ name: 'search', params: {} }]);
    loadPage(clean, 0, false);
  }, [loadPage]);

  const toggleFavorite = useCallback((artwork: Artwork) => {
    setFavorites((previous) => {
      const exists = previous.some((item) => item.objectID === artwork.objectID);
      return exists ? previous.filter((item) => item.objectID !== artwork.objectID) : [artwork, ...previous];
    });
  }, []);

  const isFavorite = useCallback((artwork: Artwork) => favorites.some((item) => item.objectID === artwork.objectID), [favorites]);

  const changeLearningMode = useCallback((modeId: string) => {
    if (!LEARNING_MODES.some((mode) => mode.id === modeId)) return;
    setLearningMode(modeId);
    setQuizIndex(0); setQuizScore(0); setQuizChoice(null); setQuizComplete(false);
    Alert.alert('Learning level updated', `${LEARNING_MODES.find((mode) => mode.id === modeId)?.label || 'Learning mode'} is ready for your next quiz.`);
  }, []);

  const activeQuiz = QUIZZES[learningMode] || QUIZZES.family;
  const activeLearningMode = LEARNING_MODES.find((mode) => mode.id === learningMode) || LEARNING_MODES[3];

  const startQuiz = () => {
    setQuizIndex(0); setQuizScore(0); setQuizChoice(null); setQuizComplete(false);
    navigate('quiz');
  };
  const nextFact = () => { setFactIndex((old) => (old + 1) % FUN_FACTS.length); };
  const searchCategory = (category: any) => searchFor(typeof category === 'string' ? category : category.query);

  const value = {
    ready, homeLoadStarted, onboarded, onboardingStep, routes, query, setQuery, galleryTerm, gallery,
    nextOffset, total, loading, loadingMore, error, favorites, learningMode, quizIndex, setQuizIndex,
    quizScore, setQuizScore, quizChoice, setQuizChoice, quizComplete, setQuizComplete, factIndex, setFactIndex,
    selectedTime, setSelectedTime, route, screen, params, isRoot, loadPage, navigate, goBack, switchTab,
    completeOnboarding, searchFor, toggleFavorite, isFavorite, changeLearningMode, activeQuiz, activeLearningMode,
    startQuiz, nextFact, searchCategory, setOnboardingStep
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
