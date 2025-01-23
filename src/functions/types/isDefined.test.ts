import { createTests } from '@bemedev/vitest-extended';
import { isDefined } from './isDefined';

const { success: useTests } = createTests(isDefined);
describe(
  'isDefined',
  useTests(
    { expected: false, invite: 'no Value' },
    { expected: false, invite: 'undefined', parameters: [undefined] },
    { expected: true, invite: 'number : 9', parameters: 9 },
    { expected: false, invite: 'boolean : false', parameters: false },
    { expected: true, invite: 'boolean : true', parameters: [true] },
  ),
);
