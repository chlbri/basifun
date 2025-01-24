import type { MinOrEqualLength_F } from './types';

export const minOrEqualLength: MinOrEqualLength_F = (min, value) => {
  return minOrEqualLength.normal(min, value);
};

minOrEqualLength.checker = (minLength, value) =>
  value.length > minLength - 1;

minOrEqualLength.low = (minLength, value) => {
  const bool = minOrEqualLength.checker(minLength, value);
  return {
    bool,
    value,
  };
};

minOrEqualLength.normal = (min, _value) => {
  const { bool, value } = minOrEqualLength.low(min, _value);
  if (!bool) throw new Error(`"${value}" is shorter than ${min}`);
  return value;
};

minOrEqualLength.strict = minOrEqualLength.normal as any;

minOrEqualLength.strictest = minOrEqualLength.strict;
