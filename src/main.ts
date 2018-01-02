/**
 * String evaluation
 * @namespace Eval
 */
import evalExpression from "./eval/evalExpression";
import evalLiteral from "./eval/evalLiteral";
import evalVariable from "./eval/evalVariable";
import evalComparison from "./eval/evalComparison";
import evalMath from "./eval/evalMath";

/**
 * Maps used for evaluation
 * @namespace Map
 */
import mapComparison from "./map/mapComparison";
import mapLiteral from "./map/mapLiteral";
import mapMath from "./map/mapMath";

/**
 * Data retrieval
 * @namespace Get
 */
import getPathFull from "./get/getPathFull";
import getStringLiteral from "./get/getStringLiteral";

/**
 * RegExp used for evaluation
 * @namespace Constants
 */
import REGEX_IS_STRING_LITERAL from "./regex/regexIsStringLiteral";
import REGEX_IS_FUNCTION from "./regex/regexIsFunction";
import REGEX_EXPRESSION_COMPARISON from "./regex/regexExpressionComparison";
import REGEX_EXPRESSION_MATH from "./regex/regexExpressionMath";
import REGEX_PATH_SPLIT from "./regex/regexPathSplit";
import REGEX_FUNCTION_CALL_CONTENT from "./regex/regexFunctionCallContent";

export {
    evalExpression,
    evalLiteral,
    evalVariable,
    evalComparison,
    evalMath,

    getPathFull,
    getStringLiteral,

    mapComparison,
    mapLiteral,
    mapMath,

    REGEX_IS_STRING_LITERAL,
    REGEX_IS_FUNCTION,
    REGEX_EXPRESSION_COMPARISON,
    REGEX_EXPRESSION_MATH,
    REGEX_PATH_SPLIT,
    REGEX_FUNCTION_CALL_CONTENT
};
