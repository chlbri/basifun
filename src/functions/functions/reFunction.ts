import { castings, type types } from '@bemedev/types';
import type { Refunction_F } from './types';

export const reFunction: Refunction_F = (object, fn) => {
  const _fn = object[fn];
  const out = castings.commons.any((...args: any) =>
    (_fn as types.Fn).bind(object)(...args),
  );

  return out;
};
