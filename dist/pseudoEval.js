var pseudoEval = function (exports) {
  'use strict';
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
  /**
   * Checks if two values are the same
   *
   * @param {*} a
   * @param {*} b
   * @returns {boolean}
   */

  /**
   * Checks if the value is typeof the typestring
   *
   * @param {*} val
   * @param {string} type
   * @returns {boolean}
   */


  const isTypeOf = (val, type) => typeof val === type;
  /**
   * Checks if a value is undefined
   *
   * @param {*} val
   * @returns {boolean}
   */


  const isUndefined = val => isTypeOf(val, "undefined");
  /**
   * Checks if a value is not undefined
   *
   * @param {*} val
   * @returns {boolean}
   */


  const isDefined = val => !isUndefined(val);
  /**
   * Checks if a target has a certain key
   *
   * @param {any} target
   * @param {string} key
   * @returns {boolean}
   */


  const hasKey = (target, key) => isDefined(target[key]);
  /**
   * Accesses a target by a path of keys. If the path doesn't exist, null is returned
   *
   * @param {any} target
   * @param {Array<string>} path
   * @returns {boolean}
   */


  const getPath = (target, path) => {
    let targetCurrent = target;
    let index = 0;

    while (isDefined(targetCurrent) && index < path.length) {
      const keyCurrent = path[index];

      if (hasKey(targetCurrent, keyCurrent)) {
        targetCurrent = targetCurrent[keyCurrent];
        index++;
      } else {
        return null;
      }
    }

    return targetCurrent;
  };
  /**
   * Returns an array of the objects entries
   *
   * @param {Object} obj
   * @returns {Array<[string, any]>}
   */


  const objEntries = obj => Object.entries(obj);
  /**
   * Creates a Map from an Object
   * @param {Object} obj
   * @returns {Map}
   */


  const mapFromObject = obj => new Map(objEntries(obj));

  const REGEX_IS_NUMBER = /^[\d.-]+$/;
  const REGEX_IS_STRING = /^["'`].*["'`]$/;
  const REGEX_IS_FUNCTION = /^.+\(.*\)$/;
  const REGEX_EXPRESSION_COMPARISON = /(===|!==|>=|<=|>|<|&&|\|\|)/g;
  const REGEX_EXPRESSION_MATH = /(\+|-|\*|\*\*|\/|%)/g;
  const REGEX_EXPRESSION_METHOD = /([\w.]+)\s*\(((?:[^()]*)*)?\s*\)/;
  const mapComparison = mapFromObject({
    "===": (a, b) => a === b,
    "!==": (a, b) => a !== b,
    ">=": (a, b) => a >= b,
    "<=": (a, b) => a <= b,
    ">": (a, b) => a > b,
    "<": (a, b) => a < b,
    "&&": (a, b) => a && b,
    "||": (a, b) => a || b
  });
  const mapMath = mapFromObject({
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
    "%": (a, b) => a % b
  });
  const mapLiterals = mapFromObject({
    "false": false,
    "true": true,
    "null": null
  });
  /**
   * Evalutates Comparison String
   * @param {String} expression
   * @param {Object} [ctx={}]
   * @returns {Mixed}
   */

  const evalComparison = (expression, ctx = {}) => applyRegexEvaluation(expression, ctx, REGEX_EXPRESSION_COMPARISON, mapComparison, evalMath);
  /**
   * Evalutates Math String
   * @param {String} expression
   * @param {Object} [ctx={}]
   * @returns {Mixed}
   */


  const evalMath = (expression, ctx = {}) => applyRegexEvaluation(expression, ctx, REGEX_EXPRESSION_MATH, mapMath, evalLiteral);
  /**
   * Evalutates Literal String
   * @param {String} expression
   * @param {Object} [ctx={}]
   * @returns {Mixed}
   */


  const evalLiteral = function evalLiterals(expression, ctx = {}) {
    if (REGEX_IS_NUMBER.test(expression)) {
      //Cast to number
      return Number(expression);
    } else if (REGEX_IS_STRING.test(expression)) {
      //Cut of quotes
      return expression.substr(1, expression.length - 2);
    } else if (mapLiterals.has(expression)) {
      return mapLiterals.get(expression);
    } else {
      return evalVariable(expression, ctx);
    }
  };
  /**
   * Evalutates Variable String
   * @param {String} expression
   * @param {Object} [ctx={}]
   * @returns {Mixed}
   */


  const evalVariable = function (expression, ctx = {}) {
    if (REGEX_IS_FUNCTION.test(expression)) {
      const matched = expression.match(REGEX_EXPRESSION_METHOD);
      const method = getPath(ctx, matched[1].split(""));

      if (method) {
        const argsExpressions = typeof matched[2] !== "undefined" ? matched[2].split(",") : [];
        const args = argsExpressions.map(arg => evalComparison(arg, ctx));
        return method(...args);
      } else {
        return null;
      }
    } else {
      return getPath(ctx, expression.split(""));
    }
  };

  const evalExpression = evalComparison;
  exports.evalExpression = evalExpression;
  exports.evalComparison = evalComparison;
  exports.evalMath = evalMath;
  exports.evalLiteral = evalLiteral;
  exports.evalVariable = evalVariable;
  return exports;
}({});