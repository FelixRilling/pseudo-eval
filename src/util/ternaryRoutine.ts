import evalExpression from "../eval/evalExpression";
import wrapResult from "./wrapResult";
import { IWrappedResult } from "../interfaces";

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
    const match = <RegExpMatchArray>str.match(regex);
    const a: IWrappedResult = evalExpression(match[1], ctx);
    const b: IWrappedResult = evalExpression(match[3], ctx);

    if (a.success && b.success && map.has(match[2])) {
        const fn = <(a: any, b: any) => any>map.get(match[2]);

        return wrapResult(fn(a.val, b.val));
    } else {
        return wrapResult(null);
    }
};

export default ternaryRoutine;
