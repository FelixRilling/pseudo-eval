import { IWrappedResult } from "../interfaces";
/**
 * Evaluates an comparison
 *
 * @param {string} expression
 * @param {Object} ctx
 * @returns {Object}
 */
declare const evalComparison: (expression: string, ctx: object) => IWrappedResult;
export default evalComparison;
