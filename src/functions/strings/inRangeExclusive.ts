import { maxLength } from './maxLength';
import { minLength } from './minLength';
import type { InRangeExclusive_F } from './types';

export const inRangeExclusive: InRangeExclusive_F = (min, max, _value) => {
  const value: any = _value;
  const out1: any = maxLength(max, value);
  const out2: any = minLength(min, out1);

  return out2;
};
