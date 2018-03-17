import { mapFromObject } from "lightdash";
import { evalFnComp, evalFnCompNumString } from "../types";

/**
 * Map for comparison checks
 *
 * @private
 * @memberof EvalMap
 */
const mapComparison: Map<
    PropertyKey,
    evalFnCompNumString | evalFnComp
> = mapFromObject({
    "===": (a: any, b: any): boolean => a === b,
    "!==": (a: any, b: any): boolean => a !== b,
    "&&": (a: any, b: any): boolean => a && b,
    "||": (a: any, b: any): boolean => a || b,
    ">=": (a: number | string, b: number | string): boolean => a >= b,
    "<=": (a: number | string, b: number | string): boolean => a <= b,
    ">": (a: number | string, b: number | string): boolean => a > b,
    "<": (a: number | string, b: number | string): boolean => a < b
});

export default mapComparison;
