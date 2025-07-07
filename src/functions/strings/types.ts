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

export type ExactLength<Exact extends number, T extends string> =
  StringCompare<StringLength<T>, Exact> extends 0 ? T : never;

export interface ExactLength_F {
  (exact: number, value: string): string;

  checker: (exact: number, value: string) => boolean;

  low: (exact: number, value: string) => { bool: boolean; value: string };

  normal: (exact: number, value: string) => string;

  strictest: <Exact extends number, T extends string>(
    exact: Exact,
    str: ExactLength<Exact, T>,
  ) => ExactLength<Exact, T>;

  strict: <Exact extends number, T extends string>(
    exact: Exact,
    value: T,
  ) => ExactLength<Exact, T>;
}

export type MaxLength<Max extends number, T extends string> =
  StringCompare<StringLength<T>, Max> extends -1 ? T : never;

export interface MaxLength_F {
  (max: number, value: string): string;

  checker: (max: number, value: string) => boolean;

  low: (max: number, value: string) => { bool: boolean; value: string };

  normal: (max: number, value: string) => string;

  strictest: <Max extends number, T extends string>(
    max: Max,
    str: MaxLength<Max, T>,
  ) => MaxLength<Max, T>;

  strict: <Max extends number, T extends string>(
    max: Max,
    value: T,
  ) => MaxLength<Max, T>;
}

export type MaxOrEqualLength<Max extends number, T extends string> =
  | MaxLength<Max, T>
  | ExactLength<Max, T>;

export interface MaxOrEqualLength_F {
  (max: number, value: string): string;

  checker: (max: number, value: string) => boolean;

  low: (max: number, value: string) => { bool: boolean; value: string };

  normal: (max: number, value: string) => string;

  strictest: <Max extends number, T extends string>(
    max: Max,
    str: MaxOrEqualLength<Max, T>,
  ) => MaxOrEqualLength<Max, T>;

  strict: <Max extends number, T extends string>(
    max: Max,
    value: T,
  ) => MaxOrEqualLength<Max, T>;
}

export type MinLength<Min extends number, T extends string> =
  StringCompare<StringLength<T>, Min> extends 1 ? T : never;

export interface MinLength_F {
  (max: number, value: string): string;

  checker: (max: number, value: string) => boolean;

  low: (max: number, value: string) => { bool: boolean; value: string };

  normal: (max: number, value: string) => string;

  strictest: <Min extends number, T extends string>(
    max: Min,
    str: MinLength<Min, T>,
  ) => MinLength<Min, T>;

  strict: <Min extends number, T extends string>(
    max: Min,
    value: T,
  ) => MinLength<Min, T>;
}

export type MinOrEqualLength<Min extends number, T extends string> =
  | MinLength<Min, T>
  | ExactLength<Min, T>;

export interface MinOrEqualLength_F {
  (min: number, value: string): string;

  checker: (min: number, value: string) => boolean;

  low: (min: number, value: string) => { bool: boolean; value: string };

  normal: (min: number, value: string) => string;

  strictest: <Min extends number, T extends string>(
    min: Min,
    str: MinOrEqualLength<Min, T>,
  ) => MinOrEqualLength<Min, T>;

  strict: <Min extends number, T extends string>(
    min: Min,
    value: T,
  ) => MinOrEqualLength<Min, T>;
}

export type InRangeExclusive<
  Min extends number,
  Max extends number,
  T extends string,
> = MinLength<Min, T> & MaxLength<Max, T>;

export interface InRangeExclusive_F {
  (min: number, max: number, value: string): string;

  checker: (min: number, max: number, value: string) => boolean;

  low: (
    min: number,
    max: number,
    value: string,
  ) => { bool: boolean; value: string };

  normal: (min: number, max: number, value: string) => string;

  strictest: <Min extends number, Max extends number, T extends string>(
    min: Min,
    max: Max,
    str: InRangeExclusive<Min, Max, T>,
  ) => InRangeExclusive<Min, Max, T>;

  strict: <Min extends number, Max extends number, T extends string>(
    min: Min,
    max: Max,
    str: T,
  ) => InRangeExclusive<Min, Max, T>;
}

export type InRangeInclusive<
  Min extends number,
  Max extends number,
  T extends string,
> = MinOrEqualLength<Min, T> & MaxOrEqualLength<Max, T>;

export interface InRangeInclusive_F {
  (min: number, max: number, value: string): string;

  checker: (min: number, max: number, value: string) => boolean;

  low: (
    min: number,
    max: number,
    value: string,
  ) => { bool: boolean; value: string };

  normal: (min: number, max: number, value: string) => string;

  strictest: <Min extends number, Max extends number, T extends string>(
    min: Min,
    max: Max,
    str: InRangeInclusive<Min, Max, T>,
  ) => InRangeInclusive<Min, Max, T>;

  strict: <Min extends number, Max extends number, T extends string>(
    min: Min,
    max: Max,
    str: T,
  ) => InRangeInclusive<Min, Max, T>;
}

export type MultiChar_F = <T extends string>(
  char: ExactLength<1, T>,
  count: number,
  separator?: string,
) => string;
