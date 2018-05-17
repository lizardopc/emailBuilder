const  emailContainer = document.querySelector('#email-grid');
const  blockContainer = document.querySelector('#block-container');
const structContainer = document.querySelector('#structure-container');

const emailBuilder = new EmailBuilder();
const toolbar = new Toolbar();

const toolbarContainer = document.querySelector('.tool-container');

// Hook Dragula events into EmailBuilder methods
const dragger = dragula([structContainer, emailContainer, blockContainer], {
  copy: emailBuilder.copy,
  moves: emailBuilder.moves,
  accepts: emailBuilder.accepts,
  mirrorContainer: document.body
})
.on('drop', (el, target, src, sibling) => {
  emailBuilder.handleDrop(el, target, src, sibling);  
});


$(toolbarContainer).mouseenter(() => {
  toolbarContainer.classList.add('show');
});

$(toolbarContainer).mouseleave(() => {
  toolbarContainer.classList.remove('show');
});

$(emailContainer).mouseover((e) => {
  efficientToggle(e);
});

let efficientToggle = debounce(function(e) {
  toolbar.toggleView(e);
}, 200);

/**
 * Throttles how often a function is fired.
 * 
 * @param {Function} func - The function to throttle
 * @param {Number} wait - The wait duration
 * @param {Boolean} immediate - Flag for firing function immediately
 */
function debounce(func, wait, immediate) {
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