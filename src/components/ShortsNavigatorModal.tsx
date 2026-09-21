import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, Hash, ChevronRight, Check, Grid, List, Sparkles } from 'lucide-react';
import { ShortsBlueprint } from '../types';

interface ShortsNavigatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  blueprints: ShortsBlueprint[];
  currentId: number;
  onSelectShort: (blueprint: ShortsBlueprint) => void;
}

type BatchTab = 'all' | '1-10' | '11-20' | '21-30' | '31-40' | '41-50';

export const ShortsNavigatorModal: React.FC<ShortsNavigatorModalProps> = ({
  isOpen,
  onClose,
  blueprints,
  currentId,
  onSelectShort
}) => {
  const [query, setQuery] = useState('');
  const [activeBatch, setActiveBatch] = useState<BatchTab>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [jumpInput, setJumpInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus search input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
      setJumpInput('');
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Determine which batch the current short belongs to for default filter
  useEffect(() => {
    if (currentId > 0 && currentId <= blueprints.length) {
      let b: BatchTab = '1-10';
      if (currentId > 40) b = '41-50';
      else if (currentId > 30) b = '31-40';
      else if (currentId > 20) b = '21-30';
      else if (currentId > 10) b = '11-20';
      setActiveBatch(b);
    }
  }, [currentId, blueprints.length]);

  const filtered = useMemo(() => {
    let list = blueprints;

    if (activeBatch !== 'all') {
      const [start, end] = activeBatch.split('-').map(Number);
      list = list.filter(b => b.id >= start && b.id <= end);
    }

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      list = list.filter(b =>
        b.id.toString() === q ||
        (b.affirmationTitle && b.affirmationTitle.toLowerCase().includes(q)) ||
        (b.affirmationText && b.affirmationText.toLowerCase().includes(q)) ||
        (b.scriptureVerse && b.scriptureVerse.toLowerCase().includes(q)) ||
        (b.scriptureRef && b.scriptureRef.toLowerCase().includes(q)) ||
        (b.characterName && b.characterName.toLowerCase().includes(q)) ||
        (b.character && b.character.toLowerCase().includes(q)) ||
        (b.category && b.category.toLowerCase().includes(q)) ||
        (b.location && b.location.toLowerCase().includes(q))
      );
    }

    return list;
  }, [blueprints, activeBatch, query]);

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const idNum = parseInt(jumpInput.trim());
    if (!isNaN(idNum)) {
      const target = blueprints.find(b => b.id === idNum);
      if (target) {
        onSelectShort(target);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-4xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-800 bg-stone-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
              <Hash className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-100 font-serif">
                Christian Affirmations Shorts Navigator
              </h2>
              <p className="text-xs text-stone-400">
                Instantly jump to any of the {blueprints.length} Christian Affirmations Shorts
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Jump & Search Toolbar */}
        <div className="p-4 bg-stone-950/60 border-b border-stone-800 space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search affirmation, verse (e.g. Psalm 91:4, Phil 4:13), character, #number..."
                className="w-full bg-stone-900 border border-stone-700/80 rounded-lg pl-9 pr-8 py-2 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-200"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Direct Number Jump Form */}
            <form onSubmit={handleJumpSubmit} className="flex items-center gap-1.5 w-full sm:w-auto shrink-0">
              <div className="relative flex-1 sm:w-32">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-mono text-stone-500">#</span>
                <input
                  type="number"
                  min="1"
                  max={blueprints.length}
                  value={jumpInput}
                  onChange={(e) => setJumpInput(e.target.value)}
                  placeholder={`1-${blueprints.length}`}
                  className="w-full bg-stone-900 border border-stone-700/80 rounded-lg pl-6 pr-2 py-2 text-xs sm:text-sm font-mono text-amber-300 placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-all"
                />
              </div>
              <button
                type="submit"
                className="px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs shadow-sm transition-all whitespace-nowrap"
              >
                Go to #
              </button>
            </form>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-stone-900 p-0.5 rounded-lg border border-stone-800 shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md text-xs transition-colors ${viewMode === 'grid' ? 'bg-amber-600/30 text-amber-300 font-bold' : 'text-stone-400 hover:text-stone-200'}`}
                title="Number Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md text-xs transition-colors ${viewMode === 'list' ? 'bg-amber-600/30 text-amber-300 font-bold' : 'text-stone-400 hover:text-stone-200'}`}
                title="Detailed List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Batch Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-mono text-stone-400 mr-1 uppercase">Batch:</span>
            {(['all', '1-10', '11-20', '21-30', '31-40', '41-50'] as BatchTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveBatch(tab)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                  activeBatch === tab
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                {tab === 'all' ? `All (${blueprints.length})` : `#${tab}`}
              </button>
            ))}
            <span className="ml-auto text-xs text-stone-400 font-mono">
              Showing {filtered.length} shorts
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-stone-400 space-y-2">
              <p className="text-sm">No affirmations found matching "{query}".</p>
              <button
                onClick={() => { setQuery(''); setActiveBatch('all'); }}
                className="text-xs text-amber-400 hover:underline"
              >
                Reset search
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* COMPACT NUMBER GRID */
            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
              {filtered.map((b) => {
                const isCurrent = b.id === currentId;
                return (
                  <button
                    key={b.id}
                    onClick={() => {
                      onSelectShort(b);
                      onClose();
                    }}
                    className={`group relative p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
                      isCurrent
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md ring-2 ring-amber-400/50 font-bold scale-105'
                        : 'bg-stone-900/90 border-stone-800 hover:border-amber-500/50 hover:bg-stone-850 text-stone-300 hover:text-white'
                    }`}
                    title={`#${b.id}: ${b.affirmationTitle || b.englishText} (${b.scriptureRef || b.englishRef})`}
                  >
                    <span className="font-mono text-xs sm:text-sm font-bold">
                      #{b.id}
                    </span>
                    <span className="text-[10px] text-stone-400 group-hover:text-amber-300 truncate w-full text-center mt-0.5 font-sans">
                      {(b.affirmationTitle || b.englishText || '').split(' ').slice(0, 2).join(' ')}
                    </span>
                    {isCurrent && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-stone-900" />
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            /* DETAILED LIST VIEW */
            <div className="space-y-2">
              {filtered.map((b) => {
                const isCurrent = b.id === currentId;
                return (
                  <button
                    key={b.id}
                    onClick={() => {
                      onSelectShort(b);
                      onClose();
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 group ${
                      isCurrent
                        ? 'bg-amber-500/15 border-amber-500/50 text-amber-200 ring-1 ring-amber-500/30'
                        : 'bg-stone-900/80 border-stone-800 hover:border-stone-700 hover:bg-stone-850 text-stone-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`px-2 py-1 rounded-lg font-mono text-xs font-bold shrink-0 ${
                        isCurrent ? 'bg-amber-500/30 text-amber-300' : 'bg-stone-800 text-stone-400 group-hover:text-stone-200'
                      }`}>
                        #{b.id}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-100 text-sm font-serif truncate">
                            {b.affirmationTitle || b.englishText}
                          </span>
                          <span className="text-xs text-stone-400 font-serif italic truncate hidden sm:inline">
                            — "{b.scriptureVerse || b.nkjvText}"
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-stone-400 font-mono mt-0.5">
                          <span className="text-amber-400/90">{b.scriptureRef || b.englishRef}</span>
                          <span>•</span>
                          <span className="text-cyan-300">{b.characterName || b.character}</span>
                          <span className="hidden md:inline">• {b.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isCurrent ? (
                        <span className="flex items-center gap-1 text-xs font-semibold text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/30">
                          <Check className="w-3.5 h-3.5" />
                          <span>Current</span>
                        </span>
                      ) : (
                        <ChevronRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-5 py-3 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Currently viewing Short <strong className="text-amber-300 font-mono">#{currentId}</strong></span>
          </div>
          <div className="text-[11px] font-mono text-stone-500">
            Click any short to jump immediately
          </div>
        </div>
      </div>
    </div>
  );
};
