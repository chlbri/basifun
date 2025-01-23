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

export type PartialCall_F = <
  T extends ArrayR = ArrayR,
  U extends ArrayR = ArrayR,
  R = any,
>(
  f: Fn<[...T, ...U], R>,
  ...headArgs: T
) => (...tailArgs: U) => R;

export type PartialCallO_F = <T extends object, U extends T, R>(
  f: Fn<[arg: U], R>,
  headArgs?: T,
) => Fn<[remainArgs: Omit<U, keyof T>], R>;

export type CallBackError = (err: any) => void;

export type CallBackResult<T = any> = (err: any, result: T) => void;

export type Callback = CallBackError | CallBackResult;

type GetResult<Cb extends Callback> = Parameters<Cb>['length'] extends 2
  ? Parameters<Cb>[1]
  : void;

type CbParams = [...any[], Callback];

export type ResultFrom<T> = T extends [
  ...infer Args extends any[],
  infer Cb extends Callback,
]
  ? Fn<Args, Promise<GetResult<Cb>>>
  : never;

export type Promisify_F = <T extends CbParams>(fn: Fn<T>) => ResultFrom<T>;
