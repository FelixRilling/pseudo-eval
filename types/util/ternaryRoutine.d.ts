import { IWrappedResult } from "../interfaces";
import { evalFnAny } from "../types";
/**
 * Generic routine for the ternary a,op,b regex matching
 *
 * @private
 * @param {string} str
 * @param {Object} ctx
 * @param {RegExp} regex
 * @param {Map<string,function>} map
 * @returns {Object}
 */
declare const ternaryRoutine: (str: string, ctx: object, regex: RegExp, map: Map<string | number | symbol, evalFnAny>) => IWrappedResult<any>;
export default ternaryRoutine;
