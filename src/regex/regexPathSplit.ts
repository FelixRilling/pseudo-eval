/**
 * Regex for splitting paths
 *
 * @private
 * @memberof EvalRegex
 */
const REGEX_PATH_SPLIT: RegExp = /(?:\.|\[|\])+/g;

export default REGEX_PATH_SPLIT;
