import React, { useState } from 'react';
import { X, Copy, Check, Youtube, Sparkles, Clock, BookOpen, Heart, Radio, Smile, Volume2, Video } from 'lucide-react';

interface ChannelProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CHANNEL_NAME = "Christian Affirmations Shorts";
export const YOUTUBE_HANDLE = "@ChristianAffirmationsShorts";
export const HOST_NAME = "Joyful & Creative Friends";

export const OFFICIAL_CHANNEL_ABOUT = `Welcome to Christian Affirmations Shorts (@ChristianAffirmationsShorts)!

🌟 Our Mission:
Delivering short, effective, joyful, and Bible-based Christian affirmations that bring unstoppable hope, peace, and smiles to anyone watching—from children to elderly grandparents!

✨ What Makes Our Shorts Special:
• Innovative & Comical Characters: 3D Pixar-style animated friends, comic-strip heroes, cheerful talking animals, and whimsical personalities that make eternal Bible truths heartwarming, memorable, and fun.
• Purely Bible-Based & Hope-Filled: Every affirmation is anchored directly in verified Holy Scripture (NKJV canonical verses).
• Character-Matched Narration: Video generation engine autonomously chooses the voice profile (Male, Female, or Child) tailored to each character with full AI tool freedom.
• Universal Uplift: Wholesome, clean family content designed to conquer fear, bring laughter, and build bold faith in under 60 seconds!

📖 “For I know the thoughts that I think toward you, says the Lord, thoughts of peace and not of evil, to give you a future and a hope.” — Jeremiah 29:11

Subscribe and fill your daily feed with hope, laughter, and God's living promises! 🙏✨`;

export const CORE_DEVOTIONAL_TAGS = [
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
  "Tamil Praise"
];

export const CORE_HASHTAG_SUITE = [
  "#India",
  "#MorningDevotion",
  "#ChristianDevotion",
  "#Praise",
  "#Praises",
  "#TamilChristian",
  "#1000Praises",
  "#Shorts"
];

export const CHANNEL_TAGS = [
  ...CORE_DEVOTIONAL_TAGS,
  "Christian Affirmations",
  "Bible Verse Shorts",
  "Daily Christian Affirmations",
  "Positive Bible Verses",
  "Christian Shorts for Kids",
  "Christian Shorts for Elderly",
  "Hope in Christ",
  "3D Christian Animation",
  "Funny Christian Cartoon",
  "Faith Over Fear",
  "Peace in Jesus",
  "Joy Of The Lord",
  "Character Voiceover",
  "Bible Affirmations for Sleep",
  "Jeremiah 29 11",
  "Philippians 4 13",
  "Psalm 91",
  "Isaiah 40 31"
];

export const YOUTUBE_BANNER_PROMPT = `A joyful, ultra-wide 16:9 YouTube banner featuring a whimsical cast of 3D animated friendly characters—a cheerful little bumblebee with tiny aviator goggles, an enthusiastic golden puppy wearing a red superhero cape, a wise smiling owl with oversized spectacles, and a laughing otter holding a glowing heart—standing joyfully on a sunlit hillside overlooking a bright golden sunrise and radiant rainbow sky. Clean, high quality, vibrant 3D Pixar animation style, family friendly, highly detailed, no text. --ar 16:9 --v 6.0`;

export const ChannelProfileModal: React.FC<ChannelProfileModalProps> = ({ isOpen, onClose }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyText = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div 
        className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-stone-950 px-6 py-4 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 flex items-center justify-center text-stone-950 font-bold shadow-lg shadow-amber-950/40">
              <Youtube className="w-5 h-5 text-stone-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-stone-100 font-serif">
                  {CHANNEL_NAME}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 font-mono text-[11px] font-semibold">
                  {YOUTUBE_HANDLE}
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Official YouTube Channel Identity & Production Kit
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-stone-300 text-xs sm:text-sm">
          
          {/* Channel Hero Card */}
          <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950/40 border border-amber-500/20 rounded-xl p-5 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 font-semibold">
                  YouTube Shorts Identity
                </span>
                <h4 className="text-xl font-serif font-bold text-amber-200 mt-0.5">
                  Christian Affirmations Shorts
                </h4>
                <p className="text-xs text-stone-400 font-mono mt-0.5">
                  Handle: <strong className="text-stone-200">{YOUTUBE_HANDLE}</strong> • Target: <strong className="text-amber-300">Kids to Elderly</strong>
                </p>
              </div>

              <div className="flex flex-col sm:items-end gap-1.5">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>50 Shorts Production Kit</span>
                </div>
                <span className="text-[11px] text-stone-400 flex items-center gap-1">
                  <Volume2 className="w-3 h-3 text-cyan-400" />
                  <span>Video Gen Chooses Voice Profile</span>
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="flex items-start gap-2 bg-stone-950/60 p-2.5 rounded-lg border border-stone-800/60">
                <BookOpen className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-200">Bible-Based Hope</div>
                  <div className="text-[11px] text-stone-400">Grounded in Holy Scripture (NKJV)</div>
                </div>
              </div>
              <div className="flex items-start gap-2 bg-stone-950/60 p-2.5 rounded-lg border border-stone-800/60">
                <Smile className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-200">Innovative & Comical</div>
                  <div className="text-[11px] text-stone-400">Animated cartoon, comic & 3D heroes</div>
                </div>
              </div>
              <div className="flex items-start gap-2 bg-stone-950/60 p-2.5 rounded-lg border border-stone-800/60">
                <Radio className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-200">All Audiences</div>
                  <div className="text-[11px] text-stone-400">Heartwarming for toddlers to grandparents</div>
                </div>
              </div>
            </div>
          </div>

          {/* About Section for YouTube Studio */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Channel About & Bio (For YouTube Studio)
              </span>
              <button
                onClick={() => copyText(OFFICIAL_CHANNEL_ABOUT, 'about')}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors"
              >
                {copiedSection === 'about' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Full Bio</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 font-mono text-xs text-stone-300 whitespace-pre-line leading-relaxed selection:bg-amber-500/20">
              {OFFICIAL_CHANNEL_ABOUT}
            </div>
          </div>

          {/* Core Devotional Tags Suite */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Core Devotional Tags (India, Daily Devotion & Praises)
              </span>
              <button
                onClick={() => copyText(CORE_DEVOTIONAL_TAGS.join(', '), 'core-tags')}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-colors"
              >
                {copiedSection === 'core-tags' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied Core Tags!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Core Tags (CSV)</span>
                  </>
                )}
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 bg-stone-950 p-3 rounded-xl border border-stone-800">
              {CORE_DEVOTIONAL_TAGS.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-md bg-amber-950/60 border border-amber-500/30 text-amber-200 font-mono text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Official Hashtag Suite */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Official YouTube Shorts Hashtag Suite
              </span>
              <button
                onClick={() => copyText(CORE_HASHTAG_SUITE.join(', '), 'hashtags')}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 text-xs font-semibold transition-colors"
              >
                {copiedSection === 'hashtags' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied Hashtags!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Hashtags (CSV)</span>
                  </>
                )}
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 bg-stone-950 p-3 rounded-xl border border-stone-800">
              {CORE_HASHTAG_SUITE.map((ht) => (
                <span key={ht} className="px-2.5 py-1 rounded-md bg-purple-900/40 border border-purple-500/30 text-purple-200 font-mono text-xs">
                  {ht}
                </span>
              ))}
            </div>
          </div>

          {/* Recommended Channel Tags */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Full Channel Keywords & Tags (Master List)
              </span>
              <button
                onClick={() => copyText(CHANNEL_TAGS.join(', '), 'tags')}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors"
              >
                {copiedSection === 'tags' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied All Tags!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy All Tags</span>
                  </>
                )}
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 bg-stone-950 p-3 rounded-xl border border-stone-800 max-h-40 overflow-y-auto">
              {CHANNEL_TAGS.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-stone-300 font-mono text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Channel Banner AI Generation Prompt */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Midjourney / Kling Prompt for Channel Banner (16:9)
              </span>
              <button
                onClick={() => copyText(YOUTUBE_BANNER_PROMPT, 'banner')}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors"
              >
                {copiedSection === 'banner' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied Banner Prompt!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Prompt</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-stone-950 border border-stone-800 rounded-xl p-3 font-mono text-xs text-stone-300 leading-relaxed">
              {YOUTUBE_BANNER_PROMPT}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-stone-950 px-6 py-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-1.5 text-amber-400">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>“I am wonderfully made and filled with divine courage!” — Short #1</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
