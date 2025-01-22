import { exactLength } from './exactLength';
import { constructLength } from './length.fixture';
import { multiChar } from './multiChar';

describe('exactLength', () => {
  const toError = <T extends number>(exact: T, value: string) => {
    const error = `"${value}".length is not equal to ${exact}`;
    return error;
  };

  const constructTests = constructLength(exactLength, toError);

  describe('#1 => exact: 2', () => {
    const useTests = constructTests(2);

    useTests({
      errors: [
        { invite: 'Char: n3', value: 'nnn' },
        { invite: '3 empty space', value: '   ' },
        { invite: 'Char: empty', value: '' },
      ],

      success: [
        { invite: 'Char: 2 empty spaces', value: '  ' },
        { invite: 'Char: n2', value: 'nn' },
        { invite: 'Char: z2', value: 'zz' },
      ],
    });
  });

  describe('#3 => exact: 10', () => {
    const useTests = constructTests(10);

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
        { invite: 'Char: n10', value: multiChar('n', 10) },
        { invite: 'Char: a10', value: multiChar('a', 10) },
      ],
    });
  });
});
