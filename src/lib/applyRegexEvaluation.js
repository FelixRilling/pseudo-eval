"use strict";

import execall from "./execall";

/**
 * Runs regex over string and evaluates matches from map
 * @param {String} expression
 * @param {Object} ctx
 * @param {RegExp} regex
 * @param {Map} map
 * @param {Function} fn
 * @returns {Mixed}
 */
const applyRegexEvaluation = function (expression, ctx, regex, map, fn) {
    const matches = execall(regex, expression);

    if (matches.length) {
        //@TODO make use of ALL matches
        const firstMatch = matches[0];

        if (map.has(firstMatch[0])) {
            const mapFn = map.get(firstMatch[0]);
            const splitted = expression.split(firstMatch[0]).map(part => fn(part.trim(), ctx));

            return mapFn(splitted[0], splitted[1]);
        } else {
            return null;
        }
    } else {
        return fn(expression, ctx);
    }
};

export default applyRegexEvaluation;
