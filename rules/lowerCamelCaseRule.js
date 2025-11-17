import { CONFIG_CONSTANTS } from '../constants/config-constants.js';

const lowerCamelCaseRule = {
  meta: {
    type: 'problem',
    messages: {
      notCamelCase:
        '변수 또는 함수명은 카멜케이스로 작성해야 합니다 (잘못된 이름: {{name}})',
    },
    schema: [],
  },

  create(context) {
    return {
      VariableDeclarator(node) {
        if (node.id.type !== 'Identifier') {
          return;
        }

        const name = node.id.name;

        const regex = new RegExp(CONFIG_CONSTANTS.LOWER_CAMEL_CASE_REGEX);

        if (!regex.test(name)) {
          context.report({
            node,
            messageId: 'notCamelCase',
            data: {
              name: name,
            },
          });
        }
      },
    };
  },
};
export default lowerCamelCaseRule;
