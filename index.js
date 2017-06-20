"use strict";

const parseComparison = require("./lib/parseComparison");

module.exports = function (expression, ctx = {}) {
    return parseComparison(expression, ctx);
};
