import { ShortsBlueprint } from '../../types';
import { AFFIRMATIONS_51_TO_60 } from './affirmations51to60';
import { AFFIRMATIONS_61_TO_70 } from './affirmations61to70';
import { AFFIRMATIONS_71_TO_80 } from './affirmations71to80';
import { AFFIRMATIONS_81_TO_90 } from './affirmations81to90';
import { AFFIRMATIONS_91_TO_100 } from './affirmations91to100';

export const AFFIRMATIONS_51_TO_100: ShortsBlueprint[] = [
  ...AFFIRMATIONS_51_TO_60,
  ...AFFIRMATIONS_61_TO_70,
  ...AFFIRMATIONS_71_TO_80,
  ...AFFIRMATIONS_81_TO_90,
  ...AFFIRMATIONS_91_TO_100,
];

export {
  AFFIRMATIONS_51_TO_60,
  AFFIRMATIONS_61_TO_70,
  AFFIRMATIONS_71_TO_80,
  AFFIRMATIONS_81_TO_90,
  AFFIRMATIONS_91_TO_100,
};
