// Accurate Tamil to English Scripture Book Name Mapper

export const TAMIL_TO_ENGLISH_BOOKS: Record<string, string> = {
  'ஆதி.': 'Genesis',
  'யாத்.': 'Exodus',
  'லேவி.': 'Leviticus',
  'எண்.': 'Numbers',
  'உபா.': 'Deuteronomy',
  'யோசு.': 'Joshua',
  'நியா.': 'Judges',
  'ரூத்': 'Ruth',
  '1 சாமு.': '1 Samuel',
  '2 சாமு.': '2 Samuel',
  '1 ராஜா.': '1 Kings',
  '2 ராஜா.': '2 Kings',
  '1 நாளா.': '1 Chronicles',
  '2 நாளா.': '2 Chronicles',
  'எஸ்றா': 'Ezra',
  'நெகே.': 'Nehemiah',
  'எஸ்தர்': 'Esther',
  'யோபு': 'Job',
  'யோபு.': 'Job',
  'சங்.': 'Psalms',
  'நீதி.': 'Proverbs',
  'பிரசங்கி': 'Ecclesiastes',
  'உன்னத.': 'Song of Solomon',
  'ஏசா.': 'Isaiah',
  'எரே.': 'Jeremiah',
  'புலம்பல்': 'Lamentations',
  'எசேக்.': 'Ezekiel',
  'தானி.': 'Daniel',
  'ஓசியா.': 'Hosea',
  'யோவேல்': 'Joel',
  'ஆமோஸ்': 'Amos',
  'ஒபதியா': 'Obadiah',
  'யோனா': 'Jonah',
  'மீகா': 'Micah',
  'நாகூம்': 'Nahum',
  'ஆபகூக்': 'Habakkuk',
  'செப்பனியா': 'Zephaniah',
  'ஆகாய்': 'Haggai',
  'சக.': 'Zechariah',
  'மல்கியா': 'Malachi',
  'மத்.': 'Matthew',
  'மாற்கு': 'Mark',
  'லூக்.': 'Luke',
  'யோவா.': 'John',
  'அப்.': 'Acts',
  'ரோம.': 'Romans',
  '1 கொரி.': '1 Corinthians',
  '2 கொரி.': '2 Corinthians',
  'கலா.': 'Galatians',
  'எபே.': 'Ephesians',
  'பிலிப்பு.': 'Philippians',
  'கொலோ.': 'Colossians',
  '1 தெச.': '1 Thessalonians',
  '2 தெச.': '2 Thessalonians',
  '1 தீமோ.': '1 Timothy',
  '2 தீமோ.': '2 Timothy',
  'தீத்து': 'Titus',
  'பிலே.': 'Philemon',
  'எபி.': 'Hebrews',
  'யாக்.': 'James',
  '1 பேது.': '1 Peter',
  '2 பேது.': '2 Peter',
  '1 யோவா.': '1 John',
  '2 யோவா.': '2 John',
  '3 யோவா.': '3 John',
  'யூதா': 'Jude',
  'வெளி.': 'Revelation',
};

export function convertTamilRefToEnglish(ref: string): string {
  if (!ref) return '';
  let result = ref;
  for (const [tamilBook, engBook] of Object.entries(TAMIL_TO_ENGLISH_BOOKS)) {
    if (result.includes(tamilBook)) {
      result = result.replace(new RegExp(tamilBook.replace(/\./g, '\\.'), 'g'), engBook + ' ');
      break;
    }
  }
  // Clean up extra spaces around colons/numbers
  return result.replace(/\s+/g, ' ').trim();
}

export const getEnglishReference = convertTamilRefToEnglish;
