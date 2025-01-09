import { t } from '@bemedev/types';
import type { Refunction_F } from './types';

export const reFunction: Refunction_F = (object, fn) => {
  const _fn = object[fn];
  const out: any = t.anify((...args: any) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    (_fn as Function).bind(object)(...args),
  );

  return out;
};
