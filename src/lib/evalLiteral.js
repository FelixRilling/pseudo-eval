import REGEX_IS_STRING from "./regexIsString";
import {
    isStringNumber,
    mapFromObject
} from "lightdash";
import wrapResult from "./wrapResult";
import evalVariable from "./evalVariable";

const mapLiterals = mapFromObject({
    "false": false,
    "true": true,
    "null": null,
    "undefined": undefined,
    "Infinity": Infinity
});

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
    } else if (REGEX_IS_STRING.test(expression)) {
        result = expression.substr(1, expression.length - 2);
    } else if (mapLiterals.has(expression)) {
        result = mapLiterals.get(expression);
    } else {
        result = evalVariable(expression, ctx).val;
    }

    return wrapResult(result);
};

export default evalLiteral;
