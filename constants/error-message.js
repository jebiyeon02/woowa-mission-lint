import { CONFIG_CONSTANTS } from './config-constants.js';

export const ERROR_MESSAGE = {
  KOREAN_RULE_NAME_NOT_FOUND: '일치하는 한글 규칙을 찾지 못했습니다.',
  PARAMETER_ONLY_CAN_BE_BOOLEAN:
    '파라미터로는 boolean 자료형만 들어올 수 있습니다.',

  ESLINT_RULE_ID_NOT_FOUND: '일치하는 옵션이 존재하지 않습니다.',
  CONFIG_OPTION_NOT_FOUND: '해당 설정을 찾을 수 없습니다.',

  CONFIG_FILE_NOT_FOUND: `설정 파일(${CONFIG_CONSTANTS.CONFIG_FILE_NAME})을 찾을 수 없습니다.\n${CONFIG_CONSTANTS.INIT_COMMAND} 명령을 실행하여 설정 파일을 생성하세요.`,

  INCLUDE_BLANK: '규칙에 공백이 포함되어 있습니다.',
  RULE_NOT_FOUND: '일치하는 규칙을 찾지 못했습니다.',
};
