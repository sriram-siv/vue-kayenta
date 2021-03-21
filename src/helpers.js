/**
 * Create new object with selected key/values from original
 * @param {Object} object 
 * @param {Array} keys 
 */
export function pick(object, keys) {
  return keys.reduce((res, key) => ({ ...res, [key]: object[key] }), {})
}