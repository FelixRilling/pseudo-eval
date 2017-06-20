"use strict";

const taskRegex = require("./taskRegex");
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

module.exports = (expression, ctx) => taskRegex(expression, ctx, REGEX_EXPRESSION_COMPARISON, mapComparison, parseMath);
