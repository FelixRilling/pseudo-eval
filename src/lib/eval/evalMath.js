import REGEX_EXPRESSION_MATH from "../regex/regexExpressionMath";
import ternaryRoutine from "../util/ternaryRoutine";
import mapMath from "../map/mapMath";

/**
 * Evaluates an comparison
 *
 * @param {string} expression
 * @param {Object} ctx
 * @returns {Object}
 */
const evalMath = (expression, ctx) => ternaryRoutine(
    expression,
    ctx,
    REGEX_EXPRESSION_MATH,
    (a, operator, b) => mapMath.has(operator) ? mapMath.get(operator)(a, b) : null
);

export default evalMath;