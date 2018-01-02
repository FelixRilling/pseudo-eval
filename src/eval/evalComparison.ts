import REGEX_EXPRESSION_COMPARISON from "../regex/regexExpressionComparison";
import ternaryRoutine from "../util/ternaryRoutine";
import mapComparison from "../map/mapComparison";

/**
 * Evaluates an comparison
 *
 * @param {string} expression
 * @param {Object} ctx
 * @returns {Object}
 */
const evalComparison = (expression: string, ctx: object): any => ternaryRoutine(
    expression,
    ctx,
    REGEX_EXPRESSION_COMPARISON,
    // @ts-ignore
    (a, comparer, b) => mapComparison.has(comparer) ? mapComparison.get(comparer)(a, b) : null
);

export default evalComparison;
