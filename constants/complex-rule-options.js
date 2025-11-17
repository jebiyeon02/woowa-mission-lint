import { RULE_STATE } from './rule-state.js';

export const COMPLEX_RULE_OPTIONS = {
  '@stylistic/lines-between-class-members': (baseOption) => {
    if (baseOption === RULE_STATE.TURN_ON_AS_ERROR) {
      // 한줄짜리 멤버는 예외적으로 검사하지 않는 옵션 추가 -> 필드를 제외하기 위함
      return [
        RULE_STATE.TURN_ON_AS_ERROR,
        RULE_STATE.OPTION.AlWAYS,
        { exceptAfterSingleLine: true },
      ];
    }
    return baseOption;
  },
  // 나중에 다른 복잡한 규칙이 생기면 여기에 추가
};
