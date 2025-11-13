// src/index.cjs

const path = require('path');
const fs = require('fs');

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

function loadUserConfig() {
  const projectRootPath = process.cwd();
  const configPath = path.resolve(projectRootPath, CONFIG_FILE_NAME);

  let prettierRule;

  try {
    const configFileContent = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    prettierRule = configFileContent['프리티어_설정'];
    if (!prettierRule) {
      throw new Error(
        "[ERROR]: 프리티어_설정이 존재하지 않습니다.\n'프리티어_설정 옵션을 추가 해주세요.'",
      );
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(
        "[ERROR]: woowa-lint.json파일이 존재하지 않습니다.\n'파일을 생성 해주세요.'",
      );
      process.exit(1);
    }
    console.error(error.message);
  }

  const finalPrettierRule = translatePrettierConfig(prettierRule);

  return finalPrettierRule;
}

module.exports = loadUserConfig();
