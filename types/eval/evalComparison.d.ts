import { IWrappedResult } from "../interfaces";
/**
 * Evaluates an comparison
 *
 * @function evalComparison
 * @memberof Eval
 * @param {string} str
 * @param {Object} ctx
 * @returns {Object}
 */
declare const evalComparison: (str: string, ctx: object) => IWrappedResult<boolean>;
export default evalComparison;
