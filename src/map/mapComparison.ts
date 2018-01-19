import { mapFromObject } from "lightdash";

/**
 * Map for comparison checks
 *
 * @private
 * @memberof EvalMap
 */
const mapComparison: Map<
    PropertyKey,
    (a: any, b: any) => boolean
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
