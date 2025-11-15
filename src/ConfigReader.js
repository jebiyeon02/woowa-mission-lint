import path from 'path';
import fs from 'fs';
import { CONFIG_CONSTANTS } from '../constants/config-constants.js';
import { ERROR_MESSAGE } from '../constants/error-message.js';

class ConfigReader {
  #configFileContent;

  constructor() {
    const configPath = this.#getConfigPath();
    this.#configFileContent = this.#getConfigFileContent(configPath);
  }

  getOptionContents(parent = 'root', option) {
    if (parent === 'root') {
      this.#validateOption(this.#configFileContent, option);
      return this.#configFileContent[option];
    }

    this.#validateOption(parent, option);
    return parent[option];
  }

  #validateOption(parent, option) {
    if (!parent[option]) {
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

  #getConfigPath() {
    const projectRootPath = process.cwd();

    const configPath = path.resolve(
      projectRootPath,
      CONFIG_CONSTANTS.CONFIG_FILE_NAME,
    );

    return configPath;
  }
}

export default ConfigReader;
