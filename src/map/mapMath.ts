import {
    mapFromObject
} from "lightdash";

const mapMath: Map<string, (a: any, b: any) => any> = mapFromObject({
    "+": (a: any, b: any): any => a + b,
    "-": (a: number, b: number): number => a - b,
    "*": (a: number, b: number): number => a * b,
    "/": (a: number, b: number): number => a / b,
    "%": (a: number, b: number): number => a % b,
    "**": (a: number, b: number): number => a ** b,
});

export default mapMath;
