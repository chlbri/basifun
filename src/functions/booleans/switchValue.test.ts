import { castings } from '@bemedev/types';
import { createTests } from '@bemedev/vitest-extended';
import { switchV } from './switchValue';

describe('switchValue', () => {
  const { acceptation, success } = createTests(switchV);

  describe('#00 Acceptation', acceptation);

  describe(
    '#01 Success',
    success(
      {
        invite: 'Object with true condition',
        parameters: castings.commons.any({
          condition: true,
          truthy: 'yes',
          falsy: 'no',
        }),
        expected: 'yes',
      },
      {
        invite: 'Object with false condition',
        parameters: castings.commons.any({
          condition: false,
          truthy: 1,
          falsy: 0,
        }),
        expected: 0,
      },
      {
        invite: 'Direct parameters with true',
        parameters: [true, 'enabled', 'disabled'],
        expected: 'enabled',
      },
      {
        invite: 'Direct parameters with false',
        parameters: [false, 'on', 'off'],
        expected: 'off',
      },
    ),
  );
});
