import type { ExactLength_F } from './types';

export const exactLength: ExactLength_F = (exact, value) => {
  return exactLength.normal(exact, value);
};

exactLength.checker = (exact, value) => value.length === exact;

exactLength.low = (exact, value) => {
  const bool = exactLength.checker(exact, value);
  return {
    bool,
    value,
  };
};

exactLength.normal = (exact, _value) => {
  const { bool, value } = exactLength.low(exact, _value);
  if (!bool) throw new Error(`"${value}".length is not equal to ${exact}`);
  return value;
};

exactLength.strict = exactLength.normal as any;

exactLength.strictest = exactLength.strict;
