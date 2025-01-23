import type { Fn } from '@bemedev/types';

export const isAsyncF = <
  Func extends { params: any[]; return: any } = {
    params: any[];
    return: any;
  },
>(
  func: any,
): func is Fn<Func['params'], Promise<Func['return']>> => {
  const check1 = func[Symbol.toStringTag] === 'AsyncFunction';
  const check2 = func.constructor.name === 'AsyncFunction';

  /* v8 ignore next 1 */
  const AsyncFunction = (async () => {}).constructor;
  const check3 = func instanceof AsyncFunction;

  /* v8 ignore next 1 */
  return check1 || check2 || check3;
};
