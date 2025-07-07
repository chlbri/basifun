import type { types } from '@bemedev/types';

export type ToPromise_F = <P extends any[], R = any>(
  f: types.Fn<P, R>,
  _this?: any,
) => (...args: P) => Promise<R>;

export const toPromise: ToPromise_F = (f, _this = null) => {
  return async (...args) => f.apply(_this, args);
};
