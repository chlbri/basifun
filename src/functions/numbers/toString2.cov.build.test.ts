import { this1 } from '@bemedev/build-tests/constants';
import { t } from '@bemedev/types';
import { createTests } from '@bemedev/vitest-extended';
import type { toString2 as func } from './toString2';

const toString2 = t.anify<typeof func>();

const { success: useTests } = createTests.withImplementation<typeof func>(
  toString2,
  {
    instanciation: () => import(this1).then(({ toString2 }) => toString2),
    name: 'toString2',
  },
);

describe(
  'Covering the function "toString2" ',
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
