import path from 'path';
import fs from 'fs';
import { CONFIG_CONSTANTS } from '../constants/config-constants.js';
import { ERROR_MESSAGE } from '../constants/error-message.js';

class ConfigReader {
  #configFileContent;

  constructor() {
    const projectRootPath = process.cwd();
    const configPath = path.resolve(
      projectRootPath,
      CONFIG_CONSTANTS.CONFIG_FILE_NAME,
    );
    this.#configFileContent = this.#getConfigFileContent(configPath);
  }

  getOptionContents(option) {
    this.#validateOption(option);

    return this.#configFileContent[option];
  }

  #validateOption(option) {
    if (!this.#configFileContent[option]) {
      throw new Error(`[ERROR]: ${option} 설정을 찾을 수 없습니다.`);
    }
  }

  #getConfigFileContent(configPath) {
    try {
      const configFileContent = JSON.parse(fs.readFileSync(configPath));
      return configFileContent;
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.error(ERROR_MESSAGE.CONFIG_FILE_NOT_FOUND);
        process.exit(1);
      }
      console.error(error.message);
    }

    return undefined;
  }
}

export default ConfigReader;
