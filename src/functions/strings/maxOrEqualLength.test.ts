import { constructLength } from './length.fixture';
import { maxOrEqualLength } from './maxOrEqualLength';
import { multiChar } from './multiChar';

describe('maxOrEqualLength', () => {
  const toError = <T extends number>(max: T, value: string) => {
    const error = `"${value}" is greater than ${max}`;
    return error;
  };

  const constructTests = constructLength(maxOrEqualLength, toError);

  describe('#1 => max: 2', () => {
    const useTests = constructTests(2);

    useTests({
      errors: [
        { invite: 'Char: n3', value: 'nnn' },
        { invite: '3 empty space', value: '   ' },
      ],

      success: [
        { invite: 'Char: empty', value: '' },
        { invite: 'Char: empty space', value: ' ' },
        { invite: 'Char: n1', value: 'n' },
      ],
    });
  });

  describe('#3 => max: 10', () => {
    const useTests = constructTests(10);

    useTests({
      errors: [{ invite: 'Char: n10', value: multiChar('n', 11) }],

      success: [
        { invite: 'Char: empty', value: '' },
        { invite: 'Char: 2 empty spaces', value: ' ' },
        { invite: 'Char: n1', value: 'n' },
        { invite: 'Char: n2', value: 'nn' },
        { invite: 'Char: n3', value: 'nnn' },
        { invite: 'Char: b3', value: 'bbb' },
        { invite: '5 empty space', value: '     ' },
        { invite: 'Char: n9', value: multiChar('n', 9) },
        { invite: 'Char: n10', value: multiChar('n', 10) },
      ],
    });
  });
});
