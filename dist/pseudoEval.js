var pseudoEval = function (exports) {
  'use strict';
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
   * Checks if a value is either undefined or null
   *
   * @param {*} val
   * @returns {boolean}
   */


  const isNil = val => isUndefined(val) || val === null;
  /**
   * Checks if a value is a number as a string
   *
   * @param {*} val
   * @returns {boolean}
   */


  const isStringNumber = val => !isNaN(Number(val));
  /**
   * Checks if a target has a certain key
   *
   * @param {any} target
   * @param {string} key
   * @returns {boolean}
   */


  const hasKey = (target, key) => isDefined(target[key]);
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

  const REGEX_EXPRESSION_COMPARISON = /^(.+)(===|!==|>=|<=|>|<|&&|\|\|)(.+)$/;
  const REGEX_EXPRESSION_MATH = /^(.+)(\+|-|\*|\*\*|\/|%)(.+)$/;
  const REGEX_IS_STRING = /^["'`].*["'`]$/;
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
    "null": null,
    "Infinity": Infinity
  });
  /**
   * Accesses a target by a path of keys. If the path doesn't exist, null is returned
   *
   * @param {any} target
   * @param {Array<string>} path
   * @param {boolean} [getContaining=false]
   * @returns {boolean}
   */

  const getPath = (target, path, getContaining = false) => {
    let targetCurrent = target;
    let targetLast = null;
    let keyCurrent = null;
    let index = 0;

    while (!isNil(targetCurrent) && index < path.length) {
      keyCurrent = path[index];

      if (hasKey(targetCurrent, keyCurrent)) {
        targetLast = targetCurrent;
        targetCurrent = targetCurrent[keyCurrent];
        index++;
      } else {
        return null;
      }
    }

    if (getContaining) {
      return {
        val: targetCurrent,
        container: targetLast,
        key: keyCurrent,
        index
      };
    } else {
      return targetCurrent;
    }
  };

  const wrapResult = val => {
    return {
      val,
      sucess: val !== null
    };
  };
  /**
   * Generic routine for the ternary a,op,b regex matching
   *
   * @param {string} expression
   * @param {Object} ctx
   * @param {RegExp} regex
   * @param {Function} fn
   * @returns {Object}
   */


  const ternaryRoutine = function (expression, ctx, regex, fn) {
    const match = expression.match(regex);
    const a = evalExpression(match[1], ctx);
    const b = evalExpression(match[3], ctx);
    const result = a.sucess && b.sucess ? fn(a.val, match[2], b.val) : null;
    return wrapResult(result);
  };
  /**
   * Evaluates an expression
   *
   * @param {string} expression
   * @param {Object} ctx
   * @returns {Object}
   */


  const evalExpression = function (expression, ctx) {
    const isInverted = expression.startsWith("!");
    const expressionSubstr = isInverted ? expression.substr(1) : expression;
    let result;

    if (REGEX_EXPRESSION_COMPARISON.test(expressionSubstr)) {
      result = evalComparison(expressionSubstr, ctx);
    } else if (REGEX_EXPRESSION_MATH.test(expressionSubstr)) {
      result = evalMath(expressionSubstr, ctx);
    } else {
      result = evalLiteral(expressionSubstr, ctx);
    }

    if (isInverted) {
      result.val = !result.val;
    }

    return result;
  };
  /**
   * Evaluates a literal
   *
   * @param {string} expression
   * @param {Object} ctx
   * @returns {Object}
   */


  const evalLiteral = function (expression, ctx) {
    let result = null;

    if (isStringNumber(expression)) {
      result = Number(expression);
    } else if (REGEX_IS_STRING.test(expression)) {
      result = expression.substr(1, expression.length - 2);
    } else if (mapLiterals.has(expression)) {
      result = mapLiterals.get(expression);
    } else {
      result = evalVariable(expression, ctx).val;
    }

    return wrapResult(result);
  };
  /**
   * Evaluates an variable
   *
   * @param {string} expression
   * @param {Object} ctx
   * @returns {Object}
   */


  const evalVariable = function (expression, ctx = {}, getContaining = false) {
    const result = getPath(ctx, expression.split("."), getContaining);
    return wrapResult(result);
  };
  /**
   * Evaluates an comparison
   *
   * @param {string} expression
   * @param {Object} ctx
   * @returns {Object}
   */


  const evalComparison = (expression, ctx) => ternaryRoutine(expression, ctx, REGEX_EXPRESSION_COMPARISON, (a, comparer, b) => {
    return mapComparison.has(comparer) ? mapComparison.get(comparer)(a, b) : null;
  });
  /**
   * Evaluates an comparison
   *
   * @param {string} expression
   * @param {Object} ctx
   * @returns {Object}
   */


  const evalMath = (expression, ctx) => ternaryRoutine(expression, ctx, REGEX_EXPRESSION_MATH, (a, operator, b) => {
    return mapMath.has(operator) ? mapMath.get(operator)(a, b) : null;
  });

  exports.getPath = getPath;
  exports.evalExpression = evalExpression;
  exports.evalLiteral = evalLiteral;
  exports.evalVariable = evalVariable;
  exports.evalComparison = evalComparison;
  exports.evalMath = evalMath;
  return exports;
}({});