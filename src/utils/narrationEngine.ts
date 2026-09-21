import { ShortsBlueprint } from '../types';

/**
 * Interface for Character-Tailored British Young Female Voice Narration
 */
export interface CharacterVoiceDirection {
  characterName: string;
  vocalTone: string;
  narrationStyle: string;
  wittyComedicNuance: string;
  voiceProfileDirective: string;
  audioNarrationScript: string;
  elevenLabsPrompt: string;
}

/**
 * Builds a character-specific British Young Female Voice direction
 * ensuring warm, witty, joyful, and articulate delivery matching the exact character.
 */
export function buildCharacterVoiceDirection(b: ShortsBlueprint): CharacterVoiceDirection {
  const charName = b.characterName || b.character || 'Character';
  const comical = b.comicalElement || '';
  const ref = b.scriptureRef || b.englishRef || 'Holy Scripture';
  const verse = b.scriptureVerse || b.nkjvText || '';
  const title = b.affirmationTitle || b.englishText || `Affirmation #${b.id}`;

  // Character-specific custom vocal nuance
  let vocalTone = "Warm, witty, joyful, and articulate with a sparkling British accent";
  let wittyNuance = "Playful comedic timing and bright, infectious smile in the voice";

  const lowerName = charName.toLowerCase();
  const lowerComical = comical.toLowerCase();

  if (lowerName.includes('bee') || lowerName.includes('barnaby the bumbling')) {
    vocalTone = "Energetic, buoyant, and playfully confident British young female voice";
    wittyNuance = "Charming chuckle and lively pacing matching a tiny bumblebee flexing with superhero swagger";
  } else if (lowerName.includes('astronaut') || lowerName.includes('cosmo')) {
    vocalTone = "Wonder-filled, imaginative, and warmly articulate British young female voice";
    wittyNuance = "Whimsical curiosity and soft cosmic awe mirroring living-room zero-gravity exploration";
  } else if (lowerName.includes('pup') || lowerName.includes('pip') || lowerName.includes('dog')) {
    vocalTone = "Endearing, spirited, and heart-warming British young female voice";
    wittyNuance = "Playful giggle transitioning to fearless triumph as the brave little puppy wags his tail";
  } else if (lowerName.includes('penguin') || lowerName.includes('penelope')) {
    vocalTone = "Sunny, cheerful, and delightfully upbeat British young female voice";
    wittyNuance = "Breezy tropical enthusiasm matching a penguin in a Hawaiian shirt building sandcastles";
  } else if (lowerName.includes('owl') || lowerName.includes('professor')) {
    vocalTone = "Scholarly, witty, warmly eccentric British young female voice";
    wittyNuance = "Amused, affectionate cadence matching a forgetful owl discovering his spectacles on his own head";
  } else if (lowerName.includes('cloud') || lowerName.includes('toby')) {
    vocalTone = "Silky, comforting, deeply soothing British young female voice";
    wittyNuance = "Gentle restful sigh and cozy warmth as heavy burdens turn into a soft rainbow hammock";
  } else if (lowerName.includes('hedgehog') || lowerName.includes('hedgie')) {
    vocalTone = "Spunky, adventurous, and delightfully plucky British young female voice";
    wittyNuance = "Heroic enthusiasm and humorous chivalry for a tiny knight in an acorn helmet";
  } else if (lowerName.includes('lion') || lowerName.includes('rory')) {
    vocalTone = "Jubilant, giggly, and warmly triumphant British young female voice";
    wittyNuance = "Endearing amusement when the little cub's mighty roar turns into a cheerful squeak of praise";
  } else if (lowerName.includes('firefly') || lowerName.includes('lumina')) {
    vocalTone = "Sparkling, radiant, and rhythmic British young female voice";
    wittyNuance = "Bright percussive cheer as the little firefly lights up the entire dark forest";
  } else if (lowerName.includes('sloth')) {
    vocalTone = "Relaxed, melodious, and warmly unhurried British young female voice";
    wittyNuance = "Charming twinkle in the eye and peaceful serenity gazing through a telescope";
  } else if (lowerName.includes('fox')) {
    vocalTone = "Clever, crisp, and enthusiastically articulate British young female voice";
    wittyNuance = "Determined bounce and joyful celebration reaching the summit";
  } else if (lowerName.includes('turtle') || lowerName.includes('titus')) {
    vocalTone = "Cheeky, high-spirited, and articulate British young female voice";
    wittyNuance = "Excited comedic zoom as the little turtle's rocket booster overtakes the speedy hares";
  }

  const voiceProfileDirective = `British young female voice (warm, witty, joyful, articulate Received Pronunciation / modern British accent, ${vocalTone.toLowerCase()}; ${wittyNuance.toLowerCase()}).`;

  // Spoken script from blueprint or constructed
  const audioNarrationScript = b.audioScript || `[Joyful & articulate] Today I declare: ${title}! ${verse ? `"${verse}" — ` : ''}${ref}.`;

  // Comprehensive ElevenLabs / AI Voice Prompt
  const elevenLabsPrompt = `[VOICE PROFILE & DIRECTION - BRITISH YOUNG FEMALE]
• Voice Actor: British Young Female (Age 22-26), Crisp Modern British / RP Accent
• Persona Tone: ${vocalTone}
• Character Context: Speaking alongside ${charName} (${comical || 'Comical & inspiring character'})
• Delivery Nuance: ${wittyNuance}. Crisp diction, zero mumbling, radiant smile audible in every word.
• Recommended ElevenLabs Settings: Stability 0.45, Clarity/Similarity 0.85, Style Exaggeration 0.35
• SCRIPT TO READ (EXACT WORDS ONLY):
"${audioNarrationScript}"`;

  return {
    characterName: charName,
    vocalTone,
    narrationStyle: `${vocalTone} • ${wittyNuance}`,
    wittyComedicNuance: wittyNuance,
    voiceProfileDirective,
    audioNarrationScript,
    elevenLabsPrompt
  };
}
