import { type Fn } from '@bemedev/types';
import { log10 } from './log10';

export const toString2: Fn<[value: number, len: number], string> = (
  _value,
  _len,
) => {
  const check = _value < 1 || _len < 1;
  if (check) throw new Error('-Infinity');

  const logLength = log10(_len);
  const logValue = log10(_value);
  const length = logLength - logValue;

  let out = '';
  Array.from({ length }).forEach(() => {
    out += '0';
  });

  out += _value;

  return out;
};
