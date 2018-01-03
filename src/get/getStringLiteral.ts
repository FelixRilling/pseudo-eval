/**
 * Returns a string literal as "normal" string
 *
 * @function getStringLiteral
 * @memberof Get
 * @param {string} str
 * @returns {string}
 */
const getStringLiteral = (str: string): string => str.substr(1, str.length - 2);

export default getStringLiteral;
