import React, { useState } from 'react';
import { ShortsBlueprint } from '../types';
import { Sparkles, ArrowRight, BookOpen, Search, Video, Hash, Copy, Check, Heart, Smile, UserCheck, Mic } from 'lucide-react';
import { 
  formatVideoGenerationOnlyText, 
  formatYouTubeOnlyText,
  getEnglishTitleOnly,
  getFormattedYouTubeDescription,
  getScriptureVerificationText,
  formatAudioOnlyText
} from '../utils/blueprintFormatter';

interface FullDirectoryViewProps {
  verifiedBlueprints: ShortsBlueprint[];
  onSelectBlueprint: (blueprint: ShortsBlueprint) => void;
}

export const FullDirectoryView: React.FC<FullDirectoryViewProps> = ({
  verifiedBlueprints,
  onSelectBlueprint,
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeStyle, setActiveStyle] = useState<string>('all');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyItemText = (e: React.MouseEvent, text: string, key: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const categories = Array.from(new Set(verifiedBlueprints.map(b => b.category).filter(Boolean))) as string[];
  const styles = Array.from(new Set(verifiedBlueprints.map(b => b.characterStyle).filter(Boolean))) as string[];

  const filteredItems = verifiedBlueprints.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesStyle = activeStyle === 'all' || item.characterStyle === activeStyle;
    const q = filterQuery.toLowerCase().trim();
    const matchesQuery = !q ||
      item.id.toString() === q ||
      (item.affirmationTitle && item.affirmationTitle.toLowerCase().includes(q)) ||
      (item.affirmationText && item.affirmationText.toLowerCase().includes(q)) ||
      (item.scriptureVerse && item.scriptureVerse.toLowerCase().includes(q)) ||
      (item.scriptureRef && item.scriptureRef.toLowerCase().includes(q)) ||
      (item.characterName && item.characterName.toLowerCase().includes(q)) ||
      (item.character && item.character.toLowerCase().includes(q)) ||
      (item.comicalElement && item.comicalElement.toLowerCase().includes(q));

    return matchesCategory && matchesStyle && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 space-y-6">
      
      {/* Top Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-100 font-serif">
              50 Christian Affirmations Shorts Directory
            </h2>
            <p className="text-xs text-stone-400 font-sans">
              Joyful, positive, Bible-based affirmations for YouTube Shorts spanning cartoon, comic, and 3D animated characters (Kids to Elderly)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono font-bold text-xs">
            {verifiedBlueprints.length} Production Shorts
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search affirmation, scripture verse, character name, or #number..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-9 pr-8 py-2.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
          />
          {filterQuery && (
            <button
              onClick={() => setFilterQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-200"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <span className="text-[11px] font-mono uppercase text-stone-400 mr-1 shrink-0">Category:</span>
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeCategory === 'all'
                ? 'bg-amber-600 text-stone-950 font-bold'
                : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            All Categories ({verifiedBlueprints.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-amber-600 text-stone-950 font-bold'
                  : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Character Style Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <span className="text-[11px] font-mono uppercase text-cyan-400 mr-1 shrink-0">Style:</span>
          <button
            onClick={() => setActiveStyle('all')}
            className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeStyle === 'all'
                ? 'bg-cyan-600 text-stone-950 font-bold'
                : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            All Styles
          </button>
          {styles.map((st) => (
            <button
              key={st}
              onClick={() => setActiveStyle(st)}
              className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeStyle === st
                  ? 'bg-cyan-600 text-stone-950 font-bold'
                  : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Affirmations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectBlueprint(item)}
            className="p-4 rounded-xl border border-stone-800 bg-stone-900/90 hover:border-amber-500/50 hover:bg-stone-900 transition-all cursor-pointer flex flex-col justify-between gap-3 group shadow-md"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-stone-950 border border-amber-500/30 text-amber-400">
                    #{item.id}
                  </span>
                  {item.category && (
                    <span className="text-[10px] font-semibold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-800/40 truncate max-w-[140px]">
                      ✨ {item.category}
                    </span>
                  )}
                </div>
                <span className="text-xs font-semibold text-emerald-400 font-mono">
                  {item.scriptureRef || item.englishRef}
                </span>
              </div>

              <h3 className="text-sm font-bold font-serif text-stone-100 group-hover:text-amber-200 transition-colors">
                {item.affirmationTitle || item.englishText}
              </h3>

              <p className="text-xs font-serif italic text-stone-300 line-clamp-2 leading-relaxed">
                "{item.scriptureVerse || item.nkjvText || item.englishText}"
              </p>

              {/* Character Badge & Comical Snippet */}
              <div className="pt-1.5 flex flex-wrap items-center gap-1.5 text-[11px]">
                <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-stone-950 border border-stone-800 text-stone-300">
                  <UserCheck className="w-3 h-3 text-amber-400" />
                  <span className="font-semibold text-amber-200 truncate max-w-[150px]">{item.characterName || item.character}</span>
                </span>
                {item.characterStyle && (
                  <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-[10px]">
                    {item.characterStyle}
                  </span>
                )}
              </div>

              {item.comicalElement && (
                <div className="text-[11px] text-amber-300/90 font-sans flex items-start gap-1 bg-amber-950/20 p-2 rounded-lg border border-amber-500/20 line-clamp-2">
                  <Smile className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{item.comicalElement}</span>
                </div>
              )}
            </div>

            <div className="pt-2.5 border-t border-stone-800/60 flex items-center justify-between gap-2 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={(e) => copyItemText(e, getEnglishTitleOnly(item), `dir-title-${item.id}`)}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30 transition-all"
                  title="Copy Title"
                >
                  {copiedKey === `dir-title-${item.id}` ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-emerald-400" />
                      <span>Title</span>
                    </>
                  )}
                </button>

                <button
                  onClick={(e) => copyItemText(e, getFormattedYouTubeDescription(item), `dir-desc-${item.id}`)}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 text-[10px] font-semibold border border-amber-500/30 transition-all"
                  title="Copy YouTube Description"
                >
                  {copiedKey === `dir-desc-${item.id}` ? (
                    <>
                      <Check className="w-3 h-3 text-amber-400" />
                      <span className="text-amber-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-amber-400" />
                      <span>Description</span>
                    </>
                  )}
                </button>

                <button
                  onClick={(e) => copyItemText(e, formatVideoGenerationOnlyText(item), `dir-vid-${item.id}`)}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-[10px] font-semibold border border-stone-700 transition-all"
                  title="Copy Video Gen Prompt"
                >
                  {copiedKey === `dir-vid-${item.id}` ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Video className="w-3 h-3 text-amber-400" />
                      <span>Video Prompt</span>
                    </>
                  )}
                </button>

                <button
                  onClick={(e) => copyItemText(e, formatAudioOnlyText(item), `dir-audio-${item.id}`)}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30 transition-all"
                  title="Copy Audio Prompt (Video Gen Chooses Voice Profile)"
                >
                  {copiedKey === `dir-audio-${item.id}` ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-3 h-3 text-emerald-400" />
                      <span>Voice Prompt</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-stone-400 group-hover:text-amber-400 transition-colors">
                <span>View Card</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 text-stone-500 text-sm">
          No affirmations found matching your filter criteria.
        </div>
      )}

    </div>
  );
};
