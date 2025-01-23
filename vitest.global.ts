import { addTarball, cleanup } from '@bemedev/build-tests';
import sh from 'shelljs';
import { env } from './vitest.env';

export const setup = async () => {
  if (env.onlySetup) {
    sh.exec('pnpm run build');
    await addTarball();
  }
  env.onlySetup = false;
};

export const teardown = () => {
  if (env.onlyTeardown) {
    cleanup();
    sh.exec('pnpm run p-q');
  }
  env.onlyTeardown = false;
};
