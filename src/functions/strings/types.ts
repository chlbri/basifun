import type { LengthOf } from '@bemedev/types';

export type StringLength<
  T extends string,
  Counter extends number[] = [],
> = T extends `${string}${infer Tail}`
  ? StringLength<Tail, [...Counter, 0]>
  : LengthOf<Counter>;

export type StringCompare<
  First extends number,
  Second extends number,
  Counter extends number[] = [],
> = First extends Second
  ? 0
  : LengthOf<Counter> extends First
    ? -1
    : LengthOf<Counter> extends Second
      ? 1
      : StringCompare<First, Second, [...Counter, 0]>;

export type ExactLength<Exact extends number, T extends string> =
  StringCompare<StringLength<T>, Exact> extends 0 ? T : never;

export type ExactLength_F = <Exact extends number, T extends string>(
  exact: Exact,
  str: ExactLength<Exact, T>,
) => ExactLength<Exact, T>;

export type MaxLength<Max extends number, T extends string> =
  StringCompare<StringLength<T>, Max> extends -1 ? T : never;

export type MaxLength_F = <Max extends number, T extends string>(
  min: Max,
  str: MaxLength<Max, T>,
) => MaxLength<Max, T>;

export type MaxOrEqualLength<Max extends number, T extends string> =
  | MaxLength<Max, T>
  | ExactLength<Max, T>;

export type MaxOrEqualLength_F = <Max extends number, T extends string>(
  min: Max,
  str: MaxOrEqualLength<Max, T>,
) => MaxOrEqualLength<Max, T>;

export type MinLength<Min extends number, T extends string> =
  StringCompare<StringLength<T>, Min> extends 1 ? T : never;

export type MinLength_F = <Min extends number, T extends string>(
  min: Min,
  str: MinLength<Min, T>,
) => MinLength<Min, T>;

export type MinOrEqualLength<Min extends number, T extends string> =
  | MinLength<Min, T>
  | ExactLength<Min, T>;

export type MinOrEqualLength_F = <Min extends number, T extends string>(
  min: Min,
  str: MinOrEqualLength<Min, T>,
) => MinOrEqualLength<Min, T>;

export type InRangeExclusive<
  Min extends number,
  Max extends number,
  T extends string,
> = MinLength<Min, T> & MaxLength<Max, T>;

export type InRangeExclusive_F = <
  Min extends number,
  Max extends number,
  T extends string,
>(
  min: Min,
  max: Max,
  str: InRangeExclusive<Min, Max, T>,
) => InRangeExclusive<Min, Max, T>;

export type InRangeInclusive<
  Min extends number,
  Max extends number,
  T extends string,
> = MinOrEqualLength<Min, T> & MaxOrEqualLength<Max, T>;

export type InRangeInclusive_F = <
  Min extends number,
  Max extends number,
  T extends string,
>(
  min: Min,
  max: Max,
  str: InRangeInclusive<Min, Max, T>,
) => InRangeInclusive<Min, Max, T>;

export type MultiChar_F = <T extends string>(
  char: ExactLength<1, T>,
  count: number,
  separator?: string,
) => string;
