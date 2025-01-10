import sh from 'shelljs';
import { TEARDOWN_COMMAND } from './src/fixtures/constants';

sh.exec(TEARDOWN_COMMAND);
