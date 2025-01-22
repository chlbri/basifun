import { maxOrEqualLength } from './maxOrEqualLength';
import { minOrEqualLength } from './minOrEqualLength';
import type { InRangeInclusive_F } from './types';

export const inRangeInclusive: InRangeInclusive_F = (min, max, _value) => {
  const value: any = _value;
  const out1: any = maxOrEqualLength(max, value);
  const out2: any = minOrEqualLength(min, out1);

  return out2;
};
