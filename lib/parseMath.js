"use strict";

const taskRegex = require("./taskRegex");
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

module.exports = (expression, ctx) => taskRegex(expression, ctx, REGEX_EXPRESSION_MATH, mapMath, parseLiterals);
