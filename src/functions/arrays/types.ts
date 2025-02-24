import type { Fn } from '@bemedev/types';

export type isArray_F = <T>(value: unknown) => value is T[];

export type Asyncfy_F = <P extends any[], R = any>(
  fn: Fn<P, R>,
) => Fn<P, Promise<R>>;
