import { switchV } from '../booleans';
import { isDefined } from '../types';
import { isArray } from './isArray';
import type { ToArray_F } from './types';

export const toArray: ToArray_F = obj => {
  const out = switchV({
    condition: isArray(obj),
    truthy: obj,
    falsy: switchV(isDefined(obj), [obj], []),
  });

  return out;
};
