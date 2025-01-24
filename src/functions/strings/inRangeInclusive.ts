import { maxOrEqualLength } from './maxOrEqualLength';
import { minOrEqualLength } from './minOrEqualLength';
import type { InRangeInclusive_F } from './types';

export const inRangeInclusive: InRangeInclusive_F = (min, max, value) => {
  return inRangeInclusive.normal(min, max, value);
};

inRangeInclusive.checker = (min, max, value) => {
  const check1 = maxOrEqualLength.checker(max, value);
  const check2 = minOrEqualLength.checker(min, value);

  return check1 && check2;
};

inRangeInclusive.low = (min, max, value) => {
  const bool = inRangeInclusive.checker(min, max, value);
  return {
    bool,
    value,
  };
};

inRangeInclusive.normal = (min, max, value) => {
  const out1 = maxOrEqualLength(max, value);
  const out2 = minOrEqualLength(min, out1);

  return out2;
};

inRangeInclusive.strict = inRangeInclusive.normal as any;

inRangeInclusive.strictest = inRangeInclusive.strict;
