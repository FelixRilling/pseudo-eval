import getPath from "../get/getPath";
import wrapResult from "../util/wrapResult";

/**
 * Evaluates an variable
 *
 * @param {string} expression
 * @param {Object} [ctx={}]
 * @param {boolean} [getContaining=false]
 * @returns {Object}
 */
const evalVariable = (
    expression: string,
    ctx: object = {},
    getContaining: boolean = false
): any => wrapResult(getPath(ctx, expression, getContaining));

export default evalVariable;
