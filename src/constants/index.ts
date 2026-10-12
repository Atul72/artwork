
import { Category, OnboardingSlide, LearningMode, QuizQuestion, FunFact } from '../types';

export const API_SEARCH = 'https://collectionapi.metmuseum.org/public/collection/v1.1/search';
export const API_OBJECT = 'https://collectionapi.metmuseum.org/public/collection/v1/objects';
export const PAGE_SIZE = 12;
export const DETAIL_CONCURRENCY = 12;
export const PAGE_CACHE_KEY = '@art-explorer/artwork-pages-v2';
export const PAGE_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
export const PAGE_CACHE_MAX_ENTRIES = 20;

export const STORAGE_KEYS = { 
  favorites: '@art-explorer/favorites-v1', 
  onboarded: '@art-explorer/onboarded-v1', 
  learningMode: '@art-explorer/learning-mode-v1' 
};

export const C = {
  bg: '#FFF9EF', paper: '#FFFFFF', ink: '#29234B', muted: '#77718B',
  primary: '#6655CC', primaryDark: '#4B3CA8', lavender: '#EEEAFE',
  orange: '#F59E0B', orangePale: '#FFF0CF', teal: '#109B81', tealPale: '#DDF7EF',
  pink: '#FCE4EF', bluePale: '#E5F2FF', line: '#E9E2F2', red: '#D94B64',
};

export const CATEGORIES: Category[] = [
  { label: 'Animals', query: 'animals', emoji: '🦁', tint: '#FFF0D4' },
  { label: 'Flowers', query: 'flowers', emoji: '🌻', tint: '#FFE7EF' },
  { label: 'Birds', query: 'birds', emoji: '🐦', tint: '#E5F2FF' },
  { label: 'Paintings', query: 'paintings', emoji: '🎨', tint: '#EEEAFE' },
  { label: 'Sculptures', query: 'sculpture', emoji: '🗿', tint: '#E1F5EE' },
  { label: 'Sunflowers', query: 'sunflowers', emoji: '🌻', tint: '#FFF0D4' },
  { label: 'Cats', query: 'cats', emoji: '🐱', tint: '#FFE7EF' },
  { label: 'Ocean', query: 'ocean', emoji: '🐠', tint: '#E5F2FF' },
  { label: 'Nature', query: 'landscape', emoji: '🌳', tint: '#E1F5EE' },
  { label: 'Ancient art', query: 'ancient art', emoji: '🏺', tint: '#FBE9D8' },
  { label: 'Portraits', query: 'portrait', emoji: '🖼️', tint: '#EEEAFE' },
  { label: 'Birds & bugs', query: 'butterflies', emoji: '🦋', tint: '#E5F2FF' },
];

export const ONBOARDING: OnboardingSlide[] = [
  { emoji: '🎨', kicker: 'A LITTLE WORLD OF ART', title: 'Hello, art explorer!', body: 'Discover amazing paintings, sculptures, and treasures from around the world.', bg: '#FFF0D4' },
  { emoji: '🖼️', kicker: 'LOOK CLOSELY', title: 'Every picture tells a story', body: 'Meet artists, spot tiny details, and learn something surprising with every visit.', bg: '#E9F2FF' },
  { emoji: '✨', kicker: 'READY, SET, CREATE', title: 'Learn while you play', body: 'Collect favorite artworks, try a mini quiz, and follow your curiosity.', bg: '#E3F8EF' },
];

export const LEARNING_MODES: LearningMode[] = [
  { id: 'little', label: 'Beginner Explorer', ages: 'Easy', emoji: '🐣', description: 'Fun, accessible questions introducing art fundamentals.' },
  { id: 'curious', label: 'Curious Creator', ages: 'Intermediate', emoji: '🎨', description: 'Explore art terminology, colors, materials, and mediums.' },
  { id: 'detective', label: 'Art Detective', ages: 'Advanced', emoji: '🔎', description: 'Dive into art techniques, history, and visual composition clues.' },
  { id: 'family', label: 'All Levels Mix', ages: 'Mixed', emoji: '✨', description: 'A lively mix of easy, intermediate, and advanced questions.' },
];

export const QUIZZES: Record<string, QuizQuestion[]> = {
  little: [
    { q: 'Who makes paintings?', options: ['An artist', 'A fish', 'A cloud', 'A shoe'], answer: 0, why: 'An artist makes art, such as pictures, paintings, and sculptures.' },
    { q: 'Which one can you use to paint?', options: ['Paintbrush', 'Pillow', 'Spoon only', 'Sock'], answer: 0, why: 'A paintbrush helps put paint on paper or canvas.' },
    { q: 'Which color is the Sun often drawn with?', options: ['Yellow', 'Purple', 'Brown', 'Grey'], answer: 0, why: 'People often draw the Sun using yellow, orange, or red.' },
    { q: 'What can an artist draw?', options: ['A cat', 'Only numbers', 'Only sounds', 'Nothing'], answer: 0, why: 'Artists can draw animals, people, places, and things they imagine.' },
    { q: 'What is art?', options: ['A way to create', 'A kind of sandwich', 'A shoe size', 'A weather report'], answer: 0, why: 'Art is a way to share ideas and imagination through making things.' },
  ],
  curious: [
    { q: 'Which two paint colors usually make green?', options: ['Red + pink', 'Blue + yellow', 'Black + white', 'Orange + red'], answer: 1, why: 'Mixing blue and yellow paint usually makes green.' },
    { q: 'What is a sculpture?', options: ['A song', 'A three-dimensional artwork', 'A type of cloud', 'A number'], answer: 1, why: 'A sculpture has height, width, and depth. You can often walk around it.' },
    { q: 'What do we call the material an artwork is made from?', options: ['Medium', 'Weather', 'Volume', 'Address'], answer: 0, why: 'The medium could be oil paint, watercolor, clay, bronze, or another material.' },
    { q: 'What is a portrait usually showing?', options: ['A person', 'A recipe', 'A map only', 'A musical note'], answer: 0, why: 'A portrait is an artwork that represents a person or sometimes a group.' },
    { q: 'Why might artists use bright colors?', options: ['To create a feeling or draw attention', 'To make sounds', 'To change the weather', 'To measure distance'], answer: 0, why: 'Color choices can guide your eyes and help communicate a mood or idea.' },
  ],
  detective: [
    { q: 'What is a still life artwork?', options: ['A picture of arranged objects', 'A moving cartoon only', 'A weather map', 'A portrait of a crowd only'], answer: 0, why: 'A still life often shows arranged objects, such as flowers, fruit, or everyday items.' },
    { q: 'What does “composition” mean in art?', options: ['How parts are arranged in an artwork', 'The price of paint', 'The artist’s birthday', 'The title of a book'], answer: 0, why: 'Composition is the arrangement of shapes, colors, objects, and other visual elements.' },
    { q: 'Which material is commonly used for a bronze sculpture?', options: ['Metal alloy', 'Cotton cloth only', 'Watercolor paper', 'Chalk dust only'], answer: 0, why: 'Bronze is a metal alloy often used for durable sculptures.' },
    { q: 'What is perspective used to help show in a drawing?', options: ['Depth and distance', 'The sound of colors', 'A scent', 'The age of the paper'], answer: 0, why: 'Perspective techniques help create the impression of space and distance on a flat surface.' },
    { q: 'When comparing two artworks, what is the strongest first step?', options: ['Observe details and compare visual choices', 'Assume they mean the same thing', 'Judge only by size', 'Ignore the materials'], answer: 0, why: 'Careful observation of color, material, subject, and composition helps build an evidence-based interpretation.' },
  ],
};

QUIZZES.family = [
  QUIZZES.little[0],
  QUIZZES.curious[1],
  QUIZZES.detective[1],
  QUIZZES.little[3],
  QUIZZES.detective[3],
];

export const FUN_FACTS: FunFact[] = [
  { title: 'Colors can tell stories', text: 'Artists use bright, soft, warm, and cool colors to help a picture feel different ways.', emoji: '🌈' },
  { title: 'Look for tiny details', text: 'A painting may hide little details in the background. Try looking at the corners too!', emoji: '🔎' },
  { title: 'Art can be made from many things', text: 'Artists can work with paint, clay, fabric, metal, wood, paper, and many other materials.', emoji: '🧵' },
  { title: 'Preserving art history', text: 'Galleries and archives preserve artworks and share stories about cultures from around the world.', emoji: '🏛️' },
  { title: 'There is no one way to create', text: 'Every artist has their own ideas. Your way of making art can be special, too.', emoji: '💡' },
];
