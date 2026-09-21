import React, { useState, useEffect } from 'react';
import { Search, Layers, Download, BookOpen, Youtube, Maximize, Minimize } from 'lucide-react';
import { ViewTab } from '../types';
import { toggleFullScreen } from '../utils/wakeLock';

interface HeaderProps {
  activeTab: ViewTab;
  onTabChange: (tab: ViewTab) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  verifiedCount: number;
  totalTarget: number;
  selectedId: number;
  onSelectId: (id: number) => void;
  onOpenExport: () => void;
  onOpenChannelProfile: () => void;
  onOpenNavigator?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  verifiedCount,
  onOpenExport,
  onOpenChannelProfile,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);
  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100 px-3 sm:px-6 h-14 flex items-center transition-all">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left: Brand & Primary View Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button 
            onClick={onOpenChannelProfile}
            className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-200 flex items-center justify-center text-stone-950 font-bold shadow hover:scale-105 transition-transform shrink-0"
            title="Christian Affirmations Channel Bio"
          >
            <span className="font-serif font-black text-xs">✨</span>
          </button>
          
          <span className="text-xs sm:text-sm font-bold text-amber-300 font-serif leading-tight">
            Christian Affirmations Studio
          </span>

          {/* Primary View Switcher */}
          <nav className="flex items-center bg-stone-950/80 p-0.5 rounded-lg border border-stone-800 text-xs ml-1 sm:ml-2">
            <button
              onClick={() => onTabChange('studio')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-semibold transition-all ${
                activeTab === 'studio'
                  ? 'bg-amber-600 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Studio Character & Prompt View"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Studio (50 Shorts)</span>
            </button>
            <button
              onClick={() => onTabChange('directory')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-semibold transition-all ${
                activeTab === 'directory'
                  ? 'bg-amber-600 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="All 50 Affirmations Directory"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>All 50 Affirmations</span>
            </button>
          </nav>
        </div>

        {/* Right: Search + Channel Profile + Batch Export */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-1 max-w-xs sm:max-w-md justify-end">
          
          {/* Quick Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search title, verse, or #..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-stone-950/80 border border-stone-700/80 rounded-lg pl-8 pr-6 py-1 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-200"
              >
                ✕
              </button>
            )}
          </div>

          {/* Channel Modal Trigger */}
          <button
            onClick={onOpenChannelProfile}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 text-xs font-semibold transition-all shrink-0"
            title="Channel Welcome Bio & Schedule"
          >
            <Youtube className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden md:inline">Channel</span>
          </button>

          {/* Fullscreen & Always On Trigger */}
          <button
            onClick={toggleFullScreen}
            className="flex items-center gap-1 p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 text-xs transition-all shrink-0"
            title={isFullscreen ? 'Exit Full Screen' : 'Enter Full Screen & Always-On'}
          >
            {isFullscreen ? (
              <Minimize className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Maximize className="w-3.5 h-3.5 text-stone-300" />
            )}
          </button>

          {/* Batch Export Trigger */}
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs shadow-sm transition-all shrink-0"
            title={`Batch Export all ${verifiedCount} blueprints`}
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>

      </div>
    </header>
  );
};
