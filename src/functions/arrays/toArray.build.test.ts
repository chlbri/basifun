import { this1 } from '@bemedev/build-tests/constants';
import { t } from '@bemedev/types';
import { createTests } from '@bemedev/vitest-extended';
import type { toArray as func } from './toArray';

const toArray = t.anify<typeof func>();

const { success: useTests } = createTests.withImplementation(toArray, {
  instanciation: () =>
    import(`${this1}/arrays/toArray`).then(({ toArray }) => {
      return toArray;
    }),
  name: 'toArray',
});
describe(
  'toArray',
  useTests(
    {
      invite: 'No value',
      expected: [],
    },
    {
      invite: 'Undefined',
      parameters: undefined,
      expected: [],
    },
    {
      invite: 'string',
      parameters: 'chlbri',
      expected: ['chlbri'],
    },
    {
      invite: 'Array of numbers',
      parameters: [
        Array.from({ length: 10 }).map((_, index) => index + 1),
      ],
      expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
  ),
);
