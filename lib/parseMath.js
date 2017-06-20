"use strict";

const mapFromObject = require("./mapFromObject");
const parseLiterals = require("./parseLiterals");

const REGEX_EXPRESSION_MATH = /(\+|-|\*|\*\*|\/|%)/;

const mapMath = mapFromObject({
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "**": (a, b) => a ** b,
    "/": (a, b) => a / b,
    "%": (a, b) => a % b,
});

module.exports = function (expression, ctx) {
    if (REGEX_EXPRESSION_MATH.test(expression)) {
        const match = expression.match(REGEX_EXPRESSION_MATH)[1];

        if (mapMath.has(match)) {
            const matchFn = mapMath.get(match);
            const splitted = expression.split(match).map(part => parseLiterals(part.trim(), ctx));

            return matchFn(splitted[0], splitted[1]);
        } else {
            return null;
        }
    } else {
        return parseLiterals(expression, ctx);
    }
};
