"use strict";

/**
 * Finds a string-path as object property
 * @param {Object} obj
 * @param {String} path
 * @returns {Object|null}
 */
const findPath = function (obj, path) {
    const keys = path.split(".");
    let current = obj;
    let index = 0;

    while (obj && index < keys.length) {
        current = current[keys[index]];
        index++;
    }

    return current;
};

export default findPath;
