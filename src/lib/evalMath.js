import REGEX_EXPRESSION_MATH from "./regexExpressionMath";
import ternaryRoutine from "./ternaryRoutine";
import mapMath from "./mapMath";

/**
 * Evaluates an comparison
 *
 * @param {string} expression
 * @param {Object} ctx
 * @returns {Object}
 */
const evalMath = (expression, ctx) => ternaryRoutine(expression, ctx, REGEX_EXPRESSION_MATH, (a, operator, b) => {
    return mapMath.has(operator) ? mapMath.get(operator)(a, b) : null;
});

export default evalMath;
