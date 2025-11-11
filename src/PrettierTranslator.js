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
      throw new Error(
        `[ERROR]: 규칙에 공백이 포함되어 있습니다. (${koreanRuleName})`,
      );
    }
    if (!this.#prettierMap[koreanRuleName]) {
      throw new Error(
        `[ERROR]: 일치하는 규칙을 찾지 못했습니다. (${koreanRuleName})`,
      );
    }
  }
}

export default PrettierTranslator;
