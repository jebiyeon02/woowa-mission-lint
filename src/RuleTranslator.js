import { ERROR_MESSAGE } from '../constants/error-message.js';
import { RULE_STATE } from '../constants/rule-state.js';

class RuleTranslator {
  #ruleNameMap;

  constructor(koreanToEnglishMap) {
    this.#ruleNameMap = koreanToEnglishMap;
  }

  translate(koreanRule) {
    const [ruleNameKR, ruleOptionKR] = koreanRule;

    const ruleNameEslint = this.translateRuleNameToEslint(ruleNameKR);
    const ruleOptionEslint = this.translateRuleOptionToEslint(ruleOptionKR);

    return { ruleNameEslint, ruleOptionEslint };
  }

  translateRuleNameToEslint(koreanRuleName) {
    this.#isCorrectKoreanRuleName(koreanRuleName);
    return this.#ruleNameMap[koreanRuleName];
  }

  #isCorrectKoreanRuleName(koreanRuleName) {
    if (!this.#ruleNameMap[koreanRuleName]) {
      throw new Error(
        `${ERROR_MESSAGE.KOREAN_RULE_NAME_NOT_FOUND}\n 찾은 규칙 : (${koreanRuleName})`,
      );
    }
  }

  translateRuleOptionToEslint(option) {
    if (option === 'off') {
      return RULE_STATE.TURN_OFF;
    }

    // Option이 ESLint와 같은 Boolean 설정을 가지는 경우
    if (typeof option === 'boolean') {
      if (option) {
        return RULE_STATE.TURN_ON_AS_ERROR;
      }
      return RULE_STATE.TURN_OFF;
    }

    // Option이 숫자인 경우
    if (!isNaN(option)) {
      return [RULE_STATE.TURN_ON_AS_ERROR, option];
    }

    return option;
  }
}

export default RuleTranslator;
