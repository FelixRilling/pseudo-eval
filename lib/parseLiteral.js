"use strict";

const mapFromObject = require("./mapFromObject");
const parseVariable = require("./parseVariable");

const REGEX_IS_NUMBER = /^[\d.-]+$/;
const REGEX_IS_STRING = /^["']\w+["']$/;

const mapLiterals = mapFromObject({
    "false": false,
    "true": true,
    "null": null
});

/**
 * Evaluates literals and variables
 * @param {String} expression
 * @param {Object} [ctx={}]
 * @returns {Mixed}
 */
module.exports = function parseLiterals(expression, ctx = {}) {
    if (REGEX_IS_NUMBER.test(expression)) {
        return Number(expression);
    } else if (REGEX_IS_STRING.test(expression)) {
        return expression.substr(1, expression.length - 2);
    } else if (mapLiterals.has(expression)) {
        return mapLiterals.get(expression);
    } else {
        return parseVariable(expression, ctx, parseLiterals);
    }
};
