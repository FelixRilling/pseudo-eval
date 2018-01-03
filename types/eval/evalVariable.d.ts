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
declare const evalVariable: (str: string, ctx?: object, getContaining?: boolean) => IWrappedResult;
export default evalVariable;
