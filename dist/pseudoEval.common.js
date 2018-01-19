'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var lightdash = require('lightdash');

/**
 * Regex for comparisons
 *
 * @private
 * @memberof EvalRegex
 */
const REGEX_EXPRESSION_COMPARISON = /^(.+)(===|!==|>=|<=|>|<|&&|\|\|)(.+)$/;

/**
 * Regex for math
 *
 * @private
 * @memberof EvalRegex
 */
const REGEX_EXPRESSION_MATH = /^(.+)(\+|-|\*|\*\*|\/|%)(.+)$/;

/**
 * Utility function for returns
 *
 * @private
 * @param {any} val
 * @returns {Object}
 */
const wrapResult = (val) => {
    return {
        val,
        success: val !== null
    };
};

/**
 * Generic routine for the ternary a,op,b regex matching
 *
 * @private
 * @param {string} str
 * @param {Object} ctx
 * @param {RegExp} regex
 * @param {Map<string,function>} map
 * @returns {Object}
 */
const ternaryRoutine = (str, ctx, regex, map) => {
    const match = str.match(regex);
    const a = evalExpression(match[1], ctx);
    const b = evalExpression(match[3], ctx);
    if (a.success && b.success && map.has(match[2])) {
        const fn = map.get(match[2]);
        return wrapResult(fn(a.val, b.val));
    }
    else {
        return wrapResult(null);
    }
};

/**
 * Map for comparison checks
 *
 * @private
 * @memberof EvalMap
 */
const mapComparison = lightdash.mapFromObject({
    "===": (a, b) => a === b,
    "!==": (a, b) => a !== b,
    "&&": (a, b) => a && b,
    "||": (a, b) => a || b,
    ">=": (a, b) => a >= b,
    "<=": (a, b) => a <= b,
    ">": (a, b) => a > b,
    "<": (a, b) => a < b
});

/**
 * Evaluates an comparison
 *
 * @function evalComparison
 * @memberof Eval
 * @param {string} str
 * @param {Object} ctx
 * @returns {Object}
 */
const evalComparison = (str, ctx) => ternaryRoutine(str, ctx, REGEX_EXPRESSION_COMPARISON, mapComparison);

/**
 * Map for math checks.
 *
 * @private
 * @memberof EvalMap
 */
const mapMath = lightdash.mapFromObject({
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
    "%": (a, b) => a % b,
    "**": (a, b) => a ** b
});

/**
 * Evaluates an comparison
 *
 * @function evalMath
 * @memberof Eval
 * @param {string} str
 * @param {Object} ctx
 * @returns {Object}
 */
const evalMath = (str, ctx) => ternaryRoutine(str, ctx, REGEX_EXPRESSION_MATH, mapMath);

/**
 * Regex checking for string literals
 *
 * @private
 * @memberof EvalRegex
 */
const REGEX_IS_STRING_LITERAL = /^["'`].*["'`]$/;

/**
 * Returns a string literal as "normal" string
 *
 * @function getStringLiteral
 * @memberof Get
 * @param {string} str
 * @returns {string}
 */
const getStringLiteral = (str) => str.substr(1, str.length - 2);

/**
 * Regex for splitting paths
 *
 * @private
 * @memberof EvalRegex
 */
const REGEX_PATH_SPLIT = /(?:\.|\[|\])+/g;

/**
 * Accesses a target by a path of keys. If the path doesn't exist, null is returned
 *
 * @function getPathFull
 * @memberof Get
 * @param {any} target
 * @param {string} path
 * @param {boolean} [getContaining=false]
 * @returns {any|null}
 */
const getPathFull = (target, path, getContaining = false) => {
    const pathArr = path
        .split(REGEX_PATH_SPLIT)
        .map((item) => REGEX_IS_STRING_LITERAL.test(item)
        ? getStringLiteral(item)
        : item);
    let targetCurrent = target;
    let targetLast = null;
    let key = null;
    let index = 0;
    while (!lightdash.isNil(targetCurrent) && index < pathArr.length) {
        key = pathArr[index];
        if (lightdash.hasKey(targetCurrent, key)) {
            targetLast = targetCurrent;
            targetCurrent = targetCurrent[key];
            index++;
        }
        else {
            return null;
        }
    }
    if (getContaining) {
        return {
            index,
            key,
            val: targetCurrent,
            container: targetLast
        };
    }
    else {
        return targetCurrent;
    }
};

/**
 * Evaluates an variable
 *
 * @function evalVariable
 * @memberof Eval
 * @param {string} str
 * @param {Object} [ctx={}]
 * @param {boolean} [getContaining=false]
 * @returns {Object}
 */
const evalVariable = (str, ctx = {}, getContaining = false) => wrapResult(getPathFull(ctx, str, getContaining));

/**
 * Map for literal checks.
 *
 * undefined and NaN are omitted because you usually wont need those
 *
 * @private
 * @memberof EvalMap
 */
const mapLiteral = lightdash.mapFromObject({
    false: false,
    true: true,
    null: null
});

/**
 * Evaluates a literal
 *
 * @function evalLiteral
 * @memberof Eval
 * @param {string} str
 * @param {Object} ctx
 * @returns {Object}
 */
const evalLiteral = (str, ctx) => {
    if (!isNaN(Number(str))) {
        return wrapResult(Number(str));
    }
    else if (REGEX_IS_STRING_LITERAL.test(str)) {
        return wrapResult(getStringLiteral(str));
    }
    else if (mapLiteral.has(str)) {
        return wrapResult(mapLiteral.get(str));
    }
    else {
        return wrapResult(evalVariable(str, ctx).val);
    }
};

/**
 * Evaluates an str
 *
 * @function evalExpression
 * @memberof Eval
 * @param {string} str
 * @param {Object} ctx
 * @returns {Object}
 */
const evalExpression = (str, ctx) => {
    const isInverted = str.startsWith("!");
    const strSub = isInverted ? str.substr(1) : str;
    let result;
    if (REGEX_EXPRESSION_COMPARISON.test(strSub)) {
        result = evalComparison(strSub, ctx);
    }
    else if (REGEX_EXPRESSION_MATH.test(strSub)) {
        result = evalMath(strSub, ctx);
    }
    else {
        result = evalLiteral(strSub, ctx);
    }
    if (isInverted) {
        result.val = !result.val;
    }
    return result;
};

/**
 * Regex for function call args
 *
 * @private
 * @memberof EvalRegex
 */
const REGEX_GET_FUNCTION_CALL_ARGS = /(.+)\s?\((.*)\)/;

/**
 * Regex checking for function calls
 *
 * @private
 * @memberof EvalRegex
 */
const REGEX_IS_FUNCTION_CALL = /^.+\(.*\)$/;

/**
 * String evaluation
 * @namespace Eval
 */
/**
 * Data retrieval
 * @namespace Get
 */
/**
 * Maps used internally for evaluation
 * @private
 * @namespace EvalMap
 */
/**
 * RegExp used internally for evaluation
 * @private
 * @namespace EvalRegex
 */

exports.evalExpression = evalExpression;
exports.evalLiteral = evalLiteral;
exports.evalVariable = evalVariable;
exports.evalComparison = evalComparison;
exports.evalMath = evalMath;
exports.getPathFull = getPathFull;
exports.getStringLiteral = getStringLiteral;
exports.mapComparison = mapComparison;
exports.mapMath = mapMath;
exports.mapLiteral = mapLiteral;
exports.REGEX_EXPRESSION_COMPARISON = REGEX_EXPRESSION_COMPARISON;
exports.REGEX_EXPRESSION_MATH = REGEX_EXPRESSION_MATH;
exports.REGEX_GET_FUNCTION_CALL_ARGS = REGEX_GET_FUNCTION_CALL_ARGS;
exports.REGEX_IS_FUNCTION_CALL = REGEX_IS_FUNCTION_CALL;
exports.REGEX_IS_STRING_LITERAL = REGEX_IS_STRING_LITERAL;
exports.REGEX_PATH_SPLIT = REGEX_PATH_SPLIT;
