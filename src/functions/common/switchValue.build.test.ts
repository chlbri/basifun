import type { NOmit } from '@bemedev/types';
import { useEach } from '@bemedev/vitest-extended';

import { switchValue, toString2 } from 'this-gen-1';

const useTests = useEach(switchValue);

type Args<T> = {
  invite: string;
} & NOmit<Parameters<typeof switchValue<T>>[0], 'condition'>;

type Func = <T>(params: Args<T>) => any;

const mapper: Func = ({ invite, first, second }) => {
  return describe(invite, () => {
    useTests(
      {
        invite: '#1 => condition = undefined',
        parameters: { first, second },
        expected: second,
      },
      {
        invite: '#2 => condition = true',
        parameters: { condition: true, first, second },
        expected: first,
      },
      {
        invite: '#3 => condition = false',
        parameters: { condition: false, first, second },
        expected: second,
      },
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

describe('switchValue', () => {
  describe2<any>(
    { invite: 'string', first: 'first', second: 'second' },
    { invite: 'number', first: 1, second: 2 },
  );
});
