import { isDefined } from '../types';
import { isArray } from './isArray';
import type { ToArray_F } from './types';

export const toArray: ToArray_F = obj => {
  if (isArray(obj)) {
    return obj;
  } else {
    const isUndefined = isDefined(obj);
    if (isUndefined) return [] as any;
    return [obj];
  }
};
