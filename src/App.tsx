import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { BlueprintCard } from './components/BlueprintCard';
import { BatchExportModal } from './components/BatchExportModal';
import { FullDirectoryView } from './components/FullDirectoryView';
import { ChannelProfileModal } from './components/ChannelProfileModal';
import { ShortsNavigatorModal } from './components/ShortsNavigatorModal';
import { INITIAL_BLUEPRINTS, TOTAL_PRAISES_TARGET } from './data/blueprints';
import { ShortsBlueprint, ViewTab } from './types';
import { requestScreenWakeLock } from './utils/wakeLock';
import { 
  Download, 
  ArrowUp, 
  CheckCircle2, 
  Youtube, 
  Clock, 
  Filter, 
  ArrowRight, 
  Layers, 
  ChevronDown, 
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Hash,
  Compass,
  X,
  Eye,
  ListFilter
} from 'lucide-react';

type BatchFilter = 'all' | '1-10' | '11-20' | '21-30' | '31-40' | '41-50';
type StudioViewMode = 'focus' | 'list';

export default function App() {
  const [activeTab, setActiveTab] = useState<ViewTab>('studio');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatch, setSelectedBatch] = useState<BatchFilter>('all');
  const [selectedBlueprint, setSelectedBlueprint] = useState<ShortsBlueprint>(INITIAL_BLUEPRINTS[0]);
  const [studioViewMode, setStudioViewMode] = useState<StudioViewMode>('focus');
  const [batchPage, setBatchPage] = useState<number>(1);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isChannelModalOpen, setIsChannelModalOpen] = useState(false);
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);
  const [jumpInputVal, setJumpInputVal] = useState('');

  // Always on / no screen lock support
  useEffect(() => {
    let sentinel: WakeLockSentinel | null = null;
    requestScreenWakeLock().then(s => {
      sentinel = s;
    });

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        requestScreenWakeLock().then(s => {
          sentinel = s;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (sentinel) {
        sentinel.release().catch(() => {});
      }
    };
  }, []);

  // Filter blueprints based on user search query and batch
  const filteredBlueprints = useMemo(() => {
    let list = INITIAL_BLUEPRINTS;

    // Apply batch filter if not 'all'
    if (selectedBatch !== 'all') {
      const [start, end] = selectedBatch.split('-').map(Number);
      list = list.filter(b => b.id >= start && b.id <= end);
    }

    // Apply search query if present
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
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
  }, [searchQuery, selectedBatch]);

  const PAGE_SIZE = 10;
  const totalBatchPages = Math.max(1, Math.ceil(filteredBlueprints.length / PAGE_SIZE));
  const paginatedBlueprints = useMemo(() => {
    const safePage = Math.min(batchPage, totalBatchPages);
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredBlueprints.slice(start, start + PAGE_SIZE);
  }, [filteredBlueprints, batchPage, totalBatchPages]);

  const handleSelectShort = (blueprint: ShortsBlueprint) => {
    setSelectedBlueprint(blueprint);
    setActiveTab('studio');
    setStudioViewMode('focus');

    // Ensure batch filter includes this item
    if (selectedBatch !== 'all') {
      const id = blueprint.id;
      let targetBatch: BatchFilter = '1-10';
      if (id > 40) targetBatch = '41-50';
      else if (id > 30) targetBatch = '31-40';
      else if (id > 20) targetBatch = '21-30';
      else if (id > 10) targetBatch = '11-20';
      setSelectedBatch(targetBatch);
    }

    // Instant, fluid scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDirectNumberJump = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(jumpInputVal.trim());
    if (!isNaN(num)) {
      const found = INITIAL_BLUEPRINTS.find(b => b.id === num);
      if (found) {
        handleSelectShort(found);
        setJumpInputVal('');
      }
    }
  };

  // Keyboard navigation: Left/Right arrow keys flip shorts, Cmd+K / J opens navigator
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) {
        return;
      }

      if (e.key === 'ArrowLeft') {
        const prev = INITIAL_BLUEPRINTS.find(b => b.id === selectedBlueprint.id - 1);
        if (prev) handleSelectShort(prev);
      } else if (e.key === 'ArrowRight') {
        const next = INITIAL_BLUEPRINTS.find(b => b.id === selectedBlueprint.id + 1);
        if (next) handleSelectShort(next);
      } else if (e.key === 'j' || e.key === 'J' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        setIsNavigatorOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedBlueprint.id]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Primary Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        verifiedCount={INITIAL_BLUEPRINTS.length}
        totalTarget={TOTAL_PRAISES_TARGET}
        selectedId={selectedBlueprint.id}
        onSelectId={(id) => {
          const found = INITIAL_BLUEPRINTS.find(b => b.id === id);
          if (found) handleSelectShort(found);
        }}
        onOpenExport={() => setIsExportModalOpen(true)}
        onOpenChannelProfile={() => setIsChannelModalOpen(true)}
        onOpenNavigator={() => setIsNavigatorOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* TAB 1: STUDIO CARDS (Pure production cards & navigation) */}
        {activeTab === 'studio' && (
          <div className="space-y-6">
            
            {/* Sleek, Non-Overlapping Shorts Navigation Bar */}
            <div className="bg-stone-900/95 border border-stone-800 rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 shadow-lg sticky top-14 z-30 backdrop-blur-md space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                {/* Left: Short Stepper (Prev, Current #, Next) */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      const prev = INITIAL_BLUEPRINTS.find(b => b.id === selectedBlueprint.id - 1);
                      if (prev) handleSelectShort(prev);
                    }}
                    disabled={selectedBlueprint.id <= 1}
                    className={`px-2.5 py-1.5 rounded-lg border text-xs flex items-center gap-1 font-semibold transition-all ${
                      selectedBlueprint.id > 1
                        ? 'bg-stone-950 border-stone-800 text-stone-300 hover:text-amber-400 hover:border-amber-500/40'
                        : 'bg-stone-950/40 border-stone-850 text-stone-600 cursor-not-allowed'
                    }`}
                    title="Previous Short (← Arrow)"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Prev</span>
                  </button>

                  <button
                    onClick={() => setIsNavigatorOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm group"
                    title="Click to browse all shorts (Shortcut: J or Cmd+K)"
                  >
                    <Hash className="w-3.5 h-3.5 text-amber-400" />
                    <span>Short #{selectedBlueprint.id}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-amber-400/70 group-hover:text-amber-300 transition-colors" />
                  </button>

                  <button
                    onClick={() => {
                      const next = INITIAL_BLUEPRINTS.find(b => b.id === selectedBlueprint.id + 1);
                      if (next) handleSelectShort(next);
                    }}
                    disabled={selectedBlueprint.id >= INITIAL_BLUEPRINTS.length}
                    className={`px-2.5 py-1.5 rounded-lg border text-xs flex items-center gap-1 font-semibold transition-all ${
                      selectedBlueprint.id < INITIAL_BLUEPRINTS.length
                        ? 'bg-stone-950 border-stone-800 text-stone-300 hover:text-amber-400 hover:border-amber-500/40'
                        : 'bg-stone-950/40 border-stone-850 text-stone-600 cursor-not-allowed'
                    }`}
                    title="Next Short (→ Arrow)"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Right: Batch Dropdown + Direct # Jump + Browse All */}
                <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                  {/* View Mode Switcher (Single Focus vs Batch List) */}
                  <div className="flex items-center bg-stone-950 p-0.5 rounded-lg border border-stone-800">
                    <button
                      onClick={() => setStudioViewMode('focus')}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        studioViewMode === 'focus' && !searchQuery
                          ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40 font-bold'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                      title="Focused View: Instant 1-Short Production Mode"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Focus</span>
                    </button>
                    <button
                      onClick={() => {
                        setStudioViewMode('list');
                        setBatchPage(1);
                      }}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        studioViewMode === 'list' || searchQuery
                          ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40 font-bold'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                      title="List View: 10 Blueprints per page"
                    >
                      <ListFilter className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">List</span>
                    </button>
                  </div>

                  {/* Batch Selector Dropdown */}
                  <div className="flex items-center gap-1.5 bg-stone-950 px-2 py-1 rounded-lg border border-stone-800">
                    <span className="text-xs text-stone-400 font-mono hidden md:inline">Batch:</span>
                    <select
                      value={selectedBatch}
                      onChange={(e) => {
                        setSelectedBatch(e.target.value as BatchFilter);
                        setBatchPage(1);
                      }}
                      className="bg-transparent text-xs text-stone-200 font-semibold focus:outline-none cursor-pointer pr-1"
                    >
                      <option value="all" className="bg-stone-900 text-stone-100">All 50 Affirmations</option>
                      <option value="1-10" className="bg-stone-900 text-stone-100">#1–10: Protection & Refuge</option>
                      <option value="11-20" className="bg-stone-900 text-stone-100">#11–20: Strength & Courage</option>
                      <option value="21-30" className="bg-stone-900 text-stone-100">#21–30: Peace & Calm</option>
                      <option value="31-40" className="bg-stone-900 text-stone-100">#31–40: Future & Hope</option>
                      <option value="41-50" className="bg-stone-900 text-stone-100">#41–50: Joy & Victory</option>
                    </select>
                  </div>

                  {/* Direct Number Jump Form */}
                  <form onSubmit={handleDirectNumberJump} className="flex items-center gap-1">
                    <div className="relative w-16 sm:w-20">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-mono text-stone-500">#</span>
                      <input
                        type="number"
                        min="1"
                        max={INITIAL_BLUEPRINTS.length}
                        value={jumpInputVal}
                        onChange={(e) => setJumpInputVal(e.target.value)}
                        placeholder="1-50"
                        className="w-full bg-stone-950 border border-stone-800 rounded-lg pl-5 pr-1 py-1 text-xs font-mono text-amber-300 placeholder-stone-600 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs shadow-sm transition-all"
                    >
                      Go
                    </button>
                  </form>

                  {/* Browse Grid Button */}
                  <button
                    onClick={() => setIsNavigatorOpen(true)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-amber-300 border border-stone-700 text-xs font-semibold transition-all shadow-sm"
                    title="Browse all 300 shorts in a grid (Shortcut: J or Cmd+K)"
                  >
                    <Compass className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline">Browse</span>
                  </button>
                </div>
              </div>

              {/* Filter Active Notice (Only shown if filtering) */}
              {(selectedBatch !== 'all' || searchQuery) && (
                <div className="flex items-center justify-between text-xs text-stone-400 pt-1.5 border-t border-stone-800/60">
                  <p className="truncate">
                    Showing <strong className="text-amber-300">{filteredBlueprints.length}</strong> of {INITIAL_BLUEPRINTS.length} blueprints
                    {selectedBatch !== 'all' && <span className="ml-1.5 font-mono text-amber-400">[{selectedBatch}]</span>}
                    {searchQuery && <span className="ml-1.5 text-stone-300">matching "{searchQuery}"</span>}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedBatch('all');
                      setSearchQuery('');
                      setBatchPage(1);
                    }}
                    className="text-amber-400 hover:text-amber-300 underline font-medium text-xs shrink-0 ml-2"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>

            {/* Blueprints Display (Zero-Lag Single Focus or 10-Item Paginated List) */}
            <div className="space-y-6">
              {studioViewMode === 'focus' && !searchQuery ? (
                /* SINGLE FOCUSED SHORT: 0ms LATENCY, 60 FPS, NEVER HANGS */
                <BlueprintCard
                  key={selectedBlueprint.id}
                  blueprint={selectedBlueprint}
                  totalCount={INITIAL_BLUEPRINTS.length}
                  prevId={selectedBlueprint.id > 1 ? selectedBlueprint.id - 1 : null}
                  nextId={selectedBlueprint.id < INITIAL_BLUEPRINTS.length ? selectedBlueprint.id + 1 : null}
                  onNavigatePrev={() => {
                    const prev = INITIAL_BLUEPRINTS.find(b => b.id === selectedBlueprint.id - 1);
                    if (prev) handleSelectShort(prev);
                  }}
                  onNavigateNext={() => {
                    const next = INITIAL_BLUEPRINTS.find(b => b.id === selectedBlueprint.id + 1);
                    if (next) handleSelectShort(next);
                  }}
                  onOpenNavigator={() => setIsNavigatorOpen(true)}
                />
              ) : (
                /* PAGINATED LIST VIEW: RENDERS MAX 10 CARDS */
                <>
                  <div className="space-y-6">
                    {paginatedBlueprints.map((blueprint) => (
                      <BlueprintCard
                        key={blueprint.id}
                        blueprint={blueprint}
                        totalCount={INITIAL_BLUEPRINTS.length}
                        prevId={blueprint.id > 1 ? blueprint.id - 1 : null}
                        nextId={blueprint.id < INITIAL_BLUEPRINTS.length ? blueprint.id + 1 : null}
                        onNavigatePrev={() => {
                          const prev = INITIAL_BLUEPRINTS.find(b => b.id === blueprint.id - 1);
                          if (prev) handleSelectShort(prev);
                        }}
                        onNavigateNext={() => {
                          const next = INITIAL_BLUEPRINTS.find(b => b.id === blueprint.id + 1);
                          if (next) handleSelectShort(next);
                        }}
                        onOpenNavigator={() => setIsNavigatorOpen(true)}
                      />
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalBatchPages > 1 && (
                    <div className="flex items-center justify-between p-3 bg-stone-900 border border-stone-800 rounded-xl">
                      <button
                        onClick={() => {
                          setBatchPage(p => Math.max(1, p - 1));
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={batchPage <= 1}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                          batchPage > 1
                            ? 'bg-stone-800 hover:bg-stone-700 text-stone-200'
                            : 'text-stone-600 cursor-not-allowed opacity-50'
                        }`}
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span>Previous 10</span>
                      </button>

                      <span className="text-xs font-mono text-amber-300">
                        Page {batchPage} of {totalBatchPages} ({filteredBlueprints.length} total)
                      </span>

                      <button
                        onClick={() => {
                          setBatchPage(p => Math.min(totalBatchPages, p + 1));
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={batchPage >= totalBatchPages}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                          batchPage < totalBatchPages
                            ? 'bg-stone-800 hover:bg-stone-700 text-stone-200'
                            : 'text-stone-600 cursor-not-allowed opacity-50'
                        }`}
                      >
                        <span>Next 10</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </>
              )}

              {filteredBlueprints.length === 0 && (
                <div className="text-center py-16 bg-stone-900/50 rounded-2xl border border-stone-800 space-y-3">
                  <p className="text-stone-400 text-sm">
                    No verified blueprints found matching the current criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedBatch('all');
                      setSearchQuery('');
                      setBatchPage(1);
                    }}
                    className="px-4 py-1.5 rounded-lg bg-amber-600 text-stone-950 font-bold text-xs"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: ALL 1000 PRAISES MASTER DIRECTORY */}
        {activeTab === 'directory' && (
          <FullDirectoryView
            verifiedBlueprints={INITIAL_BLUEPRINTS}
            onSelectBlueprint={handleSelectShort}
          />
        )}

      </main>

      {/* Floating Bottom Quick Navigation Dock (Always Accessible on Desktop & Mobile) */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 sm:gap-2 bg-stone-900/95 backdrop-blur-md border border-stone-700/80 p-1.5 rounded-2xl shadow-2xl">
        <button
          onClick={() => {
            const prev = INITIAL_BLUEPRINTS.find(b => b.id === selectedBlueprint.id - 1);
            if (prev) handleSelectShort(prev);
          }}
          disabled={selectedBlueprint.id <= 1}
          className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
            selectedBlueprint.id > 1 
              ? 'bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-amber-300 shadow-sm' 
              : 'text-stone-600 cursor-not-allowed opacity-50'
          }`}
          title={selectedBlueprint.id > 1 ? `Previous Short (#${selectedBlueprint.id - 1})` : 'First Short'}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        <button
          onClick={() => setIsNavigatorOpen(true)}
          className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm hover:scale-105"
          title="Open Shorts Navigator"
        >
          <Hash className="w-3.5 h-3.5 text-amber-400" />
          <span>#{selectedBlueprint.id}</span>
          <span className="text-[10px] text-amber-400/80 font-sans font-normal uppercase hidden md:inline ml-1">Browse</span>
        </button>

        <button
          onClick={() => {
            const next = INITIAL_BLUEPRINTS.find(b => b.id === selectedBlueprint.id + 1);
            if (next) handleSelectShort(next);
          }}
          disabled={selectedBlueprint.id >= INITIAL_BLUEPRINTS.length}
          className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
            selectedBlueprint.id < INITIAL_BLUEPRINTS.length 
              ? 'bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-amber-300 shadow-sm' 
              : 'text-stone-600 cursor-not-allowed opacity-50'
          }`}
          title={selectedBlueprint.id < INITIAL_BLUEPRINTS.length ? `Next Short (#${selectedBlueprint.id + 1})` : 'Last Short'}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-stone-700 mx-0.5" />

        <button
          onClick={scrollToTop}
          className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-stone-900 bg-stone-950 py-6 text-center text-xs text-stone-500 pb-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="flex items-center gap-1.5">
            <span className="text-amber-400 font-serif font-bold">Christian Affirmations Shorts</span>
            <span>(@ChristianAffirmationsShorts)</span>
          </p>
          <p className="text-stone-500 font-mono">
            50 Bible-Based Hope Affirmations • Animated Characters • Video Gen Chooses Voice Profile • Kids to Elderly
          </p>
        </div>
      </footer>

      {/* Shorts Quick Navigator Modal */}
      <ShortsNavigatorModal
        isOpen={isNavigatorOpen}
        onClose={() => setIsNavigatorOpen(false)}
        blueprints={INITIAL_BLUEPRINTS}
        currentId={selectedBlueprint.id}
        onSelectShort={handleSelectShort}
      />

      {/* Batch Export Modal */}
      <BatchExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        blueprints={INITIAL_BLUEPRINTS}
      />

      {/* Official Channel Profile & Kit Modal */}
      <ChannelProfileModal
        isOpen={isChannelModalOpen}
        onClose={() => setIsChannelModalOpen(false)}
      />

    </div>
  );
}
