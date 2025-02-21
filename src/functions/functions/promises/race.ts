import type { RacePromises_F } from '../types';
import { withTimeout } from './withTimeout';

export const racePromises: RacePromises_F = (id, ..._promises) => {
  const _finally = () => {
    return _promises.forEach(({ abort }) => {
      return abort();
    });
  };

  const promises = _promises.map(promise => promise());
  const out = withTimeout(
    () => Promise.race(promises).finally(_finally),
    id,
  );

  return out;
};
