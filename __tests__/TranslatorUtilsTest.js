import TranslatorUtils from '../utils/TranslatorUtils.js';

describe('TranslatorUtils 클래스 테스트', () => {
  describe('addLevelPrefix 메서드 테스트', () => {
    test.each([
      [1, 'level_1'],
      [5, 'level_5'],
      ['우테코', 'level_우테코'],
    ])(
      '입력값 %s는 "level_" 접두사가 붙어 %s를 반환해야 한다',
      (level, expected) => {
        // when
        const result = TranslatorUtils.addLevelPrefix(level);

        // then
        expect(result).toBe(expected);
      },
    );
  });

  describe('substringAfterChar 메서드 테스트', () => {
    test.each([
      ['hello/world', '/', 'world'],
      ['level_1', '_', '1'],
      ['no_char', '?', 'no_char'],
    ])(
      '문자열 %s에서 구분자 %s 뒤의 부분 문자열을 반환해야 한다',
      (string, char, expected) => {
        // when
        const result = TranslatorUtils.substringAfterChar(string, char);

        // then
        expect(result).toBe(expected);
      },
    );
  });

  describe('isPluginRule 메서드 테스트', () => {
    test.each([
      ['@stylistic/semi', true],
      ['plugin/rule', false],
      ['@stylistic-rule', false],
      ['not-a-plugin-rule', false],
    ])('플러그인 규칙 여부를 정확히 판별해야 한다', (ruleName, expected) => {
      // when
      const result = TranslatorUtils.isPluginRule(ruleName);

      // then
      expect(result).toBe(expected);
    });
  });

  describe('extractVariablesFromMessage 메서드 테스트', () => {
    test('max-lines-per-function 규칙의 변수를 추출해야 한다', () => {
      // given
      const message = {
        ruleId: 'max-lines-per-function',
        message: "Arrow function 'myFunc' has 50 lines, but the maximum is 30.",
      };
      const expected = ['화살표 함수', "'myFunc'", '50', '30'];

      // when
      const result = TranslatorUtils.extractVariablesFromMessage(message);

      // then
      expect(result).toEqual(expected);
    });

    test('max-depth 규칙의 변수를 추출해야 한다', () => {
      // given
      const message = {
        ruleId: 'max-depth',
        message: 'Block depth is 5, but the maximum is 4.',
      };
      const expected = ['5', '4'];

      // when
      const result = TranslatorUtils.extractVariablesFromMessage(message);

      // then
      expect(result).toEqual(expected);
    });
  });

  describe('replaceMessageWithArray 메서드 테스트', () => {
    test('메시지의 타겟 문자열을 배열의 요소로 순차적으로 교체해야 한다', () => {
      // given
      const message =
        '함수 WOOWA_VARIABLE의 라인 수는 WOOWA_VARIABLE인데, 최대 라인 수는 WOOWA_VARIABLE입니다.';
      const targetString = 'WOOWA_VARIABLE';
      const variables = ["'myFunc'", '50', '30'];
      const expected =
        "함수 'myFunc'의 라인 수는 50인데, 최대 라인 수는 30입니다.";

      // when
      const result = TranslatorUtils.replaceMessageWithArray(
        message,
        targetString,
        variables,
      );

      // then
      expect(result).toBe(expected);
    });
  });
});
