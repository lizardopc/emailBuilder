/**
 * Throttles how often a function is fired.
 * 
 * @param {Function} func - The function to throttle
 * @param {Number} wait - The wait duration
 * @param {Boolean} immediate - Flag for firing function immediately
 */
export function debounce(func, wait, immediate) {
	let timeout;
  
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    
    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
	};
}