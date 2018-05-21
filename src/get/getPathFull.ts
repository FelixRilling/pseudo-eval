import { isNil, isUndefined } from "lightdash";
import getStringLiteral from "../get/getStringLiteral";
import REGEX_IS_STRING_LITERAL from "../regex/regexIsStringLiteral";
import REGEX_PATH_SPLIT from "../regex/regexPathSplit";

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
    let targetCurrent = target;
    let targetLast: object | null = null;
    let key: string | null = null;
    let index = 0;

    while (!isNil(targetCurrent) && index < pathArr.length) {
        key = pathArr[index];

        if (!isUndefined(targetCurrent[key])) {
            targetLast = targetCurrent;
            targetCurrent = targetCurrent[key];
            index++;
        } else {
            return null;
        }
    }

    return getContaining
        ? {
              index,
              key,
              val: targetCurrent,
              container: targetLast
          }
        : targetCurrent;
};

export default getPathFull;
