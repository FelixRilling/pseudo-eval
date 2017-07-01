"use strict";

/**
 * Creates a Map from an Object
 * @param {Object} obj
 * @returns {Map}
 */
const mapFromObject = obj => new Map(Object.entries(obj));

export default mapFromObject;
