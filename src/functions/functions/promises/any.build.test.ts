import { this1 } from '@bemedev/build-tests/constants';
import sleep from '@bemedev/sleep';
import { typings, type types } from '@bemedev/types';
import { createTests } from '@bemedev/vitest-extended';
import type { TimeoutPromise } from '../types';
import { withTimeout } from './withTimeout';

describe('anyPromises', () => {
  const abortSpy = vi.fn();
  type UseTest = types.Fn<[string, ...TimeoutPromise<any>[]], any>;
  const anyPromises = typings.commons.unknown<UseTest>();

  const { acceptation, success, fails } = createTests.withImplementation(
    anyPromises,
    {
      instanciation: () =>
        import(`${this1}/functions/promises/any`).then(
          ({ anyPromises }) => {
            return async (...args) => {
              const out = anyPromises(...args);
              return await out();
            };
          },
        ),
      name: 'anyPromises',
    },
  );

  // #region Promises
  const single = withTimeout(() => Promise.resolve('single'), 'single');
  const resolve300 = withTimeout(
    () => sleep(300).then(() => 'resolve300'),
    'first',
  );

  const resolve100 = withTimeout(
    () => sleep(100).then(() => 'resolve100'),
    'second',
  );

  const resolve200 = withTimeout(
    () => sleep(200).then(() => 'resolve200'),
    'third',
  );

  const reject = withTimeout(() => Promise.reject('reject'), 'reject');
  const reject100 = withTimeout(async () => {
    await sleep(100);
    return await Promise.reject('reject100');
  }, 'reject100');

  const reject200 = withTimeout(async () => {
    await sleep(200);
    return await Promise.reject('reject200');
  }, 'reject200');

  const reject300 = withTimeout(async () => {
    await sleep(300);
    return await Promise.reject('reject300');
  }, 'reject300');

  single.abort =
    resolve100.abort =
    resolve200.abort =
    resolve300.abort =
    reject.abort =
    reject100.abort =
    reject200.abort =
    reject300.abort =
      abortSpy;
  // #endregion

  describe('#00 => Acceptation', acceptation);

  describe(
    '#01 => success',
    success(
      {
        invite: 'Single resolved promise',
        parameters: ['test', single],
        expected: 'single',
      },
      {
        invite: 'Multiple promises with different times',
        parameters: ['test', resolve300, resolve100, resolve200],
        expected: 'resolve100',
      },
      {
        invite: 'Multiple promises with different times, and reject #1',
        parameters: ['test', reject100, resolve200, resolve300],
        expected: 'resolve200',
      },
      {
        invite: 'Multiple promises with different times, and reject #2',
        parameters: ['test', reject100, reject200, resolve300],
        expected: 'resolve300',
      },
    ),
  );

  test('#02 => Spy is called 10 times', () => {
    expect(abortSpy).toBeCalledTimes(10);
  });

  describe(
    '#03 => fails',
    fails({
      invite: 'All promises reject',
      parameters: ['test', reject100, reject200, reject300],
      error: 'reject300',
    }),
  );

  test('#03 => Spy is called 10 times', () => {
    expect(abortSpy).toBeCalledTimes(13);
  });
});
