import { IWrappedResult } from "../interfaces";
/**
 * Evaluates a literal
 *
 * @function evalLiteral
 * @memberof Eval
 * @param {string} str
 * @param {Object} ctx
 * @returns {Object}
 */
declare const evalLiteral: (str: string, ctx: object) => IWrappedResult;
export default evalLiteral;
