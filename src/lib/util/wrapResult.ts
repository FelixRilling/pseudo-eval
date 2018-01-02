import { IWrappedResult } from "../../types";

/**
 * Utility function for returns
 *
 * @private
 * @param {any} val
 * @returns {Object}
 */
const wrapResult = (val: any): IWrappedResult => {
    return {
        val,
        success: val !== null,
    };
};

export default wrapResult;
