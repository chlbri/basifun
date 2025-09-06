import type { Fn } from '#bemedev/globals/types';
import { useEach } from '@bemedev/vitest-extended';
import { toStringFlat } from '../numbers/toStringFlat';
import { partialCallO } from './partialCallO';

const add: Fn<[{ valN: number; valS: string }], string> = ({
  valN,
  valS,
}) => valS + valN;

describe('#1 => same', () => {
  const same = partialCallO(add);
  const _useTests = useEach(same);

  const useTests = (...params: [number, string, string][]) => {
    const len = params.length;

    const testArgs = params.map(([valN, valS, expected], index) => {
      const invite = `#${toStringFlat(index + 1, len)} => ${valS} + ${valN} -> ${expected}`;

      const parameters = { valN, valS };
      return { invite, parameters, expected };
    }) satisfies Parameters<typeof _useTests>;

    _useTests(...testArgs);
  };

  useTests(
    [0, '', '0'],
    [0, '1', '10'],
    [10, '10', '1010'],
    [0, '100', '1000'],
    [51, 'vision', 'vision51'],
  );
});

describe('#2 => reduced', () => {
  const valS = 'number : ';
  const reduced = partialCallO(add, { valS });
  const _useTests = useEach(reduced);

  const useTests = (...params: [number, string][]) => {
    const len = params.length;

    const testArgs = params.map(([valN, expected], index) => {
      const invite = `#${toStringFlat(index + 1, len)} => ${valS} + ${valN} -> ${expected}`;

      const parameters = { valN };
      return { invite, parameters, expected };
    }) satisfies Parameters<typeof _useTests>;

    _useTests(...testArgs);
  };

  useTests(
    [0, 'number : 0'],
    [1, 'number : 1'],
    [10, 'number : 10'],
    [90, 'number : 90'],
    [100, `${valS}100`],
  );
});
