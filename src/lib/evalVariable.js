import getPath from "./getPath";
import wrapResult from "./wrapResult";

/**
 * Evaluates an variable
 *
 * @param {string} expression
 * @param {Object} [ctx={}]
 * @param {boolean} [getContaining=false]
 * @returns {Object}
 */
const evalVariable = (expression, ctx = {}, getContaining = false) => wrapResult(getPath(ctx, expression, getContaining));

export default evalVariable;
