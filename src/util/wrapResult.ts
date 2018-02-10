import { IWrappedResult } from "../interfaces";

/**
 * Utility function for returns
 *
 * @private
 * @param {any} val
 * @returns {Object}
 */
const wrapResult = <T>(val: T): IWrappedResult<T> => {
    return {
        val,
        success: val !== null
    };
};

export default wrapResult;
