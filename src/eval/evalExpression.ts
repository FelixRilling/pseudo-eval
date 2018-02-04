import { IWrappedResult } from "../interfaces";
import REGEX_EXPRESSION_COMPARISON from "../regex/regexExpressionComparison";
import REGEX_EXPRESSION_MATH from "../regex/regexExpressionMath";
import evalComparison from "./evalComparison";
import evalLiteral from "./evalLiteral";
import evalMath from "./evalMath";

/**
 * Evaluates an str
 *
 * @function evalExpression
 * @memberof Eval
 * @param {string} str
 * @param {Object} ctx
 * @returns {Object}
 */
const evalExpression = (str: string, ctx: object): IWrappedResult => {
    const isInverted: boolean = str.startsWith("!");
    const strSub: string = isInverted ? str.substr(1) : str;
    let result: IWrappedResult;

    if (REGEX_EXPRESSION_COMPARISON.test(strSub)) {
        result = evalComparison(strSub, ctx);
    } else if (REGEX_EXPRESSION_MATH.test(strSub)) {
        result = evalMath(strSub, ctx);
    } else {
        result = evalLiteral(strSub, ctx);
    }

    if (isInverted) {
        result.val = !result.val;
    }

    return result;
};

export default evalExpression;
