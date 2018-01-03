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
 * @param {function} fn
 * @returns {Object}
 */
const ternaryRoutine = (
    str: string,
    ctx: object,
    regex: RegExp,
    fn: (a: IWrappedResult, o: any, b: IWrappedResult) => any | null
): IWrappedResult => {
    // @ts-ignore: matches are tested beforehand
    const match: RegExpMatchArray = str.match(regex);
    const a: IWrappedResult = evalExpression(match[1], ctx);
    const b: IWrappedResult = evalExpression(match[3], ctx);
    const result: any | null = a.success && b.success ? fn(a.val, match[2], b.val) : null;

    return wrapResult(result);
};

export default ternaryRoutine;
