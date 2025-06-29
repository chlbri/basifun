import { t } from '@bemedev/types';
import type { Promisify_F } from '../types';

const myPromisify = (fn: any) => {
  return (...args: any) => {
    return new Promise((resolve, reject) => {
      function customCallback(err: any, ...results: any) {
        if (err) return reject(err);
        console.warn(results.length);
        return resolve(results[0]);
      }
      args.push(customCallback);
      fn.call(this, ...args);
    });
  };
};

/**
 * Promisify a function
 * Strongly typed
 *
 * Credits to : {@link https://youtu.be/RSknW_dGHrU|Types Rocks}
 * @param fn The function to parse
 * @returns A promisified function
 */
export const typedPromisify: Promisify_F = fn => {
  const out = t.any(myPromisify(fn));

  return out;
};
