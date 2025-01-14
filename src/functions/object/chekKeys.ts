import type { CheckKeys_F } from './types';

export const checkKeys: CheckKeys_F = (arg, ...keys) => {
  const argKeys = Object.keys(arg);
  for (const key of keys) {
    const check = !argKeys.includes(key);
    if (check) return false;
  }
  return true;
};
