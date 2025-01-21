import type { MaxOrEqualLength_F } from './types';

export const maxLength: MaxOrEqualLength_F = (max, value) => {
  if (value.length > max - 1) {
    throw new Error(`"${value}" is greater or equal than ${max}`);
  }

  return value;
};
