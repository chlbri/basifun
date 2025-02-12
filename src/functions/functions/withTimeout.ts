import type { WithTimeout_F } from './types';

export const withTimeout: WithTimeout_F = (promise, id, ..._timeouts) => {
  const timeouts = [..._timeouts, Number.POSITIVE_INFINITY];

  const timeoutPids = Array.from(
    { length: timeouts.length },
    () => undefined as NodeJS.Timeout | undefined,
  );

  const controller = new AbortController();

  const timeoutPromises = timeouts.map((millis, i) => {
    return new Promise((_, reject) => {
      controller.signal.addEventListener('abort', () => {
        reject('Aborted.');
      });

      return (timeoutPids[i] = setTimeout(
        () => reject(`Timed out after ${millis} ms.`),
        millis,
      ));
    });
  });

  const out = () =>
    Promise.race([promise(), ...timeoutPromises]).finally(() => {
      timeoutPids.forEach(pid => {
        if (pid) {
          clearTimeout(pid);
        }
      });
    }) as any;

  out.abort = () => controller.abort();
  out.id = id;

  return out;
};
