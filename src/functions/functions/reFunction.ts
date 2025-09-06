import type { Fn } from '#bemedev/globals/types';
import type { Refunction_F } from './types';

export const reFunction: Refunction_F = (object, fn) => {
  const _fn = object[fn];
  const out: any = (...args: any) => (_fn as Fn).bind(object)(...args);

  return out;
};
