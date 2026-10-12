
export interface Artwork {
  objectID: number;
  title: string;
  artistDisplayName: string;
  artistDisplayBio?: string;
  primaryImage?: string;
  primaryImageSmall?: string;
  objectDate?: string;
  culture?: string;
  country?: string;
  medium?: string;
  department?: string;
  objectURL?: string;
  isPublicDomain: boolean;
}

export interface Category {
  label: string;
  query: string;
  emoji: string;
  tint: string;
}

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  why: string;
}

export interface LearningMode {
  id: string;
  label: string;
  ages: string;
  emoji: string;
  description: string;
}

export interface FunFact {
  title: string;
  text: string;
  emoji: string;
}

export interface OnboardingSlide {
  emoji: string;
  kicker: string;
  title: string;
  body: string;
  bg: string;
}

export interface Route {
  name: string;
  params: Record<string, any>;
}
