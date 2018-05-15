const  emailContainer = document.querySelector('#email-grid');
const  blockContainer = document.querySelector('#block-container');
const structContainer = document.querySelector('#structure-container');

const builder = dragula([structContainer, emailContainer, blockContainer], {
  copy: function(el, src) {

    // Only allow structs or blocks to be copied
    var struct = el.classList.contains('structure');
    var block = el.classList.contains('block');

    return struct || block;
  },
  accepts: function(el, target, src, sibling) {

    // Only allow the email container to accept drops
    if (target === blockContainer) return false;
    if (target === structContainer) return false;

    // Filled item holders cannot accept drops
    if (target.classList.contains('filled')) return false;

    return true;
  },
  mirrorContainer: document.body
})
.on('drop', (el, target, src, sibling) => {

  // This is where we handle what happens when elements
  // are dropped inside the email container.

  if (! target) return;

  const isStruct = el.classList.contains('structure');
  const isBlock = el.classList.contains('block');

  // Where el is being dropped on
  const onStruct = target.classList.contains('structure');
  const onItem = target.className.indexOf('item') > -1;

  // Handle struct drops
  if (isStruct) {

    const itemContainers = [].slice.call(el.childNodes);

    // Structures are initially empty
    el.classList.add('empty-structure-block');

    // Structure items can now add blocks
    itemContainers.forEach((container) => {
      builder.containers.push(container)
    });
  }
  
  // Handle block drops
  if (isBlock) {

    // If not dropping in item holder, take up 100% width
    if (!onStruct && !onItem) {
      el.classList.add('uncontained');
    } else {

      // Dropped inside struct item holder

      // Set content styles
      el.classList.add('contained');

      // Set container styles
      target.classList.remove('empty');
      target.classList.add('filled');
      
      // Store content in container
      target.removeChild(target.firstChild);
    }

  }

  addEmptyContentMsgs();    
  
});

// Handle removing items on email container
dragula([emailContainer], {
  removeOnSpill: true,
  mirrorContainer: document.body
});

// Adds "Drop content here" inside empty struct containers
function addEmptyContentMsgs() {
  var selector = '.empty-structure-block .empty';
  var blocks = [].slice.call(document.querySelectorAll(selector));

  blocks.forEach((block) => {
    block.innerHTML = '<span class="no-select">Drop content here</span>';
  });
}