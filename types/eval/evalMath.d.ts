import { IWrappedResult } from "../interfaces";
/**
 * Evaluates an comparison
 *
 * @param {string} expression
 * @param {Object} ctx
 * @returns {Object}
 */
declare const evalMath: (expression: string, ctx: object) => IWrappedResult;
export default evalMath;
