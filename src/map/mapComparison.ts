import {
    mapFromObject
} from "lightdash";

const mapComparison: Map<string, (a: any, b: any) => boolean> = mapFromObject({
    "===": (a: any, b: any): boolean => a === b,
    "!==": (a: any, b: any): boolean => a !== b,
    "&&": (a: any, b: any): boolean => a && b,
    "||": (a: any, b: any): boolean => a || b,
    ">=": (a: number | string, b: number | string): boolean => a >= b,
    "<=": (a: number | string, b: number | string): boolean => a <= b,
    ">": (a: number | string, b: number | string): boolean => a > b,
    "<": (a: number | string, b: number | string): boolean => a < b,
});

export default mapComparison;
