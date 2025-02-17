import { t } from '@bemedev/types';
import type { PartialCallO_F } from './types';

/**
 * Reducer for function with ***one object*** parameter which
 *
 * @param f The function to test
 * @param headArgs First arguments for reducing
 * @returns A new function without the ***headArgs*** provided
 */
export const partialCallO: PartialCallO_F = (f, headArgs) => {
  return remainArgs => {
    const params = t.any({ ...remainArgs, ...headArgs });
    return f(params);
  };
};
