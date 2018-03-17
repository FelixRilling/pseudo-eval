type evalFnAny = (a: any, b: any) => any;
type evalFnMath = (a: number, b: number) => number;
type evalFnComp = (a: any, b: any) => boolean;
type evalFnCompNumString = (a: number | string, b: number | string) => boolean;

export { evalFnAny, evalFnMath, evalFnComp, evalFnCompNumString };
