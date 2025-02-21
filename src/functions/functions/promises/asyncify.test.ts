import { createTests } from '@bemedev/vitest-extended';
import { isArray } from '../../arrays/isArray';
import { asyncfy } from './asyncify';

describe('Asyncify', () => {
  const { success, acceptation } = createTests(asyncfy(isArray));

  describe('#0 => Acceptation', acceptation);
  describe(
    '#1 => Success',
    success(
      {
        invite: 'array',
        parameters: [[1, 2, 3]],
        expected: true,
      },
      {
        invite: 'Not Array, boolean',
        parameters: [true],
        expected: false,
      },
    ),
  );
});
