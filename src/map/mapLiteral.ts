import {
    mapFromObject
} from "lightdash";

// undefined and NaN are omitted because you usually wont need those
const mapLiteral: Map<string, boolean | null> = mapFromObject({
    "false": false,
    "true": true,
    "null": null
});

export default mapLiteral;
