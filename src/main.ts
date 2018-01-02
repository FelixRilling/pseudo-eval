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
 * Data retrieval
 * @namespace Get
 */
import getPathFull from "./get/getPathFull";
import getStringLiteral from "./get/getStringLiteral";

export {
    evalExpression,
    evalLiteral,
    evalVariable,
    evalComparison,
    evalMath,

    getPathFull,
    getStringLiteral
};
