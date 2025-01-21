import type { MaxLength_F } from './types';

export const maxOrEqualLength: MaxLength_F = (max, str) => {
  if (str.length > max) {
    throw new Error(`"${str}" is greater than ${max}`);
  }

  return str;
};
