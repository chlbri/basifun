import { createTests } from '@bemedev/vitest-extended';
import { reFunction } from 'this1';

describe('reFunction', () => {
  const obj = {
    val: 5,
    parse: (val: number) => ++val,
  };

  const func = reFunction(obj, 'parse');
  const _useTests = createTests(func);

  const useTests = (...params: [number, number][]) => {
    const testArgs = params.map(([parameters, expected]) => {
      const invite = `${parameters} -> ${expected}`;

      return { invite, parameters, expected };
    }) satisfies Parameters<typeof _useTests>;

    _useTests(...testArgs);
  };

  useTests([1, 2], [2, 3], [10, 11], [9999, 10_000]);
});
