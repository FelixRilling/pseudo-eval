"use strict";

import {
    getPath,
    mapFromObject
} from "lightdash";

const REGEX_EXPRESSION_COMPARISON = /^(.+)(===|!==|>=|<=|>|<|&&|\|\|)(.+)$/;
const REGEX_EXPRESSION_MATH = /^(.+)(\+|-|\*|\*\*|\/|%)(.+)$/;
const REGEX_IS_NUMBER = /^[\d.-]+$/;
const REGEX_IS_STRING = /^["'`].*["'`]$/;

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

const evalExpression = function (expression, ctx) {
    if (REGEX_EXPRESSION_COMPARISON.test(expression)) {
        const match = expression.match(REGEX_EXPRESSION_COMPARISON);

        return evalComparison(evalExpression(match[1], ctx), match[2], evalExpression(match[3], ctx));
    } else if (REGEX_EXPRESSION_MATH.test(expression)) {
        const match = expression.match(REGEX_EXPRESSION_MATH);

        return evalMath(evalExpression(match[1], ctx), match[2], evalExpression(match[3], ctx));
    } else {
        return evalLiteral(expression, ctx);
    }
};
const evalComparison = function (a, comparer, b) {
    if (mapComparison.has(comparer)) {
        return mapComparison.get(comparer)(a, b);
    } else {
        return new Error(`Invalid comparison operation '${comparer}'`);
    }
};

const evalMath = function (a, operator, b) {
    if (mapMath.has(operator)) {
        return mapMath.get(operator)(a, b);
    } else {
        return new Error(`Invalid operation operation '${operator}'`);
    }
}
const evalLiteral = function (expression, ctx) {
    if (REGEX_IS_NUMBER.test(expression)) {
        return Number(expression);
    } else if (REGEX_IS_STRING.test(expression)) {
        return expression.substr(1, expression.length - 2);
    } else if (mapLiterals.has(expression)) {
        return mapLiterals.get(expression);
    } else {
        return evalVariable(expression, ctx);
    }
};

const evalVariable = function (expression, ctx = {}) {
    return getPath(ctx, expression.split("."));
};

export {
    evalExpression,
    evalComparison,
    evalMath,
    evalLiteral,
    evalVariable
};
