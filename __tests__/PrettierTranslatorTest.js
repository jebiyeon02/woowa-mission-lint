import PrettierTranslator from '../src/PrettierTranslator.js';
import { PRETTIER_MAP } from '../constants/prettier-map.js';
import { ERROR_MESSAGE } from '../constants/error-message.js';

describe('PrettierTranslator 클래스 테스트', () => {
  const translator = new PrettierTranslator(PRETTIER_MAP);

  describe('translateAllRules 메서드 테스트', () => {
    test('한국어 규칙 이름이 Prettier 규칙 이름으로 올바르게 번역되어야 한다', () => {
      // given
      const koreanRules = {
        홑따옴표_사용: true,
        탭_너비: 2,
        후행_콤마: 'all',
      };
      const expectedPrettierRules = {
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
      };

      // when
      const result = translator.translateAllRules(koreanRules);

      // then
      expect(result).toEqual(expectedPrettierRules);
    });

    test('한국어 규칙 이름에 공백이 포함된 경우 에러를 발생시킨다', () => {
      // given
      const koreanRulesWithSpace = {
        '후행 콤마': 'all',
      };

      // when & then
      expect(() => {
        translator.translateAllRules(koreanRulesWithSpace);
      }).toThrow(ERROR_MESSAGE.INCLUDE_BLANK);
    });

    test('PRETTIER_MAP에 존재하지 않는 한국어 규칙 이름인 경우 에러를 발생시킨다', () => {
      // given
      const koreanRulesNotFound = {
        알_수_없는_규칙: true,
      };

      // when & then
      expect(() => {
        translator.translateAllRules(koreanRulesNotFound);
      }).toThrow(ERROR_MESSAGE.RULE_NOT_FOUND);
    });
  });
});
