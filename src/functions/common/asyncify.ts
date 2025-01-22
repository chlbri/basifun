import type { Asyncfy_F } from './types';

export const asyncfy: Asyncfy_F = fn => {
  return async (...args) => fn(...args);
};
