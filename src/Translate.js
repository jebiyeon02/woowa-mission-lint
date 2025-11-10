import { ESLint } from 'eslint';

import ConfigGenerator from './ConfigGenerator.js';

// 실제로 번역을 실시하는 클래스

class Translate {
  async runLint(koreanRules) {
    console.log('검증을 시작합니다.');

    const configGenerator = new ConfigGenerator(koreanRules);
    const overrideConfig = configGenerator.generateConfig();

    const eslint = new ESLint({
      overrideConfigFile: true,
      // 여기서 flat 설정을 직접 넣음
      overrideConfig: overrideConfig,
    });

    // 파일 검사
    const results = await eslint.lintFiles(['.']);

    // 에러 가독성 좋게 출력해주기
    const formatter = await eslint.loadFormatter('stylish');
    console.log(formatter.format(results));

    // 에러가 있으면 종료코드 1
    process.exitCode = results.some((r) => r.errorCount > 0) ? 1 : 0;
    console.log('검증 완료!');
  }
}

export default Translate;
