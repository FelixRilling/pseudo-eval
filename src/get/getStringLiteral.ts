/**
 * Returns a string literal as "normal" string
 *
 * @param {string} str
 * @param {string}
 */
const getStringLiteral = (str: string): string => str.substr(1, str.length - 2);

export default getStringLiteral;
