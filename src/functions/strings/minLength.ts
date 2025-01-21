import type { MinLength_F } from './types';

export const minLength: MinLength_F = (min, value) => {
  if (value.length < min + 1) {
    throw new Error(`"${value}" is shorter or equal than ${min}`);
  }

  return value;
};
