import REGEX_PATH_SPLIT from "../regex/regexPathSplit";
import REGEX_IS_STRING_LITERAL from "../regex/regexIsStringLiteral";
import { isNil, hasKey } from "lightdash";
import getStringLiteral from "../get/getStringLiteral";

/**
 * Accesses a target by a path of keys. If the path doesn't exist, null is returned
 *
 * @function getPathFull
 * @memberof Get
 * @param {any} target
 * @param {string} path
 * @param {boolean} [getContaining=false]
 * @returns {any|null}
 */
const getPathFull = (
    target: object,
    path: string,
    getContaining: boolean = false
): any | null => {
    const pathArr = path
        .split(REGEX_PATH_SPLIT)
        .map(
            (item: string) =>
                REGEX_IS_STRING_LITERAL.test(item)
                    ? getStringLiteral(item)
                    : item
        );
    let targetCurrent = <{ [key: string]: any }>target;
    let targetLast: object | null = null;
    let key: string | null = null;
    let index = 0;

    while (!isNil(targetCurrent) && index < pathArr.length) {
        key = pathArr[index];

        if (hasKey(targetCurrent, key)) {
            targetLast = targetCurrent;
            targetCurrent = targetCurrent[key];
            index++;
        } else {
            return null;
        }
    }

    if (getContaining) {
        return {
            index,
            key,
            val: targetCurrent,
            container: targetLast
        };
    } else {
        return targetCurrent;
    }
};

export default getPathFull;
