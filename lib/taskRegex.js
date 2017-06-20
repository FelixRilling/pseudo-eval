"use strict";

const mapFromObject = require("./mapFromObject");

module.exports = function (expression, ctx, regex, objMap, fn) {
    const map = mapFromObject(objMap);

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
