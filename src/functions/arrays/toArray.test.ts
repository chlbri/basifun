import { createTests } from '@bemedev/vitest-extended';
import { toArray } from './toArray';

describe('toArray', () => {
  const useTests = createTests(toArray);

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
  );
});
