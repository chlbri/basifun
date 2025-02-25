import { this1 } from '@bemedev/build-tests/constants';

import { createTests } from '@bemedev/vitest-extended';
import { isDefined as func } from './isDefined';
import { IS_DEFINED_TESTS } from './isDefined.fixture';

describe('isDefined', () => {
  const { acceptation, success } = createTests.withImplementation(func, {
    instanciation: () => import(this1).then(module => module.isDefined),
    name: 'isDefined',
  });

  describe('#00 => acceptation', acceptation);

  describe('#01 => success', success(...IS_DEFINED_TESTS));
});
