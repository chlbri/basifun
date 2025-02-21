import type { Asyncfy_F } from '../../arrays/types';

export const asyncfy: Asyncfy_F = fn => {
  return async (...args) => fn(...args);
};
