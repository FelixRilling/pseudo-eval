"use strict";

const applyRegexEvaluation = require("./applyRegexEvaluation");
const parseMath = require("./parseMath");

const REGEX_EXPRESSION_COMPARISON = /(===|!==|>=|<=|>|<|&&|\|\|)/;

const mapComparison = {
    "===": (a, b) => a === b,
    "!==": (a, b) => a !== b,
    ">=": (a, b) => a >= b,
    "<=": (a, b) => a <= b,
    ">": (a, b) => a > b,
    "<": (a, b) => a < b,
    "&&": (a, b) => a && b,
    "||": (a, b) => a || b,
};

/**
 * Evaluates comparisons and sub-values
 * @param {String} expression
 * @param {Object} ctx
 * @returns {Mixed}
 */
module.exports = (expression, ctx) => applyRegexEvaluation(expression, ctx, REGEX_EXPRESSION_COMPARISON, mapComparison, parseMath);
