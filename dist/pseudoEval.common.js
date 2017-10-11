'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Checks if a value is an array
 *
 * @param {*} val
 * @returns {boolean}
 */
/**
 * Checks if the value is typeof the typestring
 *
 * @param {*} val
 * @param {string} type
 * @returns {boolean}
 */
const isTypeOf = (val, type) => typeof val === type;

/**
 * Checks if a value is undefined
 *
 * @param {*} val
 * @returns {boolean}
 */
const isUndefined = (val) => isTypeOf(val, "undefined");

/**
 * Checks if a value is not undefined
 *
 * @param {*} val
 * @returns {boolean}
 */
const isDefined = (val) => !isUndefined(val);

/**
 * Checks if a value is either undefined or null
 *
 * @param {*} val
 * @returns {boolean}
 */
const isNil = (val) => isUndefined(val) || val === null;

/**
 * Returns an array of the objects entries
 *
 * @param {Object} obj
 * @returns {Entry[]}
 */
const objEntries = (obj) => Object.entries(obj);

/**
 * Checks if a target has a certain key
 *
 * @param {any} target
 * @param {string} key
 * @returns {boolean}
 */
const hasKey = (target, key) => isDefined(target[key]);

/**
 * Checks if a value is a number as a string
 *
 * @param {*} val
 * @returns {boolean}
 */
const isStringNumber = (val) => !isNaN(Number(val));

/**
 * Creates a Map from an Object
 * @param {Object} obj
 * @returns {Map}
 */
const mapFromObject = (obj) => new Map(objEntries(obj));

/**
 * Accesses a target by a path of keys. If the path doesn't exist, null is returned
 *
 * @param {any} target
 * @param {Array<string>} path
 * @param {boolean} [getContaining=false]
 * @returns {boolean}
 */
const getPath = (target, path, getContaining = false) => {
    let targetCurrent = target;
    let targetLast = null;
    let keyCurrent = null;
    let index = 0;

    while (!isNil(targetCurrent) && index < path.length) {
        keyCurrent = path[index];

        if (hasKey(targetCurrent, keyCurrent)) {
            targetLast = targetCurrent;
            targetCurrent = targetCurrent[keyCurrent];
            index++;
        } else {
            return null;
        }
    }

    if (getContaining) {
        return {
            val: targetCurrent,
            container: targetLast,
            key: keyCurrent,
            index
        };
    } else {
        return targetCurrent;
    }
};

const REGEX_EXPRESSION_COMPARISON = /^(.+)(===|!==|>=|<=|>|<|&&|\|\|)(.+)$/;

const REGEX_EXPRESSION_MATH = /^(.+)(\+|-|\*|\*\*|\/|%)(.+)$/;

/**
 * Utility function for returns
 *
 * @private
 * @param {any} val
 * @returns {Object}
 */
const wrapResult = val => {
    return {
        val,
        success: val !== null,
    };
};

/**
 * Generic routine for the ternary a,op,b regex matching
 *
 * @private
 * @param {string} expression
 * @param {Object} ctx
 * @param {RegExp} regex
 * @param {Function} fn
 * @returns {Object}
 */
const ternaryRoutine = function (expression, ctx, regex, fn) {
    const match = expression.match(regex);
    const a = evalExpression(match[1], ctx);
    const b = evalExpression(match[3], ctx);
    const result = a.success && b.success ? fn(a.val, match[2], b.val) : null;

    return wrapResult(result);
};

const mapComparison = mapFromObject({
    "===": (a, b) => a === b,
    "!==": (a, b) => a !== b,
    ">=": (a, b) => a >= b,
    "<=": (a, b) => a <= b,
    ">": (a, b) => a > b,
    "<": (a, b) => a < b,
    "&&": (a, b) => a && b,
    "||": (a, b) => a || b,
});

/**
 * Evaluates an comparison
 *
 * @param {string} expression
 * @param {Object} ctx
 * @returns {Object}
 */
const evalComparison = (expression, ctx) => ternaryRoutine(expression, ctx, REGEX_EXPRESSION_COMPARISON, (a, comparer, b) => {
    return mapComparison.has(comparer) ? mapComparison.get(comparer)(a, b) : null;
});

const mapMath = mapFromObject({
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
    "%": (a, b) => a % b,
    "**": (a, b) => a ** b,
});

/**
 * Evaluates an comparison
 *
 * @param {string} expression
 * @param {Object} ctx
 * @returns {Object}
 */
const evalMath = (expression, ctx) => ternaryRoutine(expression, ctx, REGEX_EXPRESSION_MATH, (a, operator, b) => {
    return mapMath.has(operator) ? mapMath.get(operator)(a, b) : null;
});

const REGEX_IS_STRING_LITERAL = /^["'`].*["'`]$/;

/**
 * Returns a string literal as "normal" string
 *
 * @param {string} str
 * @param {string}
 */
const getStringLiteral = str => str.substr(1, str.length - 2);

/**
 * Evaluates an variable
 *
 * @param {string} expression
 * @param {Object} ctx
 * @returns {Object}
 */
const evalVariable = function (expression, ctx = {}, getContaining = false) {
    const result = getPath(ctx, expression.split("."), getContaining);

    return wrapResult(result);
};

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
    } else if (REGEX_IS_STRING_LITERAL.test(expression)) {
        result = getStringLiteral(expression);
    } else if (mapLiterals.has(expression)) {
        result = mapLiterals.get(expression);
    } else {
        result = evalVariable(expression, ctx).val;
    }

    return wrapResult(result);
};

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

exports.getPath = getPath;
exports.evalExpression = evalExpression;
exports.evalLiteral = evalLiteral;
exports.evalVariable = evalVariable;
exports.evalComparison = evalComparison;
exports.evalMath = evalMath;
