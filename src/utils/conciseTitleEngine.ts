import { ShortsBlueprint, PraiseItem } from '../types';
import { ALL_PRAISES } from '../data/tamildata';

/**
 * Concise English Title Engine
 * 
 * Generates concise, punchy, meaningful English praise titles starting with:
 * "Praise to You, [Concise Title]"
 * 
 * Examples:
 * - "Praise to You, Abba, Father"
 * - "Praise to You, The Invisible God"
 * - "Praise to You, Defender of the Oppressed"
 * - "Praise to You, Who Heals by His Word"
 */

// Curated concise titles for Blueprints 1 to 300
export const CONCISE_TITLES_300: Record<number, string> = {
  1: "Abba, Father",
  2: "Father of Love",
  3: "Son of His Love",
  4: "God of Love",
  5: "The Eternal God",
  6: "The Invisible God",
  7: "The Alpha and Omega",
  8: "Whose Name is Wonderful",
  9: "Who Works Wonders",
  10: "The Hovering Spirit",
  11: "The Rock",
  12: "Excellent in Justice",
  13: "The Great God",
  14: "Righteous and Upright",
  15: "Whose Work is Perfect",
  16: "Who Dwells on High",
  17: "Wonderful in Counsel",
  18: "Mighty in Power and Justice",
  19: "Source of Knowledge and Wisdom",
  20: "Who is Before All Things",
  21: "Whose Word Creates All",
  22: "God of Truth",
  23: "Ruler of Times and Seasons",
  24: "Full of Mercy",
  25: "Who Names the Stars",
  26: "Who Rules by His Mighty Arm",
  27: "Our Sustainer",
  28: "Who Despises No One",
  29: "Glorious in Triumph",
  30: "Lover of Righteousness",
  31: "Who Heals by His Word",
  32: "Who Forgives All Iniquities",
  33: "Who Heals All Diseases",
  34: "Who Crowns with Lovingkindness",
  35: "Who Grants Heart Desires",
  36: "Who Fulfills Wise Counsel",
  37: "Helper in Temptation",
  38: "Water from the Rock",
  39: "Springs in the Desert",
  40: "The Almighty Sovereign",
  41: "Who Dwells in Unapproachable Light",
  42: "The Only Potentate",
  43: "Our Refuge and Strength",
  44: "Everlasting Light",
  45: "Who Crowns the Year with Goodness",
  46: "Our Dwelling Place",
  47: "Our Hiding Place",
  48: "Our Deliverer",
  49: "Our Shield and Defense",
  50: "The Horn of Our Salvation",
  51: "The Most High God",
  52: "Our Great King",
  53: "Righteous Judge of All",
  54: "The Ancient of Days",
  55: "Our Gracious Lord",
  56: "King of Glory",
  57: "The Lord of Hosts",
  58: "King of the Ages",
  59: "Holy and Revered",
  60: "Slow to Anger and Rich in Mercy",
  61: "Fountain of Living Waters",
  62: "Author of Salvation",
  63: "Anchor of the Soul",
  64: "The Good Shepherd",
  65: "The Chief Cornerstone",
  66: "The Living Bread",
  67: "The True Vine",
  68: "Wonderful Counselor",
  69: "God of All Comfort",
  70: "The Prince of Peace",
  71: "The Resurrection and the Life",
  72: "The Way, Truth, and Life",
  73: "The Light of the World",
  74: "Lion of the Tribe of Judah",
  75: "Lamb of God",
  76: "High Priest of Our Confession",
  77: "Mediator of the New Covenant",
  78: "Lord of the Sabbath",
  79: "Sun of Righteousness",
  80: "The Bright and Morning Star",
  81: "King of Kings and Lord of Lords",
  82: "Our Everlasting Portion",
  83: "Our Strength and Song",
  84: "Keeper of Israel",
  85: "Our Shade at Our Right Hand",
  86: "Who Neither Slumbers Nor Sleeps",
  87: "Our Tower of Refuge",
  88: "The Lifter of Our Head",
  89: "Shield to All Who Trust Him",
  90: "Faithful and True",
  91: "Who Pardons Our Transgressions",
  92: "Full of Grace and Truth",
  93: "Whose Mercy Endures Forever",
  94: "Our Ever-Present Help",
  95: "The Unchanging God",
  96: "Giver of Every Good Gift",
  97: "Jesus Christ The Same Forever",
  98: "Fountain of Wisdom",
  99: "The Sovereign Lord",
  100: "Lord of Heaven and Earth",
  101: "Who Hears Our Prayers",
  102: "Who Answers in the Day of Trouble",
  103: "Who Gathers the Outcasts",
  104: "Who Binds Up the Brokenhearted",
  105: "Who Satisfies the Thirsty Soul",
  106: "Who Feeds the Hungry",
  107: "Who Sets the Captives Free",
  108: "Who Opens the Eyes of the Blind",
  109: "Who Raises the Bowed Down",
  110: "Who Watches Over the Strangers",
  111: "Who Upholds the Fatherless and Widow",
  112: "Who Commands the Morning",
  113: "Who Restrains the Waves",
  114: "Who Sends Rain on the Righteous",
  115: "Who Clothes the Lilies",
  116: "Who Cares for the Sparrows",
  117: "Who Turns to Favor Us",
  118: "Who Is Always with Us",
  119: "Our Eternal Companion",
  120: "Our Constant Guide",
  121: "Mighty to Save",
  122: "Whose Ear is Not Heavy",
  123: "Who Keeps Us from Falling",
  124: "Preserver of the Faithful",
  125: "Who Renews Our Strength",
  126: "Who Makes Us Mount Up with Wings",
  127: "Who Leads Us in Plain Paths",
  128: "Light Unto Our Path",
  129: "Lamp Unto Our Feet",
  130: "Our Defense in Battle",
  131: "Giver of Abundant Grace",
  132: "Our Peace and Harmony",
  133: "Breaker of Every Yoke",
  134: "Overcomer of the World",
  135: "Victor Over Death and Hades",
  136: "Who Led Captivity Captive",
  137: "Giver of Spiritual Gifts",
  138: "Searcher of Hearts and Minds",
  139: "Judge of the Living and Dead",
  140: "The Righteous Branch",
  141: "Our Righteousness",
  142: "Our Sanctifier",
  143: "Our Shield and Protector",
  144: "Our Banner of Victory",
  145: "Our Provider",
  146: "Our Healer",
  147: "Our Ever-Present Companion",
  148: "The Lord Our Peace",
  149: "The Lord of Hosts",
  150: "The Holy One of Israel",
  151: "The Faithful Creator",
  152: "Bishop of Our Souls",
  153: "Rock of Ages",
  154: "Fountain of Life",
  155: "Our Fortress and Deliverer",
  156: "Strength of My Heart",
  157: "My Exceeding Joy",
  158: "Who Blesses Our Daily Work",
  159: "Preserver of Our Life",
  160: "Who Blesses Our Bread and Water",
  161: "Who Ends Our Mourning",
  162: "God of Endless Joy",
  163: "Giver of Peace to Our Children",
  164: "Teacher of Our Children",
  165: "Who Pours Out His Spirit",
  166: "Who Pours Out His Blessing",
  167: "Who Keeps Our Feet from Slipping",
  168: "Whose Truth Endures Forever",
  169: "Giver of Life and Breath",
  170: "Fulfiller of Prophecy",
  171: "Source of Salvation",
  172: "Fullness of Joy in Your Presence",
  173: "Pleasures at Your Right Hand",
  174: "Shield of Our Salvation",
  175: "Who Enlarge Our Steps",
  176: "Our Strong Defense",
  177: "Delight of the Saints",
  178: "Giver of Great Peace",
  179: "Fountain of Mercies",
  180: "The Faithful Witness",
  181: "Firstborn from the Dead",
  182: "Ruler of the Kings of Earth",
  183: "Who Opened Fountains and Rivers",
  184: "Who Dried Up Mighty Rivers",
  185: "Eternal Wisdom Before Creation",
  186: "Who Makes Ministers Flames of Fire",
  187: "Compassionate to Your Servants",
  188: "Who Delights in Our Prosperity",
  189: "Who Confirms His Word",
  190: "Joy of Your Servants",
  191: "Who Reveals Divine Secrets",
  192: "Strength of the Helpless",
  193: "Hope of the Desolate",
  194: "Rest for the Weary",
  195: "Helper of the Fatherless",
  196: "Defender of Widows",
  197: "God of Solitary Souls",
  198: "Who Sets Prisoners Free",
  199: "Who Satisfies with Good Things",
  200: "The God Who Sees Me",
  201: "My Strength in Weakness",
  202: "My Shield and Glory",
  203: "Lifter of My Head",
  204: "Who Makes Us Dwell in Safety",
  205: "Who Leads Us to a Broad Place",
  206: "My Rock and Fortress",
  207: "My Deliverer and Strength",
  208: "My Horn of Salvation",
  209: "Who Turns Darkness into Light",
  210: "Who Turns Mourning into Joy",
  211: "Who Girds Us with Gladness",
  212: "Keeper of Covenant and Mercy",
  213: "Who Keeps Faith Forever",
  214: "Whose Words Never Pass Away",
  215: "Who Answers When We Ask",
  216: "Who Looks Upon the Humble",
  217: "Near to the Brokenhearted",
  218: "Savior of Contrite Spirits",
  219: "Count of Our Wandering",
  220: "Keeper of Our Tears",
  221: "Who Never Forgets the Needy",
  222: "Who Lifts Up the Poor",
  223: "Who Seats the Humble with Princes",
  224: "Defender of the Poor",
  225: "Vindicator of the Oppressed",
  226: "True Light of the World",
  227: "Light That Enlightens Every Heart",
  228: "Who Brought Down Jericho's Walls",
  229: "Captain of the Lord's Army",
  230: "Who Fulfills My Purpose",
  231: "Who Perfects All Things for Me",
  232: "Whose Mercy Never Fails",
  233: "Giver of All Sufficiency",
  234: "Who Welcomes All Who Come",
  235: "The Door of the Sheep",
  236: "The Good Shepherd of Souls",
  237: "The Great I AM",
  238: "Source of Eternal Salvation",
  239: "Lord of the Harvest",
  240: "Giver of Seasonal Showers",
  241: "Who Walks Among the Lampstands",
  242: "Who Holds the Seven Stars",
  243: "First and Last, Living Forever",
  244: "Who Exalts the Humble in Due Time",
  245: "Rewarder of Faithful Seekers",
  246: "Rich to All Who Call Upon Him",
  247: "Supplier of All Our Needs",
  248: "Source of Riches and Honor",
  249: "Giver of Every Spiritual Blessing",
  250: "Who Gives Power to Gain Wealth",
  251: "Who Fed the Five Thousand",
  252: "True and Righteous Treasure",
  253: "Fountain of Abundant Grace",
  254: "The Righteous Advocate",
  255: "Author and Finisher of Our Faith",
  256: "Our Eternal Intercessor",
  257: "Who Gives Generously to All",
  258: "Giver Without Reproach",
  259: "Clothed in Radiant Light",
  260: "Mountain of Our Help",
  261: "Who Alone Does Great Wonders",
  262: "Our Divine Comforter",
  263: "God of Hope and Peace",
  264: "God of Patience and Comfort",
  265: "Defender of the Oppressed",
  266: "Righteous and Holy King",
  267: "God of Mutual Love",
  268: "Bond of Brotherly Love",
  269: "Fountain of Christian Love",
  270: "Example of Humble Servanthood",
  271: "Source of Mutual Comfort",
  272: "Spirit of Peace and Unity",
  273: "Righteous Judge of Grace",
  274: "Guardian of Harmony",
  275: "Spirit of Gracious Hospitality",
  276: "Giver of Warm Fellowship",
  277: "Holy Fellowship in Christ",
  278: "Head of the One Body",
  279: "Uniter of the Church",
  280: "Lord of Mutual Honor",
  281: "Spirit of Mutual Submission",
  282: "Spirit of Reverent Meekness",
  283: "God of Gentle Forgiveness",
  284: "Healer of Broken Brethren",
  285: "Redeemer of Confessed Sins",
  286: "God of Tender Kindness",
  287: "Fountain of Forgiving Grace",
  288: "Eternal Joy of Fellowship",
  289: "Unchanging God of Truth",
  290: "King of the Redeemed",
  291: "Deliverer by an Outstretched Arm",
  292: "Our Passover Lamb",
  293: "King of Israel",
  294: "Hosanna in the Highest",
  295: "Faithful Ambassador of Health",
  296: "Wisdom That Brings Healing",
  297: "Joy That Heals the Heart",
  298: "Lord of Righteous Peace",
  299: "The Righteous Lord Who Loves Justice",
  300: "Everlasting Praise and Honor"
};

/**
 * Meaningfully condenses any English praise text into a concise, punchy title.
 */
export function condenseEnglishPraise(rawText: string, id?: number): string {
  if (id && CONCISE_TITLES_300[id]) {
    return `Praise to You, ${CONCISE_TITLES_300[id]}`;
  }

  let text = (rawText || '').trim();

  // Strip existing praise prefixes
  text = text.replace(/^Praise (be )?to You,?\s*/i, '');
  text = text.replace(/^Praise the Lord,? (who|for)?\s*/i, '');
  text = text.replace(/^Praise (God|Jesus),?\s*/i, '');
  text = text.replace(/\.$/, '').trim();

  // If text has quotes from scripture like 'Lo, I Am with You Always...'
  const quoteMatch = text.match(/['"]([^'"]+)['"]/);
  if (quoteMatch && quoteMatch[1]) {
    text = quoteMatch[1].trim();
  }

  // Remove clumsy third person phrasing
  text = text
    .replace(/^He is (the )?/i, '$1')
    .replace(/^He /i, 'Who ')
    .replace(/^His /i, 'Whose ')
    .replace(/^Who Said, /i, '')
    .replace(/ is He$/i, '')
    .replace(/^A God of /i, 'God of ');

  // Clean up punctuation & leading quotes
  text = text.replace(/^['"]+|['"]+$/g, '').trim();

  // Trim long subordinate clauses
  if (text.length > 40) {
    if (text.includes(',')) {
      text = text.split(',')[0].trim();
    } else if (text.includes(' and ')) {
      text = text.split(' and ')[0].trim();
    } else if (text.includes(' that ')) {
      text = text.split(' that ')[0].trim();
    } else if (text.includes(' who ')) {
      text = text.split(' who ')[0].trim();
    }
  }

  // Ensure first character is uppercase
  if (text.length > 0) {
    text = text.charAt(0).toUpperCase() + text.slice(1);
  }

  return `Praise to You, ${text}`;
}

/**
 * Resolves the concise English title for any Blueprint or Praise item.
 * Guarantees a concise, meaningful title: "Praise to You, [Title]"
 */
export function getConciseEnglishTitle(
  item: ShortsBlueprint | PraiseItem | { id: number; englishText?: string; tamilTitle?: string },
  fallbackId?: number
): string {
  const id = typeof item === 'object' && item && 'id' in item ? item.id : fallbackId || 0;

  if (id && CONCISE_TITLES_300[id]) {
    return `Praise to You, ${CONCISE_TITLES_300[id]}`;
  }

  // Try extracting from subtitles / englishText
  if (typeof item === 'object' && item) {
    const b = item as Partial<ShortsBlueprint>;
    if (b.subtitles?.line2English) {
      return condenseEnglishPraise(b.subtitles.line2English, id);
    }
    if (b.englishText) {
      return condenseEnglishPraise(b.englishText, id);
    }
  }

  // Look up in ALL_PRAISES if available
  if (id) {
    const found = ALL_PRAISES.find(p => p.id === id);
    if (found) {
      // Create concise translation from clean Tamil title
      const cleanTamil = found.text.replace(/ ஸ்தோத்திரம்\.?$/, '').trim();
      return `Praise to You, ${cleanTamil}`;
    }
  }

  return 'Praise to You, O Lord';
}
