import getPath from "./getPath";
import wrapResult from "./wrapResult";

/**
 * Evaluates an variable
 *
 * @param {string} expression
 * @param {Object} ctx
 * @returns {Object}
 */
const evalVariable = function (expression, ctx = {}, getContaining = false) {
    const result = getPath(ctx, expression, getContaining);

    return wrapResult(result);
};

export default evalVariable;
