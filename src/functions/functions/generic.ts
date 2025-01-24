import type { GenericFunction_F } from './types';

export const genericFunction: GenericFunction_F = fn => {
  return (...params) => fn(...params);
};
