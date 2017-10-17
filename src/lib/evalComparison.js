import REGEX_EXPRESSION_COMPARISON from "./regexExpressionComparison";
import ternaryRoutine from "./ternaryRoutine";
import mapComparison from "./mapComparison";

/**
 * Evaluates an comparison
 *
 * @param {string} expression
 * @param {Object} ctx
 * @returns {Object}
 */
const evalComparison = (expression, ctx) => ternaryRoutine(expression, ctx, REGEX_EXPRESSION_COMPARISON, (a, comparer, b) => {
    return mapComparison.has(comparer) ? mapComparison.get(comparer)(a, b) : null;
});

export default evalComparison;
