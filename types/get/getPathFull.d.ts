/**
 * Accesses a target by a path of keys. If the path doesn't exist, null is returned
 *
 * @param {any} target
 * @param {string} path
 * @param {boolean} [getContaining=false]
 * @returns {boolean}
 */
declare const getPathFull: (target: object, path: string, getContaining?: boolean) => object | null;
export default getPathFull;
