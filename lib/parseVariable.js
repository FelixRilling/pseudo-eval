"use strict";

const isDefined = require("./isDefined");
const findPath = require("./findPath");

const REGEX_IS_FUNCTION = /\(.*\)/;
const REGEX_CONTENT_METHOD = /([\w.]+)\s*\(((?:[^()]*)*)?\s*\)/;


/**
 * Evaluates literals and variables
 * @param {String} expression
 * @param {Object} [ctx={}]
 * @param {Function} parseLiterals
 * @returns {Mixed}
 */
module.exports = function (expression, ctx = {}, parseLiterals) {
    if (REGEX_IS_FUNCTION.test(expression)) {
        const matched = expression.match(REGEX_CONTENT_METHOD);
        const method = findPath(ctx, matched[1]);

        if (method) {
            const args = (isDefined(matched[2]) ? matched[2].split(",") : []).map(arg => parseLiterals(arg, ctx));

            return method(...args);
        } else {
            return null;
        }

    } else {
        return findPath(ctx, expression);
    }
};
