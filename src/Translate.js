import RuleTranslator from "./ruleTranslator.js";
import { RULE_MAP } from "../constants/rule-map.js";
import { ESLint } from "eslint";
import TranslatorUtils from "../utils/TranslatorUtils.js";

// 실제로 번역을 실시하는 클래스
class Translate {
  async runLint(koreanRules) {
    console.log("검증을 시작합니다.");
    const eslintRules = this.#makeEslintRules(koreanRules);
    const eslint = new ESLint({
      // 로컬에 어떤 설정 파일(eslint.config.js 등) 있어도 전부 무시
      overrideConfigFile: true,
      // 여기서 "플랫 설정"을 직접 넣는다
      overrideConfig: [
        {
          files: ["**/*.js"],
          languageOptions: { ecmaVersion: "latest", sourceType: "module" },
          // 가상 플러그인으로 커스텀 룰을 주입
          // plugins: {
          //   local: {
          //     rules: {
          //       "no-console-log": noConsoleLogRule,
          //     },
          //   },
          // },
          rules: {
            ...eslintRules,
          },
        },
      ],
    });

    // 파일 검사 (또는 lintText 사용 가능)
    const results = await eslint.lintFiles(["target-code.js"]);

    const formatter = await eslint.loadFormatter("stylish");
    console.log(formatter.format(results));

    // 에러가 있으면 종료코드 1
    process.exitCode = results.some((r) => r.errorCount > 0) ? 1 : 0;
    console.log("검증 완료!");
  }

  #makeEslintRules(koreanRules) {
    const translator = new RuleTranslator(RULE_MAP);
    const englishRules = {};

    Object.entries(koreanRules).forEach((koreanRule) => {
      let { ruleNameEslint, ruleOptionEslint } =
        translator.translate(koreanRule);
      if (TranslatorUtils.isPluginRule(ruleNameEslint)) {
        ruleNameEslint = TranslatorUtils.extractRuleOption(ruleNameEslint);
      }
      englishRules[ruleNameEslint] = ruleOptionEslint;
    });

    return englishRules;
  }
}

export default Translate;
