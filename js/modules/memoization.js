/**
 * Memoizes a callback function.
 *
 * @param {Function} callback - The callback function to be memoized.
 * @returns {Function} - The memoized function.
 * @throws {TypeError} - If the first argument is not a function.
 */
export function memoization(callback) {
  if (typeof callback !== 'function') {
    throw new TypeError('Expected a function as the first argument');
  }

  const cache = new Map();

  return function(...args) {
    let key;
    try {
      key = JSON.stringify(args);
    } catch (error) {
      throw new Error('Failed to generate a cache key');
    }
    
    if (cache.has(key)) {
      console.log(`Data from cache ${key}`)
      return cache.get(key);
    }
    
    const result = callback(...args);
    cache.set(key, result);
    console.log(cache);
    return result;
  };
}
