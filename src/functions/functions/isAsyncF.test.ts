import { createTests } from '@bemedev/vitest-extended';
import { readFile, writeFile } from 'node:fs/promises';
import { isAsyncF } from './isAsyncF';

describe('isAsyncF', () => {
  const { acceptation, success } = createTests(isAsyncF);

  describe('#0 => Acceptation', acceptation);

  describe(
    '#1 => Success',
    success(
      {
        invite: 'node:fs - writeFile',
        parameters: writeFile,
        expected: true,
      },
      {
        invite: 'node:fs - readFile',
        parameters: readFile,
        expected: true,
      },
    ),
  );
});
