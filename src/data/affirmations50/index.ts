import { ShortsBlueprint } from '../../types';
import { AFFIRMATIONS_1_TO_10 } from './affirmations1to10';
import { AFFIRMATIONS_11_TO_20 } from './affirmations11to20';
import { AFFIRMATIONS_21_TO_30 } from './affirmations21to30';
import { AFFIRMATIONS_31_TO_40 } from './affirmations31to40';
import { AFFIRMATIONS_41_TO_50 } from './affirmations41to50';

export const ALL_50_AFFIRMATIONS_BLUEPRINTS: ShortsBlueprint[] = [
  ...AFFIRMATIONS_1_TO_10,
  ...AFFIRMATIONS_11_TO_20,
  ...AFFIRMATIONS_21_TO_30,
  ...AFFIRMATIONS_31_TO_40,
  ...AFFIRMATIONS_41_TO_50,
];

export {
  AFFIRMATIONS_1_TO_10,
  AFFIRMATIONS_11_TO_20,
  AFFIRMATIONS_21_TO_30,
  AFFIRMATIONS_31_TO_40,
  AFFIRMATIONS_41_TO_50,
};
