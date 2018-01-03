/**
 * Regex for comparisons
 *
 * @private
 * @memberof EvalRegex
 */
const REGEX_EXPRESSION_COMPARISON: RegExp = /^(.+)(===|!==|>=|<=|>|<|&&|\|\|)(.+)$/;

export default REGEX_EXPRESSION_COMPARISON;
