import {
    mapFromObject
} from "lightdash";

/**
 * Map for literal checks.
 *
 * undefined and NaN are omitted because you usually wont need those
 *
 * @private
 * @memberof EvalMap
 */
const mapLiteral: Map<string, boolean | null> = mapFromObject({
    "false": false,
    "true": true,
    "null": null
});

export default mapLiteral;
