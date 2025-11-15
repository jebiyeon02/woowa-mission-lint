import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { CONFIG_CONSTANTS } from '../constants/config-constants.js';
import PrettierTranslator from './PrettierTranslator.js';
import { PRETTIER_MAP } from '../constants/prettier-map.js';

/*
  prettier는 index.cjs만 사용하지만, 특정 환경에서 index.js를 사용할 가능성을 대비해
  index.js에도 index.cjs와 같은 로직을 구현해놓음
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function findConfigPath() {
  let currentDir = __dirname;
  const systemRoot = path.parse(currentDir).root;

  while (currentDir !== systemRoot) {
    const projectMarker = path.resolve(currentDir, 'package.json');

    if (fs.existsSync(projectMarker)) {
      const woowaConfigPath = path.resolve(
        currentDir,
        CONFIG_CONSTANTS.CONFIG_FILE_NAME,
      );
      if (fs.existsSync(woowaConfigPath)) {
        return woowaConfigPath;
      }
    }

    currentDir = path.dirname(currentDir);
  }
  return null;
}

function loadUserConfig() {
  const configPath = findConfigPath();
  let prettierRule;

  try {
    if (configPath) {
      const configFileContent = JSON.parse(
        fs.readFileSync(configPath, 'utf-8'),
      );
      prettierRule = configFileContent['프리티어_설정'];

      if (!prettierRule) {
        console.warn('[ERROR]: "프리티어_설정" 키가 없습니다.');
        return {};
      }
    } else {
      console.warn('[ERROR]: woowalint.json 파일을 찾을 수 없습니다.');
      return {};
    }
  } catch (error) {
    console.error('[ERROR]: woowalint.json 처리 중 오류:', error.message);
    return {};
  }

  const prettierTranslator = new PrettierTranslator(PRETTIER_MAP);
  const finalPrettierRule = prettierTranslator.translateAllRules(prettierRule);

  return finalPrettierRule;
}

export default loadUserConfig();
