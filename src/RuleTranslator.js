import { ERROR_MESSAGE } from '../constants/error-message.js';
import { RULE_STATE } from '../constants/rule-state.js';
import ErrorHandler from './ErrorHandler.js';
import { COMPLEX_RULE_OPTIONS } from '../constants/complex-rule-options.js';

class RuleTranslator {
  #ruleNameMap;

  constructor(koreanToEnglishMap) {
    this.#ruleNameMap = koreanToEnglishMap;
  }

  translate(koreanRule) {
    const [ruleNameKR, ruleOptionKR] = koreanRule;

    const ruleNameEslint = this.translateRuleNameToEslint(ruleNameKR);
    let ruleOptionEslint = this.translateRuleOptionToEslint(ruleOptionKR);
    ruleOptionEslint = this.#addOptions(ruleNameEslint, ruleOptionEslint);

    return { ruleNameEslint, ruleOptionEslint };
  }

  translateRuleNameToEslint(koreanRuleName) {
    this.#isCorrectKoreanRuleName(koreanRuleName);
    return this.#ruleNameMap[koreanRuleName];
  }

  #isCorrectKoreanRuleName(koreanRuleName) {
    if (!this.#ruleNameMap[koreanRuleName]) {
      ErrorHandler.createError(
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
    if (typeof option === 'number') {
      return [RULE_STATE.TURN_ON_AS_ERROR, option];
    }

    if (typeof option === 'object') {
      // 나중에 다른 규칙들도 property를 가지게 만들 수도 있기 때문에
      // 확장성을 위해 객체 검사를 분리해둠
      if (Object.keys(option).includes('적용_폴더')) {
        return option;
      }
    }

    return option;
  }

  // 옵션이 필요한 규칙들을 처리하는 메서드
  #addOptions(ruleNameEslint, ruleOptionEslint) {
    const complexOptionGenerator = COMPLEX_RULE_OPTIONS[ruleNameEslint];

    if (complexOptionGenerator) {
      return complexOptionGenerator(ruleOptionEslint);
    }

    return ruleOptionEslint;
  }
}

export default RuleTranslator;
