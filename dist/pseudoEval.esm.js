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
 * Finds a string-path as object property
 * @param {Object} obj
 * @param {String} path
 * @param {Boolean} raw
 * @returns {Object|null}
 */
const findPath = function (obj, path, raw) {
    const keys = path.split(".");
    let current = obj;
    let last = obj;
    let index = 0;

    while (obj && index < keys.length) {
        last = current;
        current = current[keys[index]];
        index++;
    }

    return !raw ? current : {
        _val: current,
        _container: last,
        _key: keys[index - 1]
    };
};

/**
 * Checks if two values are the same
 *
 * @param {*} a
 * @param {*} b
 * @returns {boolean}
 */
/**
 * Returns an array of the objects entries
 *
 * @param {Object} obj
 * @returns {Array<[string, any]>}
 */
const objEntries = (obj) => Object.entries(obj);
/**
 * Creates a Map from an Object
 * @param {Object} obj
 * @returns {Map}
 */
const mapFromObject = (obj) => new Map(objEntries(obj));

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
    "||": (a, b) => a || b,
});
const mapMath = mapFromObject({
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
    "%": (a, b) => a % b,
});
const mapLiterals = mapFromObject({
    "false": false,
    "true": true,
    "null": null
});

/**
 * Parses Comparison String
 * @param {String} expression
 * @param {Object} [ctx={}]
 * @returns {Mixed}
 */
const parseComparison = (expression, ctx = {}) => applyRegexEvaluation(expression, ctx, REGEX_EXPRESSION_COMPARISON, mapComparison, parseMath);

/**
 * Parses Math String
 * @param {String} expression
 * @param {Object} [ctx={}]
 * @returns {Mixed}
 */
const parseMath = (expression, ctx = {}) => applyRegexEvaluation(expression, ctx, REGEX_EXPRESSION_MATH, mapMath, parseLiteral);

/**
 * Parses Literal String
 * @param {String} expression
 * @param {Object} [ctx={}]
 * @returns {Mixed}
 */
const parseLiteral = function parseLiterals(expression, ctx = {}) {
    if (REGEX_IS_NUMBER.test(expression)) {
        //Cast to number
        return Number(expression);
    } else if (REGEX_IS_STRING.test(expression)) {
        //Cut of quotes
        return expression.substr(1, expression.length - 2);
    } else if (mapLiterals.has(expression)) {
        return mapLiterals.get(expression);
    } else {
        return parseVariable(expression, ctx);
    }
};

/**
 * Parses Variable String
 * @param {String} expression
 * @param {Object} [ctx={}]
 * @param {Boolean} [raw=false]
 * @returns {Mixed}
 */
const parseVariable = function (expression, ctx = {}, raw = false) {
    if (REGEX_IS_FUNCTION.test(expression)) {
        const matched = expression.match(REGEX_EXPRESSION_METHOD);
        const method = findPath(ctx, matched[1], raw);

        if (method) {
            const argsExpressions = typeof matched[2] !== "undefined" ? matched[2].split(",") : [];
            const args = argsExpressions.map(arg => parseComparison(arg, ctx));

            if (raw) {
                method._args = args;

                return method;
            } else {
                return method(...args);
            }
        } else {
            return null;
        }
    } else {
        return findPath(ctx, expression, raw);
    }
};

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

export default pseudoEval;
