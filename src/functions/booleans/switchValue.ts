import type { _SwitchValue_F } from './types';

const _switchValue: _SwitchValue_F = ({ condition, first, second }) => {
  const out = condition ? first : second;
  return out;
};

export function switchValue<T>(params: {
  condition?: boolean;
  first: T;
  second: T;
}): T;
export function switchValue<T>(condition: boolean, first: T, second: T): T;

export function switchValue<T>(condition: any, first?: T, second?: T) {
  const check1 = typeof condition === 'boolean';

  return _switchValue({
    condition: check1,
    first: _switchValue({
      condition,
      first,
      second,
    }),
    second: _switchValue(condition),
  });
}

export const switchV = switchValue;
