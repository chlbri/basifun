import sleep from '@bemedev/sleep';
import { t } from '@bemedev/types';
import { racePromises } from './race';
import { withTimeout } from './withTimeout';

beforeAll(() => {
  vi.useFakeTimers();
});

describe('racePromises', () => {
  it('#01 => should return the first resolved promise', async () => {
    const promise1 = withTimeout(
      () => sleep(100).then(() => 'first'),
      'p1',
    );

    const promise2 = withTimeout(
      () => sleep(200).then(() => 'second'),
      'p2',
    );

    const race = racePromises('race', promise1, promise2);

    vi.advanceTimersByTimeAsync(200);
    await expect(race()).resolves.toBe('first');
  });

  describe('#02 => should cancel all remaining promises', async () => {
    const abortSpy = vi.fn();
    let result = t.string;

    const race = async () => {
      const promise1 = withTimeout(
        () => sleep(300).then(() => 'first'),
        'p1',
      );
      const promise2 = withTimeout(
        () => sleep(200).then(() => 'second'),
        'p2',
      );
      promise1.abort = abortSpy;
      promise2.abort = abortSpy;

      // Resolve the first promise
      vi.advanceTimersByTimeAsync(200);
      result = await racePromises('race', promise1, promise2)();
    };

    it('#01 => result is undefined', () => {
      expect(result).toBeUndefined();
    });

    it('#02 => Await race', race);

    it('#03 => should return the first resolved promise', () => {
      expect(result).toBe('second');
    });

    it('#04 => should call the abort method twice', () => {
      expect(abortSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('#03 => should handle promise rejections', async () => {
    const TEST_ERROR = 'Test error';
    const error = new Error(TEST_ERROR);

    const race = () => {
      const promise1 = withTimeout(() => Promise.reject(error), 'p1');
      const promise2 = withTimeout(
        () => sleep(200).then(() => 'second'),
        'p2',
      );

      return racePromises('race', promise1, promise2);
    };

    it('#01 => should reject with the right error', async () => {
      await expect(race()).rejects.toThrow(error);
    });

    it('#02 => should reject with the right error string', async () => {
      vi.advanceTimersByTimeAsync(200);
      await expect(race()).rejects.toThrow(TEST_ERROR);
    });
  });

  describe('#04 => should retain the provided identifier', async () => {
    const promise1 = withTimeout(() => Promise.resolve('first'), 'p1');
    const promise2 = withTimeout(() => Promise.resolve('second'), 'p2');
    const testID = 'test-id';

    const race = racePromises(testID, promise1, promise2);

    it('#01 => should retain the provided identifier', () => {
      expect(race.id).toBe(testID);
    });

    it('#02 => should retain the provided identifier after resolving', async () => {
      vi.advanceTimersByTimeAsync(0);
      await expect(race()).resolves.toBe('first');
    });
  });

  it('#05 => should handle a single promise', async () => {
    const promise = withTimeout(() => Promise.resolve('single'), 'p1');
    const race = racePromises('single', promise);

    const result = await race();
    expect(result).toBe('single');
  });

  it('#06 => should handle multiple promises with different times', async () => {
    const promise1 = withTimeout(
      () => sleep(300).then(() => 'first'),
      'p1',
    );
    const promise2 = withTimeout(
      () => sleep(100).then(() => 'second'),
      'p2',
    );
    const promise3 = withTimeout(
      () => sleep(200).then(() => 'third'),
      'p3',
    );

    vi.advanceTimersByTimeAsync(300);
    const race = racePromises('race', promise1, promise2, promise3);
    const result = await race();

    expect(result).toBe('second');
  });
});
