/**
 * Audio Synthesis & Pronunciation Engine for Scripture Narration
 * 
 * Configured specifically for British young female voice profile ("en-GB").
 * Automatically expands biblical abbreviations (e.g., "Isa" -> "Isaiah", "Ps" -> "Psalm")
 * so the audio voiceover reads "Isaiah 41" instead of "ISA 41".
 */

// Comprehensive Map of Book Name Abbreviations to full phonetic spoken forms
const SCRIPTURE_BOOK_EXPANSIONS: Array<[RegExp, string]> = [
  [/\bIsa\.?\s*(\d+)/gi, 'Isaiah $1'],
  [/\bIs\.\s*(\d+)/gi, 'Isaiah $1'],
  [/\bPs\.?\s*(\d+)/gi, 'Psalm $1'],
  [/\bPsa\.?\s*(\d+)/gi, 'Psalm $1'],
  [/\bProv?\.?\s*(\d+)/gi, 'Proverbs $1'],
  [/\bGen\.?\s*(\d+)/gi, 'Genesis $1'],
  [/\bEx\.?\s*(\d+)/gi, 'Exodus $1'],
  [/\bExod\.?\s*(\d+)/gi, 'Exodus $1'],
  [/\bLev\.?\s*(\d+)/gi, 'Leviticus $1'],
  [/\bNum\.?\s*(\d+)/gi, 'Numbers $1'],
  [/\bDeut?\.?\s*(\d+)/gi, 'Deuteronomy $1'],
  [/\bJosh?\.?\s*(\d+)/gi, 'Joshua $1'],
  [/\bJudg?\.?\s*(\d+)/gi, 'Judges $1'],
  [/\bRuth\s*(\d+)/gi, 'Ruth $1'],
  [/\b1\s*Sam\.?\s*(\d+)/gi, 'First Samuel $1'],
  [/\b2\s*Sam\.?\s*(\d+)/gi, 'Second Samuel $1'],
  [/\b1\s*Kgs\.?\s*(\d+)/gi, 'First Kings $1'],
  [/\b2\s*Kgs\.?\s*(\d+)/gi, 'Second Kings $1'],
  [/\b1\s*Chron?\.?\s*(\d+)/gi, 'First Chronicles $1'],
  [/\b2\s*Chron?\.?\s*(\d+)/gi, 'Second Chronicles $1'],
  [/\bNeh\.?\s*(\d+)/gi, 'Nehemiah $1'],
  [/\bEsth?\.?\s*(\d+)/gi, 'Esther $1'],
  [/\bJob\s*(\d+)/gi, 'Job $1'],
  [/\bJer\.?\s*(\d+)/gi, 'Jeremiah $1'],
  [/\bLam\.?\s*(\d+)/gi, 'Lamentations $1'],
  [/\bEzek?\.?\s*(\d+)/gi, 'Ezekiel $1'],
  [/\bDan\.?\s*(\d+)/gi, 'Daniel $1'],
  [/\bHos\.?\s*(\d+)/gi, 'Hosea $1'],
  [/\bJoel\s*(\d+)/gi, 'Joel $1'],
  [/\bAmos\s*(\d+)/gi, 'Amos $1'],
  [/\bMic\.?\s*(\d+)/gi, 'Micah $1'],
  [/\bNah\.?\s*(\d+)/gi, 'Nahum $1'],
  [/\bHab\.?\s*(\d+)/gi, 'Habakkuk $1'],
  [/\bZeph\.?\s*(\d+)/gi, 'Zephaniah $1'],
  [/\bHag\.?\s*(\d+)/gi, 'Haggai $1'],
  [/\bZech\.?\s*(\d+)/gi, 'Zechariah $1'],
  [/\bMal\.?\s*(\d+)/gi, 'Malachi $1'],
  [/\bMatt?\.?\s*(\d+)/gi, 'Matthew $1'],
  [/\bMark\s*(\d+)/gi, 'Mark $1'],
  [/\bLuke\s*(\d+)/gi, 'Luke $1'],
  [/\bJohn\s*(\d+)/gi, 'John $1'],
  [/\bActs\s*(\d+)/gi, 'Acts $1'],
  [/\bRom\.?\s*(\d+)/gi, 'Romans $1'],
  [/\b1\s*Cor\.?\s*(\d+)/gi, 'First Corinthians $1'],
  [/\b2\s*Cor\.?\s*(\d+)/gi, 'Second Corinthians $1'],
  [/\bGal\.?\s*(\d+)/gi, 'Galatians $1'],
  [/\bEph\.?\s*(\d+)/gi, 'Ephesians $1'],
  [/\bPhil\.?\s*(\d+)/gi, 'Philippians $1'],
  [/\bCol\.?\s*(\d+)/gi, 'Colossians $1'],
  [/\b1\s*Thess?\.?\s*(\d+)/gi, 'First Thessalonians $1'],
  [/\b2\s*Thess?\.?\s*(\d+)/gi, 'Second Thessalonians $1'],
  [/\b1\s*Tim\.?\s*(\d+)/gi, 'First Timothy $1'],
  [/\b2\s*Tim\.?\s*(\d+)/gi, 'Second Timothy $1'],
  [/\bTitus\s*(\d+)/gi, 'Titus $1'],
  [/\bPhilem\.?\s*(\d+)/gi, 'Philemon $1'],
  [/\bHeb\.?\s*(\d+)/gi, 'Hebrews $1'],
  [/\bJas\.?\s*(\d+)/gi, 'James $1'],
  [/\b1\s*Pet\.?\s*(\d+)/gi, 'First Peter $1'],
  [/\b2\s*Pet\.?\s*(\d+)/gi, 'Second Peter $1'],
  [/\b1\s*Jn\.?\s*(\d+)/gi, 'First John $1'],
  [/\b2\s*Jn\.?\s*(\d+)/gi, 'Second John $1'],
  [/\b3\s*Jn\.?\s*(\d+)/gi, 'Third John $1'],
  [/\bJude\s*(\d+)/gi, 'Jude $1'],
  [/\bRev\.?\s*(\d+)/gi, 'Revelation $1']
];

/**
 * Normalizes scripture references and scripts for TTS reading:
 * - Expands abbreviated book names like "Isa" to "Isaiah"
 * - Converts "41:10" to "forty-one verse ten" or "41 verse 10" for natural cadence
 * - Cleans out editorial brackets like [Comforting & bold]
 */
export function normalizeScriptForSpeech(scriptText: string): string {
  if (!scriptText) return '';

  let clean = scriptText
    // Remove editorial direction tags like [Upbeat & inspiring], [Gentle breath], etc.
    .replace(/\[[^\]]*\]/g, ' ')
    // Strip emojis
    .replace(/[\u{1F300}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}📖✝️✨🕊️🐑🦅🦁]/gu, ' ');

  // Expand scripture abbreviations
  for (const [regex, replacement] of SCRIPTURE_BOOK_EXPANSIONS) {
    clean = clean.replace(regex, replacement);
  }

  // Convert chapter:verse format "41:10" to "chapter 41 verse 10" or "41 verse 10" for TTS
  clean = clean.replace(/(\b[A-Za-z]+)\s+(\d+):(\d+)/g, '$1 $2 verse $3');

  // Strip extraneous quotes & clean whitespace
  clean = clean.replace(/["“”«»]/g, '').replace(/\s+/g, ' ').trim();

  return clean;
}

/**
 * Finds the best British young female voice from the available SpeechSynthesis voices.
 */
export function getBritishYoungFemaleVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }

  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // 1. Look for English (Great Britain / UK) voices with feminine descriptors
  const femaleKeywords = ['female', 'woman', 'girl', 'victoria', 'serena', 'hazel', 'sonia', 'libby', 'fiona', 'amy', 'olivia', 'georgia', 'emily', 'martha', 'lucy', 'kate', 'stephanie'];
  
  // High priority: en-GB female voice
  const britishFemale = voices.find(v => {
    const isEnGB = v.lang.toLowerCase().replace('_', '-') === 'en-gb';
    const nameLower = v.name.toLowerCase();
    const isFemale = femaleKeywords.some(kw => nameLower.includes(kw));
    return isEnGB && isFemale;
  });

  if (britishFemale) return britishFemale;

  // Secondary priority: Any en-GB voice
  const anyBritish = voices.find(v => v.lang.toLowerCase().replace('_', '-') === 'en-gb');
  if (anyBritish) return anyBritish;

  // Tertiary priority: Any English female voice (e.g. en-US, en-AU, en-CA)
  const anyEnglishFemale = voices.find(v => {
    const isEn = v.lang.toLowerCase().startsWith('en');
    const nameLower = v.name.toLowerCase();
    return isEn && femaleKeywords.some(kw => nameLower.includes(kw));
  });

  if (anyEnglishFemale) return anyEnglishFemale;

  // Fallback: Default English voice
  return voices.find(v => v.lang.toLowerCase().startsWith('en')) || voices[0] || null;
}

/**
 * Synthesizes speech using the browser Web Speech API with British young female voice settings.
 */
export function speakScript(
  text: string, 
  onStart?: () => void, 
  onEnd?: () => void, 
  onError?: (err: any) => void
): SpeechSynthesisUtterance | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onError?.('SpeechSynthesis is not supported in this browser.');
    return null;
  }

  // Cancel any active speech
  window.speechSynthesis.cancel();

  const spokenText = normalizeScriptForSpeech(text);
  const utterance = new SpeechSynthesisUtterance(spokenText);

  // Set British English language tag
  utterance.lang = 'en-GB';

  // SLightly elevated pitch & youthful energetic rate for a young British female tone
  utterance.pitch = 1.15; // Young, bright, clear
  utterance.rate = 1.02;  // Articulate, natural tempo

  const voice = getBritishYoungFemaleVoice();
  if (voice) {
    utterance.voice = voice;
  }

  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  if (onError) utterance.onerror = onError;

  window.speechSynthesis.speak(utterance);
  return utterance;
}

/**
 * Stops any ongoing audio speech synthesis.
 */
export function stopSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
