import { IWrappedResult } from "../interfaces";
/**
 * Evaluates a literal
 *
 * @param {string} expression
 * @param {Object} ctx
 * @returns {Object}
 */
declare const evalLiteral: (expression: string, ctx: object) => IWrappedResult;
export default evalLiteral;
