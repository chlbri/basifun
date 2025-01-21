import type { MinOrEqualLength_F } from './types';

export const minOrEqualLength: MinOrEqualLength_F = (min, str) => {
  if (str.length < min) {
    throw new Error(`"${str}" is shorter than ${min}`);
  }

  return str;
};
