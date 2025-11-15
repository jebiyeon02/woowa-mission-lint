import { ERROR_MESSAGE } from '../constants/error-message.js';
import ErrorHandler from './ErrorHandler.js';

class ErrorMessageTranslator {
  #errorMap;

  constructor(errorMap) {
    this.#errorMap = errorMap;
  }

  getKoreanMessage(message) {
    if (this.#hasMatchedRule(message.ruleId)) {
      const options = this.#errorMap[message.ruleId];
      const foundOption = options.find((option) => {
        return option[message.messageId];
      });

      if (foundOption) {
        return foundOption[message.messageId];
      }

      ErrorHandler.createError(
        `${ERROR_MESSAGE.ESLINT_RULE_ID_NOT_FOUND} (${message.ruleId})`,
      );
    }

    // 번역할 필요 없다면 그냥 기존 메세지를 return
    return message.message;
  }

  #hasMatchedRule(ruleId) {
    if (this.#errorMap[ruleId]) {
      return true;
    }

    return false;
  }
}

export default ErrorMessageTranslator;
