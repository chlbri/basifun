import { createTests } from '@bemedev/vitest-extended';
import { identify } from './identify';

const { success, acceptation } = createTests(identify<{ value: number }>);

describe('#0 => Acceptation', acceptation);

describe(
  '#1 => Tests',
  success(
    {
      invite: 'No value',
      expected: [],
    },
    {
      invite: 'Empty object',
      parameters: {},
      expected: [],
    },
    {
      invite: 'Object',
      parameters: {
        state1: { value: 55 },
        state2: { value: 45 },
      },
      expected: [
        {
          __id: 'state1',
          value: 55,
        },
        {
          __id: 'state2',
          value: 45,
        },
      ],
    },
  ),
);
