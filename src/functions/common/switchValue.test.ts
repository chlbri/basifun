import type { NOmit } from '@bemedev/types';
import { useEach } from '@bemedev/vitest-extended';
import { toString2 } from '../numbers/toString2';
import { switchValue } from './switchValue';

const useTests = useEach(switchValue);

type Args<T> = {
  invite: string;
} & NOmit<Parameters<typeof switchValue<T>>[0], 'condition'>;

type Func = <T>(params: Args<T>) => any;

const mapper: Func = ({ invite, first, second }) => {
  return describe(invite, () => {
    useTests(
      ['#1 => condition = undefined', [{ first, second }], second],
      [
        '#2 => condition = true',
        [{ condition: true, first, second }],
        first,
      ],
      [
        '#3 => condition = false',
        [{ condition: false, first, second }],
        second,
      ],
    );
  });
};

type Func2 = <T>(...params: Args<T>[]) => any;

const describe2: Func2 = (...params) => {
  const len = params.length;
  params.forEach(({ invite: str, ...params }, index) => {
    const invite = `#${toString2(index + 1, len)} => ${str}`;
    return mapper({ invite, ...params });
  });
};

describe2<any>(
  { invite: 'string', first: 'first', second: 'second' },
  { invite: 'number', first: 1, second: 2 },
);
