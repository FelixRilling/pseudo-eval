import {
    mapFromObject
} from "lightdash";

// Infinity/null/undefined are omitted because you usually wont need them
const mapLiteral = mapFromObject({
    "false": false,
    "true": true
});

export default mapLiteral;
