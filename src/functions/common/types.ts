import type { Fn } from '@bemedev/types';

export type SwitchValue_F = <T>(params: {
  condition?: boolean;
  first: T;
  second: T;
}) => T;

export type Asyncfy_F = <P extends any[], R = any>(
  fn: Fn<P, R>,
) => Fn<P, Promise<R>>;

export type ObjectToArray_F = <T extends Record<string, any>>(
  object: T,
) => T[string][];
