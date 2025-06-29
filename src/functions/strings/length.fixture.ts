import type { Fn } from '@bemedev/types';
import { createTests } from '@bemedev/vitest-extended';
import { partialCall } from '../functions';

export type Arg = { invite: string; value: string };
type Args = { errors: Arg[]; success: Arg[] };

const _constructLength = <P extends any[]>(
  fn: Fn<[...P, string], string>,
  error: Fn<[...P, string], string | undefined>,
  ...params: P
) => {
  // #region Config
  const actual = partialCall<P, [string], string>(fn, ...params);
  const toError = (str: string) => error(...params, str);
  const { success, fails, acceptation } = createTests(actual, { toError });
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

    describe('#0 => Acceptation', acceptation);
    describe('#1 => Errors', fails(...errors));
    describe('#2 => Success', success(...tests));
  };

  return out;
};

type ConstructLength = <P extends any[]>(
  fn: Fn<[...P, string], string>,
  error: Fn<[...P, string], string | undefined>,
) => (...params: P) => (params: Args) => void;

export const constructLength: ConstructLength = (fn, error) => {
  return partialCall(_constructLength, fn, error);
};
