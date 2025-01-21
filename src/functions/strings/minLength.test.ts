import { constructLength } from './length.fixture';
import { minLength } from './minLength';
import { multiChar } from './multiChar';

describe('minLength', () => {
  const toError = <T extends number>(min: T, value: string) => {
    const error = `"${value}" is shorter or equal than ${min}`;
    return error;
  };

  const constructTests = constructLength(minLength, toError);

  describe('#1 => min: 1', () => {
    const useTests = constructTests(1);

    useTests({
      errors: [
        { invite: 'Char: empty', value: '' },
        { invite: 'Char: empty space', value: ' ' },
        { invite: 'Char: n1', value: 'n' },
      ],

      success: [
        { invite: 'Char: n2', value: 'nn' },
        { invite: 'Char: n3', value: 'nnn' },
        { invite: '2 empty space', value: '  ' },
        { invite: '3 empty space', value: '   ' },
      ],
    });
  });

  describe('#2 => min: 2', () => {
    const useTests = constructTests(2);

    useTests({
      errors: [
        { invite: 'Char: empty', value: '' },
        { invite: 'Char: 2 empty spaces', value: ' ' },
        { invite: 'Char: n1', value: 'n' },
        { invite: 'Char: n2', value: 'nn' },
      ],

      success: [
        { invite: 'Char: n3', value: 'nnn' },
        { invite: 'Char: b3', value: 'bbb' },
        { invite: '3 empty space', value: '   ' },
      ],
    });
  });

  describe('#3 => min: 10', () => {
    const useTests = constructTests(10);

    useTests({
      errors: [
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

      success: [{ invite: 'Char: n10', value: multiChar('n', 11) }],
    });
  });
});
