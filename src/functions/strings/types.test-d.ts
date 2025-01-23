import type { ToPrimitiveTuple } from '#types';
import type { ExactLength, MaxLength, MinLength } from './types';

type T1 = ToPrimitiveTuple<[MinLength<1, '34'>, ExactLength<4, 'erte'>]>;
expectTypeOf<T1>().toEqualTypeOf<[string, string]>();

type T2 = ToPrimitiveTuple<
  [MinLength<1, ''>, ExactLength<4, 'erte'>, MaxLength<2, 'trw'>]
>;
expectTypeOf<T2>().toEqualTypeOf<[never, string, never]>();
expectTypeOf<T2>().not.toEqualTypeOf<[string, string, string]>();

type T3 = ToPrimitiveTuple<[MinLength<1, '34'>]>;
expectTypeOf<T3>().toEqualTypeOf<[string]>();

type T4 = ToPrimitiveTuple<[MinLength<6, '34'>]>;
expectTypeOf<T4>().toEqualTypeOf<[never]>();
