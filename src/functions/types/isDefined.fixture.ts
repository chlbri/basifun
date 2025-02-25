export const IS_DEFINED_TESTS = [
  { expected: false, invite: 'no Value' },
  { expected: false, invite: 'undefined', parameters: [undefined] },
  { expected: true, invite: 'number : 9', parameters: 9 },
  { expected: true, invite: 'boolean : false', parameters: false },
  { expected: true, invite: 'boolean : true', parameters: [true] },
] as const;
