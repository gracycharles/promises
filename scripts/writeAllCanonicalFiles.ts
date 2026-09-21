import * as fs from 'fs';
import * as path from 'path';

export interface ItemDef {
  id: number;
  tamilText: string;
  tamilRef: string;
  englishRef: string;
  praiseTitle: string;
  verseText: string;
  theologicalContext: string;
}

// 101 to 150
export const BATCH_101_TO_150: ItemDef[] = [
  {
    id: 101,
    tamilText: "இருப்புத் தாழ்ப்பாள்களை முறிக்கிறவரே ஸ்தோத்திரம்.",
    tamilRef: "ஏசா. 45:2",
    englishRef: "Isaiah 45:2",
    praiseTitle: "Praise to You, Who Cuts in Pieces the Bars of Iron",
    verseText: "'I will go before you and make the crooked places straight; I will break in pieces the gates of bronze and cut the bars of iron in two.'",
    theologicalContext: "NKJV Isaiah 45:2: 'cut the bars of iron in two' (இருப்புத் தாழ்ப்பாள்களை முறிக்கிறவர்). Strictly restricted to the Tamil phrase."
  },
  {
    id: 102,
    tamilText: "இருதயங்களை சோதித்தறிகிறவரே ஸ்தோத்திரம்.",
    tamilRef: "சங். 17:3",
    englishRef: "Psalms 17:3",
    praiseTitle: "Praise to You, Who Tests the Heart",
    verseText: "You have tested my heart; You have visited me in the night; You have tried me and have found nothing; I have purposed that my mouth shall not transgress.",
    theologicalContext: "NKJV Psalm 17:3: 'You have tested my heart' (இருதயங்களை சோதித்தறிகிறவர்)."
  },
  {
    id: 103,
    tamilText: "இரட்டிப்பான நன்மைகளை தருபவரே ஸ்தோத்திரம்.",
    tamilRef: "சக. 9:12",
    englishRef: "Zechariah 9:12",
    praiseTitle: "Praise to You, Who Restores Double Blessings",
    verseText: "Return to the stronghold, you prisoners of hope. Even today I declare that I will restore double to you.",
    theologicalContext: "NKJV Zechariah 9:12: 'I will restore double to you' (இரட்டிப்பான நன்மைகளை தருபவர்)."
  },
  {
    id: 104,
    tamilText: "இக்கட்டு நாளில் அரணான கோட்டையே ஸ்தோத்திரம்.",
    tamilRef: "நாகூம் 1:7",
    englishRef: "Nahum 1:7",
    praiseTitle: "Praise to You, A Stronghold in the Day of Trouble",
    verseText: "The Lord is good, a stronghold in the day of trouble; and He knows those who trust in Him.",
    theologicalContext: "NKJV Nahum 1:7: 'a stronghold in the day of trouble' (இக்கட்டு நாளில் அரணான கோட்டை)."
  },
  {
    id: 105,
    tamilText: "இஸ்ரவேலின் தேவனே ஸ்தோத்திரம்.",
    tamilRef: "ஏசா. 37:16",
    englishRef: "Isaiah 37:16",
    praiseTitle: "Praise to You, God of Israel",
    verseText: "'O Lord of hosts, God of Israel, the One who dwells between the cherubim, You are God, You alone, of all the kingdoms of the earth. You have made heaven and earth.'",
    theologicalContext: "NKJV Isaiah 37:16: 'God of Israel' (இஸ்ரவேலின் தேவன்)."
  },
  {
    id: 106,
    tamilText: "இஸ்ரவேலின் பரிசுத்தரே ஸ்தோத்திரம்.",
    tamilRef: "ஏசா. 43:3",
    englishRef: "Isaiah 43:3",
    praiseTitle: "Praise to You, The Holy One of Israel",
    verseText: "For I am the Lord your God, the Holy One of Israel, your Savior; I gave Egypt for your ransom, Ethiopia and Seba in your place.",
    theologicalContext: "NKJV Isaiah 43:3: 'the Holy One of Israel' (இஸ்ரவேலின் பரிசுத்தர்)."
  },
  {
    id: 107,
    tamilText: "இஸ்ரவேலின் மேய்ப்பரே ஸ்தோத்திரம்.",
    tamilRef: "சங். 80:1",
    englishRef: "Psalms 80:1",
    praiseTitle: "Praise to You, Shepherd of Israel",
    verseText: "Give ear, O Shepherd of Israel, You who lead Joseph like a flock; You who dwell between the cherubim, shine forth!",
    theologicalContext: "NKJV Psalm 80:1: 'Shepherd of Israel' (இஸ்ரவேலின் மேய்ப்பர்)."
  },
  {
    id: 108,
    tamilText: "இஸ்ரவேலை ஆளும் பிரபுவே ஸ்தோத்திரம்.",
    tamilRef: "மீகா 5:2",
    englishRef: "Micah 5:2",
    praiseTitle: "Praise to You, Ruler in Israel",
    verseText: "'Yet out of you shall come forth to Me the One to be Ruler in Israel, whose goings forth are from of old, from everlasting.'",
    theologicalContext: "NKJV Micah 5:2: 'Ruler in Israel' (இஸ்ரவேலை ஆளும் பிரபு)."
  },
  {
    id: 109,
    tamilText: "இஸ்ரவேலின் ராஜாவே ஸ்தோத்திரம்.",
    tamilRef: "யோவா. 1:49",
    englishRef: "John 1:49",
    praiseTitle: "Praise to You, King of Israel",
    verseText: "Nathanael answered and said to Him, 'Rabbi, You are the Son of God! You are the King of Israel!'",
    theologicalContext: "NKJV John 1:49: 'King of Israel' (இஸ்ரவேலின் ராஜா)."
  },
  {
    id: 110,
    tamilText: "இஸ்ரவேலின் ஜெயபலமானவரே ஸ்தோத்திரம்.",
    tamilRef: "1 சாமு. 15:29",
    englishRef: "1 Samuel 15:29",
    praiseTitle: "Praise to You, The Strength of Israel",
    verseText: "'And also the Strength of Israel will not lie nor relent. For He is not a man, that He should relent.'",
    theologicalContext: "NKJV 1 Samuel 15:29: 'the Strength of Israel' (இஸ்ரவேலின் ஜெயபலம்)."
  },
  {
    id: 111,
    tamilText: "இஸ்ரவேலுக்கு பனியாயிருப்பவரே ஸ்தோத்திரம்.",
    tamilRef: "ஓசியா 14:5",
    englishRef: "Hosea 14:5",
    praiseTitle: "Praise to You, Who is Like the Dew to Israel",
    verseText: "'I will be like the dew to Israel; he shall grow like the lily, and lengthen his roots like Lebanon.'",
    theologicalContext: "NKJV Hosea 14:5: 'like the dew to Israel' (இஸ்ரவேலுக்கு பனியாயிருப்பவர்)."
  },
  {
    id: 112,
    tamilText: "இஸ்ரவேலை ஆசீர்வதிப்பதே பிரியம் என்றவரே ஸ்தோத்திரம்.",
    tamilRef: "எண்ணா. 24:1",
    englishRef: "Numbers 24:1",
    praiseTitle: "Praise to You, Pleased to Bless Israel",
    verseText: "Now when Balaam saw that it pleased the Lord to bless Israel, he did not go as at other times, to seek to use sorcery, but he set his face toward the wilderness.",
    theologicalContext: "NKJV Numbers 24:1: 'pleased the Lord to bless Israel' (இஸ்ரவேலை ஆசீர்வதிப்பதே பிரியம்)."
  },
  {
    id: 113,
    tamilText: "இதோ நான் சகலத்தையும் புதிதாக்குகிறேன் என்றவரே ஸ்தோத்திரம்.",
    tamilRef: "வெளி. 21:5",
    englishRef: "Revelation 21:5",
    praiseTitle: "Praise to You, Who Said, 'Behold, I Make All Things New'",
    verseText: "Then He who sat on the throne said, 'Behold, I make all things new.' And He said to me, 'Write, for these words are true and faithful.'",
    theologicalContext: "NKJV Revelation 21:5: 'Behold, I make all things new' (இதோ நான் சகலத்தையும் புதிதாக்குகிறேன்)."
  },
  {
    id: 114,
    tamilText: "இதோ இஸ்ரவேலை காக்கிறவர் உறங்குவதுமில்லை, தூங்குகிறதுமில்லை ஸ்தோத்திரம்.",
    tamilRef: "சங். 121:4",
    englishRef: "Psalms 121:4",
    praiseTitle: "Praise to You, He Who Keeps Israel Shall Neither Slumber Nor Sleep",
    verseText: "Behold, He who keeps Israel shall neither slumber nor sleep.",
    theologicalContext: "NKJV Psalm 121:4: verbatim scriptural match (இதோ இஸ்ரவேலை காக்கிறவர் உறங்குவதுமில்லை தூங்குகிறதுமில்லை)."
  },
  {
    id: 115,
    tamilText: "இதோ உலகத்தின் பாவத்தை சுமந்து தீர்த்த தேவ ஆட்டுக்குட்டி ஸ்தோத்திரம்.",
    tamilRef: "யோவா. 1:29",
    englishRef: "John 1:29",
    praiseTitle: "Praise to You, The Lamb of God Who Takes Away the Sin of the World",
    verseText: "The next day John saw Jesus coming toward him, and said, 'Behold! The Lamb of God who takes away the sin of the world!'",
    theologicalContext: "NKJV John 1:29: 'The Lamb of God who takes away the sin of the world' (தேவ ஆட்டுக்குட்டி)."
  },
  {
    id: 116,
    tamilText: "இதோ நான் ஒரு தூதனை உமக்கு முன்பாக அனுப்புகிறேன் ஸ்தோத்திரம்.",
    tamilRef: "யாத். 23:20",
    englishRef: "Exodus 23:20",
    praiseTitle: "Praise to You, Who Said, 'Behold, I Send an Angel Before You'",
    verseText: "'Behold, I send an Angel before you to keep you in the way and to bring you into the place which I have prepared.'",
    theologicalContext: "NKJV Exodus 23:20: 'Behold, I send an Angel before you' (இதோ நான் ஒரு தூதனை உமக்கு முன்பாக அனுப்புகிறேன்)."
  },
  {
    id: 117,
    tamilText: "இதோ நான் உங்கள் பட்சத்திலிருந்து உங்களை கண்ணோக்குவேன் ஸ்தோத்திரம்.",
    tamilRef: "எசேக். 36:9",
    englishRef: "Ezekiel 36:9",
    praiseTitle: "Praise to You, Who Said, 'Behold, I Am for You and Will Turn to You'",
    verseText: "'For indeed I am for you, and I will turn to you, and you shall be tilled and sown.'",
    theologicalContext: "NKJV Ezekiel 36:9: 'I am for you, and I will turn to you' (நான் உங்கள் பட்சத்திலிருந்து உங்களை கண்ணோக்குவேன்)."
  },
  {
    id: 118,
    tamilText: "இதோ உலகின் முடிவுவரை சகல நாளும் உன்னோடிருக்கிறேன் ஸ்தோத்திரம்.",
    tamilRef: "மத். 28:20",
    englishRef: "Matthew 28:20",
    praiseTitle: "Praise to You, Who Said, 'Lo, I Am with You Always, Even to the End of the Age'",
    verseText: "'teaching them to observe all things that I have commanded you; and lo, I am with you always, even to the end of the age.' Amen.",
    theologicalContext: "NKJV Matthew 28:20: 'lo, I am with you always, even to the end of the age' (உலகின் முடிவுவரை சகல நாளும் உன்னோடிருக்கிறேன்)."
  },
  {
    id: 119,
    tamilText: "இதோ என் உள்ளங்கைகளில் உன்னை வரைந்திருக்கிறேன் ஸ்தோத்திரம்.",
    tamilRef: "ஏசா. 49:16",
    englishRef: "Isaiah 49:16",
    praiseTitle: "Praise to You, Who Inscribed Us on the Palms of Your Hands",
    verseText: "'See, I have inscribed you on the palms of My hands; your walls are continually before Me.'",
    theologicalContext: "NKJV Isaiah 49:16: 'I have inscribed you on the palms of My hands' (என் உள்ளங்கைகளில் உன்னை வரைந்திருக்கிறேன்)."
  },
  {
    id: 120,
    tamilText: "இதோ தேவன் தண்டிக்கிற மனுஷன் பாக்கியவான் ஸ்தோத்திரம்.",
    tamilRef: "யோபு 5:17",
    englishRef: "Job 5:17",
    praiseTitle: "Praise to You, Happy is the Man Whom God Corrects",
    verseText: "'Behold, happy is the man whom God corrects; therefore do not despise the chastening of the Almighty.'",
    theologicalContext: "NKJV Job 5:17: 'happy is the man whom God corrects' (தேவன் தண்டிக்கிற மனுஷன் பாக்கியவான்)."
  },
  {
    id: 121,
    tamilText: "இதோ இரட்சிக்க கூடாதபடி கர்த்தர் குறுகிபோகவில்லை ஸ்தோத்திரம்.",
    tamilRef: "ஏசா. 59:1",
    englishRef: "Isaiah 59:1",
    praiseTitle: "Praise to You, The Lord's Hand is Not Shortened, That It Cannot Save",
    verseText: "Behold, the Lord’s hand is not shortened, that it cannot save; nor His ear heavy, that it cannot hear.",
    theologicalContext: "NKJV Isaiah 59:1: 'the Lord’s hand is not shortened, that it cannot save' (இரட்சிக்க கூடாதபடி கர்த்தர் குறுகிபோகவில்லை)."
  },
  {
    id: 122,
    tamilText: "இதோ கர்த்தருக்கு பயப்படுகிற மனுஷன் ஆசீர்வதிக்கப்படுவான் ஸ்தோத்திரம்.",
    tamilRef: "சங். 128:4",
    englishRef: "Psalms 128:4",
    praiseTitle: "Praise to You, Thus Shall the Man Be Blessed Who Fears the Lord",
    verseText: "Behold, thus shall the man be blessed who fears the Lord.",
    theologicalContext: "NKJV Psalm 128:4: verbatim translation (கர்த்தருக்கு பயப்படுகிற மனுஷன் ஆசீர்வதிக்கப்படுவான்)."
  },
  {
    id: 123,
    tamilText: "இதோ நான் உனக்காக வழக்காடுவேன் ஸ்தோத்திரம்.",
    tamilRef: "எரே. 51:36",
    englishRef: "Jeremiah 51:36",
    praiseTitle: "Praise to You, Who Said, 'Behold, I Will Plead Your Cause'",
    verseText: "Therefore thus says the Lord: 'Behold, I will plead your cause and take vengeance for you. I will dry up her sea and make her springs dry.'",
    theologicalContext: "NKJV Jeremiah 51:36: 'Behold, I will plead your cause' (நான் உனக்காக வழக்காடுவேன்)."
  },
  {
    id: 124,
    tamilText: "இதோ பிள்ளைகள் கர்த்தரால் வரும் சுதந்தரம் ஸ்தோத்திரம்.",
    tamilRef: "சங். 127:3",
    englishRef: "Psalms 127:3",
    praiseTitle: "Praise to You, Behold, Children Are a Heritage from the Lord",
    verseText: "Behold, children are a heritage from the Lord, the fruit of the womb is a reward.",
    theologicalContext: "NKJV Psalm 127:3: 'children are a heritage from the Lord' (பிள்ளைகள் கர்த்தரால் வரும் சுதந்தரம்)."
  },
  {
    id: 125,
    tamilText: "இதோ ஆண்டவருக்கு பயப்படுவதே ஞானம் ஸ்தோத்திரம்.",
    tamilRef: "யோபு 28:28",
    englishRef: "Job 28:28",
    praiseTitle: "Praise to You, Behold, the Fear of the Lord, That is Wisdom",
    verseText: "And to man He said, 'Behold, the fear of the Lord, that is wisdom, and to depart from evil is understanding.'",
    theologicalContext: "NKJV Job 28:28: 'Behold, the fear of the Lord, that is wisdom' (ஆண்டவருக்கு பயப்படுவதே ஞானம்)."
  },
  {
    id: 126,
    tamilText: "இதோ சீக்கிரமாய் வருகிறேன் என்றவரே ஸ்தோத்திரம்.",
    tamilRef: "வெளி. 22:7",
    englishRef: "Revelation 22:7",
    praiseTitle: "Praise to You, Who Said, 'Behold, I Am Coming Quickly'",
    verseText: "'Behold, I am coming quickly! Blessed is he who keeps the words of the prophecy of this book.'",
    theologicalContext: "NKJV Revelation 22:7: 'Behold, I am coming quickly' (இதோ சீக்கிரமாய் வருகிறேன்)."
  },
  {
    id: 127,
    tamilText: "ஈசாயென்னும் அடிமரமே ஸ்தோத்திரம்.",
    tamilRef: "ஏசா. 11:1",
    englishRef: "Isaiah 11:1",
    praiseTitle: "Praise to You, Rod from the Stem of Jesse",
    verseText: "There shall come forth a Rod from the stem of Jesse, and a Branch shall grow out of his roots.",
    theologicalContext: "NKJV Isaiah 11:1: 'a Rod from the stem of Jesse' (ஈசாயென்னும் அடிமரம்)."
  },
  {
    id: 128,
    tamilText: "ஈசாக்கின் தேவனே ஸ்தோத்திரம்.",
    tamilRef: "யாத். 3:15",
    englishRef: "Exodus 3:15",
    praiseTitle: "Praise to You, God of Isaac",
    verseText: "Moreover God said to Moses, 'Thus you shall say to the children of Israel: The Lord God of your fathers, the God of Abraham, the God of Isaac, and the God of Jacob, has sent me to you. This is My name forever, and this is My memorial to all generations.'",
    theologicalContext: "NKJV Exodus 3:15: 'the God of Isaac' (ஈசாக்கின் தேவன்)."
  },
  {
    id: 129,
    tamilText: "ஈசோப்பினால் சுத்திகரிப்பவரே ஸ்தோத்திரம்.",
    tamilRef: "சங். 51:7",
    englishRef: "Psalms 51:7",
    praiseTitle: "Praise to You, Who Purges with Hyssop",
    verseText: "Purge me with hyssop, and I shall be clean; wash me, and I shall be whiter than snow.",
    theologicalContext: "NKJV Psalm 51:7: 'Purge me with hyssop' (ஈசோப்பினால் சுத்திகரிப்பவர்)."
  },
  {
    id: 130,
    tamilText: "ஈசாக்கின் பயபக்திக்குரியவரே ஸ்தோத்திரம்.",
    tamilRef: "ஆதி. 31:42",
    englishRef: "Genesis 31:42",
    praiseTitle: "Praise to You, The Fear of Isaac",
    verseText: "'Unless the God of my father, the God of Abraham and the Fear of Isaac, had been with me, surely now you would have sent me away empty-handed. God has seen my affliction and the labor of my hands, and rebuked you last night.'",
    theologicalContext: "NKJV Genesis 31:42: 'the Fear of Isaac' (ஈசாக்கின் பயபக்திக்குரியவர்)."
  },
  {
    id: 131,
    tamilText: "ஈவின் அளவுக்குதக்கதாக கிருபை அளிப்பவரே ஸ்தோத்திரம்.",
    tamilRef: "எபே. 4:7",
    englishRef: "Ephesians 4:7",
    praiseTitle: "Praise to You, Who Gives Grace According to the Measure of Christ's Gift",
    verseText: "But to each one of us grace was given according to the measure of Christ’s gift.",
    theologicalContext: "NKJV Ephesians 4:7: 'grace was given according to the measure of Christ’s gift' (ஈவின் அளவுக்குதக்கதாக கிருபை அளிப்பவர்)."
  },
  {
    id: 132,
    tamilText: "உண்மையுள்ள தேவனே ஸ்தோத்திரம்.",
    tamilRef: "1 கொரி. 1:9",
    englishRef: "1 Corinthians 1:9",
    praiseTitle: "Praise to You, Faithful God",
    verseText: "God is faithful, by whom you were called into the fellowship of His Son, Jesus Christ our Lord.",
    theologicalContext: "NKJV 1 Corinthians 1:9: 'God is faithful' (உண்மையுள்ள தேவன்)."
  },
  {
    id: 133,
    tamilText: "உயிர்த்தெழுந்தவரே ஸ்தோத்திரம்.",
    tamilRef: "லூக். 24:6",
    englishRef: "Luke 24:6",
    praiseTitle: "Praise to You, The Risen Lord",
    verseText: "'He is not here, but is risen! Remember how He spoke to you when He was still in Galilee,'",
    theologicalContext: "NKJV Luke 24:6: 'He is risen' (உயிர்த்தெழுந்தவர்)."
  },
  {
    id: 134,
    tamilText: "உலகிற்கு ஒளியானவரே ஸ்தோத்திரம்.",
    tamilRef: "யோவா. 9:5",
    englishRef: "John 9:5",
    praiseTitle: "Praise to You, Light of the World",
    verseText: "'As long as I am in the world, I am the light of the world.'",
    theologicalContext: "NKJV John 9:5: 'the light of the world' (உலகிற்கு ஒளி)."
  },
  {
    id: 135,
    tamilText: "உலக இரட்சகரே ஸ்தோத்திரம்.",
    tamilRef: "1 யோவா. 4:14",
    englishRef: "1 John 4:14",
    praiseTitle: "Praise to You, Savior of the World",
    verseText: "And we have seen and testify that the Father has sent the Son as Savior of the world.",
    theologicalContext: "NKJV 1 John 4:14: 'Savior of the world' (உலக இரட்சகர்)."
  },
  {
    id: 136,
    tamilText: "உயிர்ப்பிக்கிற ஆவியானவரே ஸ்தோத்திரம்.",
    tamilRef: "2 கொரி. 3:6",
    englishRef: "2 Corinthians 3:6",
    praiseTitle: "Praise to You, The Spirit Who Gives Life",
    verseText: "who also made us sufficient as ministers of the new covenant, not of the letter but of the Spirit; for the letter kills, but the Spirit gives life.",
    theologicalContext: "NKJV 2 Corinthians 3:6: 'the Spirit gives life' (உயிர்ப்பிக்கிற ஆவியானவர்)."
  },
  {
    id: 137,
    tamilText: "உன்னதங்களில் வாசம் பண்ணுகிறவரே ஸ்தோத்திரம்.",
    tamilRef: "சங். 113:5",
    englishRef: "Psalms 113:5",
    praiseTitle: "Praise to You, Who Dwells on High",
    verseText: "Who is like the Lord our God, who dwells on high,",
    theologicalContext: "NKJV Psalm 113:5: 'who dwells on high' (உன்னதங்களில் வாசம் பண்ணுகிறவர்)."
  },
  {
    id: 138,
    tamilText: "உளையான சேற்றிலிருந்து தூக்கினவரே ஸ்தோத்திரம்.",
    tamilRef: "சங். 40:2",
    englishRef: "Psalms 40:2",
    praiseTitle: "Praise to You, Who Brought Me Up Out of the Miry Clay",
    verseText: "He also brought me up out of a horrible pit, out of the miry clay, and set my feet upon a rock, and established my steps.",
    theologicalContext: "NKJV Psalm 40:2: 'out of the miry clay' (உளையான சேற்றிலிருந்து தூக்கினவர்)."
  },
  {
    id: 139,
    tamilText: "உண்மையாய் கூப்பிடுபவர்க்கு சமீபமானவரே ஸ்தோத்திரம்.",
    tamilRef: "சங். 145:18",
    englishRef: "Psalms 145:18",
    praiseTitle: "Praise to You, Near to All Who Call Upon You in Truth",
    verseText: "The Lord is near to all who call upon Him, to all who call upon Him in truth.",
    theologicalContext: "NKJV Psalm 145:18: 'near to all who call upon Him in truth' (உண்மையாய் கூப்பிடுபவர்க்கு சமீபமானவர்)."
  },
  {
    id: 140,
    tamilText: "உச்சிதமான கோதுமையினால் திருப்தியாக்குபவரே ஸ்தோத்திரம்.",
    tamilRef: "சங். 147:14",
    englishRef: "Psalms 147:14",
    praiseTitle: "Praise to You, Who Fills Us with the Finest of Wheat",
    verseText: "He makes peace in your borders, and fills you with the finest wheat.",
    theologicalContext: "NKJV Psalm 147:14: 'fills you with the finest wheat' (உச்சிதமான கோதுமையினால் திருப்தியாக்குபவர்)."
  },
  {
    id: 141,
    tamilText: "உபத்திரவத்திலே பொறுமையாயிருங்கள் என்றவரே ஸ்தோத்திரம்.",
    tamilRef: "ரோம. 12:12",
    englishRef: "Romans 12:12",
    praiseTitle: "Praise to You, Who Said, 'Be Patient in Tribulation'",
    verseText: "rejoicing in hope, patient in tribulation, continuing steadfastly in prayer;",
    theologicalContext: "NKJV Romans 12:12: 'patient in tribulation' (உபத்திரவத்திலே பொறுமையாயிருங்கள்)."
  },
  {
    id: 142,
    tamilText: "உனக்கு பாக்கியமும், நன்மையும் உண்டாயிருக்கும் ஸ்தோத்திரம்.",
    tamilRef: "சங். 128:2",
    englishRef: "Psalms 128:2",
    praiseTitle: "Praise to You, It Shall Be Well with You and You Shall Be Happy",
    verseText: "When you eat the labor of your hands, you shall be happy, and it shall be well with you.",
    theologicalContext: "NKJV Psalm 128:2: 'you shall be happy, and it shall be well with you' (உனக்கு பாக்கியமும் நன்மையும் உண்டாயிருக்கும்)."
  },
  {
    id: 143,
    tamilText: "உனக்கு விரோதமாய் உருவாக்கின ஆயுதம் வாய்க்காதேபோம் என்றவரே ஸ்தோத்திரம்.",
    tamilRef: "ஏசா. 54:17",
    englishRef: "Isaiah 54:17",
    praiseTitle: "Praise to You, Who Said, 'No Weapon Formed Against You Shall Prosper'",
    verseText: "'No weapon formed against you shall prosper, and every tongue which rises against you in judgment you shall condemn. This is the heritage of the servants of the Lord, and their righteousness is from Me,' says the Lord.",
    theologicalContext: "NKJV Isaiah 54:17: 'No weapon formed against you shall prosper' (உனக்கு விரோதமாய் உருவாக்கின ஆயுதம் வாய்க்காதேபோம்)."
  },
  {
    id: 144,
    tamilText: "உன்னை நான் மீட்டு கொண்டேன் என்றவரே ஸ்தோத்திரம்.",
    tamilRef: "ஏசா. 44:22",
    englishRef: "Isaiah 44:22",
    praiseTitle: "Praise to You, Who Said, 'For I Have Redeemed You'",
    verseText: "'I have blotted out, like a thick cloud, your transgressions, and like a cloud, your sins. Return to Me, for I have redeemed you.'",
    theologicalContext: "NKJV Isaiah 44:22: 'for I have redeemed you' (உன்னை நான் மீட்டு கொண்டேன்)."
  },
  {
    id: 145,
    tamilText: "உன்னை நிச்சயமாக விடுவிப்பேன் என்றவரே ஸ்தோத்திரம்.",
    tamilRef: "எரே. 39:18",
    englishRef: "Jeremiah 39:18",
    praiseTitle: "Praise to You, Who Said, 'For I Will Surely Deliver You'",
    verseText: "'For I will surely deliver you, and you shall not fall by the sword; but your life shall be as a prize to you, because you have put your trust in Me,' says the Lord.",
    theologicalContext: "NKJV Jeremiah 39:18: 'For I will surely deliver you' (உன்னை நிச்சயமாக விடுவிப்பேன்)."
  },
  {
    id: 146,
    tamilText: "உன்னை ஆசீர்வதிக்கிறவர்களை ஆசீர்வதிப்பேன் என்றவரே ஸ்தோத்திரம்.",
    tamilRef: "ஆதி. 12:3",
    englishRef: "Genesis 12:3",
    praiseTitle: "Praise to You, Who Said, 'I Will Bless Those Who Bless You'",
    verseText: "'I will bless those who bless you, and I will curse him who curses you; and in you all the families of the earth shall be blessed.'",
    theologicalContext: "NKJV Genesis 12:3: 'I will bless those who bless you' (உன்னை ஆசீர்வதிக்கிறவர்களை ஆசீர்வதிப்பேன்)."
  },
  {
    id: 147,
    tamilText: "உமது நாமம் பலத்த துருகம் ஸ்தோத்திரம்.",
    tamilRef: "நீதி. 18:10",
    englishRef: "Proverbs 18:10",
    praiseTitle: "Praise to You, Your Name is a Strong Tower",
    verseText: "The name of the Lord is a strong tower; the righteous run to it and are safe.",
    theologicalContext: "NKJV Proverbs 18:10: 'The name of the Lord is a strong tower' (உமது நாமம் பலத்த துருகம்)."
  },
  {
    id: 148,
    tamilText: "உமது காருண்யம் பெரியது ஸ்தோத்திரம்.",
    tamilRef: "2 சாமு. 22:36",
    englishRef: "2 Samuel 22:36",
    praiseTitle: "Praise to You, Your Gentleness Has Made Me Great",
    verseText: "You have also given me the shield of Your salvation; Your gentleness has made me great.",
    theologicalContext: "NKJV 2 Samuel 22:36: 'Your gentleness has made me great' (உமது காருண்யம் என்னை பெரியவனாக்கும்)."
  },
  {
    id: 149,
    tamilText: "உமது கிருபை பெரியது ஸ்தோத்திரம்.",
    tamilRef: "சங். 86:13",
    englishRef: "Psalms 86:13",
    praiseTitle: "Praise to You, Great is Your Mercy",
    verseText: "For great is Your mercy toward me, and You have delivered my soul from the depths of Sheol.",
    theologicalContext: "NKJV Psalm 86:13: 'great is Your mercy toward me' (உமது கிருபை பெரியது). Trimmed strictly to the Tamil text."
  },
  {
    id: 150,
    tamilText: "உமது உண்மை பெரியது ஸ்தோத்திரம்.",
    tamilRef: "புலம்பல் 3:23",
    englishRef: "Lamentations 3:23",
    praiseTitle: "Praise to You, Great is Your Faithfulness",
    verseText: "They are new every morning; great is Your faithfulness.",
    theologicalContext: "NKJV Lamentations 3:23: 'great is Your faithfulness' (உமது உண்மை பெரியது)."
  }
];

function generateBatchFile(filename: string, batchVarName: string, items: ItemDef[]) {
  const lines: string[] = [];
  lines.push(`import { CanonicalPraiseItem } from './types';`);
  lines.push(``);
  lines.push(`/**`);
  lines.push(` * Canonical Biblical NKJV Data for 1000 Praises`);
  lines.push(` * Strictly restricted to what is written in the Tamil text,`);
  lines.push(` * verified against canonical NKJV scriptures.`);
  lines.push(` */`);
  lines.push(`export const ${batchVarName}: Record<number, CanonicalPraiseItem> = {`);

  items.forEach(item => {
    lines.push(`  ${item.id}: {`);
    lines.push(`    id: ${item.id},`);
    lines.push(`    tamilText: ${JSON.stringify(item.tamilText)},`);
    lines.push(`    tamilRef: ${JSON.stringify(item.tamilRef)},`);
    lines.push(`    englishRef: ${JSON.stringify(item.englishRef)},`);
    lines.push(`    praiseTitle: ${JSON.stringify(item.praiseTitle)},`);
    lines.push(`    verseText: ${JSON.stringify(item.verseText)},`);
    lines.push(`    theologicalContext: ${JSON.stringify(item.theologicalContext)}`);
    lines.push(`  },`);
  });

  lines.push(`};`);
  lines.push(``);

  const filePath = path.join(process.cwd(), 'src', 'data', 'canonical300', filename);
  fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
  console.log(`Wrote ${items.length} items to ${filePath}`);
}

generateBatchFile('batch101to150.ts', 'CANONICAL_BATCH_101_TO_150', BATCH_101_TO_150);
