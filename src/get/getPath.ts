import REGEX_PATH_SPLIT from "../regex/regexPathSplit";
import REGEX_IS_STRING_LITERAL from "../regex/regexIsStringLiteral";
import {
    isNil,
    hasKey
} from "lightdash";
import getStringLiteral from "../get/getStringLiteral";

/**
 * Accesses a target by a path of keys. If the path doesn't exist, null is returned
 *
 * @param {any} target
 * @param {string} path
 * @param {boolean} [getContaining=false]
 * @returns {boolean}
 */
const getPath = (target: object, path: string, getContaining: boolean = false) => {
    const pathArr = path
        .split(REGEX_PATH_SPLIT)
        .map((item: string) => REGEX_IS_STRING_LITERAL.test(item) ? getStringLiteral(item) : item);
    let targetCurrent = target;
    let targetLast: object | null = null;
    let keyCurrent: string | null = null;
    let index: number = 0;

    while (!isNil(targetCurrent) && index < pathArr.length) {
        keyCurrent = pathArr[index];

        if (hasKey(targetCurrent, keyCurrent)) {
            targetLast = targetCurrent;
            // @ts-ignore
            targetCurrent = targetCurrent[keyCurrent];
            index++;
        } else {
            return null;
        }
    }

    return getContaining ? {
        val: targetCurrent,
        container: targetLast,
        key: keyCurrent,
        index
    } : targetCurrent;
};

export default getPath;
