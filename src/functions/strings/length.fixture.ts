import type { Fn } from '@bemedev/types';
import { createTests } from '@bemedev/vitest-extended';
import { partialCall } from '../functions';

export type Arg = { invite: string; value: string };
type Args = { errors: Arg[]; success: Arg[] };

type _ConstructLength = <P extends any[], R = any>(
  fn: Fn<[...P, R], R>,
  error?: Fn<[...P, string], string | undefined>,
  ...params: P
) => (params: Args) => void;

const _constructLength: _ConstructLength = (
  fn,
  error = () => undefined,
  ...params
) => {
  const actual: Fn<[string], string> = partialCall(fn as any, ...params);

  const out = ({ errors, success }: Args) => {
    describe('#1 => Errors', () => {
      errors.forEach(({ invite, value }) => {
        test(invite, () => {
          expect(() => actual(value)).toThrowError(
            error(...params, value),
          );
        });
      });
    });

    describe('#2 => Success', () => {
      const useTests = createTests(actual);
      const tests = success.map(({ invite, value }) => ({
        invite,
        parameters: value,
        expected: value,
      }));

      useTests(...tests);
    });
  };

  return out;
};

type ConstructLength = <P extends any[], R = any>(
  fn: Fn<[...P, R], R>,
  error?: Fn<[...P, string], string | undefined>,
) => (...params: P) => (params: Args) => void;

export const constructLength: ConstructLength = (fn, error) => {
  return partialCall(_constructLength, fn, error);
};
