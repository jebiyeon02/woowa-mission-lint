import { ERROR_MESSAGE } from '../constants/error-message.js';

class PrettierTranslator {
  #prettierMap;

  constructor(prettierMap) {
    this.#prettierMap = prettierMap;
  }

  translateAllRules(koreanRules) {
    const prettierRules = {};
    Object.entries(koreanRules).forEach(([key, value]) => {
      const prettierRuleName = this.#translateRuleName(key);
      prettierRules[prettierRuleName] = value;
    });

    return prettierRules;
  }

  #translateRuleName(koreanRule) {
    this.#validatePrettierRule(koreanRule);

    return this.#prettierMap[koreanRule];
  }

  #validatePrettierRule(koreanRuleName) {
    if (koreanRuleName.includes(' ')) {
      throw new Error(`${ERROR_MESSAGE.INCLUDE_BLANK} (${koreanRuleName})`);
    }
    if (!this.#prettierMap[koreanRuleName]) {
      throw new Error(`${ERROR_MESSAGE.RULE_NOT_FOUND} (${koreanRuleName})`);
    }
  }
}

export default PrettierTranslator;
