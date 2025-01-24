import { createTests } from '@bemedev/vitest-extended';
import { partialCall } from '../functions';
import { inRangeInclusive } from './inRangeInclusive';
import { constructLength } from './length.fixture';
import { multiChar } from './multiChar';

describe('exactLength', () => {
  const constructTests = constructLength(
    inRangeInclusive,
    (min, max, value) => {
      if (value.length > max) {
        return `"${value}" is greater than ${max}`;
      }
      return `"${value}" is shorter than ${min}`;
    },
  );

  describe('#1 => exact: 2', () => {
    const useTests = constructTests(2, 5);

    useTests({
      errors: [
        { invite: 'Char: n6', value: multiChar('n', 6) },
        { invite: 'Char: empty space', value: multiChar(' ', 1) },
        { invite: 'Char: empty', value: '' },
      ],

      success: [
        { invite: 'Char: 3n', value: multiChar('n', 3) },
        { invite: 'Char: z4', value: multiChar('z', 4) },
        { invite: 'Char: x4', value: 'xxxx' },
        { invite: 'Char: r5', value: multiChar('r', 5) },
        { invite: 'Char: c2', value: multiChar('c', 2) },
      ],
    });
  });

  describe('#2 => exact: 10', () => {
    const useTests = constructTests(10, 20);

    useTests({
      errors: [
        { invite: 'Char: empty', value: '' },
        { invite: 'Char: 2 empty spaces', value: ' ' },
        { invite: 'Char: n1', value: 'n' },
        { invite: 'Char: n2', value: 'nn' },
        { invite: 'Char: n3', value: 'nnn' },
        { invite: 'Char: b3', value: 'bbb' },
        { invite: '5 empty spaces', value: multiChar(' ', 5) },
        { invite: 'Char: n9', value: multiChar('n', 9) },
      ],

      success: [
        { invite: 'Char: n11', value: multiChar('n', 11) },
        { invite: 'Char: a16', value: multiChar('a', 16) },
        { invite: 'Char: e19', value: multiChar('e', 19) },
        { invite: 'Char: d10', value: multiChar('d', 10) },
        { invite: 'Char: n20', value: multiChar('n', 20) },
      ],
    });
  });

  describe('#3 .low', () => {
    const { acceptation } = createTests(inRangeInclusive.low);

    const { success } = createTests(
      partialCall(inRangeInclusive.low, 2, 5),
    );

    describe('#0 => Acceptation', acceptation);

    describe(
      '#1 => Tests',
      success(
        {
          invite: 'At the left range',
          parameters: multiChar('d', 2),
          expected: {
            bool: true,
            value: multiChar('d', 2),
          },
        },
        {
          invite: 'At the right range',
          parameters: multiChar('d', 5),
          expected: {
            bool: true,
            value: multiChar('d', 5),
          },
        },
        {
          invite: 'In the range #1',
          parameters: multiChar('d', 3),
          expected: {
            bool: true,
            value: multiChar('d', 3),
          },
        },
        {
          invite: 'In the range #2',
          parameters: multiChar('d', 4),
          expected: {
            bool: true,
            value: multiChar('d', 4),
          },
        },
        {
          invite: 'Outside Left',
          parameters: multiChar('d', 1),
          expected: {
            bool: false,
            value: multiChar('d', 1),
          },
        },
        {
          invite: 'Outside Right',
          parameters: multiChar('d', 10),
          expected: {
            bool: false,
            value: multiChar('d', 10),
          },
        },
      ),
    );
  });
});
