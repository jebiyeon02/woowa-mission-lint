// 규칙 1개에 여러개의 messageId가 존재해서 각 원소가 Object인 배열로 구성
export const ESLINT_ERROR_TRANSLATION_MAP = {
  'no-console': [{ unexpected: 'console은 사용할 수 없습니다.' }],
  'max-lines-per-function': [
    {
      exceed:
        'WOOWA_VARIABLE(이)가 WOOWA_VARIABLE줄입니다. WOOWA_VARIABLE줄까지만 허용됩니다.',
    },
  ],
  'no-ternary': [{ noTernaryOperator: '삼항연산자는 사용할 수 없습니다.' }],
  '@stylistic/lines-between-class-members': [
    { always: '클래스 내부 메서드 사이에 공백이 필요합니다.' },
  ],
  'max-depth': [
    {
      tooDeeply:
        '현재 들여쓰기 깊이가 WOOWA_VARIABLE입니다. 최대 깊이는 WOOWA_VARIABLE입니다.',
    },
  ],
  curly: [
    {
      missingCurlyAfterCondition: '제어문 다음에는 중괄호를 작성해야 합니다.',
    },
  ],
};
