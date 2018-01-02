/**
 * Evaluates an variable
 *
 * @param {string} expression
 * @param {Object} [ctx={}]
 * @param {boolean} [getContaining=false]
 * @returns {Object}
 */
declare const evalVariable: (expression: string, ctx?: object, getContaining?: boolean) => any;
export default evalVariable;
