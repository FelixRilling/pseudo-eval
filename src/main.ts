/**
 * String evaluation
 * @namespace Eval
 */
import evalComparison from "./eval/evalComparison";
import evalExpression from "./eval/evalExpression";
import evalLiteral from "./eval/evalLiteral";
import evalMath from "./eval/evalMath";
import evalVariable from "./eval/evalVariable";

/**
 * Data retrieval
 * @namespace Get
 */
import getPathFull from "./get/getPathFull";
import getStringLiteral from "./get/getStringLiteral";

/**
 * Maps used internally for evaluation
 * @private
 * @namespace EvalMap
 */
import mapComparison from "./map/mapComparison";
import mapLiteral from "./map/mapLiteral";
import mapMath from "./map/mapMath";

/**
 * RegExp used internally for evaluation
 * @private
 * @namespace EvalRegex
 */
import REGEX_EXPRESSION_COMPARISON from "./regex/regexExpressionComparison";
import REGEX_EXPRESSION_MATH from "./regex/regexExpressionMath";
import REGEX_GET_FUNCTION_CALL_ARGS from "./regex/regexGetFunctionCallArgs";
import REGEX_IS_FUNCTION_CALL from "./regex/regexIsFunctionCall";
import REGEX_IS_STRING_LITERAL from "./regex/regexIsStringLiteral";
import REGEX_PATH_SPLIT from "./regex/regexPathSplit";

export {
    evalExpression,
    evalLiteral,
    evalVariable,
    evalComparison,
    evalMath,
    getPathFull,
    getStringLiteral,
    mapComparison,
    mapMath,
    mapLiteral,
    REGEX_EXPRESSION_COMPARISON,
    REGEX_EXPRESSION_MATH,
    REGEX_GET_FUNCTION_CALL_ARGS,
    REGEX_IS_FUNCTION_CALL,
    REGEX_IS_STRING_LITERAL,
    REGEX_PATH_SPLIT
};
