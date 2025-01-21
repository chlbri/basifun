import type { Fn } from '@bemedev/types';

export const genericFunction =
  <P extends any[]>(fn: Fn<P>) =>
  (...params: P) =>
    fn(...params);
