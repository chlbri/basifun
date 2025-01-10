import { createTests } from '@bemedev/vitest-extended';

// @ts-expect-error for build
import { isDefined } from 'this-gen-1';

describe('isDefined', () => {
  const useTests = createTests(isDefined);

  useTests(
    { expected: false, invite: 'no Value' },
    { expected: false, invite: 'undefined', parameters: [undefined] },
    { expected: true, invite: 'number : 9', parameters: 9 },
    { expected: false, invite: 'boolean : false', parameters: false },
    { expected: true, invite: 'boolean : true', parameters: [true] },
  );
});
