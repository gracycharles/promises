import { ShortsBlueprint } from '../types';
import { computeOverlayTypography, cleanScriptureRef, isDuplicateOrOverlappingScripture } from './overlayTypographyEngine';

/**
 * Generates a true 1080x1920 alpha text overlay PNG with exact typography,
 * golden-amber styling, drop shadow, and centered safe-zone layout for English Christian Affirmations.
 */
export async function generateAlphaOverlayBlob(blueprint: ShortsBlueprint): Promise<Blob> {
  // Ensure fonts like Cinzel & Plus Jakarta Sans are fully loaded before rendering
  try {
    if (document && document.fonts) {
      await document.fonts.ready;
    }
  } catch {
    // Fallback if fonts.ready API is unsupported
  }

  const line1Affirmation = (blueprint.subtitles.line1Affirmation || blueprint.affirmationText || blueprint.englishText || blueprint.affirmationTitle || '').trim();
  const rawLine2 = (blueprint.subtitles.line2Scripture || blueprint.scriptureVerse || blueprint.nkjvText || '').replace(/^["']|["']$/g, '').trim();
  const rawLine3 = (blueprint.subtitles.line3Ref || blueprint.scriptureRef || blueprint.englishRef || '').trim();
  const cleanRef = cleanScriptureRef(rawLine3);

  // Check duplicate/overlapping line 2 vs line 1
  const hasDistinctLine2 = !isDuplicateOrOverlappingScripture(line1Affirmation, rawLine2);
  const line2Scripture = hasDistinctLine2 ? rawLine2 : '';

  const typo = computeOverlayTypography(
    line1Affirmation,
    line2Scripture,
    cleanRef
  );

  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  // Transparent background (true alpha)
  ctx.clearRect(0, 0, 1080, 1920);

  // Setup text rendering
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Helper to wrap text into lines fitting max width
  const wrapText = (text: string, maxW: number): string[] => {
    if (!text) return [];
    const words = text.split(' ');
    if (words.length <= 1) return [text];
    
    // Check if whole text fits
    if (ctx.measureText(text).width <= maxW) return [text];

    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const testLine = currentLine + ' ' + word;
      if (ctx.measureText(testLine).width > maxW) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine);
    return lines;
  };

  const maxWidth = 760; // Strict YouTube Shorts safe width (160px padding on left & right to prevent UI overlay/edge clipping)
  const centerY = 650;  // Center-Upper Safe Band (y=450 to y=850, y=650 center) safe from bottom 600px Shorts UI occlusion

  // 2px shadow (0,0,0,180) for high legibility over animation
  ctx.shadowColor = 'rgba(0, 0, 0, 0.706)';
  ctx.shadowBlur = 3;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 2;

  const affirmationFontStack = `"Plus Jakarta Sans", "Cinzel", "Arial", sans-serif`;
  const scriptureFontStack = `"Cinzel", "Georgia", "Times New Roman", serif`;
  const refFontStack = `"Plus Jakarta Sans", "Courier New", monospace, sans-serif`;

  // Measure fonts
  ctx.font = `bold ${typo.affirmationPx}px ${affirmationFontStack}`;
  const affirmationLines = wrapText(line1Affirmation, maxWidth);

  ctx.font = `italic ${typo.scripturePx}px ${scriptureFontStack}`;
  const scriptureLines = hasDistinctLine2 ? wrapText(line2Scripture, maxWidth) : [];

  // Calculate vertical layout & spacing
  const affirmationLineHeight = typo.affirmationPx * 1.32;
  const scriptureLineHeight = typo.scripturePx * 1.35;
  const gap1 = hasDistinctLine2 ? 28 : 24; // gap between Affirmation and Scripture/Ref
  const gap2 = 22; // gap between Scripture and Ref

  const totalAffirmationH = affirmationLines.length * affirmationLineHeight;
  const totalScriptureH = scriptureLines.length * scriptureLineHeight;
  const totalRefH = typo.refPx;

  const totalBlockH = hasDistinctLine2
    ? totalAffirmationH + gap1 + totalScriptureH + gap2 + totalRefH
    : totalAffirmationH + gap1 + totalRefH;

  let startY = centerY - (totalBlockH / 2);

  // 1. Render Affirmation lines (Golden-Amber)
  ctx.fillStyle = '#FFC107';
  ctx.font = `bold ${typo.affirmationPx}px ${affirmationFontStack}`;
  for (const line of affirmationLines) {
    ctx.fillText(line, 540, startY + (affirmationLineHeight / 2));
    startY += affirmationLineHeight;
  }

  startY += gap1;

  // 2. Render Scripture lines (Off-White Serif) if distinct
  if (hasDistinctLine2) {
    ctx.fillStyle = '#F8F9FA';
    ctx.font = `italic ${typo.scripturePx}px ${scriptureFontStack}`;
    for (const line of scriptureLines) {
      ctx.fillText(line, 540, startY + (scriptureLineHeight / 2));
      startY += scriptureLineHeight;
    }
    startY += gap2;
  }

  // 3. Render Ref (Muted Stone)
  ctx.fillStyle = '#D6D3D1';
  ctx.font = `600 ${typo.refPx}px ${refFontStack}`;
  ctx.fillText(cleanRef, 540, startY + (totalRefH / 2));

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Failed to generate Alpha PNG Blob'));
    }, 'image/png');
  });
}

/**
 * Initiates browser download of the generated 1080x1920 Alpha PNG
 */
export async function downloadAlphaOverlayPng(blueprint: ShortsBlueprint): Promise<void> {
  const blob = await generateAlphaOverlayBlob(blueprint);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `affirmation_short_${blueprint.id}_alpha_overlay_1080x1920.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
