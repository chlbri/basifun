import { exec } from 'shelljs';
import { envConfig } from './_env';
import { addTarball } from './src/fixtures/addToPackage';
import { TEARDOWN_COMMAND } from './src/fixtures/constants';

export const setup = async () => {
  if (envConfig.onlyForSetup) {
    await addTarball();
  }
  envConfig.onlyForSetup = false;
};

export const teardown = () => {
  if (envConfig.onlyForTeardown) exec(TEARDOWN_COMMAND);
  envConfig.onlyForTeardown = false;
};
