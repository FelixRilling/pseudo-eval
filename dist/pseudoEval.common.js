'use strict';

/**
 * Runs regex over string and evaluates matches from map
 * @param {String} expression
 * @param {Object} ctx
 * @param {RegExp} regex
 * @param {Map} map
 * @param {Function} fn
 * @returns {Mixed}
 */
const applyRegexEvaluation = function (expression, ctx, regex, map, fn) {
    if (regex.test(expression)) {
        const match = expression.match(regex)[1];

        if (map.has(match)) {
            const matchFn = map.get(match);
            const splitted = expression.split(match).map(part => fn(part.trim(), ctx));

            return matchFn(splitted[0], splitted[1]);
        } else {
            return null;
        }
    } else {
        return fn(expression, ctx);
    }
};

/**
 * Finds a string-path as object property
 * @param {Object} obj
 * @param {String} path
 * @param {Boolean} raw
 * @returns {Object|null}
 */
const findPath = function (obj, path, raw) {
    const keys = path.split(".");
    let current = obj;
    let last = obj;
    let index = 0;

    while (obj && index < keys.length) {
        last = current;
        current = current[keys[index]];
        index++;
    }

    return !raw ? current : {
        _val: current,
        _container: last,
        _key: keys[index - 1]
    };
};

/**
 * Creates a Map from an Object
 * @param {Object} obj
 * @returns {Map}
 */
const mapFromObject = obj => new Map(Object.entries(obj));

const REGEX_IS_NUMBER = /^[\d.-]+$/;
const REGEX_IS_STRING = /^["']\w+["']$/;
const REGEX_IS_FUNCTION = /\(.*\)/;
const REGEX_EXPRESSION_COMPARISON = /(===|!==|>=|<=|>|<|&&|\|\|)/;
const REGEX_EXPRESSION_MATH = /(\+|-|\*|\*\*|\/|%)/;
const REGEX_EXPRESSION_METHOD = /([\w.]+)\s*\(((?:[^()]*)*)?\s*\)/;

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
const mapMath = mapFromObject({
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
    "%": (a, b) => a % b,
});
const mapLiterals = mapFromObject({
    "false": false,
    "true": true,
    "null": null
});

/**
 * Parses Comparison String
 * @param {String} expression
 * @param {Object} [ctx={}]
 * @returns {Mixed}
 */
const parseComparison = (expression, ctx = {}) => applyRegexEvaluation(expression, ctx, REGEX_EXPRESSION_COMPARISON, mapComparison, parseMath);

/**
 * Parses Math String
 * @param {String} expression
 * @param {Object} [ctx={}]
 * @returns {Mixed}
 */
const parseMath = (expression, ctx = {}) => applyRegexEvaluation(expression, ctx, REGEX_EXPRESSION_MATH, mapMath, parseLiteral);

/**
 * Parses Literal String
 * @param {String} expression
 * @param {Object} [ctx={}]
 * @returns {Mixed}
 */
const parseLiteral = function parseLiterals(expression, ctx = {}) {
    if (REGEX_IS_NUMBER.test(expression)) {
        return Number(expression);
    } else if (REGEX_IS_STRING.test(expression)) {
        return expression.substr(1, expression.length - 2);
    } else if (mapLiterals.has(expression)) {
        return mapLiterals.get(expression);
    } else {
        return parseVariable(expression, ctx);
    }
};

/**
 * Parses Variable String
 * @param {String} expression
 * @param {Object} [ctx={}]
 * @param {Boolean} [raw=false]
 * @returns {Mixed}
 */
const parseVariable = function (expression, ctx = {}, raw = false) {
    if (REGEX_IS_FUNCTION.test(expression)) {
        const matched = expression.match(REGEX_EXPRESSION_METHOD);
        const method = findPath(ctx, matched[1], raw);

        if (method) {
            const argsExpressions = typeof matched[2] !== "undefined" ? matched[2].split(",") : [];
            const args = argsExpressions.map(arg => parseComparison(arg, ctx));

            if (raw) {
                method._args = args;

                return method;
            } else {
                return method(...args);
            }
        } else {
            return null;
        }
    } else {
        return findPath(ctx, expression, raw);
    }
};

/**
 * Redirects input to parseComparison
 * @param {String} expression
 * @param {Object} [ctx={}]
 * @returns {Mixed}
 */
const pseudoEval = (expression, ctx = {}) => parseComparison(expression, ctx);

pseudoEval.comparison = parseComparison;
pseudoEval.math = parseMath;
pseudoEval.literal = parseLiteral;
pseudoEval.variable = parseVariable;

module.exports = pseudoEval;
