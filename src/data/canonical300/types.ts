export interface CanonicalPraiseItem {
  id: number;
  tamilText: string;
  tamilRef: string;
  englishRef: string;
  /**
   * The strict biblical English translation of ONLY what is written in the Tamil praise text.
   * Matches NKJV vocabulary and biblical word order.
   * e.g., for #149 "உமது கிருபை பெரியது ஸ்தோத்திரம்.":
   * praiseTitle: "Praise to You, Great is Your Mercy"
   */
  praiseTitle: string;
  /**
   * Full canonical NKJV Scripture verse for that reference (for the Scripture Reference / Verification box)
   * e.g., for #149 (Psalm 86:13):
   * verseText: "For great is Your mercy toward me, and You have delivered my soul from the depths of Sheol."
   */
  verseText: string;
  /**
   * Theological & linguistic confirmation verifying word match against scripture
   */
  theologicalContext: string;
}
