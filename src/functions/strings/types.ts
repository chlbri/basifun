export type StringLength<
  T extends string,
  Counter extends number[] = [],
> = T extends `${string}${infer Tail}`
  ? StringLength<Tail, [...Counter, 0]>
  : Counter['length'];

export type StringCompare<
  First extends number,
  Second extends number,
  Counter extends number[] = [],
> = First extends Second
  ? 0
  : Counter['length'] extends First
    ? -1
    : Counter['length'] extends Second
      ? 1
      : StringCompare<First, Second, [...Counter, 0]>;

export type ExactLength<T extends string, Exact extends number> =
  StringCompare<StringLength<T>, Exact> extends 0 ? T : never;

export type ExactLength_F = <T extends string, Exact extends number>(
  exact: Exact,
  str: ExactLength<T, Exact>,
) => ExactLength<T, Exact>;

export type MaxLength<T extends string, Max extends number> =
  StringCompare<StringLength<T>, Max> extends -1 ? T : never;

export type MaxLength_F = <T extends string, Max extends number>(
  min: Max,
  str: MaxLength<T, Max>,
) => MaxLength<T, Max>;

export type MaxOrEqualLength<T extends string, Max extends number> =
  | MaxLength<T, Max>
  | ExactLength<T, Max>;

export type MaxOrEqualLength_F = <T extends string, Max extends number>(
  min: Max,
  str: MaxOrEqualLength<T, Max>,
) => MaxOrEqualLength<T, Max>;

export type MinLength<T extends string, Min extends number> =
  StringCompare<StringLength<T>, Min> extends 1 ? T : never;

export type MinLength_F = <T extends string, Min extends number>(
  min: Min,
  str: MinLength<T, Min>,
) => MinLength<T, Min>;

export type MinOrEqualLength<T extends string, Min extends number> =
  | MinLength<T, Min>
  | ExactLength<T, Min>;

export type MinOrEqualLength_F = <T extends string, Min extends number>(
  min: Min,
  str: MinOrEqualLength<T, Min>,
) => MinOrEqualLength<T, Min>;

export type InRangeExclusive<
  T extends string,
  Min extends number,
  Max extends number,
> = MinLength<T, Min> & MaxLength<T, Max>;

export type InRangeExclusive_F = <
  T extends string,
  Min extends number,
  Max extends number,
>(
  min: Min,
  max: Max,
  str: InRangeExclusive<T, Min, Max>,
) => InRangeExclusive<T, Min, Max>;

export type InRangeInclusive<
  T extends string,
  Min extends number,
  Max extends number,
> = MinOrEqualLength<T, Min> & MaxOrEqualLength<T, Max>;

export type InRangeInclusive_F = <
  T extends string,
  Min extends number,
  Max extends number,
>(
  min: Min,
  max: Max,
  str: InRangeInclusive<T, Min, Max>,
) => InRangeInclusive<T, Min, Max>;

export type MultiChar_F = <T extends string>(
  char: ExactLength<T, 1>,
  count: number,
  separator?: string,
) => string;
