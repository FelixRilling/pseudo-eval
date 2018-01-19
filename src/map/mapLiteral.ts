import { mapFromObject } from "lightdash";

/**
 * Map for literal checks.
 *
 * undefined and NaN are omitted because you usually wont need those
 *
 * @private
 * @memberof EvalMap
 */
const mapLiteral: Map<PropertyKey, boolean | null> = mapFromObject({
    false: false,
    true: true,
    null: null
});

export default mapLiteral;
