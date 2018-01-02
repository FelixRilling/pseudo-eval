/* interface IWrappedResult } */

/**
 * Utility function for returns
 *
 * @private
 * @param {any} val
 * @returns {Object}
 */
const wrapResult = (val: any): {
    val: any;
    success: boolean;
} => {
    return {
        val,
        success: val !== null,
    };
};

export default wrapResult;
