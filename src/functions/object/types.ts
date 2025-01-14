export type CheckKeys_F = <T extends object>(
  arg: T,
  ...keys: string[]
) => boolean;
