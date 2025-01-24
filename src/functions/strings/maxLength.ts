import type { MaxLength_F } from './types';

export const maxLength: MaxLength_F = (max, value) => {
  return maxLength.normal(max, value);
};

maxLength.checker = (max, value) => value.length < max;

maxLength.low = (max, value) => {
  const bool = maxLength.checker(max, value);
  return {
    bool,
    value,
  };
};

maxLength.normal = (max, _value) => {
  const { bool, value } = maxLength.low(max, _value);
  if (!bool) throw new Error(`"${value}" is greater or equal than ${max}`);
  return value;
};

maxLength.strict = maxLength.normal as any;

maxLength.strictest = maxLength.strict;
