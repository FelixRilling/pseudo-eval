declare type evalFnAny = (a: any, b: any) => any;
declare type evalFnMath = (a: number, b: number) => number;
declare type evalFnComp = (a: any, b: any) => boolean;
declare type evalFnCompNumString = (a: number | string, b: number | string) => boolean;
export { evalFnAny, evalFnMath, evalFnComp, evalFnCompNumString };
