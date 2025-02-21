export type ArrayR = readonly any[] | any[];

// #region SubType
type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};

export type AllowedNames<Base, Condition> = FilterFlags<
  Base,
  Condition
>[keyof Base];

export type SubType<Base extends object, Condition> = Pick<
  Base,
  AllowedNames<Base, Condition>
>;
// #endregion

export type ToPrimitive<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends object
        ? object
        : any;

export type ToPrimitiveTuple<T extends any[] | ArrayR> = T extends [
  infer U,
  ...infer R,
]
  ? [ToPrimitive<U>, ...ToPrimitiveTuple<R>]
  : [];
