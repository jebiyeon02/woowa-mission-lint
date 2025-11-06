import RuleTranslator from "./ruleTranslator.js";
import { RULE_MAP } from "../constants/rule-map.js";

class Translate {
  static makeEslintRules(koreanRules) {
    const translator = new RuleTranslator(RULE_MAP);
    const englishRules = {};

    Object.entries(koreanRules).forEach((koreanRule) => {
      const { ruleNameEslint, ruleOptionEslint } =
        translator.translate(koreanRule);
      englishRules[ruleNameEslint] = ruleOptionEslint;
    });

    return englishRules;
  }
}

export default Translate;
