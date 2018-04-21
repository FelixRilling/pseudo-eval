import evalExpression from "../eval/evalExpression";
import { IWrappedResult } from "../interfaces";
import { evalFnAny } from "../types";
import wrapResult from "./wrapResult";

/**
 * Generic routine for the ternary a,op,b regex matching
 *
 * @private
 * @param {string} str
 * @param {Object} ctx
 * @param {RegExp} regex
 * @param {Map<string,function>} map
 * @returns {Object}
 */
const ternaryRoutine = (
    str: string,
    ctx: object,
    regex: RegExp,
    map: Map<PropertyKey, evalFnAny>
): IWrappedResult<any> => {
    const match = <RegExpMatchArray>str.match(regex);
    const a = evalExpression(match[1], ctx);
    const b = evalExpression(match[3], ctx);

    if (a.success && b.success && map.has(match[2])) {
        const fn = <evalFnAny>map.get(match[2]);

        return wrapResult(fn(a.val, b.val));
    }

    return wrapResult(null);
};

export default ternaryRoutine;
