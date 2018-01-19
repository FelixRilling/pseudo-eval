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
    if (!isNaN(Number(str))) {
        return wrapResult(Number(str));
    } else if (REGEX_IS_STRING_LITERAL.test(str)) {
        return wrapResult(getStringLiteral(str));
    } else if (mapLiteral.has(str)) {
        return wrapResult(mapLiteral.get(str));
    } else {
        return wrapResult(evalVariable(str, ctx).val);
    }
};

export default evalLiteral;
