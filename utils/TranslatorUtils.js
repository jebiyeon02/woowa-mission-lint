import path from "path";
import fs from "fs";
import { CONFIG_CONSTANTS } from "../constants/config-constants.js";
import { ERROR_MESSAGE } from "../constants/error-message.js";

class TranslatorUtils {
  static readKoreanRulesFromConfig(level) {
    const configPath = TranslatorUtils.#getConfigPath();
    TranslatorUtils.#validateConfigFile(configPath);

    const configFileContent = JSON.parse(fs.readFileSync(configPath));
    const allLevelRules =
      configFileContent[CONFIG_CONSTANTS.OPTION_NAME.EACH_LEVEL_RULE];

    const levelString = `level_${level}`;
    if (!allLevelRules[levelString]) {
      throw new Error(ERROR_MESSAGE.CONFIG_LEVEL_NOT_FOUND);
    }
    return allLevelRules[levelString];
  }

  static getDefaultLevelFromConfig() {
    const configPath = TranslatorUtils.#getConfigPath();
    TranslatorUtils.#validateConfigFile(configPath);

    const configFileContent = JSON.parse(fs.readFileSync(configPath));
    const defaultLevelString =
      configFileContent[CONFIG_CONSTANTS.OPTION_NAME.DEFAULT_RUN_LEVEL];
    if (!defaultLevelString) {
      throw new Error(ERROR_MESSAGE.CONFIG_DEFAULT_LEVEL_OPTION_NOT_FOUND);
    }
    const indexOfUnderBar = defaultLevelString.indexOf(
      CONFIG_CONSTANTS.DEFAULT_LEVEL_DELIMETER
    );
    const defaultLevel = defaultLevelString.substring(indexOfUnderBar + 1);

    return defaultLevel;
  }

  static #validateConfigFile(configPath) {
    if (!fs.existsSync(configPath)) {
      console.error(ERROR_MESSAGE.CONFIG_FILE_NOT_FOUND);
      process.exit(1);
    }
  }

  static #getConfigPath() {
    const projectRootPath = process.cwd();

    const configPath = path.resolve(
      projectRootPath,
      CONFIG_CONSTANTS.CONFIG_FILE_NAME
    );

    return configPath;
  }
}

export default TranslatorUtils;
