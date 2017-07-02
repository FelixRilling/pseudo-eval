"use strict";

/**
 * Finds a string-path as object property
 * @param {Object} obj
 * @param {String} path
 * @param {Boolean} raw
 * @returns {Object|null}
 */
const findPath = function (obj, path, raw) {
    const keys = path.split(".");
    let current = obj;
    let last = obj;
    let index = 0;

    while (obj && index < keys.length) {
        last = current;
        current = current[keys[index]];
        index++;
    }

    return !raw ? current : {
        _val: current,
        _container: last,
        _key: keys[index - 1]
    };
};

export default findPath;
