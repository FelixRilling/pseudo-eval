import evalExpression from "../eval/evalExpression";
import { IWrappedResult } from "../interfaces";
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
    map: Map<PropertyKey, (a: any, b: any) => any>
): IWrappedResult => {
    const match = str.match(regex) as RegExpMatchArray;
    const a: IWrappedResult = evalExpression(match[1], ctx);
    const b: IWrappedResult = evalExpression(match[3], ctx);

    if (a.success && b.success && map.has(match[2])) {
        const fn = map.get(match[2]) as (a: any, b: any) => any;

        return wrapResult(fn(a.val, b.val));
    } else {
        return wrapResult(null);
    }
};

export default ternaryRoutine;
