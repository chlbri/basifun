import { inRangeExclusive } from './inRangeExclusive';
import { constructLength } from './length.fixture';
import { multiChar } from './multiChar';

describe('exactLength', () => {
  const constructTests = constructLength(
    inRangeExclusive,
    (min, max, value) => {
      if (value.length > max - 1) {
        return `"${value}" is greater or equal than ${max}`;
      }
      return `"${value}" is shorter or equal than ${min}`;
    },
  );

  describe('#1 => exact: 2', () => {
    const useTests = constructTests(2, 5);

    useTests({
      errors: [
        { invite: 'Char: n6', value: multiChar('n', 6) },
        { invite: 'Char: r5', value: multiChar('r', 5) },
        { invite: 'Char: 2 empty spaces', value: multiChar(' ', 2) },
        { invite: 'Char: empty', value: '' },
      ],

      success: [
        { invite: 'Char: 3n', value: multiChar('n', 3) },
        { invite: 'Char: z4', value: multiChar('z', 4) },
        { invite: 'Char: x4', value: 'xxxx' },
      ],
    });
  });

  describe('#3 => exact: 10', () => {
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
        { invite: 'Char: d10', value: multiChar('d', 10) },
        { invite: 'Char: n20', value: multiChar('n', 20) },
      ],

      success: [
        { invite: 'Char: n11', value: multiChar('n', 11) },
        { invite: 'Char: a16', value: multiChar('a', 16) },
        { invite: 'Char: e19', value: multiChar('e', 19) },
      ],
    });
  });
});
