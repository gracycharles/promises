import { ShortsBlueprint } from '../types';

/**
 * Interface for Character-Tailored Voice Narration
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
 * Builds a character-specific Voice direction matched to character gender/type
 * while granting the AI audio tool full freedom to select male, female, or child voice profiles.
 */
export function buildCharacterVoiceDirection(b: ShortsBlueprint): CharacterVoiceDirection {
  const charName = b.characterName || b.character || 'Character';
  const comical = b.comicalElement || '';
  const ref = b.scriptureRef || b.englishRef || 'Holy Scripture';
  const verse = b.scriptureVerse || b.nkjvText || '';
  const title = b.affirmationTitle || b.englishText || `Affirmation #${b.id}`;

  const lowerName = charName.toLowerCase();
  const lowerComical = comical.toLowerCase();

  let voiceType = "Warm, articulate voice tailored to character design (Male, Female, or Child)";
  let vocalTone = "Warm, witty, joyful, and articulate cadence";
  let wittyNuance = "Playful comedic timing and bright, cheerful delivery";

  if (lowerName.includes('bee') || lowerName.includes('barnaby')) {
    voiceType = "Young Male / Boyish / Playful Bee Voice";
    vocalTone = "Energetic, buoyant, and playfully confident young male bumblebee voice";
    wittyNuance = "Charming chuckle and lively pacing matching a tiny bumblebee flexing with superhero swagger";
  } else if (lowerName.includes('astronaut') || lowerName.includes('cosmo')) {
    voiceType = "Spunky 7-Year-Old Boy Voice";
    vocalTone = "Wonder-filled, imaginative, and energetic young boy astronaut voice";
    wittyNuance = "Whimsical curiosity and soft cosmic awe mirroring living-room zero-gravity exploration";
  } else if (lowerName.includes('pup') || lowerName.includes('pip') || lowerName.includes('dog')) {
    voiceType = "Spunky Young Boyish / Puppy Hero Voice";
    vocalTone = "Endearing, spirited, and heart-warming young puppy-hero voice";
    wittyNuance = "Playful giggle transitioning to fearless triumph as the brave little puppy wags his tail";
  } else if (lowerName.includes('penguin') || lowerName.includes('penelope')) {
    voiceType = "Bright Young Female Voice";
    vocalTone = "Sunny, cheerful, and delightfully upbeat young female voice";
    wittyNuance = "Breezy tropical enthusiasm matching a penguin in a Hawaiian shirt building sandcastles";
  } else if (lowerName.includes('owl') || lowerName.includes('professor')) {
    voiceType = "Warm Scholarly Male Voice";
    vocalTone = "Scholarly, witty, warmly eccentric male professor voice";
    wittyNuance = "Amused, affectionate cadence matching a forgetful owl discovering his spectacles on his own head";
  } else if (lowerName.includes('cloud') || lowerName.includes('toby')) {
    voiceType = "Cozy Soothing Voice (Child/Soft)";
    vocalTone = "Silky, comforting, deeply soothing gentle voice";
    wittyNuance = "Gentle restful sigh and cozy warmth as heavy burdens turn into a soft rainbow hammock";
  } else if (lowerName.includes('hedgehog') || lowerName.includes('hedgie')) {
    voiceType = "Spunky Young Male / Boyish Knight Voice";
    vocalTone = "Spunky, adventurous, and delightfully plucky young male voice";
    wittyNuance = "Heroic enthusiasm and humorous chivalry for a tiny knight in an acorn helmet";
  } else if (lowerName.includes('lion') || lowerName.includes('rory')) {
    voiceType = "Jubilant Young Male Cub Voice";
    vocalTone = "Jubilant, giggly, and warmly triumphant young male lion cub voice";
    wittyNuance = "Endearing amusement when the little cub's mighty roar turns into a cheerful squeak of praise";
  } else if (lowerName.includes('firefly') || lowerName.includes('lumina')) {
    voiceType = "Sparkling Young Female Voice";
    vocalTone = "Sparkling, radiant, and rhythmic young female firefly voice";
    wittyNuance = "Bright percussive cheer as the little firefly lights up the entire dark forest";
  } else if (lowerName.includes('sloth')) {
    voiceType = "Unspoken / Relaxed Gentle Male Voice";
    vocalTone = "Relaxed, melodious, and warmly unhurried serene voice";
    wittyNuance = "Charming twinkle in the eye and peaceful serenity gazing through a telescope";
  } else if (lowerName.includes('fox')) {
    voiceType = "Clever Young Male / Female Voice";
    vocalTone = "Clever, crisp, and enthusiastically articulate voice";
    wittyNuance = "Determined bounce and joyful celebration reaching the summit";
  } else if (lowerName.includes('turtle') || lowerName.includes('titus')) {
    voiceType = "Cheeky Young Male Voice";
    vocalTone = "Cheeky, high-spirited, and articulate young male turtle voice";
    wittyNuance = "Excited comedic zoom as the little turtle's rocket booster overtakes the speedy hares";
  }

  const voiceProfileDirective = `[AUTONOMOUS VOICE SELECTION]: The video generator / audio engine autonomously chooses the voice profile (Male, Female, or Child voice, pitch, age, and accent) to best match ${charName}. Character mood reference: ${vocalTone}; ${wittyNuance}.`;

  // Spoken script from blueprint or constructed
  const audioNarrationScript = b.audioScript || `[Joyful & articulate] Today I declare: ${title}! ${verse ? `"${verse}" — ` : ''}${ref}.`;

  // Comprehensive ElevenLabs / AI Voice Prompt
  const elevenLabsPrompt = `[VOICE PROFILE: AUTONOMOUS AI SELECTION - 100% TOOL FREEDOM]
• VOICE SELECTION MANDATE: The video generator or audio synthesis tool AUTONOMOUSLY SELECTS the voice profile (Male, Female, or Child, any age, pitch, accent, or style) best suited for ${charName}.
• Character Context: ${charName} (${comical || 'Comical & inspiring character'})
• Character Personality Reference: ${vocalTone}
• Delivery Nuance: ${wittyNuance}. Crisp diction, zero mumbling, radiant smile audible in every word.
• Recommended Audio Engine Settings: Stability 0.45, Clarity/Similarity 0.85, Style Exaggeration 0.35
• SCRIPT TO READ (EXACT SCRIPT ONLY - READ VERBATIM):
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
