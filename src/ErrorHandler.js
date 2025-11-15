import { CONFIG_CONSTANTS } from '../constants/config-constants.js';

class ErrorHandler {
  static createError(message) {
    const errorTag = CONFIG_CONSTANTS.ERROR_TAG;
    const errorMessage = `${errorTag}: ${message}`;

    throw new Error(errorMessage);
  }
}

export default ErrorHandler;
