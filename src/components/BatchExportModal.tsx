import React, { useState } from 'react';
import { X, Copy, Check, Download, FileText, CheckCircle2, Video, Hash, BookOpen, Sparkles, Smile } from 'lucide-react';
import { ShortsBlueprint } from '../types';
import { 
  formatBlueprintAsText, 
  formatVideoGenerationOnlyText, 
  formatYouTubeOnlyText,
  getEnglishTitleOnly,
  getFormattedYouTubeDescription,
  getScriptureVerificationText
} from '../utils/blueprintFormatter';

interface BatchExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  blueprints: ShortsBlueprint[];
}

export const BatchExportModal: React.FC<BatchExportModalProps> = ({
  isOpen,
  onClose,
  blueprints
}) => {
  const [selectedBatch, setSelectedBatch] = useState<'all' | '1-10' | '11-20' | '21-30' | '31-40' | '41-50'>('all');
  const [exportMode, setExportMode] = useState<'all' | 'video-only' | 'youtube-only' | 'titles-only' | 'descriptions-only' | 'verification-only' | 'expressions-only' | 'nkjv-only'>('all');
  const [copied, setCopied] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredBlueprints = blueprints.filter(b => {
    if (selectedBatch === '1-10') return b.id >= 1 && b.id <= 10;
    if (selectedBatch === '11-20') return b.id >= 11 && b.id <= 20;
    if (selectedBatch === '21-30') return b.id >= 21 && b.id <= 30;
    if (selectedBatch === '31-40') return b.id >= 31 && b.id <= 40;
    if (selectedBatch === '41-50') return b.id >= 41 && b.id <= 50;
    return true;
  });

  const getExportModeLabel = (mode: typeof exportMode): string => {
    switch (mode) {
      case 'all': return 'Full Blueprint (Video + Audio + Text Overlay + YouTube)';
      case 'video-only': return '1) Video & Audio Generation Prompts Alone';
      case 'youtube-only': return '2) YouTube Metadata Alone (SEO, Descriptions & Tags)';
      case 'expressions-only': return '3) Character Inculcation & Comical Direction';
      case 'nkjv-only': return '4) NKJV Canonical Verses & Affirmation Texts';
      case 'titles-only': return 'Titles Only';
      case 'descriptions-only': return 'Descriptions Only';
      case 'verification-only': return 'Scripture Reference & Theological Grounding';
      default: return 'Full Blueprint';
    }
  };

  const exportHeader = (exportMode === 'titles-only' || exportMode === 'descriptions-only' || exportMode === 'nkjv-only')
    ? ''
    : `================================================================================
CHRISTIAN AFFIRMATIONS SHORTS PRODUCTION BLUEPRINTS
Channel: Christian Affirmations Shorts (@ChristianAffirmationsShorts)
Content: Joyful, Positive, Bible-Based Christian Affirmations
Target Audience: Kids to Elderly (Universal Hope & Joy)
Narrator: Video Gen Autonomously Chooses Voice Profile (Male, Female, or Child — Tailored per Hero)
Animation Styles: 3D Pixar, Cartoon Comic, Claymation, Whimsical Anime, Storybook
Bible Version: NKJV (New King James Version)
Export Mode: ${getExportModeLabel(exportMode)}
Batch: ${selectedBatch} (${filteredBlueprints.length} Blueprints)
================================================================================\n\n`;

  const exportContent = exportMode === 'titles-only'
    ? filteredBlueprints.map(b => getEnglishTitleOnly(b)).join('\n')
    : exportMode === 'descriptions-only'
    ? filteredBlueprints.map(b => getFormattedYouTubeDescription(b)).join('\n\n----------------------------------------\n\n')
    : exportMode === 'nkjv-only'
    ? filteredBlueprints.map(b => `Short #${b.id} | ${b.affirmationTitle || b.englishText}\nAffirmation: "${b.affirmationText || b.englishText}"\nScripture: ${b.scriptureRef || b.englishRef} (NKJV)\nVerse: "${b.scriptureVerse || b.nkjvText || b.englishText}"`).join('\n\n')
    : exportMode === 'expressions-only'
    ? filteredBlueprints.map(b => `Short #${b.id}: ${b.affirmationTitle || b.englishText}
Character: ${b.characterName || b.character} (${b.characterStyle || '3D Animation'})
Location: ${b.location}
Comical & Innovative Element: ${b.comicalElement || ''}
Facial Micro-Expression: ${b.characterExpression?.expression || ''}
Posture & Gestures: ${b.characterExpression?.gesturePosture || ''}
Faith & Emotional Mood: ${b.characterExpression?.theologicalMood || ''}
Atmosphere: ${b.characterExpression?.sceneAtmosphere || ''}
Video Prompt:
${b.videoPrompt}`).join('\n\n----------------------------------------\n\n')
    : exportMode === 'verification-only'
    ? filteredBlueprints.map(b => `Short #${b.id} | ${b.affirmationTitle || b.englishText}\n${getScriptureVerificationText(b)}`).join('\n\n----------------------------------------\n\n')
    : filteredBlueprints.map(b => {
        if (exportMode === 'video-only') {
          return formatVideoGenerationOnlyText(b);
        }
        if (exportMode === 'youtube-only') {
          return `Short #${b.id}: ${b.affirmationTitle || b.englishText}
${formatYouTubeOnlyText(b)}`;
        }
        return formatBlueprintAsText(b);
      }).join('\n\n========================================\n\n');

  const exportText = exportHeader + exportContent;

  const handleCopy = () => {
    navigator.clipboard.writeText(exportText);
    setCopied(true);
    setCopiedType('all');
    setTimeout(() => {
      setCopied(false);
      setCopiedType(null);
    }, 2000);
  };

  const handleCopyAllTitles = () => {
    const list = filteredBlueprints.map(b => getEnglishTitleOnly(b)).join('\n');
    navigator.clipboard.writeText(list);
    setCopiedType('titles');
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleCopyAllDescriptions = () => {
    const list = filteredBlueprints.map(b => getFormattedYouTubeDescription(b)).join('\n\n----------------------------------------\n\n');
    navigator.clipboard.writeText(list);
    setCopiedType('descriptions');
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleCopyAllTagsCsv = () => {
    const allTags = Array.from(new Set(filteredBlueprints.flatMap(b => b.seo.tags)));
    navigator.clipboard.writeText(allTags.join(', '));
    setCopiedType('tags');
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleCopyAllHashtagsCsv = () => {
    const allHashtags = Array.from(new Set(filteredBlueprints.flatMap(b => b.seo.hashtags)));
    navigator.clipboard.writeText(allHashtags.join(', '));
    setCopiedType('hashtags');
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([exportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `christian-affirmations-blueprints-${selectedBatch}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const exportData = {
      channelName: "Christian Affirmations Shorts",
      youtubeHandle: "@ChristianAffirmationsShorts",
      theme: "Joyful, Hope-Filled, Bible-Based Christian Affirmations",
      targetAudience: "Kids to Elderly",
      voice: "Video Gen Autonomously Chooses Voice Profile (Male, Female, or Child)",
      batch: selectedBatch,
      count: filteredBlueprints.length,
      blueprints: filteredBlueprints
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `christian-affirmations-blueprints-${selectedBatch}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div 
        className="bg-stone-900 border border-stone-800 w-full max-w-4xl max-h-[90vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-100 font-serif">
                Christian Affirmations Shorts — Batch Export
              </h3>
              <p className="text-xs text-stone-400">
                Formatted for Midjourney, Runway, Kling, ElevenLabs & YouTube Studio (@ChristianAffirmationsShorts)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Batch Selection Tabs */}
        <div className="px-5 py-3 border-b border-stone-800 bg-stone-950/40 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-stone-400 font-medium mr-1">Select Batch:</span>
            {(['all', '1-10', '11-20', '21-30', '31-40', '41-50'] as const).map((batch) => (
              <button
                key={batch}
                onClick={() => setSelectedBatch(batch)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedBatch === batch
                    ? 'bg-amber-600 text-stone-950'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                {batch === 'all' ? `All (${blueprints.length})` : `#${batch}`}
              </button>
            ))}
          </div>

          {/* Mode Selector */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-950/70 rounded-xl border border-stone-800">
            <span className="text-[10px] uppercase font-mono font-bold text-stone-400 px-2">Scope:</span>
            <button
              onClick={() => setExportMode('all')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                exportMode === 'all'
                  ? 'bg-stone-700 text-stone-100 shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <FileText className="w-3 h-3" />
              <span>Full</span>
            </button>
            <button
              onClick={() => setExportMode('video-only')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                exportMode === 'video-only'
                  ? 'bg-amber-600 text-stone-950 font-bold shadow'
                  : 'text-amber-400/80 hover:text-amber-300'
              }`}
            >
              <Video className="w-3 h-3" />
              <span>1) Video & Audio</span>
            </button>
            <button
              onClick={() => setExportMode('youtube-only')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                exportMode === 'youtube-only'
                  ? 'bg-purple-600 text-white font-bold shadow'
                  : 'text-purple-400/80 hover:text-purple-300'
              }`}
            >
              <Hash className="w-3 h-3" />
              <span>2) YouTube SEO</span>
            </button>
            <button
              onClick={() => setExportMode('expressions-only')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                exportMode === 'expressions-only'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow'
                  : 'text-amber-300/80 hover:text-amber-200'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>3) Characters</span>
            </button>
            <button
              onClick={() => setExportMode('nkjv-only')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                exportMode === 'nkjv-only'
                  ? 'bg-emerald-500 text-stone-950 font-bold shadow'
                  : 'text-emerald-300/80 hover:text-emerald-200'
              }`}
            >
              <BookOpen className="w-3 h-3" />
              <span>4) NKJV Scriptures</span>
            </button>
            <button
              onClick={() => setExportMode('titles-only')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                exportMode === 'titles-only'
                  ? 'bg-emerald-600 text-white font-bold shadow'
                  : 'text-emerald-400/80 hover:text-emerald-300'
              }`}
            >
              <Copy className="w-3 h-3" />
              <span>Titles</span>
            </button>
            <button
              onClick={() => setExportMode('descriptions-only')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                exportMode === 'descriptions-only'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow'
                  : 'text-amber-400/80 hover:text-amber-300'
              }`}
            >
              <Copy className="w-3 h-3" />
              <span>Descriptions</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyAllTitles}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 text-xs font-semibold border border-emerald-500/30 transition-all shadow"
              title="Copy list of all affirmation titles in this batch"
            >
              {copiedType === 'titles' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied Titles!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copy Titles</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopyAllDescriptions}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 text-xs font-semibold border border-amber-500/30 transition-all shadow"
              title="Copy list of all YouTube descriptions in this batch"
            >
              {copiedType === 'descriptions' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-amber-400">Copied Descriptions!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                  <span>Copy Descriptions</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopyAllTagsCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-semibold border border-amber-500/30 transition-all shadow"
              title="Copy all tags in this batch as comma-separated values ready for YouTube Studio"
            >
              {copiedType === 'tags' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied Tags!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                  <span>Tags (CSV)</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopyAllHashtagsCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-purple-300 text-xs font-semibold border border-purple-500/30 transition-all shadow"
              title="Copy all hashtags in this batch as comma-separated values ready for YouTube Studio"
            >
              {copiedType === 'hashtags' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied Hashtags!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-purple-400" />
                  <span>Hashtags (CSV)</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold transition-all shadow"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied All!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy {filteredBlueprints.length} Blueprints</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadTxt}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition-colors"
              title="Download as Plain Text (.txt)"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>TXT</span>
            </button>

            <button
              onClick={handleDownloadJson}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition-colors"
              title="Download as JSON (.json)"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>JSON</span>
            </button>
          </div>
        </div>

        {/* Text Preview Area */}
        <div className="p-5 flex-1 overflow-y-auto bg-stone-950 font-mono text-xs text-stone-300 leading-relaxed whitespace-pre-wrap select-all">
          {exportText}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-800 bg-stone-950/70 flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Ready for AI video generation & YouTube Shorts production</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
