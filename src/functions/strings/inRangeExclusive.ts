import { maxLength } from './maxLength';
import { minLength } from './minLength';
import type { InRangeExclusive_F } from './types';

export const inRangeExclusive: InRangeExclusive_F = (min, max, value) => {
  return inRangeExclusive.normal(min, max, value);
};

inRangeExclusive.checker = (min, max, value) => {
  const check1 = maxLength.checker(max, value);
  const check2 = minLength.checker(min, value);

  return check1 && check2;
};

inRangeExclusive.low = (min, max, value) => {
  const bool = inRangeExclusive.checker(min, max, value);
  return {
    bool,
    value,
  };
};

inRangeExclusive.normal = (min, max, value) => {
  const out1 = maxLength(max, value);
  const out2 = minLength(min, out1);

  return out2;
};

inRangeExclusive.strict = inRangeExclusive.normal as any;

inRangeExclusive.strictest = inRangeExclusive.strict;
