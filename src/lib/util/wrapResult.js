/**
 * Utility function for returns
 *
 * @private
 * @param {any} val
 * @returns {Object}
 */
const wrapResult = val => {
    return {
        val,
        success: val !== null,
    };
};

export default wrapResult;
