import { _unknown } from '#bemedev/globals/utils/_unknown';
import { this1 } from '@bemedev/build-tests/constants';
import { createTests } from '@bemedev/vitest-extended';
import type { checkKeys as func } from './checkKeys';

const checkKeys = _unknown<typeof func>();

const { success: useTests } = createTests.withImplementation(checkKeys, {
  instanciation: () =>
    import(`${this1}/object`).then(({ checkKeys }) => checkKeys),
  name: 'checkKeys',
});

describe(
  'Check Keys',
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
  ),
);
