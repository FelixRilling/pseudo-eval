import {
    isNil,
    hasKey
} from "lightdash";

/**
 * Accesses a target by a path of keys. If the path doesn't exist, null is returned
 *
 * @param {any} target
 * @param {Array<string>} path
 * @param {boolean} [getContaining=false]
 * @returns {boolean}
 */
const getPath = (target, path, getContaining = false) => {
    let targetCurrent = target;
    let targetLast = null;
    let keyCurrent = null;
    let index = 0;

    while (!isNil(targetCurrent) && index < path.length) {
        keyCurrent = path[index];

        if (hasKey(targetCurrent, keyCurrent)) {
            targetLast = targetCurrent;
            targetCurrent = targetCurrent[keyCurrent];
            index++;
        } else {
            return null;
        }
    }

    if (getContaining) {
        return {
            val: targetCurrent,
            container: targetLast,
            key: keyCurrent,
            index
        };
    } else {
        return targetCurrent;
    }
};

export default getPath;
