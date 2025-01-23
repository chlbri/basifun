import type { Fn } from '@bemedev/types';

export const genericFunction =
  <P extends any[], R = any>(fn: Fn<P, R>) =>
  (...params: P) =>
    fn(...params);
