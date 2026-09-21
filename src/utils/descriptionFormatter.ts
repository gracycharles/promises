import { ShortsBlueprint, PraiseItem } from '../types';

/**
 * YouTube Description Formatter (Pure English)
 * 
 * Strict 3-part layout:
 * [Line 1]: ✨ Christian Affirmation Title (Scripture Reference)
 * 
 * [Line 2]: 📖 NKJV Scripture Verse
 * 
 * [Line 3]: 🙏 Personal affirmation / prayer / encouragement (Universal hope from kids to elderly)
 */
export function getFormattedYouTubeDescription(
  item: ShortsBlueprint | PraiseItem | { id: number; affirmationTitle?: string; scriptureRef?: string; scriptureVerse?: string; affirmationText?: string }
): string {
  const id = item.id;
  const title = ('affirmationTitle' in item ? item.affirmationTitle : '') || `Christian Affirmation #${id}`;
  const ref = ('scriptureRef' in item ? item.scriptureRef : '') || ('englishRef' in item ? (item as ShortsBlueprint).englishRef : '') || 'Holy Scripture';
  const verse = ('scriptureVerse' in item ? item.scriptureVerse : '') || ('nkjvText' in item ? (item as ShortsBlueprint).nkjvText : '') || '';
  const text = ('affirmationText' in item ? item.affirmationText : '') || ('englishText' in item ? (item as ShortsBlueprint).englishText : '') || '';

  const parts = [
    `✨ ${title} (${ref})`,
    verse ? `📖 "${verse}" — ${ref} (NKJV)` : '',
    text ? `🙏 Daily Declaration: ${text}` : '',
    `\nSubscribe to @ChristianAffirmationsShorts for daily Bible-based hope, joyful animation, and positive faith declarations for the entire family! ✨`
  ].filter(Boolean);

  return parts.join('\n\n');
}
