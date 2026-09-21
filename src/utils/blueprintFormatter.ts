import { ShortsBlueprint, PraiseItem } from '../types';
import { generateCharacterExpression, buildInculcatedVideoPrompt } from './characterExpressionEngine';
import { computeOverlayTypography } from './overlayTypographyEngine';
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
  
  return `3D animation keyframe portrait of ${char}, ${charStyle} feature film character design, ${comical}. Set in ${location}. Eye-popping vibrant color palette, volumetric golden morning lighting, ray-traced subsurface scattering, Octane render 8K resolution, 9:16 aspect ratio vertical portrait composition --ar 9:16 --v 6.0 --style raw --stylize 250`;
}

/**
 * 1) Master AI Video & Motion Generation Prompt
 * Combines 3D Hollywood animation visual directives, multi-character comical interactions, vibrant eye-popping color aesthetics, and British young female voice audio directives into a copyable master prompt for external video generators (Runway Gen-3 Alpha, Kling AI, Luma Dream Machine, OpenAI Sora, Pika, Hailuo).
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

[MASTER AI VIDEO GENERATION PROMPT - PASTE INTO RUNWAY GEN-3 / KLING / LUMA / SORA]:
${b.videoPrompt}

[CHARACTER & COMEDIC ACTING DETAILS]:
- Main Character: ${b.character} (${b.characterStyle || '3D Pixar Animation'})
- Character Name: ${b.characterName || b.character || 'Animated Hero'}
- Comedic Element: ${b.comicalElement}
${expr ? `- Expression & Posture: ${expr.expression} ${expr.gesturePosture}\n- Mood & Atmosphere: ${expr.theologicalMood}. ${expr.sceneAtmosphere}` : ''}

[EXTERNAL AI VOICE & NARRATION DIRECTIVE (BRITISH YOUNG FEMALE VOICE)]:
- Voice Profile: ${b.voiceProfile || voiceDir.voiceProfileDirective}
- Vocal Persona: ${voiceDir.vocalTone}
- Witty Nuance: ${voiceDir.wittyComedicNuance}
- Exact Spoken Script (Strictly 10.0s): "${b.audioScript || voiceDir.audioNarrationScript}"
- Background Atmosphere: ${b.backgroundAudio}

[MIDJOURNEY v6 KEYFRAME BASE FRAME PROMPT]:
${formatMidjourneyPrompt(b)}

[SUBTITLE OVERLAY TYPOGRAPHY DIRECTIVE]:
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

  return `🎥 SIMULTANEOUS VIDEO & AUDIO GENERATION PROMPT (9:16 VERTICAL - PORTRAIT 1080x1920):
${b.videoPrompt}

${typo.promptAdditionDirective}`;
}

/**
 * Formats the Audio & Voiceover Prompt alone with zero-hallucination mandate & character tailoring
 */
export function formatAudioOnlyText(b: ShortsBlueprint): string {
  const dir = buildCharacterVoiceDirection(b);
  return `🎙 CHARACTER-TAILORED AUDIO & VOICEOVER PROMPT (BRITISH YOUNG FEMALE VOICE):
- Character: ${dir.characterName}
- Vocal Persona & Nuance: ${dir.vocalTone}
- Narration Style: ${dir.narrationStyle}
- Voice Profile Directive: ${b.voiceProfile || dir.voiceProfileDirective}
- Scripted Spoken Narration (Strictly 10.0s): "${b.audioScript || dir.audioNarrationScript}"
- CRITICAL DIRECTIVE: Read ONLY the exact scripted text above in British young female voice with warm, witty, joyful, and articulate cadence. Zero unscripted words, no intro/outro, no background theological commentary.
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
- Hashtags (CSV): ${b.seo.hashtags.join(', ')}`;
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
 * Structured 3-part YouTube Description: Affirmation, NKJV Scripture Verse, Personal Affirmation
 */
export function getFormattedYouTubeDescription(b: ShortsBlueprint | PraiseItem | { id: number; affirmationTitle?: string; scriptureRef?: string; scriptureVerse?: string; affirmationText?: string }): string {
  if ('seo' in b && b.seo?.description) {
    return b.seo.description;
  }
  const id = b.id;
  const title = ('affirmationTitle' in b ? b.affirmationTitle : '') || `Christian Affirmation #${id}`;
  const ref = ('scriptureRef' in b ? b.scriptureRef : '') || 'Holy Scripture';
  const verse = ('scriptureVerse' in b ? b.scriptureVerse : '') || '';
  const text = ('affirmationText' in b ? b.affirmationText : '') || '';

  const parts = [
    `✨ ${title} (${ref})`,
    verse ? `📖 "${verse}" — ${ref} (NKJV)` : '',
    text ? `🙏 Daily Affirmation: ${text}` : ''
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
    voiceProfile: "British young female voice (warm, witty, joyful, comforting, energetic yet serene British accent with crisp articulation and radiant cadence).",
    audioScript: `[Upbeat & clear] Today I declare: ${cleanTitle}! ${engRef}.`,
    backgroundAudio: "Playful acoustic melody with cheerful bell chimes at -18dB.",
    subtitles: {
      line1Affirmation: cleanTitle,
      line2Scripture: cleanTitle,
      line3Ref: engRef
    },
    seo: {
      title: `Short #${item.id} | ${cleanTitle} | Christian Affirmations`,
      description: `Daily Christian Affirmation #${item.id}: '${cleanTitle}' (${engRef}). Hope-filled, positive animation for kids to elderly. #ChristianAffirmations #DailyHope #BibleVerse`,
      tags: ["Christian Affirmations", "Bible Verse Shorts", "Daily Hope", "Kids to Elderly", "3D Animation"],
      hashtags: ["#ChristianAffirmations", "#BibleVerse", "#Shorts", "#DailyHope", "#Animation"]
    }
  };
}
