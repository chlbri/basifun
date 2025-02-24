import { defineConfig } from '@bemedev/rollup-config';

export default defineConfig.bemedev({
  declarationMap: true,
  ignoresJS: [
    '**/*.example.ts',
    '**/*.fixtures.ts',
    '**/fixtures.ts',
    '**/*.fixture.ts',
    '**/fixture.ts',
  ],
});
