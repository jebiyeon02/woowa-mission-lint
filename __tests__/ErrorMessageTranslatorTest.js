import ErrorMessageTranslator from '../src/ErrorMessageTranslator.js';
import { ESLINT_ERROR_TRANSLATION_MAP } from '../constants/eslint-error-translation-map.js';

describe('ErrorMessageTranslator 클래스 테스트', () => {
  const translator = new ErrorMessageTranslator(ESLINT_ERROR_TRANSLATION_MAP);

  describe('getKoreanMessage 메서드 테스트', () => {
    test.each([
      [
        {
          ruleId: 'no-console',
          messageId: 'unexpected',
          message: 'Unexpected console statement.',
        },
        'console은 사용할 수 없습니다.',
        'no-console 규칙의 unexpected 메시지를 올바르게 번역해야 한다.',
      ],
      [
        {
          ruleId: 'max-depth',
          messageId: 'tooDeeply',
          message: 'Block depth is 5, but the maximum is 4.',
        },
        '현재 들여쓰기 깊이가 WOOWA_VARIABLE입니다. 최대 깊이는 WOOWA_VARIABLE입니다.',
        'max-depth 규칙의 tooDeeply 메시지를 올바르게 번역해야 한다.',
      ],
      [
        {
          ruleId: '@stylistic/lines-between-class-members',
          messageId: 'always',
          message: 'Expected blank line between class members.',
        },
        '클래스 내부 메서드 사이에 공백이 필요합니다.',
        '@stylistic/lines-between-class-members 규칙의 always 메시지를 올바르게 번역해야 한다.',
      ],
      [
        {
          ruleId: 'non-existent-rule',
          messageId: 'any-id',
          message: 'This is an unmapped rule.',
        },
        'This is an unmapped rule.',
        'ruleId가 맵에 없는 경우, 원본 메시지를 반환해야 한다.',
      ],
    ])('테스트: %s', (message, expected, description) => {
      // when
      const result = translator.getKoreanMessage(message);

      // then
      expect(result).toBe(expected);
    });

    test('예외 테스트 - ruleId는 존재하지만 messageId가 없는경우 에러를 발생시킨다', () => {
      // given
      const badMessage = {
        ruleId: 'no-console',
        messageId: 'nono',
        message: 'Unexpected console statement.',
      };

      // when & then
      expect(() => translator.getKoreanMessage(badMessage)).toThrow('[ERROR]');
    });
  });
});
