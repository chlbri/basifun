import type { _SwitchValue_F } from './types';

const _switchValue: _SwitchValue_F = ({ condition, truthy, falsy }) => {
  const out = condition ? truthy : falsy;
  return out;
};

export function switchValue<T>(params: {
  condition?: boolean;
  truthy: T;
  falsy: T;
}): T;
export function switchValue<T>(condition: boolean, first: T, second: T): T;

export function switchValue<T>(condition: any, truthy?: T, falsy?: T) {
  const check1 = typeof condition === 'boolean';

  return _switchValue({
    condition: check1,
    truthy: _switchValue({
      condition,
      truthy,
      falsy,
    }),
    falsy: _switchValue(condition),
  });
}

export const switchV = switchValue;
