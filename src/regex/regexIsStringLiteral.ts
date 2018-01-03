/**
 * Regex checking for string literals
 *
 * @private
 * @memberof EvalRegex
 */
const REGEX_IS_STRING_LITERAL: RegExp = /^["'`].*["'`]$/;

export default REGEX_IS_STRING_LITERAL;
