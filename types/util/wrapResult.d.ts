import { IWrappedResult } from "../interfaces";
/**
 * Utility function for returns
 *
 * @private
 * @param {any} val
 * @returns {Object}
 */
declare const wrapResult: <T>(val: T) => IWrappedResult<T>;
export default wrapResult;
