import { CanonicalPraiseItem } from './types';
import { CANONICAL_BATCH_1_TO_50 } from './batch1to50';
import { CANONICAL_BATCH_51_TO_100 } from './batch51to100';
import { CANONICAL_BATCH_101_TO_150 } from './batch101to150';
import { CANONICAL_BATCH_151_TO_200 } from './batch151to200';
import { CANONICAL_BATCH_201_TO_250 } from './batch201to250';
import { CANONICAL_BATCH_251_TO_300 } from './batch251to300';

export * from './types';

export const CANONICAL_300_PRAISES: Record<number, CanonicalPraiseItem> = {
  ...CANONICAL_BATCH_1_TO_50,
  ...CANONICAL_BATCH_51_TO_100,
  ...CANONICAL_BATCH_101_TO_150,
  ...CANONICAL_BATCH_151_TO_200,
  ...CANONICAL_BATCH_201_TO_250,
  ...CANONICAL_BATCH_251_TO_300
};

export function getCanonicalPraise(id: number): CanonicalPraiseItem | undefined {
  return CANONICAL_300_PRAISES[id];
}
