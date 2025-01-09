import type { SwitchValue_F } from './types';

export const switchValue: SwitchValue_F = ({
  condition,
  first,
  second,
}) => {
  const out = condition ? first : second;
  return out;
};
