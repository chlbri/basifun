import { createTests } from '@bemedev/vitest-extended';
import { isDefined } from './isDefined';
import { IS_DEFINED_TESTS } from './isDefined.fixture';

describe('isDefined', () => {
  const { acceptation, success } = createTests(isDefined);

  describe('#00 => acceptation', acceptation);

  describe('#01 => success', success(...IS_DEFINED_TESTS));
});
