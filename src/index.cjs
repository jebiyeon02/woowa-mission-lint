const path = require('path');
const fs = require('fs');
const { CONFIG_CONSTANTS } = require('../constants/config-constants.js');

const projectRootPath = process.cwd();
const configPath = path.resolve(
  projectRootPath,
  CONFIG_CONSTANTS.CONFIG_FILE_NAME,
);

let prettierRule;

try {
  const configFileContent = JSON.parse(fs.readFileSync(configPath));
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

module.exports = prettierRule;
