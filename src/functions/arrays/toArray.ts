import { isDefined } from '../types';
import { isArray } from './isArray';

export interface ToArray_F {
  <T>(obj: any): T[];
  typed: <T>(obj: T | T[] | readonly T[]) => Exclude<T, undefined>[];
}

export const toArray: ToArray_F = obj => {
  if (isArray(obj)) {
    return obj;
  } else {
    const check = isDefined(obj);
    if (!check) return [];
    return [obj];
  }
};

toArray.typed = toArray;
