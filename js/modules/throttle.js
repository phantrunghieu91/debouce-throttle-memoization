/**
 * Throttles the execution of a callback function.
 * @param {Function} callback - The callback function to be throttled.
 * @param {number} delay - The delay in milliseconds between each execution of the callback.
 * @param {boolean} [immediate=false] - Whether to execute the callback immediately on the leading edge.
 * @returns {Function} - The throttled function.
 * @throws {TypeError} - If the first argument is not a function or the second argument is not a non-negative number.
 */
export function throttle(callback, delay, immediate = false) {
  if (typeof callback !== 'function') {
    throw new TypeError('Expected a function as the first argument');
  }

  if (typeof delay !== 'number' || delay < 0) {
    throw new TypeError('Expected a non-negative number as the second argument');
  }

  let shouldWait = false;
  let waitingArgs = null;

  const handleTimeout = () => {
    if (waitingArgs === null) {
      shouldWait = false;
    } else {
      callback(...waitingArgs);
      waitingArgs = null;
      setTimeout(handleTimeout, delay);
    }
  };

  return function(...args) {
    if (shouldWait) {
      waitingArgs = args;
    } else {
      if (immediate) callback(...args);
      shouldWait = true;
      setTimeout(() => {
        if (!immediate) callback(...args);
        handleTimeout();
      }, delay);
    }
  };
}

