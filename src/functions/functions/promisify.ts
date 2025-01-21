import { t } from '@bemedev/types';
import { promisify } from 'node:util';
import type { Promisify_F } from './types';

export const typedPromisify: Promisify_F = fn => {
  const out = t.anify<any>(promisify(fn));

  return out;
};
