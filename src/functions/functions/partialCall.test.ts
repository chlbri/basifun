import type { Fn } from '@bemedev/types';
import { useEach } from '@bemedev/vitest-extended';
import { toString2 } from '../numbers/toString2';
import { partialCall } from './partialCall';

const add: Fn<[number, number], number> = (val1, val2) => val1 + val2;

describe('#1 => same', () => {
  const same = partialCall(add);
  const _useTests = useEach(same);

  const useTests = (...params: [number, number, number][]) => {
    const len = params.length;

    const testArgs = params.map(([arg1, arg2, expected], index) => {
      const invite = `#${toString2(index + 1, len)} => ${arg1} + ${arg2} -> ${expected}`;
      return [invite, [arg1, arg2], expected];
    }) satisfies Parameters<typeof _useTests>;

    _useTests(...testArgs);
  };

  useTests(
    [0, 0, 0],
    [0, 1, 1],
    [10, 10, 20],
    [0, 100, 100],
    [51, 49, 100],
    [9_999, 1, 10_000],
  );
});

describe('#2 => reduced', () => {
  const add10 = partialCall(add, 10);
  const _useTests = useEach(add10);

  const useTests = (...params: [number, number][]) => {
    const len = params.length;

    const testArgs = params.map(([arg, expected], index) => {
      const invite = `#${toString2(index + 1, len)} => 10 + ${arg} -> ${expected}`;
      return [invite, [arg], expected];
    }) satisfies Parameters<typeof _useTests>;

    _useTests(...testArgs);
  };

  useTests(
    [0, 10],
    [1, 11],
    [10, 20],
    [90, 100],
    [100, 110],
    [9_990, 10_000],
    [43, 53],
    [2, 12],
    [20, 30],
    [89, 99],
    [1000, 1010],
    [99_990, 100_000],
  );
});
