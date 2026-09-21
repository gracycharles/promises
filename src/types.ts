export interface PraiseItem {
  id: number;
  text: string;
  reference: string;
  page: number;
  category?: string;
  notes?: string;
}

export interface BookMetadata {
  title: string;
  subtitle: string;
  author: string;
  organization: string;
  address: string;
  phone: string;
  scriptureVerses: string[];
  foreword: {
    title: string;
    content: string;
    author: string;
  };
}

export interface PageData {
  page: number;
  title: string;
  rawText: string;
  praises: PraiseItem[];
}

export interface CharacterExpression {
  expression: string;
  gesturePosture: string;
  theologicalMood: string;
  sceneAtmosphere: string;
  inculcatedPromptAddition: string;
}

export interface ScriptureVerification {
  citedVerseAnalysis: string;
  exactTitleMatch: string;
  verdict: string;
  fullVerificationText: string;
  nkjvVerseQuote?: string;
}

export interface ShortsBlueprint {
  id: number;
  affirmationTitle?: string;
  affirmationText?: string;
  scriptureVerse?: string;
  scriptureRef?: string;
  translationVersion?: 'NKJV';
  category?: string;
  characterStyle?: string;
  characterName?: string;
  comicalElement?: string;
  targetAudience?: string;
  character: string;
  location: string;
  videoPrompt: string;
  voiceProfile: string;
  audioScript: string;
  backgroundAudio: string;
  subtitles: {
    line1Affirmation?: string;
    line2Scripture?: string;
    line3Ref?: string;
    line1Tamil?: string;
    line2English?: string;
  };
  seo: {
    title: string;
    description: string;
    tags: string[];
    hashtags: string[];
  };
  verification?: ScriptureVerification;
  characterExpression?: CharacterExpression;
  // Backward compatibility aliases
  englishText?: string;
  englishRef?: string;
  nkjvText?: string;
  tamilTitle?: string;
  tamilText?: string;
  tamilRef?: string;
}

export type ViewTab = 'studio' | 'directory';
