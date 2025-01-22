import { this1 } from '@bemedev/build-tests/constants';

import { t } from '@bemedev/types';
import { isDefined as func } from './isDefined';

describe('isDefined', () => {
  let isDefined = t.anify<typeof func>();

  beforeAll(() => {
    return import(this1).then(module => {
      isDefined = module.isDefined;
    });
  });

  test.each([
    ['No value', undefined, false],
    ['string', 'str', true],
    ['number', 50, true],
    ['boolean', true, true],
    ['boolean', false, false],
  ] as const)('#%# => %s', (_, args, expected) => {
    expect(isDefined(args)).toBe(expected);
  });
});
