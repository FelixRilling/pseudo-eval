import { mapFromObject } from "lightdash";
import { evalFnAny, evalFnMath } from "../types";
/**
 * Map for math checks.
 *
 * @private
 * @memberof EvalMap
 */
const mapMath: Map<PropertyKey, evalFnMath | evalFnAny> = mapFromObject({
    "+": (a: any, b: any): any => a + b,
    "-": (a: number, b: number): number => a - b,
    "*": (a: number, b: number): number => a * b,
    "/": (a: number, b: number): number => a / b,
    "%": (a: number, b: number): number => a % b,
    "**": (a: number, b: number): number => a ** b
});

export default mapMath;
