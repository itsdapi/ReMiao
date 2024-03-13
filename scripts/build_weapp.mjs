import { generate } from 'build-number-generator';
import { execSync } from 'child_process';

const buildNumber = generate();
const command = `cross-env TARO_APP_BUILD=build${buildNumber} taro build --type weapp`;

execSync(command, { stdio: 'inherit' });
