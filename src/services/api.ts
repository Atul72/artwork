
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_SEARCH, API_OBJECT, PAGE_SIZE, DETAIL_CONCURRENCY, PAGE_CACHE_KEY, PAGE_CACHE_TTL_MS, PAGE_CACHE_MAX_ENTRIES } from '../constants';
import { Artwork } from '../types';

function pageCacheId(term: string, offset: number) {
  return `${String(term || 'art').trim().toLowerCase()}::${offset}`;
}

export async function readArtworkPageCache(term: string, offset: number) {
  try {
    const raw = await AsyncStorage.getItem(PAGE_CACHE_KEY);
    if (!raw) return null;
    const all = JSON.parse(raw);
    const entry = all[pageCacheId(term, offset)];
    if (!entry || !Array.isArray(entry.items)) return null;
    return entry;
  } catch {
    return null;
  }
}

export async function saveArtworkPageCache(term: string, offset: number, result: any) {
  try {
    const raw = await AsyncStorage.getItem(PAGE_CACHE_KEY);
    const all = raw ? JSON.parse(raw) : {};
    all[pageCacheId(term, offset)] = { ...result, savedAt: Date.now() };
    const entries = Object.entries(all)
      .sort((a: any, b: any) => (b[1]?.savedAt || 0) - (a[1]?.savedAt || 0))
      .slice(0, PAGE_CACHE_MAX_ENTRIES);
    await AsyncStorage.setItem(PAGE_CACHE_KEY, JSON.stringify(Object.fromEntries(entries)));
  } catch {
  }
}

export async function fetchArtworkPage(term: string, offset = 0) {
  const query = term.trim() || 'art';
  const cached = await readArtworkPageCache(query, offset);
  const cacheIsFresh = cached && Date.now() - cached.savedAt < PAGE_CACHE_TTL_MS;

  if (cacheIsFresh) return { ...cached, fromCache: true };

  try {
    const url = `${API_SEARCH}?q=${encodeURIComponent(query)}&hasImages=true&isPublicDomain=true&limit=${PAGE_SIZE}&offset=${offset}`;
    const searchResponse = await fetch(url);
    if (!searchResponse.ok) throw new Error(`Museum search failed (HTTP ${searchResponse.status}).`);
    const searchData = await searchResponse.json();
    const ids: number[] = Array.isArray(searchData.objectIDs) ? searchData.objectIDs : [];

    const records: Artwork[] = [];
    for (let i = 0; i < ids.length; i += DETAIL_CONCURRENCY) {
      const batch = ids.slice(i, i + DETAIL_CONCURRENCY);
      const batchResults = await Promise.allSettled(batch.map(async (id) => {
        const response = await fetch(`${API_OBJECT}/${id}`);
        if (!response.ok) throw new Error(`Artwork ${id} could not be loaded.`);
        return response.json();
      }));
      batchResults.forEach((result) => {
        if (result.status === 'fulfilled') records.push(result.value);
      });
    }

    const items = records.filter((item) => item.isPublicDomain === true && item.primaryImageSmall);
    const result = { items, idsReturned: ids.length, total: searchData.total || 0 };
    await saveArtworkPageCache(query, offset, result);
    return { ...result, fromCache: false };
  } catch (error) {
    if (cached && Array.isArray(cached.items)) return { ...cached, fromCache: true, stale: true };
    throw error;
  }
}
