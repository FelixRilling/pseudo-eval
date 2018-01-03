import getPathFull from "../get/getPathFull";
import wrapResult from "../util/wrapResult";
import { IWrappedResult } from "../interfaces";

/**
 * Evaluates an variable
 *
 * @function evalVariable
 * @memberof Eval
 * @param {string} str
 * @param {Object} [ctx={}]
 * @param {boolean} [getContaining=false]
 * @returns {Object}
 */
const evalVariable = (
    str: string,
    ctx: object = {},
    getContaining: boolean = false
): IWrappedResult => wrapResult(getPathFull(ctx, str, getContaining));

export default evalVariable;
