import type { MultiChar_F } from './types';

export const multiChar: MultiChar_F = (char, count, separator = '') => {
  return Array(count).fill(char).join(separator);
};
