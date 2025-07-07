import { this1 } from '@bemedev/build-tests/constants';
import { typings } from '@bemedev/types';
import { createTests } from '@bemedev/vitest-extended';
import type { identify as func } from './identify';

const identify = typings.commons.unknown<typeof func>();

const { success, acceptation } = createTests.withImplementation(identify, {
  instanciation: () =>
    import(`${this1}/objects/identify`).then(({ identify }) => identify),
  name: 'identify',
});

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
