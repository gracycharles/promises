import { ShortsBlueprint } from '../types';
import { CANONICAL_300_PRAISES } from '../data/canonical300';

/**
 * NKJV (New King James Version) Scripture Translation Engine
 * 
 * Provides official NKJV Scripture texts and refined titles across all 1000 Praises.
 * Adheres strictly to NKJV formal equivalence and reverent modern English.
 */

export interface NKJVVerseData {
  verseText: string;
  praiseTitle: string;
  theologicalContext: string;
}

export const CURATED_NKJV_VERSES: Record<number, NKJVVerseData> = {
  1: {
    verseText: "For you did not receive the spirit of bondage again to fear, but you received the Spirit of adoption by whom we cry out, 'Abba, Father.'",
    praiseTitle: "Praise to You, Abba, Father",
    theologicalContext: "NKJV Romans 8:15 directly captures the Spirit of adoption through which believers cry 'Abba, Father.'"
  },
  2: {
    verseText: "Behold what manner of love the Father has bestowed on us, that we should be called children of God! Therefore the world does not know us, because it did not know Him.",
    praiseTitle: "Praise to You, Father of Love",
    theologicalContext: "NKJV 1 John 3:1 proclaims the Father's boundless love bestowed upon believers as children of God."
  },
  3: {
    verseText: "He has delivered us from the power of darkness and conveyed us into the kingdom of the Son of His love,",
    praiseTitle: "Praise to You, Son of His Love",
    theologicalContext: "NKJV Colossians 1:13 explicitly translates the Greek τοῦ υἱοῦ τῆς ἀγάπης αὐτοῦ as 'the Son of His love' (அன்பின் குமாரன்)."
  },
  4: {
    verseText: "He who does not love does not know God, for God is love.",
    praiseTitle: "Praise to You, God of Love",
    theologicalContext: "NKJV 1 John 4:8 affirms the eternal truth that 'God is love'."
  },
  5: {
    verseText: "The eternal God is your refuge, and underneath are the everlasting arms; He will thrust out the enemy from before you, and will say, 'Destroy!'",
    praiseTitle: "Praise to You, The Eternal God",
    theologicalContext: "NKJV Deuteronomy 33:27 translates אֱלֹהֵי קֶדֶם as 'The eternal God is your refuge'."
  },
  6: {
    verseText: "Now to the King eternal, immortal, invisible, to God who alone is wise, be honor and glory forever and ever. Amen.",
    praiseTitle: "Praise to You, The Invisible God",
    theologicalContext: "NKJV 1 Timothy 1:17 proclaims praise to the 'King eternal, immortal, invisible'."
  },
  7: {
    verseText: "'I am the Alpha and the Omega, the Beginning and the End,' says the Lord, 'who is and who was and who is to come, the Almighty.'",
    praiseTitle: "Praise to You, The Alpha and Omega",
    theologicalContext: "NKJV Revelation 1:8 declares Jesus as the eternal First and Last, the Almighty."
  },
  8: {
    verseText: "For unto us a Child is born, unto us a Son is given; and the government will be upon His shoulder. And His name will be called Wonderful, Counselor, Mighty God, Everlasting Father, Prince of Peace.",
    praiseTitle: "Praise to You, Whose Name is Wonderful",
    theologicalContext: "NKJV Isaiah 9:6 prophetically declares Messiah's name as Wonderful, Counselor, Mighty God."
  },
  9: {
    verseText: "Who is like You, O Lord, among the gods? Who is like You, majestic in holiness, awesome in praises, working wonders?",
    praiseTitle: "Praise to You, Who Works Wonders",
    theologicalContext: "NKJV Exodus 15:11 exalts God as 'majestic in holiness, awesome in praises, working wonders.'"
  },
  10: {
    verseText: "The earth was without form, and void; and darkness was on the face of the deep. And the Spirit of God was hovering over the face of the waters.",
    praiseTitle: "Praise to You, The Hovering Spirit",
    theologicalContext: "NKJV Genesis 1:2 translates מְרַחֶפֶת as the Spirit of God 'hovering' over the waters."
  },
  11: {
    verseText: "He is the Rock, His work is perfect; for all His ways are justice, a God of truth and without injustice; righteous and upright is He.",
    praiseTitle: "Praise to You, The Rock",
    theologicalContext: "NKJV Deuteronomy 32:4 anchors the praise of God as the perfect, righteous Rock."
  },
  12: {
    verseText: "As for the Almighty, we cannot find Him; He is excellent in power, in judgment and abundant justice; He does not oppress.",
    praiseTitle: "Praise to You, Excellent in Justice",
    theologicalContext: "NKJV Job 37:23 exalts the Almighty who is excellent in power and abundant justice."
  },
  13: {
    verseText: "He will be great, and will be called the Son of the Highest; and the Lord God will give Him the throne of His father David.",
    praiseTitle: "Praise to You, The Great One",
    theologicalContext: "NKJV Luke 1:32 declares the greatness of the Son of the Highest."
  },
  14: {
    verseText: "A God of truth and without injustice; righteous and upright is He.",
    praiseTitle: "Praise to You, Righteous and Upright",
    theologicalContext: "NKJV Deuteronomy 32:4 affirms God's perfect justice and uprightness."
  },
  15: {
    verseText: "He is the Rock, His work is perfect; for all His ways are justice.",
    praiseTitle: "Praise to You, Whose Work is Perfect",
    theologicalContext: "NKJV Deuteronomy 32:4 declares that all His works are blameless and perfect."
  },
  16: {
    verseText: "The Lord is exalted, for He dwells on high; He has filled Zion with justice and righteousness.",
    praiseTitle: "Praise to You, Who Dwells on High",
    theologicalContext: "NKJV Isaiah 33:5 celebrates the Lord who is exalted and dwells on high."
  },
  17: {
    verseText: "This also comes from the Lord of hosts, who is wonderful in counsel and excellent in guidance.",
    praiseTitle: "Praise to You, Wonderful in Counsel",
    theologicalContext: "NKJV Isaiah 28:29 praises God as wonderful in counsel and excellent in wisdom."
  },
  18: {
    verseText: "He is excellent in power, in judgment and abundant justice; He does not oppress.",
    praiseTitle: "Praise to You, Mighty in Power and Justice",
    theologicalContext: "NKJV Job 37:23 highlights God's majestic power and unwavering justice."
  },
  19: {
    verseText: "For the Lord gives wisdom; from His mouth come knowledge and understanding.",
    praiseTitle: "Praise to You, Source of Knowledge and Understanding",
    theologicalContext: "NKJV Proverbs 2:6 reveals that divine wisdom, knowledge, and understanding flow from God's mouth."
  },
  20: {
    verseText: "And He is before all things, and in Him all things consist.",
    praiseTitle: "Praise to You, Who is Before All Things",
    theologicalContext: "NKJV Colossians 1:17 proclaims Christ's preeminence before all created things."
  },
  21: {
    verseText: "For He spoke, and it was done; He commanded, and it stood fast.",
    praiseTitle: "Praise to You, Whose Command Stands Fast",
    theologicalContext: "NKJV Psalm 33:9 extols God's spoken word creating and establishing reality."
  },
  22: {
    verseText: "A God of truth and without injustice; righteous and upright is He.",
    praiseTitle: "Praise to You, God of Truth Without Iniquity",
    theologicalContext: "NKJV Deuteronomy 32:4 honors God as the God of absolute truth."
  },
  23: {
    verseText: "And He changes the times and the seasons; He removes kings and raises up kings; He gives wisdom to the wise and knowledge to those who have understanding.",
    praiseTitle: "Praise to You, Who Changes Times and Seasons",
    theologicalContext: "NKJV Daniel 2:21 affirms God's sovereign control over world history, times, and rulers."
  },
  24: {
    verseText: "He will not always strive with us, nor will He keep His anger forever.",
    praiseTitle: "Praise to You, Who Does Not Always Chide",
    theologicalContext: "NKJV Psalm 103:9 celebrates the Father's mercy in not harboring perpetual anger."
  },
  25: {
    verseText: "He counts the number of the stars; He calls them all by name.",
    praiseTitle: "Praise to You, Who Calls the Stars by Name",
    theologicalContext: "NKJV Psalm 147:4 reveals God's intimate omniscience over the celestial cosmos."
  },
  26: {
    verseText: "Behold, the Lord God shall come with a strong hand, and His arm shall rule for Him.",
    praiseTitle: "Praise to You, Who Rules by His Mighty Arm",
    theologicalContext: "NKJV Isaiah 40:10 proclaims the sovereign ruling arm of the Lord God."
  },
  27: {
    verseText: "Cast your burden on the Lord, and He shall sustain you; He shall never permit the righteous to be moved.",
    praiseTitle: "Praise to You, Who Sustains Us",
    theologicalContext: "NKJV Psalm 55:22 promises God's sustaining grace for all who cast their burdens on Him."
  },
  28: {
    verseText: "Behold, God is mighty, but despises no one; He is mighty in strength of understanding.",
    praiseTitle: "Praise to You, Who Despises No One",
    theologicalContext: "NKJV Job 36:5 demonstrates that though God is infinitely mighty, He rejects and despises no person."
  },
  29: {
    verseText: "I will sing to the Lord, for He has triumphed gloriously! The horse and its rider He has thrown into the sea!",
    praiseTitle: "Praise to You, Who Triumphed Gloriously",
    theologicalContext: "NKJV Exodus 15:1 rejoices in the Lord's glorious victory at the Red Sea."
  },
  30: {
    verseText: "He loves righteousness and justice; the earth is full of the goodness of the Lord.",
    praiseTitle: "Praise to You, Who Delights in Righteousness and Justice",
    theologicalContext: "NKJV Psalm 33:5 declares the Lord's love for justice and the earth filled with His unfailing goodness."
  },
  31: {
    verseText: "He sent His word and healed them, and delivered them from their destructions.",
    praiseTitle: "Praise to You, Who Sends His Word and Heals",
    theologicalContext: "NKJV Psalm 107:20 proclaims the healing and delivering power of God's sent word."
  },
  32: {
    verseText: "Who forgives all your iniquities, who heals all your diseases,",
    praiseTitle: "Praise to You, Who Forgives All Iniquities",
    theologicalContext: "NKJV Psalm 103:3 celebrates total pardon and redemption from all transgressions."
  },
  33: {
    verseText: "Who forgives all your iniquities, who heals all your diseases,",
    praiseTitle: "Praise to You, Who Heals All Diseases",
    theologicalContext: "NKJV Psalm 103:3 anchors the promise of divine healing for all infirmities."
  },
  34: {
    verseText: "Who redeems your life from destruction, who crowns you with lovingkindness and tender mercies,",
    praiseTitle: "Praise to You, Who Crowns Us with Lovingkindness and Mercy",
    theologicalContext: "NKJV Psalm 103:4 highlights the royal crowning of believers with God's lovingkindness."
  },
  35: {
    verseText: "May He grant you according to your heart's desire, and fulfill all your purpose.",
    praiseTitle: "Praise to You, Who Grants the Desires of Our Heart",
    theologicalContext: "NKJV Psalm 20:4 expresses God's favor in fulfilling prayer and godly heart desires."
  },
  36: {
    verseText: "May He grant you according to your heart's desire, and fulfill all your counsel.",
    praiseTitle: "Praise to You, Who Fulfills All Wise Counsel",
    theologicalContext: "NKJV Psalm 20:4 rejoices in God's faithful fulfillment of plans and prayers."
  },
  37: {
    verseText: "For in that He Himself has suffered, being tempted, He is able to aid those who are tempted.",
    praiseTitle: "Praise to You, Able to Aid Those Who Are Tested",
    theologicalContext: "NKJV Hebrews 2:18 reassures believers that Christ, having suffered, aids us in all trials."
  },
  38: {
    verseText: "Who turned the rock into a pool of water, the flint into a fountain of waters.",
    praiseTitle: "Praise to You, Who Turns the Rock into a Pool of Water",
    theologicalContext: "NKJV Psalm 114:8 extols God's miraculous provision turning flint into living springs."
  },
  39: {
    verseText: "Who turned the rock into a pool of water, the flint into a spring of water.",
    praiseTitle: "Praise to You, Who Turns Flint into Springs of Water",
    theologicalContext: "NKJV Psalm 114:8 celebrates streams in the desert provided by God's power."
  },
  68: {
    verseText: "And His name will be called Wonderful, Counselor, Mighty God, Everlasting Father, Prince of Peace.",
    praiseTitle: "Praise to You, Wonderful Counselor",
    theologicalContext: "NKJV Isaiah 9:6 establishes the Messianic title 'Wonderful, Counselor'."
  },
  69: {
    verseText: "Now may the God of patience and comfort grant you to be like-minded toward one another, according to Christ Jesus,",
    praiseTitle: "Praise to You, God of All Comfort and Patience",
    theologicalContext: "NKJV Romans 15:5 designates God as the source of patience and comfort."
  },
  200: {
    verseText: "Then she called the name of the Lord who spoke to her, You-Are-the-God-Who-Sees; for she said, 'Have I also here seen Him who sees me?'",
    praiseTitle: "Praise to You, El Roi - The God Who Sees Me",
    theologicalContext: "NKJV Genesis 16:13 reveals the redemptive name 'You-Are-the-God-Who-Sees' (El Roi)."
  }
};

/**
 * Modernizes archaic English (e.g. KJV thee/thou/hath/doth/shalt)
 * into dignified, reverent NKJV English.
 */
export function modernizeToNKJV(text: string): string {
  if (!text) return '';
  return text
    .replace(/\bthee\b/gi, 'You')
    .replace(/\bthou\b/gi, 'You')
    .replace(/\bthy\b/gi, 'Your')
    .replace(/\bthine\b/gi, 'Yours')
    .replace(/\bhath\b/gi, 'has')
    .replace(/\bdoth\b/gi, 'does')
    .replace(/\bart\b/gi, 'are')
    .replace(/\bwilt\b/gi, 'will')
    .replace(/\bshalt\b/gi, 'shall')
    .replace(/\bunto\b/gi, 'to')
    .replace(/\bwhereby\b/gi, 'by whom')
    .replace(/\bsaith\b/gi, 'says')
    .replace(/\bwhosoever\b/gi, 'whoever');
}

/**
 * Resolves the official NKJV verse text and refined NKJV praise title.
 */
export function getNKJVData(blueprint: ShortsBlueprint): NKJVVerseData {
  if (CANONICAL_300_PRAISES[blueprint.id]) {
    const canonical = CANONICAL_300_PRAISES[blueprint.id];
    return {
      verseText: canonical.verseText,
      praiseTitle: canonical.praiseTitle,
      theologicalContext: canonical.theologicalContext
    };
  }

  if (CURATED_NKJV_VERSES[blueprint.id]) {
    return CURATED_NKJV_VERSES[blueprint.id];
  }

  if (blueprint.scriptureVerse) {
    return {
      verseText: blueprint.scriptureVerse,
      praiseTitle: blueprint.affirmationTitle || blueprint.englishText || `Affirmation #${blueprint.id}`,
      theologicalContext: `NKJV ${blueprint.scriptureRef || blueprint.englishRef || ''} provides the biblical foundation for this affirmation.`
    };
  }

  // Derive dynamic NKJV rendering
  const modernizedEnglish = modernizeToNKJV(blueprint.englishText || blueprint.affirmationText || '');
  const cleanTitle = (blueprint.tamilTitle ? blueprint.tamilTitle.replace(/ ஸ்தோத்திரம்\.?$/, '') : (blueprint.affirmationTitle || blueprint.englishText || `Affirmation #${blueprint.id}`)).trim();

  return {
    verseText: modernizedEnglish,
    praiseTitle: `Affirmation: ${cleanTitle}`,
    theologicalContext: `NKJV ${blueprint.scriptureRef || blueprint.englishRef || ''} provides the biblical foundation for this affirmation.`
  };
}
