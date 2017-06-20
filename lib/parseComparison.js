"use strict";

const mapFromObject = require("./mapFromObject");
const parseLiterals = require("./parseLiterals");

const REGEX_EXPRESSION_COMPARISON = /(===|!==|>=|<=|>|<)/;

const mapComparison = mapFromObject({
    "===": (a, b) => a === b,
    "!==": (a, b) => a !== b,
    ">=": (a, b) => a >= b,
    "<=": (a, b) => a <= b,
    ">": (a, b) => a > b,
    "<": (a, b) => a < b,
});

module.exports = function (expression, ctx) {
    if (REGEX_EXPRESSION_COMPARISON.test(expression)) {
        const match = expression.match(REGEX_EXPRESSION_COMPARISON)[1];

        if (mapComparison.has(match)) {
            const matchFn = mapComparison.get(match);

            const splitted = expression.split(match).map(part => parseLiterals(part, ctx));

            return matchFn(splitted[0], splitted[1]);
        } else {
            return null;
        }
    } else {
        return parseLiterals(expression, ctx);
    }
};
