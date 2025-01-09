import type { AllowedNames, ArrayR, SubType } from '#types';
import { type Fn } from '@bemedev/types';

type KeysFn<T extends object = object> = keyof SubType<T, Fn>;

export type Refunction_F = <
  T extends object = object,
  FnKey extends KeysFn<T> = AllowedNames<T, Fn>,
>(
  object: T,
  fn: FnKey,
) => T[FnKey];

export type PartialCall_F = <T extends ArrayR, U extends ArrayR, R>(
  f: Fn<[...T, ...U], R>,
  ...headArgs: T
) => (...tailArgs: U) => R;
