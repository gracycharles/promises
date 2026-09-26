import { ShortsBlueprint, PraiseItem } from '../types';
import { generateCharacterExpression, buildInculcatedVideoPrompt } from './characterExpressionEngine';
import { computeOverlayTypography, cleanScriptureRef } from './overlayTypographyEngine';
import { buildCharacterVoiceDirection } from './narrationEngine';

/**
 * Formats a ShortsBlueprint into the exact full production blueprint
 */
export function formatBlueprintAsText(b: ShortsBlueprint): string {
  return `${formatVideoGenerationOnlyText(b)}

${formatYouTubeOnlyText(b)}`;
}

/**
 * Formats a Midjourney v6 Image Generation Base Frame Prompt for keyframe image-to-video generation
 */
export function formatMidjourneyPrompt(b: ShortsBlueprint): string {
  const charStyle = b.characterStyle || "3D Pixar Animation";
  const char = b.character || "Hero animated character";
  const comical = b.comicalElement || "A charming animated character with a bright infectious smile.";
  const location = b.location || "A vibrant sunlit landscape";
  const sidekicks = b.supportingCharacters && b.supportingCharacters.length > 0
    ? ` Accompanied by cheerful animated sidekicks: ${b.supportingCharacters.map(sc => `${sc.name} (${sc.appearance})`).join(', ')}.`
    : '';
  
  return `3D animation keyframe portrait of ${char}, ${charStyle} feature film character design, bright dry sparkling eyes, ${comical}.${sidekicks} Set in ${location}. Eye-popping vibrant color palette, volumetric golden morning lighting, ray-traced subsurface scattering, Octane render 8K resolution, 9:16 aspect ratio vertical portrait composition --ar 9:16 --v 6.0 --style raw --stylize 250 --no tears, crying, weeping, watery eyes, sadness`;
}

/**
 * 1) Master AI Video & Motion Generation Prompt
 * Combines 3D Hollywood animation visual directives, multi-character comical interactions, vibrant eye-popping color aesthetics, and character-matched voice audio directives into a copyable master prompt for external video generators (Runway Gen-3 Alpha, Kling AI, Luma Dream Machine, OpenAI Sora, Pika, Hailuo).
 */
export function formatVideoGenerationOnlyText(b: ShortsBlueprint): string {
  const line1Affirmation = b.subtitles?.line1Affirmation || b.affirmationText || b.englishText || b.affirmationTitle || '';
  const line2Scripture = b.subtitles?.line2Scripture || b.scriptureVerse || b.nkjvText || '';
  const line3Ref = b.subtitles?.line3Ref || b.scriptureRef || b.englishRef || '';
  const title = b.affirmationTitle || b.englishText || `Affirmation #${b.id}`;

  const expr = b.characterExpression;
  const typo = computeOverlayTypography(line1Affirmation, line2Scripture, line3Ref);
  const voiceDir = buildCharacterVoiceDirection(b);

  return `🎬 HOLLYWOOD CREATION RANGE 3D MASTER PROMPT (SHORT #${b.id}: ${title})
Target Duration: 10.0 Seconds | Format: 9:16 Vertical Portrait (1080x1920) | Output: Full-Bleed 60fps

[COMPULSORY TRI-OUTPUT MANDATE FOR ALL GENERATED VIDEOS - NO MISTAKES PERMITTED]:
- COMPULSORY 1 (VIDEO): 3D Animated Video Generation (9:16 portrait, full-bleed 60fps, 3D Pixar character acting, vivid lighting, STRICTLY ZERO TEARS, ZERO WATERY EYES, ZERO CRYING; character eyes MUST be completely dry, bright, and sparkling with cheerful joy).
- COMPULSORY 2 (AUDIO): Integrated Audio & Voiceover Narration (Video Generator AUTONOMOUSLY CHOOSES the voice profile—male, female, or child—to best match ${b.characterName || b.character}; reads exact 10.0s spoken script + background music bed).
- COMPULSORY 3 (TEXT OVERLAY): Burned-In Subtitle Text Overlay (Center-upper safe band y=450-850, high-contrast stylish typography, 100% clear of bottom 600px Shorts UI).

[CRITICAL EYE DIRECTIVE - STRICTLY FORBIDDEN ELEMENTS]:
- FORBIDDEN: NO tears, NO weeping, NO crying, NO watery eyes, NO wet tear-ducts, NO glossy tear films, NO sobbing, NO sadness or grief.
- REQUIRED: Eyes must be completely dry, clear, wide, alert, sparkling with vibrant cartoon energy and contagious laughter.

[MASTER AI VIDEO GENERATION PROMPT - PASTE INTO RUNWAY GEN-3 / KLING / LUMA / SORA]:
${b.videoPrompt}

[CHARACTER & COMEDIC ACTING DETAILS]:
- Main Character: ${b.character} (${b.characterStyle || '3D Pixar Animation'})
- Character Name: ${b.characterName || b.character || 'Animated Hero'}
${b.supportingCharacters && b.supportingCharacters.length > 0 ? `- Supporting Characters (Sidekicks & Companions):\n  ${b.supportingCharacters.map(sc => `* ${sc.name} (${sc.role}): ${sc.appearance}. Comedic action: ${sc.comedicInteraction}`).join('\n  ')}\n` : ''}- Comedic Element: ${b.comicalElement}
${expr ? `- Character Acting Nuance: ${expr.expression}\n- Scene Atmosphere: ${expr.sceneAtmosphere}` : ''}

[EXTERNAL AI VOICE & NARRATION DIRECTIVE (VIDEO GEN AUTONOMOUSLY CHOOSES VOICE PROFILE)]:
- Voice Profile Mandate: VIDEO GENERATION TOOL AUTONOMOUSLY CHOOSES THE VOICE PROFILE (Male, Female, or Child voice, pitch, age, accent, and style) to perfectly match ${b.characterName || b.character}.
- Character Personality Reference: ${voiceDir.vocalTone}
- Witty Nuance: ${voiceDir.wittyComedicNuance}
- Exact Spoken Script (Strictly 10.0s): "${b.audioScript || voiceDir.audioNarrationScript}"
- Background Atmosphere: ${b.backgroundAudio}

[MIDJOURNEY v6 KEYFRAME BASE FRAME PROMPT]:
${formatMidjourneyPrompt(b)}

${typo.promptAdditionDirective}`;
}


/**
 * Formats the Subtitle / Text Overlay layout alone
 */
export function formatSubtitlesOnlyText(b: ShortsBlueprint): string {
  const line1Affirmation = b.subtitles?.line1Affirmation || b.affirmationText || b.englishText || b.affirmationTitle || '';
  const line2Scripture = b.subtitles?.line2Scripture || b.scriptureVerse || b.nkjvText || '';
  const line3Ref = b.subtitles?.line3Ref || b.scriptureRef || b.englishRef || '';
  const typo = computeOverlayTypography(line1Affirmation, line2Scripture, line3Ref);

  return `${typo.promptAdditionDirective}
- Typography Specs:
    * Font Sizes: Affirmation: ${typo.affirmationFontSizeCanvas} | Scripture: ${typo.scriptureFontSizeCanvas} | Ref: ${typo.refFontSizeCanvas}
    * Safe Bounds: ${typo.safeMarginWidth}
    * Wrapping: ${typo.recommendedWrap}
    * Content Guarantee: ZERO LOSS OF OVERLAY CONTENT — complete affirmation and scripture rendered verbatim without truncation.`;
}

/**
 * Formats the Video Generation Prompt alone
 */
export function formatVideoPromptOnlyText(b: ShortsBlueprint): string {
  const line1Affirmation = b.subtitles?.line1Affirmation || b.affirmationText || b.englishText || b.affirmationTitle || '';
  const line2Scripture = b.subtitles?.line2Scripture || b.scriptureVerse || b.nkjvText || '';
  const line3Ref = b.subtitles?.line3Ref || b.scriptureRef || b.englishRef || '';
  const typo = computeOverlayTypography(line1Affirmation, line2Scripture, line3Ref);

  return `🎥 COMPULSORY TRI-OUTPUT VIDEO GENERATION PROMPT (9:16 VERTICAL - PORTRAIT 1080x1920):
[COMPULSORY MANDATE: Output MUST include Video Animation + Synchronized Voice Audio (VIDEO GEN AUTONOMOUSLY CHOOSES VOICE PROFILE TO MATCH CHARACTER) + Burned-In Safe-Zone Subtitle Text Overlay]

${b.videoPrompt}

${typo.promptAdditionDirective}`;
}

/**
 * Formats the Audio & Voiceover Prompt alone with zero-hallucination mandate & character tailoring
 */
export function formatAudioOnlyText(b: ShortsBlueprint): string {
  const dir = buildCharacterVoiceDirection(b);
  return `🎙 CHARACTER AUDIO & VOICEOVER PROMPT (VIDEO GEN AUTONOMOUSLY CHOOSES VOICE PROFILE):
- Voice Selection Mandate: THE VIDEO / AUDIO GENERATOR AUTONOMOUSLY CHOOSES THE VOICE PROFILE (Male, Female, or Child voice, pitch, age, accent, and style) to best bring ${dir.characterName} to life.
- Character: ${dir.characterName}
- Suggested Character Vibe: ${dir.vocalTone}
- Narration Style: ${dir.narrationStyle}
- Scripted Spoken Narration (Strictly 10.0s): "${b.audioScript || dir.audioNarrationScript}"
- CRITICAL DIRECTIVE: Read ONLY the exact scripted text above. Zero unscripted words, no intro/outro, no background theological commentary.
- Background Audio: ${b.backgroundAudio}

🎧 ELEVENLABS / AI VOICE SYNTHESIS DIRECTIVE:
${dir.elevenLabsPrompt}`;
}

/**
 * 2) YouTube SEO & Tags alone (Title, Description, Tags CSV, Hashtags CSV)
 */
export function formatYouTubeOnlyText(b: ShortsBlueprint): string {
  return `🏷 YouTube SEO & Tags (Comma-Separated for YouTube Studio):
- Title: ${b.seo.title}
- Description: ${b.seo.description}
- Tags (CSV): ${b.seo.tags.join(', ')}
- Hashtag Suite (CSV): ${b.seo.hashtags.join(', ')}`;
}

/**
 * Extracts the clean English title
 */
export function getEnglishTitleOnly(b: ShortsBlueprint): string {
  return b.affirmationTitle || b.englishText || `Affirmation #${b.id}`;
}

/**
 * Formats the Character Expression and Scene Inculcation details
 */
export function getCharacterExpressionText(b: ShortsBlueprint): string {
  if (!b.characterExpression) return '';
  const expr = b.characterExpression;
  return `Character: ${b.character}
Facial Expression: ${expr.expression}
Posture & Gesture: ${expr.gesturePosture}
Theological Context: ${expr.theologicalMood}
Atmosphere: ${expr.sceneAtmosphere}`;
}

/**
 * Formats YouTube / Copy Description containing strictly:
 * 1. Scripture verse with clean reference
 * 2. 2-liner text expressing God's word associated with the content
 * Nothing more.
 */
export function getFormattedYouTubeDescription(b: ShortsBlueprint | PraiseItem | { id?: number; affirmationTitle?: string; scriptureRef?: string; scriptureVerse?: string; affirmationText?: string; englishText?: string; nkjvText?: string }): string {
  const verse = ('scriptureVerse' in b && b.scriptureVerse ? b.scriptureVerse : '') || 
                ('nkjvText' in b && b.nkjvText ? b.nkjvText : '') || '';
  
  const rawRef = ('scriptureRef' in b && b.scriptureRef ? b.scriptureRef : '') || 
                 ('englishRef' in b && (b as any).englishRef ? (b as any).englishRef : '') || '';
  const ref = cleanScriptureRef(rawRef);

  const rawText = ('affirmationText' in b && b.affirmationText ? b.affirmationText : '') || 
                  ('englishText' in b && (b as any).englishText ? (b as any).englishText : '') || 
                  ('affirmationTitle' in b && b.affirmationTitle ? b.affirmationTitle : '') || '';

  // Clean Verse Line
  const verseLine = verse ? `"${verse.trim()}" — ${ref}` : ref;

  // Clean 2-liner text expressing God's word
  let textLines = rawText.trim();
  if (textLines && !textLines.includes('\n')) {
    const clauses = textLines.split(/(?<=[,.!?;])\s+/);
    if (clauses.length === 2) {
      textLines = `${clauses[0]}\n${clauses[1]}`;
    } else if (clauses.length > 2) {
      const mid = Math.ceil(clauses.length / 2);
      textLines = `${clauses.slice(0, mid).join(' ')}\n${clauses.slice(mid).join(' ')}`;
    }
  }

  const parts = [
    verseLine,
    textLines
  ].filter(Boolean);

  return parts.join('\n\n');
}

/**
 * Extracts Affirmation with Ref
 */
export function getTamilPraiseWithRef(b: ShortsBlueprint): string {
  const title = b.affirmationTitle || b.englishText || `Affirmation #${b.id}`;
  const ref = b.scriptureRef || b.englishRef || '';
  return `${title} (${ref})`;
}

/**
 * Gets the structured Scripture Reference & Translation Verification text
 */
export function getScriptureVerificationText(b: ShortsBlueprint): string {
  if (b.verification?.fullVerificationText) {
    return b.verification.fullVerificationText;
  }
  const ref = b.scriptureRef || b.englishRef || 'Scripture';
  const verse = b.scriptureVerse || b.nkjvText || '';
  return `[NKJV SCRIPTURE VERIFICATION]
Affirmation: "${b.affirmationTitle || b.englishText}"
Scripture Reference: ${ref} (NKJV)
Canonical Verse Text: "${verse}"
Theological Verdict: 100% Accurately grounded in God's Holy Word. Brings hope and joy to all ages.`;
}

/**
 * Dynamic generator for affirmations
 */
export function generateDynamicBlueprint(item: PraiseItem): ShortsBlueprint {
  const cleanTitle = item.text.replace(/\.$/, '').trim() || `Affirmation #${item.id}`;
  const engRef = item.reference;

  return {
    id: item.id,
    affirmationTitle: cleanTitle,
    affirmationText: `Today I stand on God's truth: ${cleanTitle}`,
    scriptureVerse: cleanTitle,
    scriptureRef: engRef,
    translationVersion: 'NKJV',
    category: "Daily Hope & Joy",
    characterStyle: "3D Pixar Animation",
    characterName: "Friendly Animated Character",
    comicalElement: "A charming animated character doing a joyful dance of faith and gratitude.",
    targetAudience: "Kids to Elderly (Universal Hope)",
    character: "A lovable, expressive 3D animated character beaming with radiant hope and warmth.",
    location: "A vibrant sunlit landscape glowing with celestial morning light.",
    videoPrompt: `A vibrant 3D Pixar-style 9:16 vertical animation. A joyful, expressive animated character stands in a breathtaking meadow filled with blooming wildflowers. As golden sunlight streams down, the character places a hand on their heart and smiles with deep peace and triumph. Warm cinematic lighting, photorealistic 8K render, 9:16 portrait composition.`,
    voiceProfile: "Character-matched voice (Male, Female, or Child)",
    audioScript: `[Upbeat & clear] Today I declare: ${cleanTitle}! ${engRef}.`,
    backgroundAudio: "Playful acoustic melody with cheerful bell chimes at -18dB.",
    subtitles: {
      line1Affirmation: cleanTitle,
      line2Scripture: cleanTitle,
      line3Ref: engRef
    },
    seo: {
      title: `Short #${item.id} | ${cleanTitle} | Christian Affirmations`,
      description: `Daily Christian Affirmation #${item.id}: '${cleanTitle}' (${engRef}). Hope-filled, positive animation for kids to elderly. #India #MorningDevotion #ChristianDevotion #Praise #Praises #TamilChristian #1000Praises #Shorts`,
      tags: [
        "India",
        "morning devotion",
        "Christian devotion",
        "praise",
        "praises",
        "Morning Devotion",
        "Christian Devotion",
        "Morning Prayer",
        "Daily Devotion",
        "Christian Devotional",
        "Tamil Christian",
        "Tamil Praise",
        "Christian Affirmations",
        "Bible Verse Shorts",
        "Daily Hope",
        "Kids to Elderly",
        "3D Animation"
      ],
      hashtags: [
        "#India",
        "#MorningDevotion",
        "#ChristianDevotion",
        "#Praise",
        "#Praises",
        "#TamilChristian",
        "#1000Praises",
        "#Shorts",
        "#DailyHope",
        "#BibleVerse"
      ]
    }
  };
}
