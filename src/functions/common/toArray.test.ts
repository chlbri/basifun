import { createTests } from '@bemedev/vitest-extended';
import { objectToArray } from './toArray';

describe('Object to Array', () => {
  const useTests = createTests(objectToArray);

  useTests(
    {
      invite: 'Empty object',
      parameters: {},
      expected: [],
    },
    {
      invite: 'Small object',
      parameters: { a: 'a' },
      expected: ['a'],
    },
    {
      invite: 'Complex object',
      parameters: {
        data: {
          user: 'user',
          phoneNumber: 1233547,
          isAdmin: true,
        },
        length: 1,
      },
      expected: [
        {
          isAdmin: true,
          phoneNumber: 1233547,
          user: 'user',
        },
        1,
      ],
    },
  );
});
