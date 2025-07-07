import type { types } from '@bemedev/types';

export type isArray_F = <T>(value: unknown) => value is T[];

export type Asyncfy_F = <P extends any[], R = any>(
  fn: types.Fn<P, R>,
) => types.Fn<P, Promise<R>>;
