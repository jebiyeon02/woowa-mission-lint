import { ERROR_MESSAGE } from "../constants/error-message.js";
import TranslatorUtils from "../utils/TranslatorUtils.js";

describe("번역기 유틸 테스트", () => {
  test.each([
    [true, false],
    [false, true],
  ])("boolean 타입 뒤집기 기능 테스트 %s -> %s", (given, result) => {
    // when & then
    expect(TranslatorUtils.invertBoolean(given)).toBe(result);
  });
  test("boolean 타입 뒤집기 예외 테스트", () => {
    // given
    const input = "good";

    // when & then
    expect(() => TranslatorUtils.invertBoolean(input)).toThrow(
      ERROR_MESSAGE.PARAMETER_ONLY_CAN_BE_BOOLEAN
    );
  });
});
