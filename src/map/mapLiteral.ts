import {
    mapFromObject
} from "lightdash";

// undefined is omitted because you usually wont need it
const mapLiteral: Map<string, any> = mapFromObject({
    "false": false,
    "true": true,
    "null": null,
    "Infinity": Infinity
});

export default mapLiteral;
