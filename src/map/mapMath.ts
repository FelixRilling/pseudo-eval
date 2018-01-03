import {
    mapFromObject
} from "lightdash";

/**
 * Map for math checks.
 *
 * @private
 * @memberof EvalMap
 */
const mapMath: Map<string, (a: any, b: any) => any> = mapFromObject({
    "+": (a: any, b: any): any => a + b,
    "-": (a: number, b: number): number => a - b,
    "*": (a: number, b: number): number => a * b,
    "/": (a: number, b: number): number => a / b,
    "%": (a: number, b: number): number => a % b,
    "**": (a: number, b: number): number => a ** b,
});

export default mapMath;
