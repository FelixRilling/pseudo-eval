import REGEX_EXPRESSION_COMPARISON from "../regex/regexExpressionComparison";
import ternaryRoutine from "../util/ternaryRoutine";
import mapComparison from "../map/mapComparison";
import { IWrappedResult } from "../interfaces";

/**
 * Evaluates an comparison
 *
 * @param {string} expression
 * @param {Object} ctx
 * @returns {Object}
 */
const evalComparison = (expression: string, ctx: object): IWrappedResult => ternaryRoutine(
    expression,
    ctx,
    REGEX_EXPRESSION_COMPARISON,
    // @ts-ignore
    (a, comparer, b) => mapComparison.has(comparer) ? mapComparison.get(comparer)(a, b) : null
);

export default evalComparison;
