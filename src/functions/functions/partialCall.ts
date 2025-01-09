import type { PartialCall_F } from './types';

export const partialCall: PartialCall_F = (f, ...headArgs) => {
  return (...tailArgs) => f(...headArgs, ...tailArgs);
};
