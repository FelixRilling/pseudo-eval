/**
 * Does not work with nested function calls
 */
const REGEX_FUNCTION_CALL_CONTENT: RegExp = /(.+)\s?\((.*)\)/;

export default REGEX_FUNCTION_CALL_CONTENT;
