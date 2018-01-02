/* interface IWrappedResult {
    val: any;
    success: boolean;
} */

/**
 * Utility function for returns
 *
 * @private
 * @param {any} val
 * @returns {Object}
 */
const wrapResult = (val: any): any => {
    return {
        val,
        success: val !== null,
    };
};

export default wrapResult;
