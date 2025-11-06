import { ERROR_MESSAGE } from "../constants/error-message";

class TranslatorUtils {
  static invertBoolean(boolean) {
    if (typeof boolean !== "boolean") {
      throw new Error(ERROR_MESSAGE.PARAMETER_ONLY_CAN_BE_BOOLEAN);
    }
    if (boolean) {
      return false;
    }
    return true;
  }
}

export default TranslatorUtils;
