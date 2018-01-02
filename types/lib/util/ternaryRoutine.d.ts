/**
 * Generic routine for the ternary a,op,b regex matching
 *
 * @private
 * @param {string} expression
 * @param {Object} ctx
 * @param {RegExp} regex
 * @param {function} fn
 * @returns {Object}
 */
declare const ternaryRoutine: (expression: string, ctx: object, regex: RegExp, fn: (a: any, o: any, b: any) => any) => any;
export default ternaryRoutine;
