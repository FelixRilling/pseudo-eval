"use strict";

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
    if (regex.test(expression)) {
        const match = expression.match(regex)[1];

        if (map.has(match)) {
            const matchFn = map.get(match);
            const splitted = expression.split(match).map(part => fn(part.trim(), ctx));

            return matchFn(splitted[0], splitted[1]);
        } else {
            return null;
        }
    } else {
        return fn(expression, ctx);
    }
};

export default applyRegexEvaluation;
