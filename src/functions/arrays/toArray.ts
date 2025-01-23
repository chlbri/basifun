import { switchV } from '../common';
import { isDefined } from '../types';
import { isArray } from './isArray';
import type { ToArray_F } from './types';

export const toArray: ToArray_F = obj => {
  const out = switchV({
    condition: isArray(obj),
    first: obj,
    second: switchV({
      condition: isDefined(obj),
      first: [obj],
      second: [],
    }),
  });

  return out;
};
