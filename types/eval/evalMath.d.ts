import { IWrappedResult } from "../interfaces";
/**
 * Evaluates an comparison
 *
 * @function evalMath
 * @memberof Eval
 * @param {string} str
 * @param {Object} ctx
 * @returns {Object}
 */
declare const evalMath: (str: string, ctx: object) => IWrappedResult<string | number>;
export default evalMath;
