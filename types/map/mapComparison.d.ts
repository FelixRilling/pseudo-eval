import { evalFnComp, evalFnCompNumString } from "../types";
/**
 * Map for comparison checks
 *
 * @private
 * @memberof EvalMap
 */
declare const mapComparison: Map<PropertyKey, evalFnCompNumString | evalFnComp>;
export default mapComparison;
