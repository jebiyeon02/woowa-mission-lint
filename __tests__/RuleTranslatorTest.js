import { ERROR_MESSAGE } from "../constants/error-message.js";
import { RULE_MAP } from "../constants/rule-map.js";
import RuleTranslator from "../src/ruleTranslator.js";

describe("번역기 클래스 테스트", () => {
  test("번역 기능 테스트", () => {
    // given
    const koreanRule = "카멜_케이스_검사";
    const englishRule = "camelcase";

    // when
    const ruleTranslator = new RuleTranslator(RULE_MAP);

    // then
    expect(ruleTranslator.translateRuleNameToEnglish(koreanRule)).toBe(
      englishRule
    );
  });

  test("예외 테스트", () => {
    // given
    const koreanRule = "없습니다";

    // when
    const ruleTranslator = new RuleTranslator(RULE_MAP);

    // then
    expect(() => ruleTranslator.translateRuleNameToEnglish(koreanRule)).toThrow(
      ERROR_MESSAGE.KOREAN_RULE_NAME_NOT_FOUND
    );
  });
});
