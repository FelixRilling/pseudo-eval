import { IWrappedResult } from "../interfaces";
/**
 * Generic routine for the ternary a,op,b regex matching
 *
 * @private
 * @param {string} str
 * @param {Object} ctx
 * @param {RegExp} regex
 * @param {function} fn
 * @returns {Object}
 */
declare const ternaryRoutine: (str: string, ctx: object, regex: RegExp, fn: (a: any, o: any, b: any) => any) => IWrappedResult;
export default ternaryRoutine;
