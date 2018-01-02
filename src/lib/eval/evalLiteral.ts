import REGEX_IS_STRING_LITERAL from "../regex/regexIsStringLiteral";
import wrapResult from "../util/wrapResult";
import getStringLiteral from "../get/getStringLiteral";
import evalVariable from "./evalVariable";
import mapLiteral from "../map/mapLiteral";
import {
    isNaN
} from "lightdash";

/**
 * Evaluates a literal
 *
 * @param {string} expression
 * @param {Object} ctx
 * @returns {Object}
 */
const evalLiteral = function (expression: string, ctx: object): any {
    let result = null;

    if (!isNaN(Number(expression))) {
        result = Number(expression);
    } else if (REGEX_IS_STRING_LITERAL.test(expression)) {
        result = getStringLiteral(expression);
    } else if (mapLiteral.has(expression)) {
        result = mapLiteral.get(expression);
    } else {
        result = evalVariable(expression, ctx).val;
    }

    return wrapResult(result);
};

export default evalLiteral;