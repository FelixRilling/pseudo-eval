import REGEX_IS_STRING_LITERAL from "../regex/regexIsStringLiteral";
import wrapResult from "../util/wrapResult";
import getStringLiteral from "../get/getStringLiteral";
import evalVariable from "./evalVariable";
import mapLiteral from "../map/mapLiteral";
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
const evalLiteral = (str: string, ctx: object): IWrappedResult => {
    let result: any | null = null;

    if (!isNaN(Number(str))) {
        result = Number(str);
    } else if (REGEX_IS_STRING_LITERAL.test(str)) {
        result = getStringLiteral(str);
    } else if (mapLiteral.has(str)) {
        result = mapLiteral.get(str);
    } else {
        result = evalVariable(str, ctx).val;
    }

    return wrapResult(result);
};

export default evalLiteral;
