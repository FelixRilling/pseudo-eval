import { IWrappedResult } from "../interfaces";
/**
 * Evaluates an str
 *
 * @function evalExpression
 * @memberof Eval
 * @param {string} str
 * @param {Object} ctx
 * @returns {Object}
 */
declare const evalExpression: (str: string, ctx: object) => IWrappedResult<any>;
export default evalExpression;
