import type { Fn } from '#bemedev/globals/types';

export const log10: Fn<[value: number], number> = (value: number) => {
  return Math.floor(Math.log10(value));
};
