var pseudoEval = (function (exports) {
'use strict';

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
        success: val !== null
    };
};

/**
 * Generic routine for the ternary a,op,b regex matching
 *
 * @private
 * @param {string} expression
 * @param {Object} ctx
 * @param {RegExp} regex
 * @param {function} fn
 * @returns {Object}
 */
const ternaryRoutine = function (expression, ctx, regex, fn) {
  const match = expression.match(regex);
  const a = evalExpression(match[1], ctx);
  const b = evalExpression(match[3], ctx);
  const result = a.success && b.success ? fn(a.val, match[2], b.val) : null;

  return wrapResult(result);
};

/**
 * Checks if a value is an array
 *
 * Array.isArray shorthand
 *
 * @function isArray
 * @memberof Is
 * @since 1.0.0
 * @param {any} val
 * @returns {boolean}
 * @example
 * // returns true
 * isArray([]);
 * isArray([1, 2, 3]);
 *
 * @example
 * // returns false
 * isArray({});
 */
/**
 * Checks if the value has a certain type-string
 *
 * @function isTypeOf
 * @memberof Is
 * @since 1.0.0
 * @param {any} val
 * @param {string} type
 * @returns {boolean}
 * @example
 * //returns true
 * isTypeOf({},"object")
 * isTypeOf([],"object")
 * isTypeOf("foo","string")
 *
 * @example
 * //returns false
 * isTypeOf("foo","number")
 */
const isTypeOf = (val, type) => typeof val === type;

/**
 * Checks if a value is undefined
 *
 * @function isUndefined
 * @memberof Is
 * @since 1.0.0
 * @param {any} val
 * @returns {boolean}
 * @example
 * //returns false
 * const a = {};
 *
 * isUndefined(a.b)
 * isUndefined(undefined)
 *
 * @example
 * //returns false
 * const a = {};
 *
 * isUndefined(1)
 * isUndefined(a)
 */
const isUndefined = val => isTypeOf(val, "undefined");

/**
 * Checks if a value is not undefined
 *
 * @function isDefined
 * @memberof Is
 * @since 1.0.0
 * @param {any} val
 * @returns {boolean}
 * @example
 * //returns true
 * const a = {};
 *
 * isDefined(1)
 * isDefined(a)
 *
 * @example
 * //returns false
 * const a = {};
 *
 * isDefined(a.b)
 * isDefined(undefined)
 */
const isDefined = val => !isUndefined(val);

/**
 * Checks if a target has a certain key
 *
 * @function hasKey
 * @memberof Has
 * @since 1.0.0
 * @param {any} target
 * @param {string} key
 * @returns {boolean}
 * @example
 * //returns true
 * hasKey([1,2,3],"0")
 * hasKey({length:0},"length")
 * hasKey("foo","replace")
 *
 * @example
 * //returns false
 * hasKey({},"foo")
 * hasKey(null,"foo")
 * hasKey(1,"foo")
 */
const hasKey = (target, key) => isDefined(target[key]);

/**
 * Checks if a value is undefined or null
 *
 * @function isNil
 * @memberof Is
 * @since 1.0.0
 * @param {any} val
 * @returns {boolean}
 * @example
 * //returns true
 * isNil(null)
 * isNil(undefined)
 *
 * @example
 * //returns false
 * isNil(0)
 * isNil({})
 */
const isNil = val => isUndefined(val) || val === null;

/**
 * Returns an array of the objects entries
 *
 * Object.entries shorthand
 *
 * @function objEntries
 * @memberof Object
 * @since 1.0.0
 * @param {Object} obj
 * @returns {any[]} Array<[key: any, val: any]>]
 * @example
 * //returns [["a",1],["b",2],["c",3]]
 * objEntries({a:1,b:2,c:3})
 */
const objEntries = Object.entries;

/**
 * Checks if a value is a string containing a number
 *
 * @function isStringNumber
 * @memberof Is
 * @since 1.0.0
 * @param {string} val
 * @returns {boolean}
 * @example
 * //returns true
 * isStringNumber("123")
 * isStringNumber("0b010")
 *
 * @example
 * //returns false
 * isStringNumber("foo")
 */
const isStringNumber = val => !isNaN(Number(val));

/**
 * Creates a map from an object
 *
 * @function mapFromObject
 * @memberof Map
 * @since 1.0.0
 * @param {Object} obj
 * @returns {Map}
 * @example
 * //returns Map{a:1, b:4, c:5}
 * mapFromObject({a:1,b:4,c:5})
 */
const mapFromObject = obj => new Map(objEntries(obj));

const mapComparison = mapFromObject({
    "===": (a, b) => a === b,
    "!==": (a, b) => a !== b,
    ">=": (a, b) => a >= b,
    "<=": (a, b) => a <= b,
    ">": (a, b) => a > b,
    "<": (a, b) => a < b,
    "&&": (a, b) => a && b,
    "||": (a, b) => a || b
});

/**
 * Evaluates an comparison
 *
 * @param {string} expression
 * @param {Object} ctx
 * @returns {Object}
 */
const evalComparison = (expression, ctx) => ternaryRoutine(expression, ctx, REGEX_EXPRESSION_COMPARISON, (a, comparer, b) => mapComparison.has(comparer) ? mapComparison.get(comparer)(a, b) : null);

const mapMath = mapFromObject({
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
 * @param {string} expression
 * @param {Object} ctx
 * @returns {Object}
 */
const evalMath = (expression, ctx) => ternaryRoutine(expression, ctx, REGEX_EXPRESSION_MATH, (a, operator, b) => mapMath.has(operator) ? mapMath.get(operator)(a, b) : null);

const REGEX_IS_STRING_LITERAL = /^["'`].*["'`]$/;

/**
 * Returns a string literal as "normal" string
 *
 * @param {string} str
 * @param {string}
 */
const getStringLiteral = str => str.substr(1, str.length - 2);

const REGEX_PATH_SPLIT = /(?:\.|\[|\])+/g;

/**
 * Accesses a target by a path of keys. If the path doesn't exist, null is returned
 *
 * @param {any} target
 * @param {string} path
 * @param {boolean} [getContaining=false]
 * @returns {boolean}
 */
const getPath$1 = (target, path, getContaining = false) => {
    const pathArr = path.split(REGEX_PATH_SPLIT).map(item => REGEX_IS_STRING_LITERAL.test(item) ? getStringLiteral(item) : item);
    let targetCurrent = target;
    let targetLast = null;
    let keyCurrent = null;
    let index = 0;

    while (!isNil(targetCurrent) && index < pathArr.length) {
        keyCurrent = pathArr[index];

        if (hasKey(targetCurrent, keyCurrent)) {
            targetLast = targetCurrent;
            targetCurrent = targetCurrent[keyCurrent];
            index++;
        } else {
            return null;
        }
    }

    return getContaining ? {
        val: targetCurrent,
        container: targetLast,
        key: keyCurrent,
        index
    } : targetCurrent;
};

/**
 * Evaluates an variable
 *
 * @param {string} expression
 * @param {Object} [ctx={}]
 * @param {boolean} [getContaining=false]
 * @returns {Object}
 */
const evalVariable = (expression, ctx = {}, getContaining = false) => wrapResult(getPath$1(ctx, expression, getContaining));

const mapLiterals = mapFromObject({
    "false": false,
    "true": true
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

const REGEX_IS_FUNCTION = /^.+\(.*\)$/;

/**
 * Does not work with nested function calls
 */
const REGEX_FUNCTION_CALL_CONTENT = /(.+)\s?\((.*)\)/;

exports.evalExpression = evalExpression;
exports.evalLiteral = evalLiteral;
exports.evalVariable = evalVariable;
exports.evalComparison = evalComparison;
exports.evalMath = evalMath;
exports.getPath = getPath$1;
exports.getStringLiteral = getStringLiteral;
exports.mapComparison = mapComparison;
exports.mapLiteral = mapLiterals;
exports.mapMath = mapMath;
exports.regexExpressionComparison = REGEX_EXPRESSION_COMPARISON;
exports.regexExpressionMath = REGEX_EXPRESSION_MATH;
exports.regexIsStringLiteral = REGEX_IS_STRING_LITERAL;
exports.regexPathSplit = REGEX_PATH_SPLIT;
exports.regexIsFunction = REGEX_IS_FUNCTION;
exports.regexFunctionCallContent = REGEX_FUNCTION_CALL_CONTENT;

return exports;

}({}));
