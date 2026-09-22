import { ShortsBlueprint } from '../types';
import { ALL_50_AFFIRMATIONS_BLUEPRINTS } from './affirmations50';
import { enrichBlueprintWithVerification } from './scriptureVerifications';
import { generateCharacterExpression, buildInculcatedVideoPrompt } from '../utils/characterExpressionEngine';
import { buildCharacterVoiceDirection } from '../utils/narrationEngine';
import { cleanScriptureRef } from '../utils/overlayTypographyEngine';
import { getFormattedYouTubeDescription } from '../utils/blueprintFormatter';

const RAW_BLUEPRINTS: ShortsBlueprint[] = ALL_50_AFFIRMATIONS_BLUEPRINTS;

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

  // Combine existing tags with target audience algorithm tags
  const existingTags = (raw.seo?.tags || []).map(t => t.replace(/^#/, '').trim());
  const mergedTags = Array.from(new Set([...existingTags, ...TARGET_ALGORITHM_TAGS]));

  // Character-matched voice profile tailored to the specific character
  const characterMatchingVoice = raw.voiceProfile || voiceDir.voiceProfileDirective;
  const characterMatchingScript = raw.audioScript || voiceDir.audioNarrationScript;

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
    videoPrompt: raw.videoPrompt || videoPromptInculcated,
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
      tags: mergedTags
    }
  };

  return enrichBlueprintWithVerification(enriched);
}

export const INITIAL_BLUEPRINTS: ShortsBlueprint[] = RAW_BLUEPRINTS.map(enrichBlueprintWithExpressions);

export const TOTAL_PRAISES_TARGET = 50;
export const CURRENT_VERIFIED_COUNT = INITIAL_BLUEPRINTS.length;
