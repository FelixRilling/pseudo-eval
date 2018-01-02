import { IWrappedResult } from "../interfaces";
/**
 * Evaluates an expression
 *
 * @param {string} expression
 * @param {Object} ctx
 * @returns {Object}
 */
declare const evalExpression: (expression: string, ctx: object) => IWrappedResult;
export default evalExpression;
