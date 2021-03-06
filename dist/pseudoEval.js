var pseudoEval = (function (exports) {
    'use strict';

    /**
     * Checks if the value has a certain type-string.
     *
     * @function isTypeOf
     * @memberof Is
     * @since 1.0.0
     * @param {any} val
     * @param {string} type
     * @returns {boolean}
     * @example
     * isTypeOf({}, "object")
     * // => true
     *
     * isTypeOf([], "object")
     * // => true
     *
     * isTypeOf("foo", "string")
     * // => true
     *
     * @example
     * isTypeOf("foo", "number")
     * // => false
     */
    const isTypeOf = (val, type) => typeof val === type;

    /**
     * Checks if a value is undefined.
     *
     * @function isUndefined
     * @memberof Is
     * @since 1.0.0
     * @param {any} val
     * @returns {boolean}
     * @example
     * const a = {};
     *
     * isUndefined(a.b)
     * // => true
     *
     * isUndefined(undefined)
     * // => true
     *
     * @example
     * const a = {};
     *
     * isUndefined(1)
     * // => false
     *
     * isUndefined(a)
     * // => false
     */
    const isUndefined = (val) => isTypeOf(val, "undefined");

    /**
     * Checks if a value is undefined or null.
     *
     * @function isNil
     * @memberof Is
     * @since 1.0.0
     * @param {any} val
     * @returns {boolean}
     * @example
     * isNil(null)
     * // => true
     *
     * isNil(undefined)
     * // => true
     *
     * @example
     * isNil(0)
     * // => false
     *
     * isNil("")
     * // => false
     */
    const isNil = (val) => val == null;

    /**
     * Creates a map from an object.
     *
     * @function mapFromObject
     * @memberof Map
     * @since 1.0.0
     * @param {Object} obj
     * @returns {Map}
     * @example
     * mapFromObject({a: 1, b: 4, c: 5})
     * // => Map<string,number>{a: 1, b: 4, c: 5}
     */
    const mapFromObject = (obj) => new Map(Object.entries(obj));

    /**
     * Map for comparison checks
     *
     * @private
     * @memberof EvalMap
     */
    const mapComparison = mapFromObject({
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
     * Returns a string literal as "normal" string
     *
     * @function getStringLiteral
     * @memberof Get
     * @param {string} str
     * @returns {string}
     */
    const getStringLiteral = (str) => str.substr(1, str.length - 2);

    /**
     * Map for literal checks.
     *
     * undefined and NaN are omitted because you usually wont need those
     *
     * @private
     * @memberof EvalMap
     */
    const mapLiteral = mapFromObject({
        false: false,
        true: true,
        null: null
    });

    /**
     * Regex checking for string literals
     *
     * @private
     * @memberof EvalRegex
     */
    const REGEX_IS_STRING_LITERAL = /^["'`].*["'`]$/;

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
        while (!isNil(targetCurrent) && index < pathArr.length) {
            key = pathArr[index];
            if (!isUndefined(targetCurrent[key])) {
                targetLast = targetCurrent;
                targetCurrent = targetCurrent[key];
                index++;
            }
            else {
                return null;
            }
        }
        return getContaining
            ? {
                index,
                key,
                val: targetCurrent,
                container: targetLast
            }
            : targetCurrent;
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
        return wrapResult(evalVariable(str, ctx).val);
    };

    /**
     * Map for math checks.
     *
     * @private
     * @memberof EvalMap
     */
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
     * @function evalMath
     * @memberof Eval
     * @param {string} str
     * @param {Object} ctx
     * @returns {Object}
     */
    const evalMath = (str, ctx) => ternaryRoutine(str, ctx, REGEX_EXPRESSION_MATH, mapMath);

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
        return wrapResult(null);
    };

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
     * RegExp used internally for evaluation
     * @private
     * @namespace EvalRegex
     */
    /**
     * Maps used internally for evaluation
     * @private
     * @namespace EvalMap
     */
    /**
     * Data retrieval
     * @namespace Get
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

    return exports;

}({}));
//# sourceMappingURL=pseudoEval.js.map
