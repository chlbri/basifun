import type { MaxOrEqualLength_F } from './types';

export const maxOrEqualLength: MaxOrEqualLength_F = (max, value) => {
  return maxOrEqualLength.normal(max, value);
};

maxOrEqualLength.checker = (max, value) => value.length < max + 1;

maxOrEqualLength.low = (max, value) => {
  const bool = maxOrEqualLength.checker(max, value);
  return {
    bool,
    value,
  };
};

maxOrEqualLength.normal = (max, _value) => {
  const { bool, value } = maxOrEqualLength.low(max, _value);
  if (!bool) throw new Error(`"${value}" is greater than ${max}`);
  return value;
};

maxOrEqualLength.strict = maxOrEqualLength.normal as any;

maxOrEqualLength.strictest = maxOrEqualLength.strict;
