import { RULE_MAP } from '../constants/rule-map.js';
import { RULE_STATE } from '../constants/rule-state.js';
import constantSnakeCaseRule from '../rules/constantSnakeCaseRule.js';
import RuleTranslator from './ruleTranslator.js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import TranslatorUtils from '../utils/TranslatorUtils.js';
import lowerCamelCaseRule from '../rules/lowerCamelCaseRule.js';
import ConfigReader from './ConfigReader.js';
import { CONFIG_CONSTANTS } from '../constants/config-constants.js';

class ConfigGenerator {
  #koreanRules;
  #translator;

  constructor(koreanRules) {
    this.#koreanRules = koreanRules;
    this.#translator = new RuleTranslator(RULE_MAP);
  }

  generateConfig() {
    // makeEslintRules를 실행해도 "적용_폴더" 옵션은 한글 그대로 남아 있음
    const eslintRules = this.#makeEslintRules(this.#koreanRules);
    const specificFolders = this.#getSpecificFolders(eslintRules);
    const { generalRules, specificFolderRules } =
      this.#separateEslintRules(eslintRules);

    const configReader = new ConfigReader();
    const exceptFolders = configReader.getOptionContents(
      'root',
      CONFIG_CONSTANTS.OPTION_NAME.EXCEPT_FOLDER,
    );

    const finalOverrideConfig = [
      eslintConfigPrettier,
      // 전체 파일에 다 적용되는 일반 설정들
      {
        files: ['**/*.js'],
        ignores: [...specificFolders, ...exceptFolders],
        languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
        plugins: {
          prettier: eslintPluginPrettier,
          woowa: {
            rules: {
              camelCase: lowerCamelCaseRule,
            },
          },
        },
        rules: {
          ...generalRules,
          'prettier/prettier': 'error',
        },
      },
      // 나중에 확장하게 된다면, config를 더 많이 만들어야 할 수도 있다. 이 점 기억해두자
    ];
    // 특정 폴더 전용 설정들 (특정 폴더 옵션이 있는 경우에만 생성함)
    if (specificFolders.length > 0) {
      finalOverrideConfig.unshift({
        // (prettier-config 앞으로 끼워넣기)
        files: specificFolders,
        ignores: [...exceptFolders],
        languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
        plugins: {
          prettier: eslintPluginPrettier,
          woowa: {
            rules: {
              'constant-snake-case': constantSnakeCaseRule,
            },
          },
        },
        rules: {
          ...specificFolderRules,
          'prettier/prettier': 'error',
        },
      });
    }

    return finalOverrideConfig;
  }

  #makeEslintRules(koreanRules) {
    const eslintRules = {};

    Object.entries(koreanRules).forEach((koreanRule) => {
      let { ruleNameEslint, ruleOptionEslint } =
        this.#translator.translate(koreanRule);
      if (TranslatorUtils.isPluginRule(ruleNameEslint)) {
        ruleNameEslint = TranslatorUtils.extractRuleOption(ruleNameEslint);
      }
      eslintRules[ruleNameEslint] = ruleOptionEslint;
    });

    return eslintRules;
  }

  #separateEslintRules(eslintRules) {
    // 특정 폴더 제한 규칙이 1개라고 가정한 상황임
    const SPECIFIC_RULE_NAME = 'woowa/constant-snake-case';

    const specificFolderRules = {};
    const generalRules = { ...eslintRules };

    // 특정 폴더에만 적용될 규칙과, 모든 곳에 적용될 규칙을 나눔
    if (eslintRules[SPECIFIC_RULE_NAME]) {
      // "적용_폴더" 옵션은 사용자 편의성을 위한 config이므로 실제 option값인 "error" (2)로 바꿔줌
      specificFolderRules[SPECIFIC_RULE_NAME] = RULE_STATE.TURN_ON_AS_ERROR;

      delete generalRules[SPECIFIC_RULE_NAME];
    }

    return { generalRules, specificFolderRules };
  }

  #getSpecificFolders(eslintRules) {
    const specificFolders = [];
    Object.entries(eslintRules).forEach(([_, value]) => {
      if (typeof value === 'object' && value['적용_폴더']) {
        const folderPaths = value['적용_폴더'];
        specificFolders.push(...folderPaths);
      }
    });

    return specificFolders;
  }
}

export default ConfigGenerator;
