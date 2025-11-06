import { ERROR_MESSAGE } from "../constants/error-message.js";
import { RULE_MAP } from "../constants/rule-map.js";
import { RULE_STATE } from "../constants/rule-state.js";
import RuleTranslator from "../src/ruleTranslator.js";

describe("번역기 클래스 테스트", () => {
  test("규칙 이름 번역 기능 테스트", () => {
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

  test("규칙 이름 번역 예외 테스트", () => {
    // given
    const koreanRule = "없습니다";

    // when
    const ruleTranslator = new RuleTranslator(RULE_MAP);

    // then
    expect(() => ruleTranslator.translateRuleNameToEnglish(koreanRule)).toThrow(
      ERROR_MESSAGE.KOREAN_RULE_NAME_NOT_FOUND
    );
  });

  test.each([
    [15, [RULE_STATE.TURN_ON_AS_ERROR, 15], false],
    [true, RULE_STATE.TURN_OFF, true],
    [false, RULE_STATE.TURN_ON_AS_ERROR, true],
    [true, RULE_STATE.TURN_ON_AS_ERROR, false],
    [false, RULE_STATE.TURN_OFF, false],
    ["off", RULE_STATE.TURN_OFF, false],
  ])(
    "옵션 번역 기능 테스트 - woowa 규칙 설정 : %s -> ESLint 규칙 설정 : %s , inverted = %s",
    (option, result, inverted) => {
      // when
      const ruleTranslator = new RuleTranslator(RULE_MAP);

      // then
      expect(
        ruleTranslator.translateRuleOptionToEslint(option, inverted)
      ).toEqual(result);
    }
  );

  test("규칙 옵션 번역 기능 테스트", () => {});
});
