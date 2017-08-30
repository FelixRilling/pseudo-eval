"use strict";

import applyRegexEvaluation from "./lib/applyRegexEvaluation";
import {
    getPath,
    mapFromObject
} from "lightdash";

const REGEX_IS_NUMBER = /^[\d.-]+$/;
const REGEX_IS_STRING = /^["'`].*["'`]$/;
const REGEX_IS_FUNCTION = /^.+\(.*\)$/;
const REGEX_EXPRESSION_COMPARISON = /(===|!==|>=|<=|>|<|&&|\|\|)/g;
const REGEX_EXPRESSION_MATH = /(\+|-|\*|\*\*|\/|%)/g;
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
 * Evalutates Comparison String
 * @param {String} expression
 * @param {Object} [ctx={}]
 * @returns {Mixed}
 */
const evalComparison = (expression, ctx = {}) => applyRegexEvaluation(expression, ctx, REGEX_EXPRESSION_COMPARISON, mapComparison, evalMath);

/**
 * Evalutates Math String
 * @param {String} expression
 * @param {Object} [ctx={}]
 * @returns {Mixed}
 */
const evalMath = (expression, ctx = {}) => applyRegexEvaluation(expression, ctx, REGEX_EXPRESSION_MATH, mapMath, evalLiteral);

/**
 * Evalutates Literal String
 * @param {String} expression
 * @param {Object} [ctx={}]
 * @returns {Mixed}
 */
const evalLiteral = function evalLiterals(expression, ctx = {}) {
    if (REGEX_IS_NUMBER.test(expression)) {
        //Cast to number
        return Number(expression);
    } else if (REGEX_IS_STRING.test(expression)) {
        //Cut of quotes
        return expression.substr(1, expression.length - 2);
    } else if (mapLiterals.has(expression)) {
        return mapLiterals.get(expression);
    } else {
        return evalVariable(expression, ctx);
    }
};

/**
 * Evalutates Variable String
 * @param {String} expression
 * @param {Object} [ctx={}]
 * @returns {Mixed}
 */
const evalVariable = function (expression, ctx = {}) {
    if (REGEX_IS_FUNCTION.test(expression)) {
        const matched = expression.match(REGEX_EXPRESSION_METHOD);
        const method = getPath(ctx, matched[1].split(""));

        if (method) {
            const argsExpressions = typeof matched[2] !== "undefined" ? matched[2].split(",") : [];
            const args = argsExpressions.map(arg => evalComparison(arg, ctx));

            return method(...args);
        } else {
            return null;
        }
    } else {
        return getPath(ctx, expression.split(""));
    }
};


const evalExpression = evalComparison;

export {
    evalExpression,
    evalComparison,
    evalMath,
    evalLiteral,
    evalVariable
};
