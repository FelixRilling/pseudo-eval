import { IWrappedResult } from "../interfaces";
import mapComparison from "../map/mapComparison";
import REGEX_EXPRESSION_COMPARISON from "../regex/regexExpressionComparison";
import ternaryRoutine from "../util/ternaryRoutine";

/**
 * Evaluates an comparison
 *
 * @function evalComparison
 * @memberof Eval
 * @param {string} str
 * @param {Object} ctx
 * @returns {Object}
 */
const evalComparison = (str: string, ctx: object): IWrappedResult =>
    ternaryRoutine(str, ctx, REGEX_EXPRESSION_COMPARISON, mapComparison);

export default evalComparison;
