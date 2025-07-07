import type { types } from '@bemedev/types';

export const log10: types.Fn<[value: number], number> = (
  value: number,
) => {
  return Math.floor(Math.log10(value));
};
