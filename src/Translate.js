import { ESLint } from 'eslint';

import ConfigGenerator from './ConfigGenerator.js';
import { ESLINT_ERROR_TRANSLATION_MAP } from '../constants/eslint-error-translation-map.js';
import ErrorMessageTranslator from './eslint/ErrorMessageTranslator.js';
import TranslatorUtils from '../utils/TranslatorUtils.js';
import { formatWoowaLint } from './formatters/WoowaFormatter.js';

// 실제로 번역을 실시하는 클래스

class Translate {
  async runLint(koreanRules) {
    const configGenerator = new ConfigGenerator(koreanRules);
    const overrideConfig = configGenerator.generateConfig();

    const eslint = new ESLint({
      overrideConfigFile: true,
      // 여기서 flat 설정을 직접 넣음
      overrideConfig: overrideConfig,
    });

    // 파일 검사
    const results = await eslint.lintFiles(['.']);
    const errorMessageTranslator = new ErrorMessageTranslator(
      ESLINT_ERROR_TRANSLATION_MAP,
    );
    // 에러 메세지를 한국어로 번역하는 과정
    results.forEach((result) => {
      if (result.messages.length > 0) {
        result.messages.forEach((message) => {
          let koreanMessage = errorMessageTranslator.getKoreanMessage(message);
          // 이부분 메서드로 분리하자 나중에
          if (
            message.ruleId === 'max-depth' ||
            message.ruleId === 'max-lines-per-function'
          ) {
            const variables =
              TranslatorUtils.extractVariablesFromMessage(message);
            koreanMessage = TranslatorUtils.replaceMessageWithArray(
              koreanMessage,
              'WOOWA_VARIABLE',
              variables,
            );
          }
          message.message = koreanMessage;
        });
      }
    });

    // ESLint 내장 포맷터 사용 버전
    // const formatter = await eslint.loadFormatter('stylish');
    // console.log(formatter.format(results));

    // 커스텀 포맷터 적용
    const output = formatWoowaLint(results);
    console.log(output);

    const hasError = results.some((r) => r.errorCount > 0);
    process.exitCode = hasError ? 1 : 0;
  }
}

export default Translate;
