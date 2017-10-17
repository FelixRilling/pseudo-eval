import REGEX_IS_STRING_LITERAL from "./regexIsStringLiteral";
import {
    isStringNumber,
} from "lightdash";
import wrapResult from "./wrapResult";
import getStringLiteral from "./getStringLiteral";
import evalVariable from "./evalVariable";
import mapLiteral from "./mapLiteral";

/**
 * Evaluates a literal
 *
 * @param {string} expression
 * @param {Object} ctx
 * @returns {Object}
 */
const evalLiteral = function (expression, ctx) {
    let result = null;

    if (isStringNumber(expression)) {
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
