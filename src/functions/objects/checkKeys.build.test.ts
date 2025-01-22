import { this1 } from '@bemedev/build-tests/constants';
import { t } from '@bemedev/types';
import { createTests } from '@bemedev/vitest-extended';
import type { checkKeys as func } from './checkKeys';

describe('Check Keys', () => {
  const checkKeys = t.anify<typeof func>();

  const useTests = createTests(checkKeys, () =>
    import(`${this1}/objects/checkKeys`).then(
      ({ checkKeys }) => checkKeys,
    ),
  );

  useTests(
    {
      invite: 'No keys to check 1',
      parameters: {},
      expected: true,
    },
    {
      invite: 'No keys to check 1',
      parameters: { data: 'user' },
      expected: true,
    },
    {
      invite: 'Check, but not find all keys',
      parameters: [{ data: 'user' }, 'notMe1', 'notKey1'],
      expected: false,
    },
    {
      invite: 'Check, but on key is not found',
      parameters: [{ data: 'user' }, 'data', 'notKey1'],
      expected: false,
    },
    {
      invite: 'Check, and one key is found',
      parameters: [{ data: 'user', length: 2 }, 'data'],
      expected: true,
    },
    {
      invite: 'Check, and all keys are found',
      parameters: [{ data: 'user', length: 2 }, 'data', 'length'],
      expected: true,
    },
  );
});
