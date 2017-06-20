"use strict";

const parseComparison = require("./lib/parseComparison");

/**
 * Redirects input to parseComparison
 * @param {String} expression
 * @param {Object} [ctx={}]
 * @returns {Mixed}
 */
module.exports = (expression, ctx = {}) => parseComparison(expression, ctx);
