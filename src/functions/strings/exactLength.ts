import type { ExactLength_F } from './types';

export const exactLength: ExactLength_F = (exact, value) => {
  if (value.length !== exact) {
    throw new Error(`"${value}".length is not equal to ${exact}`);
  }

  return value;
};
