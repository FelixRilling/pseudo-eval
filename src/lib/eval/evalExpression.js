import REGEX_EXPRESSION_COMPARISON from "../regex/regexExpressionComparison";
import REGEX_EXPRESSION_MATH from "../regex/regexExpressionMath";
import evalComparison from "./evalComparison";
import evalMath from "./evalMath";
import evalLiteral from "./evalLiteral";

/**
 * Evaluates an expression
 *
 * @param {string} expression
 * @param {Object} ctx
 * @returns {Object}
 */
const evalExpression = function (expression, ctx) {
    const isInverted = expression.startsWith("!");
    const expressionSubstr = isInverted ? expression.substr(1) : expression;
    let result;

    if (REGEX_EXPRESSION_COMPARISON.test(expressionSubstr)) {
        result = evalComparison(expressionSubstr, ctx);
    } else if (REGEX_EXPRESSION_MATH.test(expressionSubstr)) {
        result = evalMath(expressionSubstr, ctx);
    } else {
        result = evalLiteral(expressionSubstr, ctx);
    }

    if (isInverted) {
        result.val = !result.val;
    }

    return result;
};

export default evalExpression;
