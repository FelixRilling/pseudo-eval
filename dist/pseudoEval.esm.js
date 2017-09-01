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
const isUndefined = (val) => isTypeOf(val, "undefined");
/**
 * Checks if a value is not undefined
 *
 * @param {*} val
 * @returns {boolean}
 */
const isDefined = (val) => !isUndefined(val);
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
        }
        else {
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
const objEntries = (obj) => Object.entries(obj);
/**
 * Creates a Map from an Object
 * @param {Object} obj
 * @returns {Map}
 */
const mapFromObject = (obj) => new Map(objEntries(obj));

const REGEX_EXPRESSION_COMPARISON = /^(.+)(===|!==|>=|<=|>|<|&&|\|\|)(.+)$/;
const REGEX_EXPRESSION_MATH = /^(.+)(\+|-|\*|\*\*|\/|%)(.+)$/;
const REGEX_IS_NUMBER = /^[\d.-]+$/;
const REGEX_IS_STRING = /^["'`].*["'`]$/;

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

const evalExpression = function (expression, ctx) {
    if (REGEX_EXPRESSION_COMPARISON.test(expression)) {
        const match = expression.match(REGEX_EXPRESSION_COMPARISON);

        return evalComparison(evalExpression(match[1], ctx), match[2], evalExpression(match[3], ctx));
    } else if (REGEX_EXPRESSION_MATH.test(expression)) {
        const match = expression.match(REGEX_EXPRESSION_MATH);

        return evalMath(evalExpression(match[1], ctx), match[2], evalExpression(match[3], ctx));
    } else {
        return evalLiteral(expression, ctx);
    }
};
const evalComparison = function (a, comparer, b) {
    if (mapComparison.has(comparer)) {
        return mapComparison.get(comparer)(a, b);
    } else {
        return new Error(`Invalid comparison operation '${comparer}'`);
    }
};

const evalMath = function (a, operator, b) {
    if (mapMath.has(operator)) {
        return mapMath.get(operator)(a, b);
    } else {
        return new Error(`Invalid operation operation '${operator}'`);
    }
};
const evalLiteral = function (expression, ctx) {
    if (REGEX_IS_NUMBER.test(expression)) {
        return Number(expression);
    } else if (REGEX_IS_STRING.test(expression)) {
        return expression.substr(1, expression.length - 2);
    } else if (mapLiterals.has(expression)) {
        return mapLiterals.get(expression);
    } else {
        return evalVariable(expression, ctx);
    }
};

const evalVariable = function (expression, ctx = {}) {
    return getPath(ctx, expression.split("."));
};

export { evalExpression, evalComparison, evalMath, evalLiteral, evalVariable };
