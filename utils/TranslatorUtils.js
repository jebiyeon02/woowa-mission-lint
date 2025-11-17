class TranslatorUtils {
  static addLevelPrefix(level) {
    return `level_${level}`;
  }

  static substringAfterChar(string, char) {
    const indexOfChar = string.indexOf(char);

    return string.substring(indexOfChar + 1);
  }

  // 변수들이 존재하는 원본 에러 메세지로부터 변수들을 추출하는 유틸 -> 한글로 변환할 때 그대로 사용하기 위함
  static extractVariablesFromMessage(message) {
    if (message.ruleId === 'max-lines-per-function') {
      const variables = [];

      // 화살표 함수 확인
      if (
        String(message.message).includes('Arrow function') ||
        String(message.message).includes('arrow function')
      ) {
        variables.push('화살표 함수');
      }

      // private 함수 확인
      const foundPrivateMethod = String(message.message).match(/#\S+/g);
      if (foundPrivateMethod) {
        variables.push(`private 메서드 ${foundPrivateMethod[0]}`);
      }

      // 일반 함수 또는 public 메서드
      const foundFunctionName = String(message.message).match(/'(.*?)'/g);
      if (foundFunctionName) {
        variables.push(foundFunctionName[0]);
      }

      const foundNumbers = String(message.message).match(/\d+/g);
      if (foundNumbers) {
        variables.push(...foundNumbers);
      }

      return variables;
    }

    if (message.ruleId === 'max-depth') {
      const variables = [];

      const foundNumbers = String(message.message).match(/\d+/g);
      if (foundNumbers) {
        variables.push(...foundNumbers);
      }

      return variables;
    }
  }

  static replaceMessageWithArray(message, targetString, array) {
    if (!message.includes(targetString) || array.length === 0) {
      return message;
    }

    const variable = array.shift();
    const newMessage = message.replace(targetString, variable);

    return TranslatorUtils.replaceMessageWithArray(
      newMessage,
      targetString,
      array,
    );
  }
}

export default TranslatorUtils;
