// @ts-expect-error for build
import { toString2 } from 'this-gen-1';

describe('Covering the function "toString2" ', () => {
  const ERROR = '-Infinity';

  describe('#1 => Errors', () => {
    test('#1 => Throws -Infinity', () => {
      const func = () => toString2(0, 1);
      expect(func).toThrowError(ERROR);
    });

    test('#2 => Throws -Infinity', () => {
      const func = () => toString2(1, 0);
      expect(func).toThrowError(ERROR);
    });

    test('#3 => Throws -Infinity', () => {
      const func = () => toString2(0, 0);
      expect(func).toThrowError(ERROR);
    });
  });

  test('#2 => No error', () => {
    const func = () => toString2(1, 1);
    expect(func).not.toThrow();
  });
});
