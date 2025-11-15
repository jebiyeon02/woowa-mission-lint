const path = require('path');
const fs = require('fs');

/*
  CJS에서는 ESM을 require할 수 없기 때문에, 내부에서 모든 로직을 구현함
 */

const PRETTIER_KEY_MAP = {
  홑따옴표_사용: 'singleQuote',
  세미콜론_사용: 'semi',
  탭_사용: 'useTabs',
  탭_너비: 'tabWidth',
  한_줄당_최대_글자수: 'printWidth',
  화살표_함수_괄호: 'arrowParens',
  후행_콤마: 'trailingComma',
};
const CONFIG_FILE_NAME = 'woowalint.json';

function translatePrettierConfig(koreanConfig) {
  const englishConfig = {};
  for (const [koreanKey, value] of Object.entries(koreanConfig)) {
    const englishKey = PRETTIER_KEY_MAP[koreanKey];
    if (englishKey) {
      englishConfig[englishKey] = value;
    }
  }
  return englishConfig;
}

/*
  Prettier 자체적으로 index.cjs를 실행하기 때문에, process.cwd()를 사용할 수 없음 
  그래서 package.json이 있는 경로까지 올라가서 직접 프로젝트 root 경로를 알아냄
 */

function findConfigPath() {
  let currentDir = __dirname; //  .../node_modules/woowa-lint/src
  const systemRoot = path.parse(currentDir).root;

  while (currentDir !== systemRoot) {
    // 'package.json'을 찾음 -> package.json이 있는 곳이 프로젝트 루트 폴더 일 것이기 때문
    const projectMarker = path.resolve(currentDir, 'package.json');

    if (fs.existsSync(projectMarker)) {
      // 프로젝트 루트를 찾고, 해당 위치에 woowalint.json이 있는지 확인
      const woowaConfigPath = path.resolve(currentDir, CONFIG_FILE_NAME);
      if (fs.existsSync(woowaConfigPath)) {
        return woowaConfigPath; // 찾음
      }
    }

    // 부모 폴더로 이동
    currentDir = path.dirname(currentDir);
  }
  return null; // 시스템 루트까지 찾지 못함
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

  const finalPrettierRule = translatePrettierConfig(prettierRule);
  return finalPrettierRule;
}

module.exports = loadUserConfig();
