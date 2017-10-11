import evalExpression from "./evalExpression";
import wrapResult from "./wrapResult";


/**
 * Generic routine for the ternary a,op,b regex matching
 *
 * @private
 * @param {string} expression
 * @param {Object} ctx
 * @param {RegExp} regex
 * @param {Function} fn
 * @returns {Object}
 */
const ternaryRoutine = function (expression, ctx, regex, fn) {
    const match = expression.match(regex);
    const a = evalExpression(match[1], ctx);
    const b = evalExpression(match[3], ctx);
    const result = a.success && b.success ? fn(a.val, match[2], b.val) : null;

    return wrapResult(result);
};

export default ternaryRoutine;
