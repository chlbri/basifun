export type CheckKeys_F = <T extends object>(
  arg: T,
  ...keys: string[]
) => boolean;

export type ObjectToArray_F = <T extends Record<string, any>>(
  object: T,
) => T[string][];
