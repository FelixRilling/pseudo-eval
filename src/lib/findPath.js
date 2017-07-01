"use strict";

import isDefined from "./isDefined";

/**
 * Finds a string-path as object property
 * @param {Object} obj
 * @param {String} path
 * @param {Boolean} raw
 * @returns {Object|null}
 */
const findPath = function (obj, path, raw) {
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
                return !raw ? current : {
                    val: current,
                    container: last,
                    key: currentPath
                };
            }
        }

        index++;
    }

    return null;
};

export default findPath;
