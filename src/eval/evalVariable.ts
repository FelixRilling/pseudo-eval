import getPathFull from "../get/getPathFull";
import wrapResult from "../util/wrapResult";
import { IWrappedResult } from "../interfaces";

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
): IWrappedResult => wrapResult(getPathFull(ctx, expression, getContaining));

export default evalVariable;
