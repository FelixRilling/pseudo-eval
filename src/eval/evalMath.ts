import REGEX_EXPRESSION_MATH from "../regex/regexExpressionMath";
import ternaryRoutine from "../util/ternaryRoutine";
import mapMath from "../map/mapMath";
import { IWrappedResult } from "../interfaces";

/**
 * Evaluates an comparison
 *
 * @function evalMath
 * @memberof Eval
 * @param {string} str
 * @param {Object} ctx
 * @returns {Object}
 */
const evalMath = (str: string, ctx: object): IWrappedResult => ternaryRoutine(
    str,
    ctx,
    REGEX_EXPRESSION_MATH,
    // @ts-ignore
    (a, operator, b) => mapMath.has(operator) ? mapMath.get(operator)(a, b) : null
);

export default evalMath;