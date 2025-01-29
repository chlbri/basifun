export type CheckKeys_F = <T extends object>(
  arg: T,
  ...keys: string[]
) => boolean;

export type ObjectToArray_F = <T extends Record<string, any>>(
  object: T,
) => T[string][];

export type Identitfy<T> = T extends object ? T & { __id: string } : T;

export type Identify_F = <const T extends object>(
  arg?: Record<string, T>,
) => Identitfy<T>[];
