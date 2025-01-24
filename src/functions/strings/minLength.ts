import type { MinLength_F } from './types';

export const minLength: MinLength_F = (min, value) => {
  return minLength.normal(min, value);
};

minLength.checker = (min, value) => value.length > min;

minLength.low = (min, value) => {
  const bool = minLength.checker(min, value);
  return {
    bool,
    value,
  };
};

minLength.normal = (min, _value) => {
  const { bool, value } = minLength.low(min, _value);
  if (!bool) throw new Error(`"${value}" is shorter or equal than ${min}`);
  return value;
};

minLength.strict = minLength.normal as any;

minLength.strictest = minLength.strict;
