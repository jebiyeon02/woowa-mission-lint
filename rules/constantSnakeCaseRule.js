import { CONFIG_CONSTANTS } from '../constants/config-constants.js';
const constantSnakeCaseRule = {
  meta: {
    type: 'problem',
    messages: {
      snake:
        '상수명은 영어 대문자를 SNAKE_CASE로 작성해야 합니다 (잘못된 상수명: {{name}})',
    },
    schema: [],
  },
  create(context) {
    return {
      VariableDeclarator(node) {
        if (node.parent?.kind !== 'const') return;
        if (node.id.type !== 'Identifier') return;

        const name = node.id.name;
        const regex = new RegExp(CONFIG_CONSTANTS.CAPITAL_SNAKE_CASE_REGEX);
        if (!regex.test(name)) {
          context.report({
            node,
            messageId: 'snake',
            data: {
              name: name,
            },
          });
        }
      },
    };
  },
};
export default constantSnakeCaseRule;
