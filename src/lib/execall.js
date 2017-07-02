"use strict";

/**
 * Multi Regex matcher
 * Modified version of https://github.com/sindresorhus/execall
 * @param {RegExp} regex
 * @param {String} str
 * @returns {Array}
 */
const execall = function (regex, str) {
    const matches = [];
    let match;

    while (match = regex.exec(str)) {
        matches.push([match[0], match.slice(1), match.index]);
    }

    return matches;
};

export default execall;
