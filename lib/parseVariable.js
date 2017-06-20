"use strict";

const isDefined = require("./isDefined");

const REGEX_IS_FUNCTION = /\(.*\)/;
const REGEX_CONTENT_METHOD = /([\w.]+)\s*\(((?:[^()]*)*)?\s*\)/;

/**
 * Finds a string-path as object property
 * @param {Object} obj
 * @param {String} path
 * @returns {Object|false}
 */
const findPath = function (obj, path) {
    const arr = path.split(".");
    let last = obj;
    let current;
    let index = 0;

    while (index < arr.length) {
        const currentPath = arr[index];

        current = last[currentPath];

        if (isDefined(current)) {
            if (index < arr.length - 1) {
                last = current;
            } else {
                return current;
            }
        }

        index++;
    }

    return null;
};

module.exports = function (expression, ctx, parseLiterals) {
    if (REGEX_IS_FUNCTION.test(expression)) {
        const matched = expression.match(REGEX_CONTENT_METHOD);
        const method = findPath(ctx, matched[1]);

        if (method) {
            const args = matched[2].split(",").map(arg => parseLiterals(arg, ctx));

            return method(...args);
        } else {
            return null;
        }

    } else {
        return findPath(ctx, expression);
    }
};
