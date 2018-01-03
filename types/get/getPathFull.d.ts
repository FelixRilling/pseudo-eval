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
declare const getPathFull: (target: object, path: string, getContaining?: boolean) => any;
export default getPathFull;
