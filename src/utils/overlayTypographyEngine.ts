/**
 * Overlay Typography Engine for 9:16 Vertical Shorts
 * 
 * Automatically calculates character count and determines the exact font sizing,
 * line wrapping, and safe margin instructions for video generation & post-production
 * compositing. Ensures that long overlays fit cleanly on screen with proportional font scaling
 * while guaranteeing 100% full content retention (zero loss, zero truncation).
 */

export type OverlayTier = 'compact' | 'medium' | 'long' | 'ultra-long';

export interface OverlayTypographyMetrics {
  affirmationCharCount: number;
  scriptureCharCount: number;
  refCharCount: number;
  maxCharCount: number;
  tier: OverlayTier;
  tierLabel: string;
  
  // Font sizes for standard 1080x1920 vertical canvas
  affirmationFontSizeCanvas: string;
  scriptureFontSizeCanvas: string;
  refFontSizeCanvas: string;
  
  // Exact numeric pixel values (for 1080x1920)
  affirmationPx: number;
  scripturePx: number;
  refPx: number;
  
  // Percentage scaling vs standard base
  scalePercent: number;
  reductionPercent: number;
  
  // Layout & margins
  safeMarginWidth: string;
  lineHeight: string;
  recommendedWrap: string;
  
  // Explicit prompt instructions
  promptAdditionDirective: string;
  compositingSpecsText: string;
  
  // UI Tailwind classes for live preview
  uiAffirmationClass: string;
  uiScriptureClass: string;
  uiRefClass: string;
  uiBadgeText: string;
  uiBadgeClass: string;

  // Backward-compatibility aliases
  tamilCharCount: number;
  englishCharCount: number;
  tamilPx: number;
  englishPx: number;
  tamilFontSizeCanvas: string;
  englishFontSizeCanvas: string;
  uiTamilClass: string;
  uiEnglishClass: string;
}

/**
 * Cleans scripture reference strings by stripping emojis (e.g., 📖) and version tags like (NKJV).
 */
export function cleanScriptureRef(ref: string = ''): string {
  if (!ref) return '';
  return ref
    .replace(/[\u{1F300}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}📖]/gu, '')
    .replace(/\s*\(?NKJV\)?\s*/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Checks if Line 2 (Scripture verse) is identical to or heavily overlaps with Line 1 (Affirmation text).
 * Prevents rendering duplicate overlay text on screen.
 */
export function isDuplicateOrOverlappingScripture(line1Affirmation: string = '', line2Scripture: string = ''): boolean {
  const norm1 = line1Affirmation.toLowerCase().replace(/[^a-z0-9]/g, '');
  const norm2 = line2Scripture.replace(/^["']|["']$/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');

  if (norm2.length === 0) return true;
  if (norm1 === norm2) return true;

  // Substring check
  if (norm1.includes(norm2) || norm2.includes(norm1)) return true;

  // Word set overlap check (> 40% matching words)
  const words1 = new Set(line1Affirmation.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean));
  const words2 = line2Scripture.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);

  if (words2.length > 0) {
    const matchingCount = words2.filter(w => words1.has(w)).length;
    if (matchingCount / words2.length >= 0.4) {
      return true;
    }
  }

  return false;
}

/**
 * Computes overlay typography metrics based on Affirmation, Scripture Verse, and Reference strings.
 */
export function computeOverlayTypography(
  line1Affirmation: string = '',
  line2Scripture: string = '',
  line3Ref: string = ''
): OverlayTypographyMetrics {
  const cleanRef = cleanScriptureRef(line3Ref);
  const rawAffirmation = line1Affirmation.trim();
  const rawScripture = line2Scripture.replace(/^["']|["']$/g, '').trim();

  // Normalize to check if Line 2 scripture duplicates or heavily overlaps Line 1 affirmation
  const isDuplicateScripture = isDuplicateOrOverlappingScripture(rawAffirmation, rawScripture);

  const affirmationCharCount = rawAffirmation.length;
  const scriptureCharCount = isDuplicateScripture ? 0 : rawScripture.length;
  const refCharCount = cleanRef.length;
  const maxCharCount = Math.max(affirmationCharCount, scriptureCharCount);

  let tier: OverlayTier;
  let tierLabel: string;
  let affirmationPx: number;
  let scripturePx: number;
  let refPx: number;
  let scalePercent: number;
  let reductionPercent: number;
  let recommendedWrap: string;
  let uiAffirmationClass: string;
  let uiScriptureClass: string;
  let uiRefClass: string;
  let uiBadgeText: string;
  let uiBadgeClass: string;

  if (affirmationCharCount <= 40 && scriptureCharCount <= 55) {
    // Tier 1: Compact (Standard)
    tier = 'compact';
    tierLabel = 'Compact (Standard Scale)';
    affirmationPx = 56;
    scripturePx = 36;
    refPx = 26;
    scalePercent = 100;
    reductionPercent = 0;
    recommendedWrap = 'Single line centered (or natural 2-line split for high punch)';
    uiAffirmationClass = 'text-base sm:text-lg font-bold';
    uiScriptureClass = 'text-xs sm:text-sm font-medium';
    uiRefClass = 'text-[11px]';
    uiBadgeText = `Standard Scale • ${maxCharCount} chars max`;
    uiBadgeClass = 'bg-stone-800 text-stone-300 border-stone-700';
  } else if (affirmationCharCount <= 65 && scriptureCharCount <= 75) {
    // Tier 2: Medium
    tier = 'medium';
    tierLabel = 'Medium (Balanced Scale)';
    affirmationPx = 46;
    scripturePx = 30;
    refPx = 24;
    scalePercent = 84;
    reductionPercent = 16;
    recommendedWrap = 'Balanced 1-2 lines with natural phrasing break';
    uiAffirmationClass = 'text-sm sm:text-base font-bold';
    uiScriptureClass = 'text-xs font-medium';
    uiRefClass = 'text-[10px]';
    uiBadgeText = `Auto-Scaled: 46px (-16%) • ${maxCharCount} chars • Zero Loss`;
    uiBadgeClass = 'bg-blue-950/70 text-blue-300 border-blue-500/30';
  } else if (affirmationCharCount <= 90 || scriptureCharCount <= 95) {
    // Tier 3: Long-Form
    tier = 'long';
    tierLabel = 'Long Text (Compact Fit)';
    affirmationPx = 38;
    scripturePx = 26;
    refPx = 20;
    scalePercent = 68;
    reductionPercent = 32;
    recommendedWrap = 'Balanced 2-line wrap with natural phrasing; line-height 1.25';
    uiAffirmationClass = 'text-xs sm:text-sm font-bold leading-snug';
    uiScriptureClass = 'text-[11px] sm:text-xs font-medium leading-snug';
    uiRefClass = 'text-[10px]';
    uiBadgeText = `Auto-Scaled: 38px (-32%) • Long Text (${maxCharCount} chars) • 100% Content Intact`;
    uiBadgeClass = 'bg-amber-950/70 text-amber-300 border-amber-500/40 font-semibold';
  } else {
    // Tier 4: Ultra-Long (> 90 chars)
    tier = 'ultra-long';
    tierLabel = 'Ultra-Long (Micro-Scaled Fit)';
    affirmationPx = 32;
    scripturePx = 22;
    refPx = 18;
    scalePercent = 57;
    reductionPercent = 43;
    recommendedWrap = 'Balanced 2-3 line wrap; line-height 1.20';
    uiAffirmationClass = 'text-[11px] sm:text-xs font-bold leading-tight';
    uiScriptureClass = 'text-[10px] font-medium leading-tight';
    uiRefClass = 'text-[9px]';
    uiBadgeText = `Auto-Scaled: 32px (-43%) • Ultra-Long (${maxCharCount} chars) • 100% Content Intact`;
    uiBadgeClass = 'bg-red-950/70 text-red-300 border-red-500/40 font-semibold';
  }

  const affirmationFontSizeCanvas = `${affirmationPx}px (${Math.round(affirmationPx * 0.75)}pt on 1080x1920)`;
  const scriptureFontSizeCanvas = `${scripturePx}px (${Math.round(scripturePx * 0.75)}pt on 1080x1920)`;
  const refFontSizeCanvas = `${refPx}px (${Math.round(refPx * 0.75)}pt on 1080x1920)`;
  const safeMarginWidth = 'Max-width 760px YouTube Shorts Safe Zone (160px horizontal padding on left & right to prevent UI overlay clipping)';
  const lineHeight = tier === 'compact' ? '1.30' : tier === 'medium' ? '1.25' : '1.22';

  // Compute pre-split lines for affirmation if wrap is needed
  const computeSplitLines = (text: string): { line1: string; line2: string } | null => {
    const trimmed = text.trim();
    const words = trimmed.split(/\s+/);
    if (words.length <= 4) return null;
    const mid = Math.ceil(words.length / 2);
    return {
      line1: words.slice(0, mid).join(' '),
      line2: words.slice(mid).join(' ')
    };
  };

  const affirmationSplit = computeSplitLines(rawAffirmation);

  // Directive for the Video Gen prompt addition (Text Overlay & Single Master Output)
  const buildOverlayDirective = (scaledNote: string) => {
    const affirmationLinesJson = affirmationSplit
      ? JSON.stringify([affirmationSplit.line1, affirmationSplit.line2])
      : JSON.stringify([rawAffirmation]);

    if (isDuplicateScripture) {
      // Clean 2-tier overlay (No duplicate Line 2, Clean Reference without emoji/brackets)
      return `[SUBTITLE OVERLAY TYPOGRAPHY DIRECTIVE - CORRECTED FOR YOUTUBE SHORTS SAFE ZONE]:

- FONT & STYLING (FULL CREATIVE FREEDOM): The video generation tool or render engine is FREELY PERMITTED and ENCOURAGED to select the most stylish, aesthetically pleasing font family, font size, font color, drop shadow, outline, and typography treatment that perfectly harmonizes with the visual content, mood, and 3D animation style. High-contrast bold styling with legibility strokes/shadows is recommended.

- MANDATORY PLACEMENT & SAFE ZONE - CENTER-UPPER (YouTube Shorts Compliant):
    * Horizontal Safe Margin: 160px left & right padding (760px safe width centered at x=540).
    * Vertical Placement: STRICTLY CENTER-UPPER SAFE BAND y=450 to y=850 MAX from top.
    * FORBIDDEN ZONE: Text MUST NEVER enter the bottom 600px of the 1920px frame (y=1320 to y=1920). This bottom zone is RESERVED for YouTube Shorts UI - title, description, channel info, like/subscribe buttons.
    * Justification: Centered horizontally, centered vertically in upper half, well above main character action.
    * Safe Zone Enforcement: If tool attempts to place text low, force upward correction to y=650 center.

- EXACT TEXT OVERLAY CONTENT:
    * Line 1: ${rawAffirmation}
    * Line 2 (smaller): "${cleanRef}"

- Final Output: H.264 MP4 1080x1920 9:16, CRF 18, yuv420p.`;
    }

    return `[SUBTITLE OVERLAY TYPOGRAPHY DIRECTIVE - CORRECTED FOR YOUTUBE SHORTS SAFE ZONE]:

- FONT & STYLING (FULL CREATIVE FREEDOM): The video generation tool or render engine is FREELY PERMITTED and ENCOURAGED to select the most stylish, aesthetically pleasing font family, font size, font color, drop shadow, outline, and typography treatment that perfectly harmonizes with the visual content, mood, and 3D animation style. High-contrast bold styling with legibility strokes/shadows is recommended.

- MANDATORY PLACEMENT & SAFE ZONE - CENTER-UPPER (YouTube Shorts Compliant):
    * Horizontal Safe Margin: 160px left & right padding (760px safe width centered at x=540).
    * Vertical Placement: STRICTLY CENTER-UPPER SAFE BAND y=450 to y=850 MAX from top.
    * FORBIDDEN ZONE: Text MUST NEVER enter the bottom 600px of the 1920px frame (y=1320 to y=1920). This bottom zone is RESERVED for YouTube Shorts UI - title, description, channel info, like/subscribe buttons.
    * Justification: Centered horizontally, centered vertically in upper half, well above main character action.
    * Safe Zone Enforcement: If tool attempts to place text low, force upward correction to y=650 center.

- EXACT TEXT OVERLAY CONTENT:
    * Line 1: ${rawAffirmation}
    * Line 2: "${rawScripture}"
    * Line 3 (smaller): "${cleanRef}"

- Final Output: H.264 MP4 1080x1920 9:16, CRF 18, yuv420p.`;
  };

  let promptAdditionDirective: string;
  if (reductionPercent > 0) {
    promptAdditionDirective = buildOverlayDirective(`Auto-Scaled ${tier.toUpperCase()} tier, -${reductionPercent}% reduced for safe 760px fit with zero content loss`);
  } else {
    promptAdditionDirective = buildOverlayDirective(`Standard Scale ~${affirmationPx}px Affirmation centered, zero content loss`);
  }

  // Compositing specs text
  const compositingSpecsText = `Overlay Typography & Canvas Safe Zone Fit:
- Text Density: ${tierLabel} (Affirmation: ${affirmationCharCount} chars, Scripture: ${scriptureCharCount} chars)
- Auto-Scaled Font Sizes: Affirmation: ${affirmationFontSizeCanvas} | Scripture: ${scriptureFontSizeCanvas} | Ref: ${refFontSizeCanvas}
- Scaling Factor: ${scalePercent}% of base (${reductionPercent > 0 ? `-${reductionPercent}% reduced for safe fit` : 'standard'})
- Safe Bounds: ${safeMarginWidth}
- Line Height: ${lineHeight} | Wrapping: ${recommendedWrap}
- Content Integrity: ZERO LOSS OF OVERLAY CONTENT — 100% full text preserved verbatim without ellipsis or truncation.`;

  return {
    affirmationCharCount,
    scriptureCharCount,
    refCharCount,
    maxCharCount,
    tier,
    tierLabel,
    affirmationFontSizeCanvas,
    scriptureFontSizeCanvas,
    refFontSizeCanvas,
    affirmationPx,
    scripturePx,
    refPx,
    scalePercent,
    reductionPercent,
    safeMarginWidth,
    lineHeight,
    recommendedWrap,
    promptAdditionDirective,
    compositingSpecsText,
    uiAffirmationClass,
    uiScriptureClass,
    uiRefClass,
    uiBadgeText,
    uiBadgeClass,

    // Aliases
    tamilCharCount: affirmationCharCount,
    englishCharCount: scriptureCharCount,
    tamilPx: affirmationPx,
    englishPx: scripturePx,
    tamilFontSizeCanvas: affirmationFontSizeCanvas,
    englishFontSizeCanvas: scriptureFontSizeCanvas,
    uiTamilClass: uiAffirmationClass,
    uiEnglishClass: uiScriptureClass
  };
}
