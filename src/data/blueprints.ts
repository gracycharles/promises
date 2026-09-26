import { ShortsBlueprint } from '../types';
import { ALL_50_AFFIRMATIONS_BLUEPRINTS } from './affirmations50';
import { AFFIRMATIONS_51_TO_100 } from './affirmations51to100';
import { enrichBlueprintWithVerification } from './scriptureVerifications';
import { generateCharacterExpression, buildInculcatedVideoPrompt } from '../utils/characterExpressionEngine';
import { buildCharacterVoiceDirection } from '../utils/narrationEngine';
import { cleanScriptureRef } from '../utils/overlayTypographyEngine';
import { getFormattedYouTubeDescription } from '../utils/blueprintFormatter';
import { getSupportingCharactersForBlueprint } from '../utils/supportingCharactersEngine';

const RAW_BLUEPRINTS: ShortsBlueprint[] = [
  ...ALL_50_AFFIRMATIONS_BLUEPRINTS,
  ...AFFIRMATIONS_51_TO_100,
];

export const CORE_DEVOTIONAL_TAGS = [
  'India',
  'morning devotion',
  'Christian devotion',
  'praise',
  'praises',
  'Morning Devotion',
  'Christian Devotion',
  'Morning Prayer',
  'Daily Devotion',
  'Christian Devotional',
  'Tamil Christian',
  'Tamil Praise'
];

export const CORE_HASHTAG_SUITE = [
  '#India',
  '#MorningDevotion',
  '#ChristianDevotion',
  '#Praise',
  '#Praises',
  '#TamilChristian',
  '#1000Praises',
  '#Shorts'
];

const TARGET_ALGORITHM_TAGS = [
  'ChristianAffirmations',
  'BibleVerseShorts',
  'DailyHope',
  'PositiveChristian',
  'FamilyFriendly',
  'ChristianAnimation',
  'BiblePromises',
  'HopeInGod',
  'ChristianShorts',
  'DailyDevotional'
];

function enrichBlueprintWithExpressions(raw: ShortsBlueprint): ShortsBlueprint {
  const charExpr = generateCharacterExpression(raw);
  const videoPromptInculcated = buildInculcatedVideoPrompt(raw, charExpr);
  const voiceDir = buildCharacterVoiceDirection(raw);
  
  const title = (raw.affirmationTitle || raw.englishText || `Affirmation #${raw.id}`).trim();
  const rawVerse = (raw.scriptureVerse || raw.nkjvText || '').trim();
  const rawRef = (raw.scriptureRef || raw.englishRef || '').trim();
  const text = (raw.affirmationText || raw.englishText || title).trim();

  const ref = cleanScriptureRef(rawRef);
  const verse = rawVerse;

  // Check duplicate verse vs text
  const normVerse = verse.toLowerCase().replace(/[^a-z0-9]/g, '');
  const normText = text.toLowerCase().replace(/[^a-z0-9]/g, '');
  const isDuplicateVerse = normVerse.length === 0 || normVerse === normText;

  const line1Affirmation = raw.subtitles?.line1Affirmation || text;
  const rawLine2 = raw.subtitles?.line2Scripture || (verse ? `"${verse}"` : '');
  const normLine1 = line1Affirmation.toLowerCase().replace(/[^a-z0-9]/g, '');
  const normLine2 = rawLine2.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  const line2Scripture = (normLine1 === normLine2 || isDuplicateVerse) ? '' : rawLine2;
  const line3Ref = cleanScriptureRef(raw.subtitles?.line3Ref || ref);

  // Combine core devotional tags with target algorithm tags and existing blueprint tags
  const existingTags = (raw.seo?.tags || []).map(t => t.replace(/^#/, '').trim());
  const mergedTags = Array.from(new Set([...CORE_DEVOTIONAL_TAGS, ...TARGET_ALGORITHM_TAGS, ...existingTags]));

  // Combine core hashtag suite with existing hashtags
  const existingHashtags = (raw.seo?.hashtags || []).map(h => (h.startsWith('#') ? h : `#${h}`).trim());
  const mergedHashtags = Array.from(new Set([...CORE_HASHTAG_SUITE, ...existingHashtags]));

  // Character-matched voice profile tailored to the specific character
  const characterMatchingVoice = raw.voiceProfile || voiceDir.voiceProfileDirective;
  const characterMatchingScript = raw.audioScript || voiceDir.audioNarrationScript;
  const supportingChars = raw.supportingCharacters && raw.supportingCharacters.length > 0
    ? raw.supportingCharacters
    : getSupportingCharactersForBlueprint(raw.id, raw.character, raw.category, raw.comicalElement);

  const enriched: ShortsBlueprint = {
    ...raw,
    affirmationTitle: title,
    affirmationText: text,
    scriptureVerse: verse,
    scriptureRef: ref,
    englishText: text,
    englishRef: ref,
    nkjvText: verse,
    translationVersion: 'NKJV',
    voiceProfile: characterMatchingVoice,
    audioScript: characterMatchingScript,
    characterExpression: charExpr,
    supportingCharacters: supportingChars,
    videoPrompt: videoPromptInculcated,
    subtitles: {
      line1Affirmation,
      line2Scripture,
      line3Ref,
      line1Tamil: line1Affirmation,
      line2English: line2Scripture || text
    },
    seo: {
      ...raw.seo,
      title: raw.seo?.title || `Short #${raw.id} | ${title} | ${ref} | Christian Affirmations`,
      description: getFormattedYouTubeDescription({ scriptureVerse: verse, scriptureRef: ref, affirmationText: text }),
      tags: mergedTags,
      hashtags: mergedHashtags
    }
  };

  return enrichBlueprintWithVerification(enriched);
}

export const INITIAL_BLUEPRINTS: ShortsBlueprint[] = RAW_BLUEPRINTS.map(enrichBlueprintWithExpressions);

export const TOTAL_PRAISES_TARGET = 100;
export const CURRENT_VERIFIED_COUNT = INITIAL_BLUEPRINTS.length;
