"use strict";

const applyRegexEvaluation = require("./applyRegexEvaluation");
const parseLiterals = require("./parseLiterals");

const REGEX_EXPRESSION_MATH = /(\+|-|\*|\*\*|\/|%)/;

const mapMath = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "**": (a, b) => a ** b,
    "/": (a, b) => a / b,
    "%": (a, b) => a % b,
};

/**
 * Evaluates math and sub-values
 * @param {String} expression
 * @param {Object} ctx
 * @returns {Mixed}
 */
module.exports = (expression, ctx) => applyRegexEvaluation(expression, ctx, REGEX_EXPRESSION_MATH, mapMath, parseLiterals);
