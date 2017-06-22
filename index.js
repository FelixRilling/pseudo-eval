"use strict";

const applyRegexEvaluation = require("./lib/applyRegexEvaluation");
const isDefined = require("./lib/isDefined");
const findPath = require("./lib/findPath");
const mapFromObject = require("./lib/mapFromObject");

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
 * @returns {Mixed}
 */
const parseVariable = function (expression, ctx = {}) {
    if (REGEX_IS_FUNCTION.test(expression)) {
        const matched = expression.match(REGEX_EXPRESSION_METHOD);
        const method = findPath(ctx, matched[1]);

        if (method) {
            const args = (isDefined(matched[2]) ? matched[2].split(",") : []).map(arg => parseLiteral(arg, ctx));

            return method(...args);
        } else {
            return null;
        }

    } else {
        return findPath(ctx, expression);
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
