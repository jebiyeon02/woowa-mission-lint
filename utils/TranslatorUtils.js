import path from 'path';
import fs from 'fs';
import { CONFIG_CONSTANTS } from '../constants/config-constants.js';
import { ERROR_MESSAGE } from '../constants/error-message.js';

class TranslatorUtils {
  static substringAfterChar(string, char) {
    const indexOfChar = string.indexOf(char);

    return string.substring(indexOfChar + 1);
  }

  static extractRuleOption(pluginOptionString) {
    return TranslatorUtils.substringAfterChar(pluginOptionString, '/');
  }

  static isPluginRule(ruleName) {
    if (ruleName.includes('@') && ruleName.includes('/')) {
      return true;
    }
    return false;
  }

  // 변수들이 존재하는 원본 에러 메세지로부터 변수들을 추출하는 유틸 -> 한글로 변환할 때 그대로 사용하기 위함
  static extractVariablesFromMessage(message) {
    if (message.ruleId === 'max-lines-per-function') {
      const variables = [];

      // 화살표 함수 확인
      if (
        String(message.message).includes('Arrow function') ||
        String(message.message).includes('arrow function')
      ) {
        variables.push('화살표 함수');
      }

      // private 함수 확인
      const foundPrivateMethod = String(message.message).match(/#\S+/g);
      if (foundPrivateMethod) {
        variables.push(`private 메서드 ${foundPrivateMethod[0]}`);
      }

      // 일반 함수 또는 public 메서드
      const foundFunctionName = String(message.message).match(/'(.*?)'/g);
      if (foundFunctionName) {
        variables.push(foundFunctionName[0]);
      }

      const foundNumbers = String(message.message).match(/\d+/g);
      if (foundNumbers) {
        variables.push(...foundNumbers);
      }

      return variables;
    }

    if (message.ruleId === 'max-depth') {
      const variables = [];

      const foundNumbers = String(message.message).match(/\d+/g);
      if (foundNumbers) {
        variables.push(...foundNumbers);
      }

      return variables;
    }
  }

  static replaceMessageWithArray(message, targetString, array) {
    if (!message.includes(targetString) || array.length === 0) {
      return message;
    }

    const variable = array.shift();
    const newMessage = message.replace(targetString, variable);

    return TranslatorUtils.replaceMessageWithArray(
      newMessage,
      targetString,
      array,
    );
  }

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
    const defaultLevel = TranslatorUtils.substringAfterChar(
      defaultLevelString,
      CONFIG_CONSTANTS.DEFAULT_LEVEL_DELIMETER,
    );

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
      CONFIG_CONSTANTS.CONFIG_FILE_NAME,
    );

    return configPath;
  }
}

export default TranslatorUtils;
