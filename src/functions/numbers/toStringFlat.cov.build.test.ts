import { this1 } from '@bemedev/build-tests/constants';
import { typings } from '@bemedev/types';
import { createTests } from '@bemedev/vitest-extended';
import type { toStringFlat as func } from './toStringFlat';

const toStringFlat = typings.commons.unknown<typeof func>();

const { success: useTests } = createTests.withImplementation(
  toStringFlat,
  {
    instanciation: () =>
      import(`${this1}/numbers/toStringFlat`).then(
        ({ toStringFlat }) => toStringFlat,
      ),
    name: 'toStringFlat',
  },
);

describe(
  'Covering the function "toStringFlat" ',
  useTests(
    {
      invite: 'For str = "" and len = 1',
      parameters: [1, 1],
      expected: '1',
    },
    {
      invite: 'For str = "" and len = 10',
      parameters: [1, 10],
      expected: '01',
    },
  ),
);
