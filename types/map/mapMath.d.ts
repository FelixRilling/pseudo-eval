import { evalFnAny, evalFnMath } from "../types";
/**
 * Map for math checks.
 *
 * @private
 * @memberof EvalMap
 */
declare const mapMath: Map<PropertyKey, evalFnMath | evalFnAny>;
export default mapMath;
