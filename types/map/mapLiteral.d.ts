/**
 * Map for literal checks.
 *
 * undefined and NaN are omitted because you usually wont need those
 *
 * @private
 * @memberof EvalMap
 */
declare const mapLiteral: Map<PropertyKey, boolean | null>;
export default mapLiteral;
