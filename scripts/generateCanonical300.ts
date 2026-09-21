import * as fs from 'fs';
import * as path from 'path';

export interface CanonicalEntry {
  id: number;
  tamilText: string;
  tamilRef: string;
  englishRef: string;
  praiseTitle: string; // The strict biblical translation of the Tamil praise (e.g. "Praise to You, Great is Your Mercy")
  verseText: string;   // The full canonical scripture verse (NKJV)
  theologicalContext: string;
}

// We will define all 300 entries with high biblical fidelity
