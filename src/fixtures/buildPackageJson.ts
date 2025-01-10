import type { Fn } from '@bemedev/types';
import editJsonFile from 'edit-json-file';
import { EXPORT_KEYS } from './constants';
import { getTypescriptOutdir } from './getTypescriptOutdir';

type BuldPackageJson_F = Fn<
  [],
  {
    packageJson: object;
    outDir: string;
  }
>;

export const buildPackageJson: BuldPackageJson_F = () => {
  const file = editJsonFile('./package.json');
  const outDir = getTypescriptOutdir();
  const lib = `${outDir}/`;

  // #region Set export values
  EXPORT_KEYS.forEach(key => {
    const value = file.get(key);
    const transformed = value.replace(lib, '');
    file.set(key, transformed);
  });
  // #endregion

  // #region Unset some props
  file.unset('files');
  file.unset('scripts');
  file.unset('devDependencies');
  // #endregion

  // Sorting dev deps
  return { packageJson: file.get(), outDir };
};
