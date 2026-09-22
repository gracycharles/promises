import React, { useState, useMemo, useEffect } from 'react';
import { 
  Copy, 
  Check, 
  Video, 
  Mic, 
  Subtitles, 
  Hash, 
  UserCheck, 
  MapPin, 
  Sparkles,
  CheckCircle2,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Download,
  Volume2,
  Play,
  Square,
  Radio,
  Heart,
  Smile,
  Users
} from 'lucide-react';
import { ShortsBlueprint } from '../types';
import { 
  formatBlueprintAsText, 
  formatVideoGenerationOnlyText, 
  formatYouTubeOnlyText,
  getEnglishTitleOnly,
  getFormattedYouTubeDescription,
  getScriptureVerificationText,
  formatSubtitlesOnlyText,
  formatVideoPromptOnlyText,
  formatAudioOnlyText,
  getCharacterExpressionText
} from '../utils/blueprintFormatter';
import { getScriptureVerification } from '../data/scriptureVerifications';
import { computeOverlayTypography, cleanScriptureRef, isDuplicateOrOverlappingScripture } from '../utils/overlayTypographyEngine';
import { downloadAlphaOverlayPng } from '../utils/alphaOverlayGenerator';
import { buildCharacterVoiceDirection } from '../utils/narrationEngine';
import { formatMidjourneyPrompt } from '../utils/blueprintFormatter';

interface BlueprintCardProps {
  blueprint: ShortsBlueprint;
  totalCount?: number;
  prevId?: number | null;
  nextId?: number | null;
  onNavigatePrev?: () => void;
  onNavigateNext?: () => void;
  onOpenNavigator?: () => void;
}

const BlueprintCardComponent: React.FC<BlueprintCardProps> = ({ 
  blueprint,
  totalCount,
  prevId,
  nextId,
  onNavigatePrev,
  onNavigateNext,
  onOpenNavigator
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [isVerificationOpen, setIsVerificationOpen] = useState<boolean>(false);
  const [isAudioOpen, setIsAudioOpen] = useState<boolean>(false);
  const [isSeoOpen, setIsSeoOpen] = useState<boolean>(false);
  const [isGeneratingPng, setIsGeneratingPng] = useState<boolean>(false);

  const copyToClipboard = (text: string, sectionName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    setTimeout(() => {
      setCopiedSection(null);
    }, 2000);
  };

  const handleDownloadAlphaPng = async () => {
    try {
      setIsGeneratingPng(true);
      await downloadAlphaOverlayPng(blueprint);
    } catch (err) {
      console.error('Failed to download alpha overlay PNG:', err);
    } finally {
      setIsGeneratingPng(false);
    }
  };

  const fullBlueprintText = useMemo(() => formatBlueprintAsText(blueprint), [blueprint]);
  const englishTitleOnly = useMemo(() => getEnglishTitleOnly(blueprint), [blueprint]);
  const formattedDescription = useMemo(() => getFormattedYouTubeDescription(blueprint), [blueprint]);
  const verification = useMemo(() => blueprint.verification || getScriptureVerification(blueprint), [blueprint]);
  const verificationText = useMemo(() => getScriptureVerificationText(blueprint), [blueprint]);
  
  const line1Affirmation = blueprint.subtitles?.line1Affirmation || blueprint.affirmationText || blueprint.englishText || blueprint.affirmationTitle || '';
  const rawLine2 = (blueprint.subtitles?.line2Scripture || blueprint.scriptureVerse || blueprint.nkjvText || '').replace(/^["']|["']$/g, '').trim();
  const rawLine3 = blueprint.subtitles?.line3Ref || blueprint.scriptureRef || blueprint.englishRef || '';
  const cleanRef = useMemo(() => cleanScriptureRef(rawLine3), [rawLine3]);

  const isDuplicate = isDuplicateOrOverlappingScripture(line1Affirmation, rawLine2);
  const line2Scripture = !isDuplicate ? rawLine2 : '';
  const line3Ref = cleanRef;

  const typo = useMemo(() => computeOverlayTypography(
    line1Affirmation,
    line2Scripture,
    cleanRef
  ), [line1Affirmation, line2Scripture, cleanRef]);

  const promptAddition = typo.promptAdditionDirective;

  return (
    <article 
      id={`short-card-${blueprint.id}`}
      className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-xl hover:border-amber-500/40 transition-all duration-300"
    >
      {/* Top Banner with Short # and Quick Actions */}
      <div className="bg-stone-950/80 border-b border-stone-800 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono font-bold text-sm rounded-lg shadow-sm">
            Short #{blueprint.id}
          </span>
          {blueprint.category && (
            <span className="px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold">
              ✨ {blueprint.category}
            </span>
          )}
          {blueprint.characterStyle && (
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
              🎨 {blueprint.characterStyle}
            </span>
          )}
          <h2 className="text-base sm:text-lg font-bold text-stone-100 font-serif tracking-wide block w-full mt-1 sm:mt-0 sm:w-auto">
            {blueprint.affirmationTitle || blueprint.englishText || `Affirmation #${blueprint.id}`}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Button 1: Copy Title */}
          <button
            onClick={() => copyToClipboard(englishTitleOnly, 'top-title')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-sm transition-all"
            title={`Copy Title: "${englishTitleOnly}"`}
          >
            {copiedSection === 'top-title' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copied Title!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copy Title</span>
              </>
            )}
          </button>

          {/* Button 2: Copy Description */}
          <button
            onClick={() => copyToClipboard(formattedDescription, 'top-desc')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-semibold shadow-sm transition-all"
            title="Copy formatted 3-part YouTube description (Affirmation, NKJV scripture verse, personal prayer)"
          >
            {copiedSection === 'top-desc' ? (
              <>
                <Check className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-amber-400 font-bold">Copied Description!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-amber-400" />
                <span>Copy Description</span>
              </>
            )}
          </button>

          {/* Button 3: Video Gen Only */}
          <button
            onClick={() => copyToClipboard(formatVideoGenerationOnlyText(blueprint), 'top-video-only')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-semibold shadow-sm transition-all"
            title="Copy 9:16 vertical video & audio prompt with character direction and safe text overlay specifications"
          >
            {copiedSection === 'top-video-only' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copied Prompt!</span>
              </>
            ) : (
              <>
                <Video className="w-3.5 h-3.5 text-amber-400" />
                <span>Video Gen Only</span>
              </>
            )}
          </button>

          {/* Button 4: Copy Tags (CSV) */}
          <button
            onClick={() => copyToClipboard(blueprint.seo.tags.join(', '), 'top-tags-csv')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 text-xs font-semibold shadow-sm transition-all"
            title="Copy tags as comma-separated values ready for YouTube Studio"
          >
            {copiedSection === 'top-tags-csv' ? (
              <>
                <Check className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-purple-400 font-bold">Copied Tags (CSV)!</span>
              </>
            ) : (
              <>
                <Hash className="w-3.5 h-3.5 text-purple-400" />
                <span>Copy Tags (CSV)</span>
              </>
            )}
          </button>

          {/* Button 5: Copy All */}
          <button
            onClick={() => copyToClipboard(fullBlueprintText, 'top-all')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-700 border border-stone-700 text-stone-300 hover:text-white text-xs font-medium transition-all"
            title="Copy complete production blueprint with both Video and YouTube metadata"
          >
            {copiedSection === 'top-all' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copied All!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-stone-400" />
                <span>Copy All</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        
        {/* Affirmation & Scripture Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Card 1: Christian Affirmation */}
          <div className="bg-stone-950/60 p-4 rounded-xl border border-amber-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-amber-400" />
                Christian Affirmation (Personal Proclamation)
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => copyToClipboard(blueprint.affirmationText || blueprint.englishText, 'affirmation-box')}
                  className="text-[11px] font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1 bg-amber-950/30 hover:bg-amber-900/40 border border-amber-500/20 px-2 py-0.5 rounded transition-all"
                  title="Copy Affirmation Text"
                >
                  {copiedSection === 'affirmation-box' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-amber-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
                <span className="text-xs font-bold text-stone-400 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                  {blueprint.scriptureRef || blueprint.englishRef}
                </span>
              </div>
            </div>
            <p className="text-stone-100 text-sm sm:text-base leading-relaxed font-serif">
              "{blueprint.affirmationText || blueprint.englishText}"
            </p>
          </div>

          {/* Card 2: Scripture Foundation (NKJV) */}
          <div className="bg-stone-950/60 p-4 rounded-xl border border-emerald-500/20 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                  Scripture Anchor (NKJV)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold">
                  {blueprint.translationVersion || 'NKJV'}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => copyToClipboard(blueprint.scriptureVerse || blueprint.nkjvText || blueprint.englishText, 'scripture-box')}
                  className="text-[11px] font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1 bg-emerald-950/30 hover:bg-emerald-900/40 border border-emerald-500/20 px-2 py-0.5 rounded transition-all"
                  title="Copy Scripture Verse"
                >
                  {copiedSection === 'scripture-box' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-emerald-400" />
                      <span>Copy Verse</span>
                    </>
                  )}
                </button>
                <span className="text-xs font-bold text-stone-400 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                  {blueprint.scriptureRef || blueprint.englishRef}
                </span>
              </div>
            </div>
            <p className="text-stone-100 text-sm sm:text-base leading-relaxed font-serif italic text-stone-200">
              "{blueprint.scriptureVerse || blueprint.nkjvText || blueprint.englishText}"
            </p>
          </div>

        </div>

        {/* 📖 Scripture Reference & Theological Check (Initially Collapsed) */}
        {verification && (
          <div className="bg-stone-950/70 rounded-xl border border-teal-500/30 shadow-sm overflow-hidden transition-all">
            <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 sm:p-4 hover:bg-stone-900/40 transition-colors">
              <button
                onClick={() => setIsVerificationOpen(!isVerificationOpen)}
                className="flex items-center gap-2 flex-1 text-left"
              >
                <div className="p-1.5 rounded-md bg-teal-500/10 text-teal-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-300 font-mono flex items-center gap-2">
                  <span>Scripture Reference & Theological Check</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-950/80 border border-teal-500/30 text-teal-300 font-semibold">
                    {isVerificationOpen ? 'Hide' : 'Show Details'}
                  </span>
                </h3>
                {isVerificationOpen ? (
                  <ChevronUp className="w-4 h-4 text-teal-400 ml-1" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-teal-400 ml-1" />
                )}
              </button>
              <button
                onClick={() => copyToClipboard(verificationText, 'verification-box')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-950/40 hover:bg-teal-900/50 text-teal-300 text-xs font-semibold border border-teal-500/30 transition-all shadow-sm"
                title="Copy complete scripture reference check and theological verification text"
              >
                {copiedSection === 'verification-box' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-teal-400" />
                    <span className="text-teal-400 font-bold">Copied Verification!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-teal-400" />
                    <span>Copy Verification</span>
                  </>
                )}
              </button>
            </div>

            {isVerificationOpen && (
              <div className="p-4 sm:p-5 pt-0 space-y-3.5 border-t border-stone-800/80">
                <div className="space-y-2.5 text-xs sm:text-sm text-stone-300 leading-relaxed font-sans pt-3">
                  <div className="bg-stone-900/80 p-3 rounded-lg border border-stone-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block font-mono">
                      Cited Scripture Grounding ({blueprint.scriptureRef || blueprint.englishRef}):
                    </span>
                    <p className="text-stone-200 text-xs sm:text-sm leading-relaxed">
                      {verification.citedVerseAnalysis}
                    </p>
                  </div>

                  <div className="bg-stone-900/80 p-3 rounded-lg border border-stone-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/90 block font-mono">
                      Affirmation Grounding:
                    </span>
                    <p className="text-stone-200 text-xs sm:text-sm leading-relaxed">
                      {verification.exactTitleMatch}
                    </p>
                  </div>

                  <div className="flex items-start gap-2 bg-emerald-950/30 border border-emerald-500/30 p-2.5 rounded-lg text-emerald-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-xs font-medium leading-relaxed">
                      {verification.verdict}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Character, Setting & Comical Storytelling Element */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-stone-950/40 p-3.5 rounded-xl border border-stone-800/50">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-stone-300">
                <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-stone-400">Character:</span>
                <span className="font-semibold text-amber-200">{blueprint.characterName || blueprint.character}</span>
              </div>
              <span className="text-stone-700 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5 text-stone-300">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-stone-400">Setting:</span>
                <span className="font-medium text-stone-200">{blueprint.location}</span>
              </div>
              {blueprint.targetAudience && (
                <>
                  <span className="text-stone-700 hidden sm:inline">•</span>
                  <div className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                    👨‍👩‍👧‍👦 {blueprint.targetAudience}
                  </div>
                </>
              )}
            </div>
            <button
              onClick={() => copyToClipboard(`Character:\n${blueprint.characterName || blueprint.character}\n•\nSetting:\n${blueprint.location}\n•\nAudience:\n${blueprint.targetAudience || 'Kids to Elderly'}\n•\nComical Element:\n${blueprint.comicalElement || ''}`, 'char-setting')}
              className="text-[11px] text-stone-400 hover:text-amber-300 flex items-center gap-1 bg-stone-900/80 hover:bg-stone-800 border border-stone-800 px-2 py-0.5 rounded transition-all ml-auto"
              title="Copy Character and Setting details"
            >
              {copiedSection === 'char-setting' ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-stone-400" />
                  <span>Copy Details</span>
                </>
              )}
            </button>
          </div>

          {/* Innovative & Comical Storytelling Element */}
          {blueprint.comicalElement && (
            <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-3.5 text-xs flex items-start gap-2.5">
              <Smile className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-300 font-mono uppercase text-[10px] tracking-wider block">
                  Innovative & Comical Element (Universal Appeal):
                </span>
                <p className="text-stone-200 text-xs mt-0.5 leading-relaxed">
                  {blueprint.comicalElement}
                </p>
              </div>
            </div>
          )}

          {/* 👥 Supporting Characters & Endearing Sidekicks */}
          {blueprint.supportingCharacters && blueprint.supportingCharacters.length > 0 && (
            <div className="bg-cyan-950/20 border border-cyan-500/30 rounded-xl p-3.5 text-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-300 font-mono uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  Supporting Characters & Sidekicks ({blueprint.supportingCharacters.length} Animated Companions):
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                  Multi-Character Cast
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {blueprint.supportingCharacters.map((char, idx) => (
                  <div key={idx} className="bg-stone-900/90 border border-cyan-500/20 rounded-lg p-3 space-y-1">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="font-bold text-amber-200 text-xs">{char.name}</span>
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-cyan-900/50 text-cyan-300 border border-cyan-500/30">
                        {char.role}
                      </span>
                    </div>
                    <p className="text-stone-300 text-[11px] leading-relaxed">
                      <strong className="text-stone-400 font-normal">Look:</strong> {char.appearance}
                    </p>
                    <p className="text-stone-300 text-[11px] leading-relaxed">
                      <strong className="text-cyan-400/90 font-normal">Gag/Action:</strong> {char.comedicInteraction}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 🎭 Character Expression & Scene Inculcation */}
        {blueprint.characterExpression && (
          <section className="bg-stone-950/80 rounded-xl border border-amber-500/30 p-4 space-y-3 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800/80 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-amber-500/15 text-amber-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-amber-300 tracking-wide uppercase font-mono flex items-center gap-2">
                    <span>🎭 Character Expression & Scene Inculcation</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-400">
                      Context-Matched
                    </span>
                  </h3>
                  <p className="text-[11px] text-stone-400 font-sans mt-0.5">
                    Facial micro-expressions, posture, and animated scene interaction matched to this affirmation
                  </p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(getCharacterExpressionText(blueprint), 'char-expr')}
                className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 transition-all flex items-center gap-1.5"
                title="Copy Character Expression & Scene Direction"
              >
                {copiedSection === 'char-expr' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied Expression!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-400" />
                    <span>Copy Expression</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
              <div className="bg-stone-900/80 p-3 rounded-lg border border-stone-800 space-y-1">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span>👀</span> Facial Micro-Expression & Gaze:
                </span>
                <p className="text-stone-200 leading-relaxed font-sans">
                  {blueprint.characterExpression.expression}
                </p>
              </div>

              <div className="bg-stone-900/80 p-3 rounded-lg border border-stone-800 space-y-1">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span>🤲</span> Body Posture & Gestures:
                </span>
                <p className="text-stone-200 leading-relaxed font-sans">
                  {blueprint.characterExpression.gesturePosture}
                </p>
              </div>

              <div className="bg-stone-900/80 p-3 rounded-lg border border-stone-800 space-y-1">
                <span className="text-[10px] font-mono text-teal-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span>🕊</span> Emotional & Faith Mood:
                </span>
                <p className="text-stone-300 leading-relaxed font-sans">
                  {blueprint.characterExpression.theologicalMood}
                </p>
              </div>

              <div className="bg-stone-900/80 p-3 rounded-lg border border-stone-800 space-y-1">
                <span className="text-[10px] font-mono text-teal-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span>🌅</span> Atmospheric Scene Inculcation:
                </span>
                <p className="text-stone-300 leading-relaxed font-sans">
                  {blueprint.characterExpression.sceneAtmosphere}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* 🎥 Master AI Video & Motion Prompt Studio */}
        <section className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-400">
                <Video className="w-4 h-4" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-stone-200 tracking-wide uppercase font-mono">
                🎥 Master AI Video & Motion Generation Prompt
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => copyToClipboard(formatMidjourneyPrompt(blueprint), 'mj-prompt')}
                className="text-xs font-semibold px-2.5 py-1 rounded bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/40 text-purple-300 transition-all flex items-center gap-1.5"
                title="Copy Midjourney v6 Base Frame Keyframe Prompt"
              >
                {copiedSection === 'mj-prompt' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied Midjourney!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>Copy Midjourney v6 Prompt</span>
                  </>
                )}
              </button>

              <button
                onClick={() => copyToClipboard(formatVideoPromptOnlyText(blueprint), 'video')}
                className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 transition-all flex items-center gap-1.5"
                title="Copy Full Master Video Prompt for Runway Gen-3 / Kling / Sora / Luma"
              >
                {copiedSection === 'video' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied Master Prompt!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-400" />
                    <span>Copy Master Prompt</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-3">
            <div>
              <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider mb-1 flex items-center justify-between flex-wrap gap-1">
                <span>9:16 Video Prompt (3D Pixar / DreamWorks Hollywood Grade):</span>
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    STRICTLY DRY EYES (NO TEARS / NO CRYING)
                  </span>
                  <span className="text-amber-400 font-semibold">{blueprint.characterStyle || '3D Animation'}</span>
                </div>
              </div>
              <p className="font-mono text-xs text-stone-200 select-all leading-relaxed bg-stone-900/90 p-3 rounded-lg border border-stone-800">
                {blueprint.videoPrompt}
              </p>
            </div>

            <div className="pt-1">
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block mb-1">
                Midjourney v6 Keyframe Base Frame Prompt:
              </span>
              <p className="font-mono text-xs text-stone-300 select-all leading-relaxed bg-stone-900/90 p-2.5 rounded-lg border border-stone-800/80">
                {formatMidjourneyPrompt(blueprint)}
              </p>
            </div>
          </div>
        </section>

        {/* 🎙 Audio & Voiceover Prompt (with Character-Matched Voice Narration Player) */}
        <section className="bg-stone-950/70 rounded-xl border border-emerald-500/30 overflow-hidden transition-all shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 sm:p-4 hover:bg-stone-900/40 transition-colors">
            <button
              onClick={() => setIsAudioOpen(!isAudioOpen)}
              className="flex items-center gap-2 flex-1 text-left"
            >
              <div className="p-1.5 rounded-md bg-emerald-500/15 text-emerald-400">
                <Mic className="w-4 h-4" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-stone-100 tracking-wide uppercase font-mono flex items-center gap-2 flex-wrap">
                <span>🎙 Video Gen Chooses Voice Profile & Audio</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-semibold">
                  Autonomous Voice Selection
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-900 border border-stone-800 text-stone-400 font-normal">
                  {isAudioOpen ? 'Hide' : 'Show Details & Audio Player'}
                </span>
              </h3>
              {isAudioOpen ? (
                <ChevronUp className="w-4 h-4 text-emerald-400 ml-1" />
              ) : (
                <ChevronDown className="w-4 h-4 text-emerald-400 ml-1" />
              )}
            </button>

            <button
              onClick={() => copyToClipboard(formatAudioOnlyText(blueprint), 'audio')}
              className="text-xs font-semibold px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 transition-colors flex items-center gap-1 ml-auto"
              title="Copy Audio & Voiceover prompt"
            >
              {copiedSection === 'audio' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copied Audio Prompt!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-400" />
                  <span>Copy Audio Prompt</span>
                </>
              )}
            </button>
          </div>

          {isAudioOpen && (
            <div className="p-4 pt-0 border-t border-stone-800/80 space-y-3.5 text-xs text-stone-300">

              {/* Character Voice Direction & Nuances */}
              {(() => {
                const voiceDir = buildCharacterVoiceDirection(blueprint);
                return (
                  <div className="space-y-3 pt-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="bg-stone-900/90 p-3 rounded-lg border border-stone-800 space-y-1">
                        <span className="text-stone-400 font-mono uppercase text-[10px] block font-bold flex items-center gap-1.5">
                          <span>🎭</span> Character Vocal Tone:
                        </span>
                        <p className="text-emerald-300 font-medium text-xs leading-relaxed">
                          {voiceDir.vocalTone}
                        </p>
                      </div>

                      <div className="bg-stone-900/90 p-3 rounded-lg border border-stone-800 space-y-1">
                        <span className="text-amber-400/90 font-mono uppercase text-[10px] block font-bold flex items-center gap-1.5">
                          <span>✨</span> Witty & Comedic Nuance:
                        </span>
                        <p className="text-stone-200 text-xs leading-relaxed">
                          {voiceDir.wittyComedicNuance}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                      <span className="text-emerald-300 font-mono uppercase text-[10px] block font-bold flex items-center gap-1.5">
                        <span>🎙</span> Autonomous Voice Selection Directive:
                      </span>
                      <p className="text-emerald-200/90 text-xs leading-relaxed">
                        The video generation tool (Runway Gen-3 / Kling / Sora / Luma) or audio engine <strong>autonomously chooses the voice profile</strong> (Male, Female, or Child voice, pitch, age, accent, and style) that best fits the on-screen character.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-stone-900/90 border border-emerald-500/30 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-emerald-400 font-mono uppercase text-[10px] block font-bold">
                          Spoken Narration Script (Exact Text Only - 10s):
                        </span>
                        <button
                          onClick={() => copyToClipboard(blueprint.audioScript || voiceDir.audioNarrationScript, 'spoken-script')}
                          className="text-[10px] font-mono text-stone-400 hover:text-emerald-300 flex items-center gap-1"
                        >
                          {copiedSection === 'spoken-script' ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400 font-bold">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Script</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="font-serif text-sm text-stone-100 italic bg-black/50 p-2.5 rounded border border-stone-800">
                        "{blueprint.audioScript || voiceDir.audioNarrationScript}"
                      </p>
                      <div className="flex items-center justify-between gap-2 p-2 rounded bg-emerald-950/40 border border-emerald-500/20 text-[11px] text-emerald-300/90 leading-relaxed font-sans">
                        <span><strong className="text-emerald-200 font-semibold">DIRECTIVE:</strong> Video generator autonomously selects voice profile (Male, Female, or Child) with warm, witty, joyful, and articulate delivery. Zero unscripted words.</span>
                        <button
                          onClick={() => copyToClipboard(voiceDir.elevenLabsPrompt, 'tts-prompt')}
                          className="px-2 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30 shrink-0 transition-colors"
                          title="Copy Voice Synthesis Prompt"
                        >
                          {copiedSection === 'tts-prompt' ? 'Copied Prompt!' : 'Copy Voice Prompt'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <div>
                <span className="text-stone-400 font-mono uppercase text-[10px] block font-bold">Background Atmosphere:</span>
                <p className="text-stone-400 font-mono text-[11px]">{blueprint.backgroundAudio}</p>
              </div>
            </div>
          )}
        </section>

        {/* 📝 Post-Production Text Overlay (Clean Overlay Specs) */}
        <section className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="p-1.5 rounded-md bg-teal-500/10 text-teal-400">
                <Subtitles className="w-4 h-4" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-stone-200 tracking-wide uppercase font-mono flex items-center gap-2 flex-wrap">
                <span>📝 Separate 1080x1920 Alpha PNG Overlay</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-950/80 border border-teal-500/40 text-teal-300 font-mono font-semibold">
                  No Edge Clipping
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono ${typo.uiBadgeClass}`}>
                  {typo.uiBadgeText}
                </span>
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadAlphaPng}
                disabled={isGeneratingPng}
                className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 transition-all flex items-center gap-1.5 disabled:opacity-50"
                title="Download 1080x1920 clean transparent alpha text overlay PNG"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>{isGeneratingPng ? 'Generating...' : 'Download Alpha PNG'}</span>
              </button>
              <button
                onClick={() => copyToClipboard(formatSubtitlesOnlyText(blueprint), 'subs')}
                className="text-xs font-semibold px-2.5 py-1 rounded bg-teal-500/15 border border-teal-500/30 text-teal-300 hover:bg-teal-500/25 transition-all flex items-center gap-1.5"
                title="Copy 3-line overlay and sizing directives"
              >
                {copiedSection === 'subs' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied Specs!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-teal-400" />
                    <span>Copy Overlay Specs</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-3.5 text-xs">
            {/* Visual 9:16 Center Safe Zone Preview */}
            <div className="p-4 sm:p-5 rounded-lg bg-black/90 border border-stone-800 text-center space-y-2 shadow-inner">
              <div className="flex items-center justify-between border-b border-stone-800/80 pb-1.5 text-[10px] font-mono text-stone-400">
                <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block animate-pulse"></span>
                  9:16 Center Safe Zone (Lifted Y: 900-1300px • 350px Bottom Clearance)
                </span>
                <span className="text-stone-300">
                  Canvas Auto-Fit: <strong className="text-amber-300 font-mono">~{typo.affirmationPx}px</strong> ({typo.scalePercent}% scale)
                </span>
              </div>

              <div className={`text-amber-400 tracking-wide font-bold ${typo.uiAffirmationClass}`}>
                {line1Affirmation}
              </div>
              {line2Scripture && (
                <div className={`text-white font-serif italic ${typo.uiScriptureClass}`}>
                  "{line2Scripture}"
                </div>
              )}
              <div className={`text-stone-400 font-mono ${typo.uiRefClass}`}>
                {line3Ref}
              </div>
            </div>

            {/* Auto-Scaled Sizing Directive */}
            <div className={`p-3 rounded-lg border space-y-2 ${typo.reductionPercent > 0 ? 'bg-amber-950/20 border-amber-500/30' : 'bg-stone-900/90 border-stone-800'}`}>
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-mono font-bold flex items-center gap-1.5 text-amber-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block"></span>
                  📐 Video Gen Overlay Directive: {typo.tierLabel}
                </span>
                <span className="font-mono text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  100% Content Intact (Zero Loss)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                <div className="p-2 rounded bg-black/60 border border-stone-800">
                  <span className="block text-[10px] text-stone-400 font-mono uppercase">Affirmation Font Scale</span>
                  <span className="font-mono text-amber-300 font-bold text-xs">~{typo.affirmationFontSizeCanvas}</span>
                  <span className="block text-[10px] text-stone-500 mt-0.5">{typo.affirmationCharCount} chars ({typo.scalePercent}% scale)</span>
                </div>
                <div className="p-2 rounded bg-black/60 border border-stone-800">
                  <span className="block text-[10px] text-stone-400 font-mono uppercase">Scripture Font Scale</span>
                  <span className="font-mono text-stone-100 font-bold text-xs">~{typo.scriptureFontSizeCanvas}</span>
                  <span className="block text-[10px] text-stone-500 mt-0.5">{typo.scriptureCharCount} chars (NKJV)</span>
                </div>
                <div className="p-2 rounded bg-black/60 border border-stone-800">
                  <span className="block text-[10px] text-stone-400 font-mono uppercase">Safe Margin & Style</span>
                  <span className="font-mono text-teal-300 font-semibold text-[11px]">Max 760px Safe Zone</span>
                  <span className="block text-[10px] text-stone-500 mt-0.5">{typo.recommendedWrap}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 🏷 YouTube SEO & Tags (Initially Collapsed) */}
        <section className="bg-stone-950/60 rounded-xl border border-stone-800 overflow-hidden transition-all">
          <div className="flex items-center justify-between p-3.5 sm:p-4 hover:bg-stone-900/40 transition-colors">
            <button
              onClick={() => setIsSeoOpen(!isSeoOpen)}
              className="flex items-center gap-2 flex-1 text-left"
            >
              <div className="p-1.5 rounded-md bg-purple-500/10 text-purple-400">
                <Hash className="w-4 h-4" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-stone-200 tracking-wide uppercase font-mono flex items-center gap-2">
                <span>🏷 YouTube SEO, Title & Tags</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-900 border border-stone-800 text-stone-400 font-normal">
                  {isSeoOpen ? 'Hide' : 'Show Details'}
                </span>
              </h3>
              {isSeoOpen ? (
                <ChevronUp className="w-4 h-4 text-stone-400 ml-1" />
              ) : (
                <ChevronDown className="w-4 h-4 text-stone-400 ml-1" />
              )}
            </button>
            <button
              onClick={() => copyToClipboard(`Title: ${blueprint.seo.title}\n\nDescription:\n${blueprint.seo.description}\n\nTags (CSV):\n${blueprint.seo.tags.join(', ')}\n\nHashtags (CSV):\n${blueprint.seo.hashtags.join(', ')}`, 'seo')}
              className="text-xs font-medium flex items-center gap-1 text-stone-400 hover:text-purple-400 transition-colors px-2 py-1 rounded hover:bg-stone-900"
            >
              {copiedSection === 'seo' ? (
                <>
                  <Check className="w-3 h-3 text-purple-400" />
                  <span className="text-purple-400 font-semibold">Copied SEO</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy SEO Details</span>
                </>
              )}
            </button>
          </div>

          {isSeoOpen && (
            <div className="p-4 pt-0 border-t border-stone-800/80 space-y-3.5 text-xs text-stone-300">
              <div className="pt-3"></div>
              {/* Video Title Row */}
              <div className="p-3 rounded-lg bg-stone-900/50 border border-stone-800/80 space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-stone-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                    Video Title:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(englishTitleOnly, 'english-title-only')}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold transition-all shadow-sm"
                      title={`Copy Title: "${englishTitleOnly}"`}
                    >
                      {copiedSection === 'english-title-only' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied Title!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-emerald-400" />
                          <span>Copy Title</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => copyToClipboard(blueprint.seo.title, 'full-title')}
                      className="text-[11px] text-stone-400 hover:text-stone-200 flex items-center gap-1 transition-colors px-1"
                      title="Copy full video title with prefixes"
                    >
                      {copiedSection === 'full-title' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied Full Title</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Full Title</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <p className="font-semibold text-stone-100 text-sm font-serif">{blueprint.seo.title}</p>
              </div>

              {/* Description Row with Structured 3-Part Layout */}
              <div className="p-3 rounded-lg bg-stone-900/50 border border-stone-800/80 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-stone-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                    Description (Scripture Verse + 2-Liner Text):
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(formattedDescription, 'seo-description')}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-[11px] font-semibold transition-all shadow-sm"
                      title="Copy description (Scripture verse + 2-liner text expressing God's word)"
                    >
                      {copiedSection === 'seo-description' ? (
                        <>
                          <Check className="w-3 h-3 text-amber-400" />
                          <span className="text-amber-400 font-bold">Copied Description!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-amber-400" />
                          <span>Copy Description</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div className="bg-stone-950/60 p-3 rounded-lg border border-stone-800/60">
                  <p className="text-stone-300 leading-relaxed whitespace-pre-line text-xs sm:text-sm font-sans">
                    {blueprint.seo.description}
                  </p>
                </div>
              </div>
              
              {/* Tags with Comma Separated Copy */}
              <div className="p-3 rounded-lg bg-stone-900/60 border border-stone-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-stone-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                    Tags (Comma-Separated for YouTube Studio):
                  </span>
                  <button
                    onClick={() => copyToClipboard(blueprint.seo.tags.join(', '), 'tags-csv')}
                    className="text-[11px] font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                    title="Copy tags as comma-separated values ready for YouTube Studio"
                  >
                    {copiedSection === 'tags-csv' ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied Tags (CSV)</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Tags (CSV)</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-2 rounded bg-black/60 font-mono text-[11px] text-amber-300 select-all border border-stone-800/60">
                  {blueprint.seo.tags.join(', ')}
                </div>
              </div>

              {/* Hashtags with Comma Separated Copy */}
              <div className="p-3 rounded-lg bg-stone-900/60 border border-stone-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-stone-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                    Hashtags (Comma-Separated for YouTube Studio):
                  </span>
                  <button
                    onClick={() => copyToClipboard(blueprint.seo.hashtags.join(', '), 'hashtags-csv')}
                    className="text-[11px] font-medium text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
                    title="Copy hashtags as comma-separated values ready for YouTube Studio"
                  >
                    {copiedSection === 'hashtags-csv' ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied Hashtags (CSV)</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Hashtags (CSV)</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-2 rounded bg-black/60 font-mono text-[11px] text-purple-300 select-all border border-stone-800/60">
                  {blueprint.seo.hashtags.join(', ')}
                </div>
              </div>
            </div>
          )}
        </section>

      </div>

      {/* Card Navigation Footer */}
      {(onNavigatePrev || onNavigateNext || onOpenNavigator) && (
        <div className="bg-stone-950/90 px-5 py-3.5 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <button
            onClick={onNavigatePrev}
            disabled={!prevId}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-all ${
              prevId
                ? 'bg-stone-900 hover:bg-stone-800 text-stone-200 border-stone-700 hover:text-amber-300 hover:border-amber-500/40 shadow-sm'
                : 'bg-stone-950 text-stone-600 border-stone-850 cursor-not-allowed opacity-50'
            }`}
            title={prevId ? `Go to Previous Short (#${prevId})` : 'First Short'}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{prevId ? `Previous (#${prevId})` : 'First Short'}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-stone-400 font-mono">
              Short <strong className="text-amber-300 font-bold">#{blueprint.id}</strong> of {totalCount || 50}
            </span>
            {onOpenNavigator && (
              <button
                onClick={onOpenNavigator}
                className="px-2.5 py-1 rounded-md bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-semibold transition-all text-[11px]"
                title="Open Quick Navigator to browse all shorts"
              >
                Jump to Short...
              </button>
            )}
          </div>

          <button
            onClick={onNavigateNext}
            disabled={!nextId}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-all ${
              nextId
                ? 'bg-stone-900 hover:bg-stone-800 text-stone-200 border-stone-700 hover:text-amber-300 hover:border-amber-500/40 shadow-sm'
                : 'bg-stone-950 text-stone-600 border-stone-850 cursor-not-allowed opacity-50'
            }`}
            title={nextId ? `Go to Next Short (#${nextId})` : 'Last Short'}
          >
            <span>{nextId ? `Next (#${nextId})` : 'Last Short'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </article>
  );
};

export const BlueprintCard = React.memo(BlueprintCardComponent);
