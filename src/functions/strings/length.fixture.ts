import type { Fn } from '@bemedev/types';
import { createTests } from '@bemedev/vitest-extended';
import { partialCall } from '../functions';

export type Arg = { invite: string; value: string };
type Args = { errors: Arg[]; success: Arg[] };

type _ConstructLength = <P extends any[], R extends string>(
  fn: Fn<[...P, R], R>,
  error: Fn<[...P, string], string | undefined>,
  ...params: P
) => (params: Args) => void;

const _constructLength: _ConstructLength = (fn, error, ...params) => {
  // #region Config
  const actual: Fn<[string], string> = partialCall(fn as any, ...params);
  const toError = (str: string) => error(...params, str);
  const { success, fails } = createTests(actual, toError);
  // #endregion

  const out = ({ errors: _errors, success: _success }: Args) => {
    const tests = _success.map(({ invite, value }) => ({
      invite,
      parameters: value,
      expected: value,
    }));

    const errors = _errors.map(({ invite, value }) => ({
      invite,
      parameters: value,
    }));

    describe('#1 => Errors', fails(...errors));
    describe('#2 => Success', success(...tests));
  };

  return out;
};

type ConstructLength = <P extends any[], R extends string>(
  fn: Fn<[...P, R], R>,
  error: Fn<[...P, string], string | undefined>,
) => (...params: P) => (params: Args) => void;

export const constructLength: ConstructLength = (fn, error) => {
  return partialCall(_constructLength, fn, error);
};
