import getPathFull from "../get/getPathFull";
import { IWrappedResult } from "../interfaces";
import wrapResult from "../util/wrapResult";

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
): IWrappedResult<any> => wrapResult(getPathFull(ctx, str, getContaining));

export default evalVariable;
