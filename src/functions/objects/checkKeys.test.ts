import { createTests } from '@bemedev/vitest-extended';
import { checkKeys } from './checkKeys';

const { success: useTests } = createTests(checkKeys);
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
