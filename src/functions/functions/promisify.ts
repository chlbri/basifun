import { t } from '@bemedev/types';
import { promisify } from 'node:util';
import type { Promisify_F } from './types';

/**
 * Promisify a function
 * Strongly typed
 *
 * Credits to : {@link https://youtu.be/RSknW_dGHrU|Types Rocks}
 * @param fn The function to parse
 * @returns A promisified function
 */
export const typedPromisify: Promisify_F = fn => {
  const out = t.anify<any>(promisify(fn));

  return out;
};
