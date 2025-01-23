import type { MaxOrEqualLength_F } from './types';

export const maxOrEqualLength: MaxOrEqualLength_F = (max, str) => {
  if (str.length > max) {
    throw new Error(`"${str}" is greater than ${max}`);
  }

  return str;
};
