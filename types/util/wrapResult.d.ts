/**
 * Utility function for returns
 *
 * @private
 * @param {any} val
 * @returns {Object}
 */
declare const wrapResult: (val: any) => {
    val: any;
    success: boolean;
};
export default wrapResult;
