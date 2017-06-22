"use strict";

const parseComparison = require("./lib/parseComparison");
const parseMath = require("./lib/parseMath");
const parseLiteral = require("./lib/parseLiteral");
const parseVariable = require("./lib/parseVariable");

/**
 * Redirects input to parseComparison
 * @param {String} expression
 * @param {Object} [ctx={}]
 * @returns {Mixed}
 */
const pseudoEval = (expression, ctx = {}) => parseComparison(expression, ctx);

pseudoEval.comparison = parseComparison;
pseudoEval.math = parseMath;
pseudoEval.literal = parseLiteral;
pseudoEval.variable = parseVariable;

module.exports = pseudoEval;
